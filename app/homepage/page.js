"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const Home = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [quote, setQuote] = useState("");

  // Fetch the daily quote
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/today");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched quote data:", data); // Log the response
        setQuote(data[0].q); // Assuming the quote text is in the 'q' field
      } catch (error) {
        console.error("Error fetching the daily quote:", error);
      }
    };

    fetchQuote();
  }, []);

  if (!user && !sessionStorage.getItem("user")) {
    router.push("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      {quote ? (
        <p style={{ fontStyle: "italic", marginBottom: "16px" }}>{quote}</p>
      ) : (
        <p>Loading quote...</p>
      )}
      <h1>Welcome!</h1>
      <p style={{ marginBottom: "16px" }}>Here is your dashboard.</p>
      <button
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
          router.push("/");
        }}
        style={{
          padding: "8px 16px",
          cursor: "pointer",
          backgroundColor: "transparent",
          border: "1px solid black",
          outline: "none",
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Home;
