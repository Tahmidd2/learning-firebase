"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google provider instance
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Google sign-in handler
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "100px" }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ marginTop: "10px" }}>Log In</button>

        <div style={{ margin: "20px 0", textAlign: "center" }}>or</div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          style={{ backgroundColor: "#4285F4", color: "white", padding: "10px", border: "none", borderRadius: "5px" }}
        >
          Sign in with Google
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </main>
  );
}
