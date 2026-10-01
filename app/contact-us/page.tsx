import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/contact-form";
import CampusCarousel from "@/components/contact/campus-carousel";

export const metadata: Metadata = {
  title: "Contact Us | P.E.N Schools",
  description: "Get in touch with P.E.N Schools for admissions, campus visits, and general enquiries.",
};

export default function ContactUs() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <header className="px-6 pt-6 sm:pt-8"><Link href="/" aria-label="P.E.N Schools home" className="mx-auto flex w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"><SchoolLogo /></Link></header>
      <section aria-labelledby="contact-title" className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div><p className="mb-6 text-sm font-medium tracking-[0.2em] uppercase">Contact us</p><h1 id="contact-title" className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,5.5vw,5.5rem)] leading-[1.08] tracking-[-0.045em]">Every connection<br />starts with <span className="italic">hello.</span></h1><p className="mt-7 max-w-lg text-lg leading-[1.9] text-[#44321b]/75">A question about admissions, a campus visit, or simply getting to know us — we’d love to hear from you.</p><div className="mt-9 border-l-2 border-[#b49a70] pl-5"><p className="font-[Georgia,'Times_New_Roman',serif] text-2xl italic">Let’s find your next step, together.</p><p className="mt-3 text-base text-[#44321b]/70">Share a little about what you’re looking for.</p></div></div>
          <ContactForm />
        </div>
      </section>
      <CampusCarousel />
      <section aria-labelledby="office-title" className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div><p className="mb-4 text-sm tracking-[0.2em] uppercase">Come say hello</p><h2 id="office-title" className="font-[Georgia,'Times_New_Roman',serif] text-4xl tracking-[-0.04em] sm:text-5xl">Our main <span className="italic">office.</span></h2>
            <address className="mt-8 space-y-6 text-base leading-[1.8] not-italic">
              <div><h3 className="mb-2 text-sm font-medium tracking-[0.12em] uppercase">Address</h3><p className="text-[#44321b]/75">P.E.N Schools — Main Office<br />123 Learning Avenue, Siripuram<br />Visakhapatnam, Andhra Pradesh — 530003</p></div>
              <div><h3 className="mb-2 text-sm font-medium tracking-[0.12em] uppercase">Phone & email</h3><p className="text-[#44321b]/75">+91 00000 00000<br />hello@penschools.example</p></div>
            </address>
            <div className="mt-6"><h3 className="mb-2 text-sm font-medium tracking-[0.12em] uppercase">Visiting hours</h3><p className="text-base leading-[1.8] text-[#44321b]/75">Monday – Saturday<br />9:00 AM – 4:00 PM</p></div>
          </div>
          <div className="min-w-0 overflow-hidden rounded-3xl border border-[#44321b]/15 bg-[#e8dfce]">
            <iframe title="Illustrative map of Visakhapatnam, not an actual school location" src="https://maps.google.com/maps?q=Visakhapatnam%2C%20Andhra%20Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed" width="800" height="560" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[360px] w-full border-0 sm:h-[460px] lg:h-full lg:min-h-[560px]" />
            <noscript><p className="p-4">Map location: Visakhapatnam, Andhra Pradesh.</p></noscript>
          </div>
        </div>
      </section>
    </main>
  );
}
