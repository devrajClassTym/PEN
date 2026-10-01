"use client";

import { useState } from "react";
import ClassDropdown from "./classDropdown";

export default function EnquiryForm() {
  const [message, setMessage] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classInvalid, setClassInvalid] = useState(false);
  const fieldClass = "mt-2 min-h-12 w-full rounded-md border border-[#44321b]/20 bg-white/70 px-4 text-sm text-[#44321b] outline-none transition-colors placeholder:text-[#44321b]/40 hover:border-[#44321b]/40 focus:border-[#44321b] focus:ring-2 focus:ring-[#44321b]/10";

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="bg-[#f8f6f0] px-5 py-12 text-[#44321b] sm:px-10 sm:py-14 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="mb-3 text-[10px] font-medium tracking-[0.25em] uppercase">ADMISSIONS — VISAKHAPATNAM </p>
            <h2 id="enquiry-title" className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(2rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">A bright start <span className="italic">begins here.</span></h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#44321b]/65">Tell us a little about your family and the class you’re interested in.</p>
        </div>

        <form
          className="border-t border-[#44321b]/15 pt-6"
          onSubmit={(event) => {
            event.preventDefault();
            if (!selectedClass) {
              setClassInvalid(true);
              document.getElementById("enquiry-class")?.focus();
              return;
            }
            // Connect the admissions service before accepting enquiries.
            setMessage("Unable to send your enquiry. Please contact the school directly.");
          }}
        >
          <div className="grid items-end gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            <label htmlFor="enquiry-parent" className="text-xs font-medium">
              Parent name
              <input id="enquiry-parent" name="parentName" type="text" autoComplete="name" placeholder="Your full name" required maxLength={100} pattern=".*\S.*" className={fieldClass} />
            </label>
            <label htmlFor="enquiry-phone" className="text-xs font-medium">
              Phone number
              <input id="enquiry-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" required minLength={7} maxLength={20} pattern="\+?[0-9\s\(\)\-]{7,20}" title="Enter a phone number using digits, spaces, brackets, or hyphens, with an optional leading +." className={fieldClass} />
            </label>
            <label htmlFor="enquiry-location" className="text-xs font-medium">
              Location
              <input id="enquiry-location" name="location" type="text" autoComplete="address-level2" placeholder="Your area or city" required maxLength={120} pattern=".*\S.*" className={fieldClass} />
            </label>
            <ClassDropdown value={selectedClass} invalid={classInvalid} onChange={(value) => { setSelectedClass(value); setClassInvalid(false); }} />
            <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-[#44321b] px-6 text-sm font-medium text-[#f8f6f0] transition-colors hover:bg-[#5a4326] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b] sm:col-span-2 sm:justify-self-end xl:col-span-1">
              Enquire now <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p role="status" className={message ? "mt-4 text-sm leading-relaxed text-[#44321b]/75" : "sr-only"}>{message}</p>
        </form>
      </div>
    </section>
  );
}
