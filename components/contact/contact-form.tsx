"use client";

import { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const field = "mt-2 w-full rounded-lg border border-[#44321b]/25 bg-white px-4 py-3 text-base outline-none placeholder:text-[#44321b]/45 focus:border-[#44321b] focus:ring-2 focus:ring-[#b49a70]/30";

  return (
    <form aria-label="Contact enquiry" aria-describedby="contact-demo" className="rounded-3xl border border-[#44321b]/15 bg-white/60 p-6 sm:p-9" onSubmit={(event) => {
      event.preventDefault();
      setMessage("Demo only — your message has not been sent or saved. The contact service will be connected before launch.");
    }}>
      <h2 className="font-[Georgia,'Times_New_Roman',serif] text-3xl">Send us a message</h2>
      <p id="contact-demo" className="mt-3 text-sm leading-relaxed text-[#44321b]/65">Demo form. Messages are not sent. Fields marked * are required.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium" htmlFor="contact-name">Your name *<input id="contact-name" name="name" autoComplete="name" required pattern=".*\S.*" maxLength={100} placeholder="Full name" className={field} /></label>
        <label className="text-sm font-medium" htmlFor="contact-email">Email address *<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={field} /></label>
        <label className="text-sm font-medium" htmlFor="contact-phone">Phone number<input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={25} placeholder="Your phone number" className={field} /></label>
        <label className="text-sm font-medium" htmlFor="contact-subject">Enquiry about *<select id="contact-subject" name="subject" required defaultValue="" className={field}><option value="" disabled>Select a topic</option><option>Admissions</option><option>Campus visit</option><option>General enquiry</option><option>Careers</option></select></label>
        <label className="text-sm font-medium sm:col-span-2" htmlFor="contact-message">Your message *<textarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={5} placeholder="Tell us how we can help…" className={`${field} resize-y`} /></label>
      </div>
      <button type="submit" className="mt-6 inline-flex min-h-12 items-center gap-8 rounded-full bg-[#44321b] px-7 py-3 text-base text-white hover:bg-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">Send message <span aria-hidden="true">↗</span></button>
      <p role="status" className="mt-4 text-sm leading-relaxed text-[#44321b]/80">{message}</p>
    </form>
  );
}
