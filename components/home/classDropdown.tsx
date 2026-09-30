"use client";

import { useEffect, useRef, useState } from "react";

const options = ["Nursery", "LKG", "UKG", ...Array.from({ length: 12 }, (_, index) => `Class ${index + 1}`)];

export default function ClassDropdown({ value, onChange, invalid }: { value: string; onChange: (value: string) => void; invalid: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef({ text: "", time: 0 });

  useEffect(() => {
    if (!open) return;
    function close(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`class-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(index: number) {
    onChange(options[index]);
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div ref={root} className="relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <label id="enquiry-class-label" htmlFor="enquiry-class" className="text-xs font-medium">Class applying for</label>
      <input type="hidden" name="classApplyingFor" value={value} />
      <button ref={trigger} id="enquiry-class" type="button" role="combobox" aria-labelledby="enquiry-class-label" aria-expanded={open} aria-controls="enquiry-class-options" aria-haspopup="listbox" aria-required="true" aria-invalid={invalid} aria-describedby={invalid ? "enquiry-class-error" : undefined} aria-activedescendant={open ? `class-option-${active}` : undefined}
        className={`mt-2 flex min-h-12 w-full items-center justify-between gap-3 rounded-md border bg-white/70 px-4 text-left text-sm outline-none transition-colors hover:border-[#44321b]/40 focus:border-[#44321b] focus:ring-2 focus:ring-[#44321b]/10 ${invalid ? "border-red-700" : "border-[#44321b]/20"}`}
        onClick={() => { setActive(Math.max(0, options.indexOf(value))); setOpen(!open); }}
        onKeyDown={(event) => {
          if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            setOpen(true);
            setActive(event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : !open ? Math.max(0, options.indexOf(value)) : (active + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) choose(active);
            else { setActive(Math.max(0, options.indexOf(value))); setOpen(true); }
          } else if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
          } else if (event.key === "Tab") setOpen(false);
          else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            const now = Date.now();
            search.current = { text: (now - search.current.time < 700 ? search.current.text : "") + event.key.toLowerCase(), time: now };
            const match = options.findIndex((option) => option.toLowerCase().startsWith(search.current.text));
            if (match !== -1) { setActive(match); setOpen(true); }
          }
        }}>
        <span className={value ? "" : "text-[#44321b]/45"}>{value || "Select class"}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={`h-4 w-4 text-[#44321b]/60 transition-transform ${open ? "rotate-180" : ""}`}><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && <ul id="enquiry-class-options" role="listbox" aria-labelledby="enquiry-class-label" className="absolute bottom-full z-30 mb-2 max-h-60 w-full overflow-y-auto overscroll-contain rounded-xl border border-[#44321b]/15 bg-[#fffdf8] p-1.5 shadow-[0_12px_40px_#44321b20]">
        {options.map((option, index) => <li key={option} id={`class-option-${index}`} role="option" aria-selected={value === option} onPointerDown={(event) => event.preventDefault()} onClick={() => choose(index)} onPointerMove={() => setActive(index)} className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm ${active === index ? "bg-[#eee9df]" : ""}`}>
          {option}<span aria-hidden="true" className="text-[#826238]">{value === option ? "✓" : ""}</span>
        </li>)}
      </ul>}
      {invalid && <p id="enquiry-class-error" className="absolute mt-1 text-[11px] text-red-700">Please select a class.</p>}
    </div>
  );
}
