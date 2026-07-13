"use client";

import { useEffect, useState } from "react";

const DEFAULT_PASSWORD = "akribakes2026";
const PASSWORD_KEY = "akri_admin_password";
const AUTH_KEY = "akri_admin_auth";
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const useBackend = Boolean(API_BASE);

function getStoredPassword() {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  try {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

export default function AdminGate({ children }) {
  const [step, setStep] = useState("login");
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  // password login
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // forgot password
  const [email, setEmail] = useState("Akribake2020@gmail.com");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDev, setOtpDev] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(AUTH_KEY) === "1") {
        setAuthed(true);
        setStep("authed");
      }
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  // ── Password login ─────────────────────────────────────────
  const handlePasswordLogin = (event) => {
    event.preventDefault();
    const stored = getStoredPassword();
    if (password === stored) {
      try { sessionStorage.setItem(AUTH_KEY, "1"); } catch { /* ignore */ }
      setAuthed(true);
      setStep("authed");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password.");
    }
  };

  // ── OTP send ───────────────────────────────────────────────
  const handleSendOTP = async () => {
    if (!email.trim()) { setOtpError("Email is required."); return; }
    setOtpLoading(true);
    setOtpError("");
    setOtpDev("");

    if (useBackend) {
      try {
        const res = await fetch(`${API_BASE}/api/otp/send`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });
        const data = await res.json();
        if (!res.ok) { setOtpError(data.detail || "Failed to send OTP."); setOtpLoading(false); return; }
        if (data.otp) setOtpDev(`Dev OTP: ${data.otp}`);
        setOtpSent(true);
      } catch {
        setOtpError("Could not reach server. Use the password method instead.");
        setOtpLoading(false);
        return;
      }
    } else {
      setOtpDev("Dev mode — OTP is: 123456");
      setOtpSent(true);
    }
    setOtpLoading(false);
  };

  // ── OTP verify → show new password form ───────────────────
  const handleVerifyOTP = async () => {
    if (!otp.trim()) { setOtpError("Enter the OTP."); return; }
    setOtpLoading(true);
    setOtpError("");

    if (useBackend) {
      try {
        const res = await fetch(`${API_BASE}/api/otp/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
        });
        const data = await res.json();
        if (!res.ok) { setOtpError(data.detail || "Invalid OTP."); setOtpLoading(false); return; }
      } catch {
        setOtpError("Could not verify OTP with server.");
        setOtpLoading(false);
        return;
      }
    } else {
      if (otp.trim() !== "123456") {
        setOtpError("Incorrect OTP. Try 123456 in dev mode.");
        setOtpLoading(false);
        return;
      }
    }

    // OTP verified — show new password form
    setOtpSent(false);
    setOtp("");
    setResetDone(true);
    setOtpLoading(false);
  };

  // ── Set new password ───────────────────────────────────────
  const handleResetPassword = (event) => {
    event.preventDefault();
    if (!newPassword.trim()) { setOtpError("Enter a new password."); return; }
    if (newPassword !== newPasswordConfirm) { setOtpError("Passwords do not match."); return; }
    if (newPassword.length < 6) { setOtpError("Password must be at least 6 characters."); return; }

    try {
      localStorage.setItem(PASSWORD_KEY, newPassword);
    } catch { /* ignore */ }
    setNewPassword("");
    setNewPasswordConfirm("");
    setOtpError("");
    setStep("login");
    // the forgot flow resets locally
    setResetDone(false);
  };

  const handleLogout = () => {
    setAuthed(false);
    setStep("login");
    setPassword("");
    setPasswordError("");
    setEmail("Akribake2020@gmail.com");
    setOtp("");
    setOtpSent(false);
    setOtpDev("");
    setOtpError("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setResetDone(false);
    try { sessionStorage.removeItem(AUTH_KEY); } catch { /* ignore */ }
  };

  if (!ready) return null;

  if (!authed) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="w-full max-w-sm rounded-[2rem] border border-[#e5e5e5] bg-white p-8 text-center shadow-sm">

          {/* ── Password Login ─────────────────────────────────── */}
          {step === "login" ? (
            <form onSubmit={handlePasswordLogin}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Staff Area</p>
              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#111111]">Admin Login</h1>
              <p className="mt-3 text-sm text-[#666666]">Enter the admin password to continue.</p>
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Staff password" autoFocus
                className="mt-6 w-full rounded-full border border-[#e5e5e5] px-5 py-3 text-center text-[#111111] outline-none focus:border-[#111111]"
              />
              {passwordError ? <p className="mt-3 text-sm text-red-600">{passwordError}</p> : null}
              <button type="submit"
                className="mt-6 w-full rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
                Unlock Dashboard
              </button>
              <button type="button" onClick={() => { setStep("forgot"); setOtpError(""); }}
                className="mt-6 text-xs text-[#666666] underline hover:text-[#111111]">
                Forgot password?
              </button>
            </form>
          ) : null}

          {/* ── Forgot Password (OTP → new password) ──────────── */}
          {step === "forgot" ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Reset Password</p>
              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#111111]">
                {resetDone ? "Set New Password" : "Verify Your Identity"}
              </h1>
              <p className="mt-3 text-sm text-[#666666]">
                {resetDone
                  ? "Choose a new admin password."
                  : "Enter your email to receive a one-time password."}
              </p>

              {!resetDone ? (
                <div className="mt-6 space-y-4">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email" autoFocus
                    className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-5 py-3 text-center text-[#111111] outline-none focus:border-[#111111]"
                    disabled={otpSent}
                  />

                  {otpSent ? (
                    <>
                      <p className="text-xs text-green-600">OTP sent! Check your email.</p>
                      {otpDev ? <p className="text-xs text-amber-600">{otpDev}</p> : null}
                      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP" autoFocus maxLength={6}
                        className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-5 py-3 text-center text-xl font-bold tracking-[0.3em] text-[#111111] outline-none focus:border-[#111111]"
                      />
                      <button type="button" onClick={handleVerifyOTP} disabled={otpLoading}
                        className="w-full rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333] disabled:opacity-60">
                        {otpLoading ? "Verifying…" : "Verify OTP"}
                      </button>
                      <button type="button" onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }}
                        className="text-xs text-[#666666] underline hover:text-[#111111]">
                        Change email / Resend
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={handleSendOTP} disabled={otpLoading}
                      className="w-full rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333] disabled:opacity-60">
                      {otpLoading ? "Sending…" : "Send OTP"}
                    </button>
                  )}

                  {otpError ? <p className="text-sm text-red-600">{otpError}</p> : null}
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                  <input type="password" value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password" autoFocus
                    className="w-full rounded-full border border-[#e5e5e5] px-5 py-3 text-center text-[#111111] outline-none focus:border-[#111111]"
                  />
                  <input type="password" value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full rounded-full border border-[#e5e5e5] px-5 py-3 text-center text-[#111111] outline-none focus:border-[#111111]"
                  />
                  {otpError ? <p className="text-sm text-red-600">{otpError}</p> : null}
                  <button type="submit"
                    className="w-full rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
                    Update Password
                  </button>
                </form>
              )}

              <div className="mt-8 border-t border-[#e5e5e5] pt-6">
                <button type="button" onClick={() => { setStep("login"); setOtpError(""); setOtpSent(false); setOtp(""); setResetDone(false); }}
                  className="text-xs text-[#666666] underline hover:text-[#111111]">
                  Back to login
                </button>
              </div>
            </>
          ) : null}

        </div>
      </main>
    );
  }

  return (
    <>
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 pt-6">
        <span className="text-xs text-[#999999]">Akribake2020@gmail.com</span>
        <button type="button" onClick={handleLogout}
          className="rounded-full border border-[#e5e5e5] px-4 py-2 text-xs font-medium text-[#333333] transition hover:bg-[#f5f5f5]">
          Log out
        </button>
      </div>
      {children}
    </>
  );
}
