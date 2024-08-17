'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>BLANKWHITE</h1>
      <p style={{ marginBottom: '16px' }}>A note app.</p>
      <button
        onClick={() => router.push('/signup')}
        style={{
          marginBottom: '8px',
          padding: '8px 16px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid black',
          outline: 'none',
          borderRadius: '4px'
        }}
      >
        Sign Up
      </button>
      <button
        onClick={() => router.push('/login')}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid black',
          outline: 'none',
          borderRadius: '4px'
        }}
      >
        Log In
      </button>
    </div>
  )
}
