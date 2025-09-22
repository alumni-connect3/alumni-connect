import React, { useEffect, useRef, useState } from "react";
import { db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  limit,
} from "firebase/firestore";

function LiveChatPage({ onNavigate }) {
  const [fullName, setFullName] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [role, setRole] = useState("student"); // "student" | "alumni"
  const [verifiedUser, setVerifiedUser] = useState(null); // { fullName, regdNo, role }
  const [error, setError] = useState("");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  async function handleVerify(e) {
    e.preventDefault();
    setError("");

    const trimmedName = fullName.trim();
    const trimmedRegd = regdNo.trim();
    if (!trimmedName || !trimmedRegd) {
      setError("Full name and registration number are required");
      return;
    }

    try {
      const targetCollection = role === "alumni" ? "alumni" : "students";
      const q = query(
        collection(db, targetCollection),
        where("fullName", "==", trimmedName),
        where("regdNo", "==", trimmedRegd)
      );
      const snap = await getDocs(q);
      if (snap.empty) {
        setError("No matching record found in Firebase. Check details and role.");
        return;
      }

      const userData = { fullName: trimmedName, regdNo: trimmedRegd, role };
      setVerifiedUser(userData);
      startMessagesListener();
    } catch (err) {
      console.error("Verification error:", err);
      setError("Verification failed. Please try again.");
    }
  }

  function startMessagesListener() {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
    setLoadingMessages(true);
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc"),
      limit(200)
    );
    unsubscribeRef.current = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMessages(items);
        setLoadingMessages(false);
      },
      (err) => {
        console.error("onSnapshot error:", err);
        setLoadingMessages(false);
      }
    );
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!verifiedUser) return;
    const text = newMessage.trim();
    if (!text) return;
    try {
      await addDoc(collection(db, "messages"), {
        text,
        senderName: verifiedUser.fullName,
        regdNo: verifiedUser.regdNo,
        role: verifiedUser.role,
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
    } catch (err) {
      console.error("Send message error:", err);
      setError("Failed to send message. Try again.");
    }
  }

  function handleExit() {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    setVerifiedUser(null);
    setMessages([]);
  }

  return (
    <div style={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f5f5", width: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h1 style={{ color: "#2c3e50", margin: 0 }}>Live Chat</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              padding: "10px 16px",
              backgroundColor: "#6B7280",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4B5563")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#6B7280")}
          >
            Home
          </button>
          {verifiedUser && (
            <button
              onClick={handleExit}
              style={{
                padding: "10px 16px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
            >
              Exit Chat
            </button>
          )}
        </div>
      </div>

      {!verifiedUser ? (
        <div style={{ maxWidth: "640px", margin: "0 auto", backgroundColor: "white", padding: "24px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}>
          <p style={{ color: "#7f8c8d", marginTop: 0 }}>Enter your details to join the chat. We will verify them against Firebase.</p>
          {error && (
            <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "10px 12px", borderRadius: "6px", marginBottom: "12px" }}>
              {error}
            </div>
          )}
          <form onSubmit={handleVerify} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: "12px", alignItems: "center" }}>
              <label style={{ fontSize: "14px", color: "#374151" }}>Role:</label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#374151" }}>
                <input type="radio" name="role" value="student" checked={role === "student"} onChange={(e) => setRole(e.target.value)} /> Student
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#374151" }}>
                <input type="radio" name="role" value="alumni" checked={role === "alumni"} onChange={(e) => setRole(e.target.value)} /> Alumni
              </label>
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", color: "#555", fontSize: "14px" }}>Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "16px" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginBottom: "6px", color: "#555", fontSize: "14px" }}>Registration Number</label>
              <input
                value={regdNo}
                onChange={(e) => setRegdNo(e.target.value)}
                placeholder="Enter your regd no"
                style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "6px", fontSize: "16px" }}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#2563EB")}
              >
                Join Chat
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateRows: "1fr auto", gap: "12px", height: "calc(100vh - 140px)" }}>
          <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)", padding: "12px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ color: "#374151", fontSize: "14px" }}>
                Signed in as <strong>{verifiedUser.fullName}</strong> ({verifiedUser.role}, {verifiedUser.regdNo})
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 4px" }}>
              {loadingMessages ? (
                <div style={{ textAlign: "center", color: "#6b7280", padding: "16px" }}>Loading messages…</div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} style={{ padding: "8px 12px", margin: "6px 8px", backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #eee" }}>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                      <strong style={{ color: "#111827" }}>{m.senderName || "Unknown"}</strong> • {m.role || "user"} • {m.regdNo || "-"}
                    </div>
                    <div style={{ fontSize: "15px", color: "#111827", whiteSpace: "pre-wrap" }}>{m.text}</div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "8px" }}>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message…"
              style={{ flex: 1, padding: "12px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "16px", backgroundColor: "white" }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 16px",
                backgroundColor: "#10B981",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                minWidth: "120px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#10B981")}
            >
              Send
            </button>
          </form>
          {error && (
            <div style={{ maxWidth: "900px", margin: "8px auto 0", backgroundColor: "#fee2e2", color: "#991b1b", padding: "10px 12px", borderRadius: "6px" }}>
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LiveChatPage;