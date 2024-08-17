"use client";

import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config"
import { useRouter } from "next/navigation"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  //signup logic
  const handleSignup = async () => {

    //email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setError("Valid email, please.")
    return
    }

    if (password.length < 6) {
        setError("6 character password, please.")
        return
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem('user', true)
      setEmail("");
      setPassword("");
      router.push('/homepage');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
        <div>
            <h1>Sign Up</h1>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    padding: '4px', 
                    width: '250px', 
                    border: 'none', 
                    borderBottom: '1px solid black',
                    outline: 'none',
                    textAlign: 'center'
                }}
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{ 
                    display: 'block', 
                    marginBottom: '16px', 
                    padding: '4px', 
                    width: '250px', 
                    border: 'none', 
                    borderBottom: '1px solid black',
                    outline: 'none',
                    textAlign: 'center'
                }}
            />
            {error && (
              <p style={{ color: 'red', marginBottom: '16px', fontSize: '12px'}}>
                {error}
              </p>
            )}
            <button 
                onClick={handleSignup} 
                style={{ 
                    padding: '8px 16px', 
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    border: '1px solid black',
                    outline: 'none'
                }}
            >
                Sign Up
            </button>
        </div>
    </div>
)

};

export default Signup;
