"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const router = useRouter()

  // Sign-in logic
  const handleSignin = async () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Valid email, please.");
      return;
    }

    if (password.length < 6) {
      setError("6 character password, please.");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', true)
      setEmail("");
      setPassword("");
      router.push('/homepage');
    } catch (e) {
        console.error('Error object:', e);
        console.error('Error message:', e.message);
  
        const errorMessage = e.message || 'Failed to sign in. Please try again.';
        if (errorMessage.includes("INVALID_LOGIN_CREDENTIALS")) {
          setError("Incorrect email or password. Please try again.");
        } else {
          setError(errorMessage);
        }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <div>
        <h1>Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            display: "block",
            marginBottom: "8px",
            padding: "4px",
            width: "250px",
            border: "none",
            borderBottom: "1px solid black",
            outline: "none",
            textAlign: "center",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: "block",
            marginBottom: "16px",
            padding: "4px",
            width: "250px",
            border: "none",
            borderBottom: "1px solid black",
            outline: "none",
            textAlign: "center",
          }}
        />
        {error && (
          <p style={{ color: "red", marginBottom: "16px", fontSize: "12px" }}>
            {error}
          </p>
        )}
        <button
          onClick={handleSignin}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "1px solid black",
            outline: "none",
          }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
