"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [message, setMessage] = useState("");

  return (
    <form aria-label="Newsletter signup" aria-describedby="newsletter-signup-note" className="mx-auto mt-7 max-w-xl text-left" onSubmit={(event) => {
      event.preventDefault();
      // Connect a mailing service before accepting subscriptions.
      setMessage("Your email has not been saved. Newsletter signup is not available yet; you can read our stories below.");
    }}>
      <label htmlFor="newsletter-email" className="text-sm font-medium">Email address</label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className="min-h-12 min-w-0 flex-1 rounded-full border border-[#44321b]/25 bg-[#fffdf8] px-5 py-3 text-base text-[#44321b] outline-none placeholder:text-[#44321b]/45 focus:border-[#44321b] focus:ring-2 focus:ring-[#44321b]/15" />
        <button type="submit" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-6 rounded-full bg-[#44321b] px-7 py-3 text-sm text-white transition-colors hover:bg-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">Subscribe <span aria-hidden="true">↗</span></button>
      </div>
      <p id="newsletter-signup-note" className="mt-3 text-xs leading-relaxed text-[#44321b]/65">Signup is coming soon. Email addresses are not collected yet.</p>
      <p role="status" className={message ? "mt-3 text-sm leading-relaxed text-[#44321b]/80" : "sr-only"}>{message}</p>
    </form>
  );
}
