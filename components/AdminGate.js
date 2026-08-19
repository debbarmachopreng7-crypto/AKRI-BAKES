"use client";

import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const DEFAULT_PASSWORD = "akribakes2026";
const PASSWORD_KEY = "akri_admin_password";
const AUTH_KEY = "akri_admin_auth";
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
const useBackend = Boolean(API_BASE);
const useSupabase = isSupabaseConfigured();

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
  const [email, setEmail] = useState("akribakes2020@gmail.com");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDev, setOtpDev] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (sessionStorage.getItem(AUTH_KEY) === "1") {
          setAuthed(true);
          setStep("authed");
        } else if (useSupabase) {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setAuthed(true);
            setStep("authed");
          }
        }
      } catch { /* ignore */ }
      setReady(true);
    })();
  }, []);

  // ── Password login ─────────────────────────────────────────
  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setPasswordError("");

    // Try Supabase login first if email is provided
    if (useSupabase && email.trim()) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (!error) {
          setAuthed(true);
          setStep("authed");
          return;
        }
        // If Supabase fails, fall through to local password check
      } catch {
        // Network error — fall through to local password check
      }
    }

    // Local password fallback
    const stored = getStoredPassword();
    if (password === stored) {
      try { sessionStorage.setItem(AUTH_KEY, "1"); } catch { /* ignore */ }
      setAuthed(true);
      setStep("authed");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Try again or use Forgot Password.");
    }
  };

  // ── OTP send ───────────────────────────────────────────────
  const handleSendOTP = async () => {
    if (!email.trim()) { setOtpError("Email is required."); return; }
    setOtpLoading(true);
    setOtpError("");
    setOtpDev("");

    if (useSupabase) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
        });
        if (error) { setOtpError(error.message); setOtpLoading(false); return; }
        setOtpSent(true);
      } catch {
        setOtpError("Could not reach the server.");
        setOtpLoading(false);
        return;
      }
    } else if (useBackend) {
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
      setOtpError("Password resets are managed by the store. Please contact us at 8259917757.");
    }
    setOtpLoading(false);
  };

  // ── OTP verify → show new password form ───────────────────
  const handleVerifyOTP = async () => {
    if (!otp.trim()) { setOtpError("Enter the OTP."); return; }
    setOtpLoading(true);
    setOtpError("");

    if (useSupabase) {
      try {
        const { error } = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: otp.trim(),
          type: "email",
        });
        if (error) { setOtpError(error.message); setOtpLoading(false); return; }
      } catch {
        setOtpError("Could not verify OTP with server.");
        setOtpLoading(false);
        return;
      }
    } else if (useBackend) {
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
      setOtpError("Password resets are managed by the store. Please contact us at 8259917757.");
      setOtpLoading(false);
      return;
    }

    // OTP verified — show new password form
    setOtpSent(false);
    setOtp("");
    setResetDone(true);
    setOtpLoading(false);
  };

  // ── Set new password ───────────────────────────────────────
  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!newPassword.trim()) { setOtpError("Enter a new password."); return; }
    if (newPassword !== newPasswordConfirm) { setOtpError("Passwords do not match."); return; }
    if (newPassword.length < 6) { setOtpError("Password must be at least 6 characters."); return; }

    if (useSupabase) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) { setOtpError(error.message); return; }
      } catch {
        setOtpError("Could not update password. Try again.");
        return;
      }
      setNewPassword("");
      setNewPasswordConfirm("");
      setOtpError("");
      setAuthed(true);
      setStep("authed");
      setResetDone(false);
      return;
    }

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
    setEmail("akribakes2020@gmail.com");
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
        <div className="w-full max-w-sm rounded-[2rem] border border-[#E8E0D8] bg-white p-8 text-center shadow-sm">

          {/* ── Password Login ─────────────────────────────────── */}
          {step === "login" ? (
            <form onSubmit={handlePasswordLogin}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Staff Area</p>
              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#26110B]">Admin Login</h1>
              <p className="mt-3 text-sm text-[#8B7355]">Enter the admin password to continue.</p>
              {useSupabase ? (
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Staff email (optional)" autoComplete="email"
                  className="mt-6 w-full rounded-full border border-[#E8E0D8] px-5 py-3 text-center text-[#26110B] outline-none focus:border-[#26110B]"
                />
              ) : null}
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password" autoFocus
                className="mt-6 w-full rounded-full border border-[#E8E0D8] px-5 py-3 text-center text-[#26110B] outline-none focus:border-[#26110B]"
              />
              {passwordError ? <p className="mt-3 text-sm text-red-600">{passwordError}</p> : null}
              <button type="submit"
                className="mt-6 w-full rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#3D2219]">
                Unlock Dashboard
              </button>
              <button type="button" onClick={() => { setStep("forgot"); setOtpError(""); }}
                className="mt-6 text-xs text-[#8B7355] underline hover:text-[#26110B]">
                Forgot password?
              </button>
            </form>
          ) : null}

          {/* ── Forgot Password (OTP → new password) ──────────── */}
          {step === "forgot" ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Reset Password</p>
              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#26110B]">
                {resetDone ? "Set New Password" : "Verify Your Identity"}
              </h1>
              <p className="mt-3 text-sm text-[#8B7355]">
                {resetDone
                  ? "Choose a new admin password."
                  : "Enter your email to receive a one-time password."}
              </p>

              {!resetDone ? (
                <div className="mt-6 space-y-4">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email" autoFocus
                    className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-5 py-3 text-center text-[#26110B] outline-none focus:border-[#26110B]"
                    disabled={otpSent}
                  />

                  {otpSent ? (
                    <>
                      <p className="text-xs text-green-600">OTP sent! Check your email.</p>
                      {otpDev ? <p className="text-xs text-amber-600">{otpDev}</p> : null}
                      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP" autoFocus maxLength={6}
                        className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-5 py-3 text-center text-xl font-bold tracking-[0.3em] text-[#26110B] outline-none focus:border-[#26110B]"
                      />
                      <button type="button" onClick={handleVerifyOTP} disabled={otpLoading}
                        className="w-full rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#3D2219] disabled:opacity-60">
                        {otpLoading ? "Verifying…" : "Verify OTP"}
                      </button>
                      <button type="button" onClick={() => { setOtpSent(false); setOtp(""); setOtpError(""); }}
                        className="text-xs text-[#8B7355] underline hover:text-[#26110B]">
                        Change email / Resend
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={handleSendOTP} disabled={otpLoading}
                      className="w-full rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#3D2219] disabled:opacity-60">
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
                    className="w-full rounded-full border border-[#E8E0D8] px-5 py-3 text-center text-[#26110B] outline-none focus:border-[#26110B]"
                  />
                  <input type="password" value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full rounded-full border border-[#E8E0D8] px-5 py-3 text-center text-[#26110B] outline-none focus:border-[#26110B]"
                  />
                  {otpError ? <p className="text-sm text-red-600">{otpError}</p> : null}
                  <button type="submit"
                    className="w-full rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#3D2219]">
                    Update Password
                  </button>
                </form>
              )}

              <div className="mt-8 border-t border-[#E8E0D8] pt-6">
                <button type="button" onClick={() => { setStep("login"); setOtpError(""); setOtpSent(false); setOtp(""); setResetDone(false); }}
                  className="text-xs text-[#8B7355] underline hover:text-[#26110B]">
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
        <span className="text-xs text-[#999999]">akribakes2020@gmail.com</span>
        <button type="button" onClick={handleLogout}
          className="rounded-full border border-[#E8E0D8] px-4 py-2 text-xs font-medium text-[#26110B] transition hover:bg-[#f5f5f5]">
          Log out
        </button>
      </div>
      {children}
    </>
  );
}
