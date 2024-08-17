"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const Home = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (!user && !sessionStorage.getItem('user')) {
    router.push('/');
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <button
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem('user');
          router.push('/');
        }}
        style={{
          padding: '8px 16px',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          border: '1px solid black',
          outline: 'none'
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
