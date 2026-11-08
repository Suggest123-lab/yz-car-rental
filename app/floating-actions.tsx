"use client";

import { useEffect, useState } from "react";

const phoneNumber = "+63 917 123 4567";

export default function FloatingActions() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyPhoneNumber() {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <details className="group relative">
        <summary
          className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full bg-[#14213d] text-white shadow-lg shadow-[#14213d]/25 transition hover:-translate-y-0.5 hover:bg-[#263d66] [&::-webkit-details-marker]:hidden"
          aria-label="Open contact shortcuts"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M20 11.5a7.5 7.5 0 0 1-11.1 6.57L4 20l1.94-4.38A7.5 7.5 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Open contact shortcuts</span>
        </summary>
        <div className="absolute bottom-0 right-14 w-56 rounded-2xl border border-[#dbe2ef] bg-white p-3 shadow-xl shadow-[#14213d]/15">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#5f6775]">Contact us</p>
          <a href="https://www.facebook.com/profile.php?id=100092013557604" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-[#14213d] transition hover:bg-[#f8f9fb]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fca311] text-xs font-bold text-white">M</span>
            Messenger
          </a>
          <button type="button" onClick={copyPhoneNumber} className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left text-sm font-medium text-[#14213d] transition hover:bg-[#f8f9fb]" aria-label={`Copy ${phoneNumber} to clipboard`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8 shrink-0 rounded-full bg-[#e8eefb] p-2 text-[#14213d]">
              <path d="M7.5 3.5 5.7 5.2c-1.1 1.1.1 4.5 2.8 7.2s6.1 3.9 7.2 2.8l1.8-1.8-2.7-2.2-1.6 1c-.8-.3-2.1-1.6-2.4-2.4l1-1.6-2.3-2.7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span>{copied ? "Copied!" : phoneNumber}</span>
          </button>
          <p aria-live="polite" className="sr-only">{copied ? "Phone number copied to clipboard." : ""}</p>
        </div>
      </details>

      <a href="#top" className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fca311] text-[#14213d] shadow-lg shadow-[#14213d]/20 transition hover:-translate-y-0.5 hover:bg-[#fca311]" aria-label="Back to top">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="m6 14 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}
