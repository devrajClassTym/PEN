import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AdmissionEnquiry from "@/components/admission/enquiry-form";

export const metadata: Metadata = {
  title: "Admission | P.E.N Schools",
  description: "Start your journey with P.E.N Schools. Explore the admission process, enquire about a place, and find answers to common questions.",
};

const steps = [
  { title: "Fill the enquiry form", description: "Tell us a little about your family, your location, and the class you’re interested in. It’s the first step towards finding the right fit.", action: "Start an enquiry", href: "#enquiry" },
  { title: "Visit the campus", description: "Arrange a visit with the school team. Explore the learning spaces, meet our educators, and bring along your questions.", action: "Plan your visit", href: "/contact-us" },
  { title: "Submit documents & confirm", description: "The admissions team will guide you through the required documents and remaining formalities, then confirm your child’s admission.", action: "Read the FAQs", href: "#admission-faq" },
];

const faqs = [
  { question: "How do I begin the admission process?", answer: "Start with an enquiry about the class you’re interested in, then arrange a campus visit with the school team. They will guide you through the documents and steps needed to complete admission. While online enquiries are unavailable, please contact the school directly." },
  { question: "Can we visit the campus before applying?", answer: "Please contact the school to arrange a suitable time for your visit. It’s an opportunity to explore the campus, discuss your child’s needs, and ask questions about school life." },
  { question: "Which documents should I prepare?", answer: "The school will provide the document checklist for your child’s class. Documents commonly requested by schools include a birth certificate, recent photographs, previous school reports, and a transfer certificate where applicable. Confirm the exact requirements with the admissions team before submitting anything." },
  { question: "How can I check class availability and age requirements?", answer: "Share the class you’re interested in with the admissions team. They can confirm current seat availability, age eligibility, and any class-specific requirements." },
  { question: "Where can I find the fee details?", answer: "Please ask the admissions team for the current fee structure, payment schedule, and any additional charges for your preferred class and campus." },
  { question: "Does an enquiry confirm my child’s admission?", answer: "An enquiry begins the conversation. Admission is confirmed only after the school reviews the required documents and the applicable admission formalities are completed." },
];

export default function AdmissionPage() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="admission-title" className="relative isolate overflow-hidden bg-[#44321b] pt-56 pb-20 text-center text-[#f8f6f0] sm:pt-64 sm:pb-24">
        {/* Illustrative school photograph, shared with the campus preview. */}
        <Image src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2200&q=85" alt="" fill priority unoptimized sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#201b13]/65 via-[#201b13]/55 to-[#201b13]/80" />
        <Link href="/" aria-label="P.E.N Schools home" className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-8">
          <Image src="/schoolLogo.png" alt="" width={144} height={144} priority className="h-28 w-28 rounded-full object-contain sm:h-36 sm:w-36" />
        </Link>
        <div className="content-container">
          <p className="mb-6 text-xs tracking-[0.25em] text-[#d9c6a5] uppercase">Admission at P.E.N</p>
          <h1 id="admission-title" className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,7vw,6.5rem)] leading-[1.07] tracking-[-0.045em]">A new chapter.<br /><span className="italic text-[#d9c6a5]">A place to belong.</span></h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Choosing a school is a meaningful step. Let’s get to know your family and help you find the right beginning for your child.</p>
          <a href="#admission-process" className="mt-9 inline-flex min-h-12 items-center gap-6 rounded-full border border-[#d9c6a5]/50 px-7 py-3 text-sm transition-colors hover:bg-[#d9c6a5] hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4">Explore the process <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="admission-process" aria-labelledby="process-title" className="content-container scroll-mt-8 py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="mb-5 text-xs tracking-[0.22em] uppercase">01 / The admission process</p><h2 id="process-title" className="font-[Georgia,serif] text-4xl leading-tight tracking-tight sm:text-5xl">Three steps.<br /><span className="italic">One bright beginning.</span></h2></div>
          <p className="max-w-sm text-base leading-[1.9] text-[#44321b]/75">From your first question to your first day, our school team is here to help you take the next step.</p>
        </div>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col border-t border-[#44321b]/25 bg-[#eee8da]/50 p-7 sm:p-8">
              <div className="flex items-center justify-between"><span className="font-[Georgia,serif] text-5xl italic text-[#92774f]">0{index + 1}</span><span aria-hidden="true" className="text-xl text-[#92774f]">{index === 2 ? "✓" : "↗"}</span></div>
              <h3 className="mt-8 font-[Georgia,serif] text-2xl">{step.title}</h3>
              <p className="mt-4 mb-7 text-sm leading-[1.9] text-[#44321b]/75">{step.description}</p>
              <Link href={step.href} className="mt-auto inline-flex min-h-11 w-fit items-center gap-5 border-b border-[#44321b]/30 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4">{step.action}<span aria-hidden="true">↗</span></Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="enquiry" aria-labelledby="admission-enquiry-title" className="scroll-mt-8 bg-[#eee8da] py-20 lg:py-24">
        <div className="content-container grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-5 text-xs tracking-[0.22em] uppercase">02 / Enquiry form</p>
            <h2 id="admission-enquiry-title" className="font-[Georgia,serif] text-4xl leading-tight tracking-tight sm:text-5xl">Their next adventure<br /><span className="italic">starts with hello.</span></h2>
            <p className="mt-6 max-w-lg text-base leading-[1.9] text-[#44321b]/75">Share a few details about your family and what you’re looking for. Whether you’re ready to apply or just exploring, there’s room for every question.</p>
            <div className="mt-9 border-l-2 border-[#92774f] pl-5"><p className="font-[Georgia,serif] text-2xl italic">A conversation, then a next step.</p><p className="mt-3 text-sm leading-relaxed text-[#44321b]/70">Ask about classes, campus visits, or the admission process.</p></div>
            <Link href="/contact-us" className="mt-7 inline-flex min-h-11 items-center gap-5 border-b border-[#44321b]/40 text-sm focus-visible:outline-2 focus-visible:outline-offset-4">Contact the school <span aria-hidden="true">↗</span></Link>
          </div>
          <AdmissionEnquiry />
        </div>
      </section>

      <section id="admission-faq" aria-labelledby="faq-title" className="content-container scroll-mt-8 py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div><p className="mb-5 text-xs tracking-[0.22em] uppercase">03 / Frequently asked questions</p><h2 id="faq-title" className="font-[Georgia,serif] text-4xl leading-tight tracking-tight sm:text-5xl">A little clarity.<br /><span className="italic">A confident start.</span></h2><p className="mt-6 max-w-sm text-base leading-[1.9] text-[#44321b]/75">A few answers to help you plan. For details specific to your child, speak with our school team.</p></div>
          <div className="border-t border-[#44321b]/20">
            {faqs.map((faq) => (
              <details key={faq.question} name="admission-faqs" className="group border-b border-[#44321b]/20 py-1">
                <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">{faq.question}<span aria-hidden="true" className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#44321b]/25"><span className="absolute h-px w-3 bg-current" /><span className="absolute h-3 w-px bg-current group-open:hidden" /></span></summary>
                <p className="max-w-xl pb-6 pr-8 text-sm leading-[1.9] text-[#44321b]/75">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
