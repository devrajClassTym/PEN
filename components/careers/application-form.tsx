"use client";

import { useState } from "react";

export default function ApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [message, setMessage] = useState("");
  const field = "mt-2 min-h-12 w-full min-w-0 rounded-md border border-[#44321b]/20 bg-white px-4 py-3 text-base outline-none placeholder:text-[#44321b]/40 focus:border-[#44321b] focus:ring-2 focus:ring-[#44321b]/10";

  return (
    <form aria-labelledby="application-title" aria-describedby="application-note" onSubmit={(event) => {
      event.preventDefault();
      // Connect recruitment service before accepting applications or uploading files.
      setMessage("Your application has not been sent or saved. Online applications are not available yet.");
    }}>
      <h3 id="application-title" className="font-[Georgia,serif] text-3xl">Introduce yourself.</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#44321b]/75">Applying for <span className="font-medium">{jobTitle}</span></p>
      <p id="application-note" className="mt-3 text-xs leading-relaxed text-[#44321b]/65">Preview form. Applications and CVs are not sent or saved yet. Fields marked * are required.</p>
      <input type="hidden" name="jobId" value={jobId} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label htmlFor="applicant-name" className="text-sm font-medium sm:col-span-2">Full name *<input id="applicant-name" name="name" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Your full name" className={field} /></label>
        <label htmlFor="applicant-email" className="text-sm font-medium sm:col-span-2">Email address *<input id="applicant-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" className={field} /></label>
        <label htmlFor="applicant-phone" className="text-sm font-medium">Phone number *<input id="applicant-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={20} pattern="\+?[0-9\s\(\)\-]{7,20}" title="Enter a phone number using digits, spaces, brackets, or hyphens, with an optional leading +." placeholder="Your phone number" className={field} /></label>
        <label htmlFor="applicant-experience" className="text-sm font-medium">Experience *<select id="applicant-experience" name="experience" required defaultValue="" className={field}><option value="" disabled>Select experience</option><option>Fresher</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option></select></label>
        <label htmlFor="applicant-cv" className="min-w-0 text-sm font-medium sm:col-span-2">Your CV *<input id="applicant-cv" name="cv" type="file" required accept=".pdf,.doc,.docx" aria-describedby="cv-note" className={`${field} text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#eee8da] file:px-3 file:py-1 file:text-[#44321b]`} onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          event.currentTarget.setCustomValidity(file && (!/\.(pdf|doc|docx)$/i.test(file.name) || file.size > 5 * 1024 * 1024) ? "Choose a PDF, DOC, or DOCX file no larger than 5 MB." : "");
          event.currentTarget.reportValidity();
        }} /><span id="cv-note" className="mt-2 block text-xs font-normal text-[#44321b]/65">PDF, DOC, or DOCX · Maximum 5 MB</span></label>
        <label htmlFor="applicant-message" className="text-sm font-medium sm:col-span-2">A little about you<textarea id="applicant-message" name="message" rows={3} maxLength={2000} placeholder="Tell us what draws you to this role…" className={`${field} resize-y`} /></label>
      </div>
      <button type="submit" className="mt-6 inline-flex min-h-12 items-center justify-center gap-6 rounded-full bg-[#44321b] px-7 py-3 text-sm text-white hover:bg-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">Submit application <span aria-hidden="true">↗</span></button>
      <p role="status" className={message ? "mt-4 text-sm leading-relaxed text-[#44321b]/80" : "sr-only"}>{message}</p>
    </form>
  );
}
