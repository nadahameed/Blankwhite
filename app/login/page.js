"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [signInWithEmailAndPassword, , loading, errorFromHook] = useSignInWithEmailAndPassword(auth);

  const router = useRouter();

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
      // Attempt to sign in
      await signInWithEmailAndPassword(email, password);
      sessionStorage.setItem('user', true);
      setEmail("");
      setPassword("");
      router.push('/homepage');
    } catch (e) {
      // Detailed error handling for Firebase errors
      if (errorFromHook?.message || e.message) {
        setError(errorFromHook?.message || e.message);
      } else {
        setError('Failed to sign in. Please try again.');
      }
      console.error('Error object:', e); // Keep this for debugging
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
