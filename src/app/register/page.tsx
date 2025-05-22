"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // redirect to dashboard after sign-up
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "100px" }}>
      <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ marginTop: "10px" }}>Create Account</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}