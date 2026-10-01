"use client";

import { useEffect, useRef, useState } from "react";
import { schoolJobs, type SchoolJob } from "@/lib/school-jobs";
import ApplicationForm from "./application-form";

export default function JobOpenings() {
  const [selected, setSelected] = useState<SchoolJob | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.showModal();
    modal.scrollTop = 0;
    return () => {
      document.body.style.overflow = previousOverflow;
      modal.close();
      trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section aria-labelledby="openings-title" className="content-container py-16 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="mb-4 text-xs tracking-[0.22em] uppercase">Find your next chapter</p><h2 id="openings-title" className="font-[Georgia,serif] text-4xl tracking-tight sm:text-5xl">Explore our <span className="italic">openings.</span></h2></div>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {schoolJobs.map((job) => (
          <li key={job.id} className="min-w-0">
            <button type="button" aria-haspopup="dialog" aria-controls="career-dialog" aria-label={`View job and apply: ${job.title}`} onClick={(event) => { trigger.current = event.currentTarget; setSelected(job); }} className="group flex h-full w-full cursor-pointer flex-col rounded-xl border border-[#44321b]/15 bg-[#fffdf8] p-7 text-left transition-colors hover:border-[#92774f] hover:bg-[#eee8da]/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b] sm:p-8">
              <span className="text-[10px] tracking-[0.18em] text-[#92774f] uppercase">{job.department}</span>
              <span className="mt-5 font-[Georgia,serif] text-3xl leading-tight tracking-tight">{job.title}</span>
              <span className="mt-5 flex flex-wrap gap-2 text-xs text-[#44321b]/75"><span className="rounded-full bg-[#eee8da] px-3 py-1.5">{job.type}</span><span className="rounded-full bg-[#eee8da] px-3 py-1.5">{job.location}</span></span>
              <span className="mt-5 mb-7 text-sm leading-[1.9] text-[#44321b]/75">{job.summary}</span>
              <span className="mt-auto flex w-full items-center justify-between gap-4 border-t border-[#44321b]/15 pt-5 text-sm font-medium">View role & apply <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#44321b]/25 group-hover:bg-[#44321b] group-hover:text-white">↗</span></span>
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dialog} id="career-dialog" aria-labelledby="job-detail-title" onCancel={(event) => { event.preventDefault(); setSelected(null); }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setSelected(null);
      }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-2xl border-0 bg-[#f8f6f0] p-0 text-[#44321b] shadow-2xl backdrop:bg-[#201b13]/70 backdrop:backdrop-blur-sm">
        {selected && <>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-6 border-b border-[#44321b]/15 bg-[#f8f6f0] px-6 py-4 sm:px-8"><p className="text-xs tracking-[0.2em] text-[#92774f] uppercase">P.E.N Schools / Careers</p><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close job application" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#44321b]/25 text-2xl hover:bg-[#eee8da] focus-visible:outline-2 focus-visible:outline-offset-4">×</button></div>
          <div className="grid lg:grid-cols-2">
            <div className="min-w-0 bg-[#eee8da]/60 p-6 sm:p-8 lg:p-10">
              <p className="text-xs tracking-[0.18em] text-[#92774f] uppercase">{selected.department}</p>
              <h2 id="job-detail-title" className="mt-4 font-[Georgia,serif] text-3xl leading-tight tracking-tight sm:text-4xl">{selected.title}</h2>
              <p className="mt-5 text-sm leading-[1.9] text-[#44321b]/80">{selected.summary}</p>
              <dl className="my-7 grid grid-cols-2 gap-5 border-y border-[#44321b]/15 py-5 text-sm"><div><dt className="text-xs text-[#44321b]/60">Employment</dt><dd className="mt-2">{selected.type}</dd></div><div><dt className="text-xs text-[#44321b]/60">Location</dt><dd className="mt-2">{selected.location} · Campus TBC</dd></div><div className="col-span-2"><dt className="text-xs text-[#44321b]/60">Experience</dt><dd className="mt-2">{selected.experience}</dd></div></dl>
              <h3 className="font-[Georgia,serif] text-2xl">What you’ll do</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-[#44321b]/80">{selected.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
              <h3 className="mt-7 font-[Georgia,serif] text-2xl">What you’ll bring</h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-[#44321b]/80">{selected.qualifications.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="min-w-0 p-6 sm:p-8 lg:p-10"><ApplicationForm key={selected.id} jobId={selected.id} jobTitle={selected.title} /></div>
          </div>
        </>}
      </dialog>
    </section>
  );
}
