"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  RecaptchaVerifier,
  PhoneAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const sendPhoneVerification = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );

      const provider = new PhoneAuthProvider(auth);
      const id = await provider.verifyPhoneNumber(phone, window.recaptchaVerifier);
      setVerificationId(id);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const verifyAndLinkPhone = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await linkWithCredential(auth.currentUser, credential);
      alert("Phone number linked!");
      location.reload();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Welcome!</h1>

      {/* Profile Picture (Google users) */}
      {user?.photoURL && (
        <img
          src={user.photoURL}
          alt="Profile"
          style={{ width: 80, height: 80, borderRadius: "50%" }}
        />
      )}

      <p><strong>Name:</strong> {user?.displayName || "N/A"}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Phone Number:</strong> {user?.phoneNumber || "Not linked"}</p>

      {/* ✅ Phone Number Section: Show to ALL users if not linked */}
      {!user?.phoneNumber && (
        <div style={{ marginTop: "30px" }}>
          <h3>Link Your Phone Number</h3>
          <input
            type="tel"
            placeholder="+1 555-555-5555"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendPhoneVerification} style={{ marginLeft: 10 }}>
            Send Code
          </button>

          {verificationId && (
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button onClick={verifyAndLinkPhone} style={{ marginLeft: 10 }}>
                Verify & Link
              </button>
            </div>
          )}

          <div id="recaptcha-container"></div>
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      <button onClick={handleLogout} style={{ marginTop: "30px" }}>
        Log Out
      </button>
    </div>
  );
}
