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
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "list" or "entry"
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  // Fetch the daily quote
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("/api/quote.js");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuote(data[0].q); // Assuming the quote text is in the 'q' field
      } catch (error) {
        console.error("Error fetching the daily quote:", error);
      }
    };

    fetchQuote();
  }, []);

  // Handle creating new lists/entries
  const handleCreate = () => {
    if (modalType === "list") {
      // Create a new list
      console.log("Creating a new list:", content, tags);
    } else if (modalType === "entry") {
      // Create a new entry
      console.log("Creating a new entry:", content, tags);
    }
    setShowModal(false);
    setContent("");
    setTags("");
  };

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
          marginBottom: "15px",
          padding: "8px 16px",
          cursor: "pointer",
          backgroundColor: "transparent",
          border: "1px solid black",
          outline: "none",
        }}
      >
        Log Out
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          maxWidth: "1000px",
          textAlign: "center",
        }}
      >
        {/* Lists Column */}
        <div
          style={{
            width: "48%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Lists</h2>
          <button
            onClick={() => {
              setModalType("list");
              setShowModal(true);
            }}
            style={{
              marginBottom: "16px",
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "1px solid black",
              borderRadius: "4px",
              outline: "none",
            }}
          >
            New List
          </button>
          <input
            type="text"
            placeholder="Search Lists..."
            style={{
              marginBottom: "16px",
              padding: "8px",
              width: "100%",
              border: "1px solid black",
              borderRadius: "4px",
              outline: "none",
            }}
          />
          {/* Lists content goes here */}
        </div>

        {/* Entries Column */}
        <div
          style={{
            width: "48%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Entries</h2>
          <button
            onClick={() => {
              setModalType("entry");
              setShowModal(true);
            }}
            style={{
              marginBottom: "16px",
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "1px solid black",
              borderRadius: "4px",
              outline: "none",
            }}
          >
            New Entry
          </button>
          <input
            type="text"
            placeholder="Search Entries..."
            style={{
              marginBottom: "16px",
              padding: "8px",
              width: "100%",
              border: "1px solid black",
              borderRadius: "4px",
              outline: "none",
            }}
          />
          {/* Entries content goes here */}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              textAlign: "center",
            }}
          >
            <h3>Create New {modalType === "list" ? "List" : "Entry"}</h3>
            <textarea
              placeholder={`Enter your ${modalType}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                height: "100px",
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid black",
                outline: "none",
                resize: "none",
              }}
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid black",
                outline: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  outline: "none",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  outline: "none",
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
