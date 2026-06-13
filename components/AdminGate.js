"use client";

import { useEffect, useState } from "react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "akribakes2026";
const AUTH_KEY = "akri_admin_auth";

export default function AdminGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
      try {
        sessionStorage.setItem(AUTH_KEY, "1");
      } catch {
        /* ignore */
      }
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    setValue("");
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
  };

  if (!ready) return null;

  if (!authed) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-[2rem] border border-[#e5e5e5] bg-white p-8 text-center shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Staff Area</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-[#111111]">Enter Password</h1>
          <p className="mt-3 text-sm text-[#666666]">This page is for Akri Bakes staff only.</p>
          <input
            type="password"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Staff password"
            autoFocus
            className="mt-6 w-full rounded-full border border-[#e5e5e5] px-5 py-3 text-center text-[#111111] outline-none focus:border-[#111111]"
          />
          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]"
          >
            Unlock Dashboard
          </button>
        </form>
      </main>
    );
  }

  return (
    <>
      <div className="mx-auto flex max-w-6xl justify-end px-4 pt-6">
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-[#e5e5e5] px-4 py-2 text-xs font-medium text-[#333333] transition hover:bg-[#f5f5f5]"
        >
          Log out
        </button>
      </div>
      {children}
    </>
  );
}
