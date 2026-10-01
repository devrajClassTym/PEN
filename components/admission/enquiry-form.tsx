"use client";

import { useState } from "react";

const classes = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, index) => `Class ${index + 1}`)];

export default function AdmissionEnquiry() {
  const [message, setMessage] = useState("");
  const field = "mt-2 min-h-12 w-full rounded-md border border-[#44321b]/20 bg-white/70 px-4 py-3 text-base text-[#44321b] outline-none placeholder:text-[#44321b]/40 focus:border-[#44321b] focus:ring-2 focus:ring-[#44321b]/10";

  return (
    <form aria-label="Admission enquiry" aria-describedby="admission-form-note" className="border border-[#44321b]/15 bg-[#f8f6f0] p-6 sm:p-9" onSubmit={(event) => {
      event.preventDefault();
      // Connect an admissions service before accepting or storing enquiries.
      setMessage("Unable to send your enquiry. Please contact the school directly.");
    }}>
      <h3 className="font-[Georgia,serif] text-2xl">Let’s get to know you.</h3>
      <p id="admission-form-note" className="mt-3 text-sm leading-relaxed text-[#44321b]/65">Fields marked * are required.</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label htmlFor="admission-child" className="text-sm font-medium sm:col-span-2">Child’s name *<input id="admission-child" name="childName" autoComplete="section-child name" required maxLength={100} pattern=".*\S.*" placeholder="Child’s full name" className={field} /></label>
        <label htmlFor="admission-parent" className="text-sm font-medium">Parent / guardian name *<input id="admission-parent" name="parentName" autoComplete="name" required maxLength={100} pattern=".*\S.*" placeholder="Your full name" className={field} /></label>
        <label htmlFor="admission-phone" className="text-sm font-medium">Phone number *<input id="admission-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={20} pattern="\+?[0-9\s\(\)\-]{7,20}" title="Enter a phone number using digits, spaces, brackets, or hyphens, with an optional leading +." placeholder="Your phone number" className={field} /></label>
        <label htmlFor="admission-email" className="text-sm font-medium sm:col-span-2">Email address<input id="admission-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" className={field} /></label>
        <label htmlFor="admission-class" className="text-sm font-medium">Class interested in *<select id="admission-class" name="classApplyingFor" required defaultValue="" className={field}><option value="" disabled>Select a class</option>{classes.map((item) => <option key={item}>{item}</option>)}<option>Help me choose</option></select></label>
        <label htmlFor="admission-location" className="text-sm font-medium">Location *<input id="admission-location" name="location" autoComplete="address-level2" required maxLength={120} pattern=".*\S.*" placeholder="Your area or city" className={field} /></label>
        <label htmlFor="admission-message" className="text-sm font-medium sm:col-span-2">Anything you’d like to ask?<textarea id="admission-message" name="message" rows={4} maxLength={2000} placeholder="Tell us how we can help…" className={`${field} resize-y`} /></label>
      </div>
      <button type="submit" className="mt-7 inline-flex min-h-12 items-center justify-center gap-8 rounded-full bg-[#44321b] px-7 py-3 text-sm text-white transition-colors hover:bg-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">Enquire now <span aria-hidden="true">↗</span></button>
      <p role="status" className={message ? "mt-5 text-sm leading-relaxed text-[#44321b]/80" : "sr-only"}>{message}</p>
    </form>
  );
}
