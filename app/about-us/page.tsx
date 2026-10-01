import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | P.E.N Schools",
  description:
    "Discover P.E.N Schools in Visakhapatnam: our story since 1983, our values, and our belief in education that nurtures the whole child.",
};

const headingClass = "font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.12] tracking-[-0.045em]";
const labelClass = "text-sm font-medium tracking-[0.2em] uppercase";
const linkClass = "inline-flex min-h-12 items-center justify-center gap-8 rounded-full border px-7 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

export default function AboutUs() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="about-title" className="relative overflow-hidden px-5 pt-6 pb-16 sm:px-8 sm:pt-8 sm:pb-20 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Link href="/" aria-label="P.E.N Schools home" className="mx-auto flex w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">
            <SchoolLogo />
          </Link>

          <div className="grid items-center gap-12 pt-14 sm:pt-20 lg:grid-cols-[1.35fr_0.65fr] lg:gap-20">
            <div>
              <nav aria-label="Breadcrumb" className="mb-10 text-sm text-[#44321b]/65">
                <ol className="flex items-center gap-3">
                  <li><Link href="/" className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">About us</li>
                </ol>
              </nav>
              <p className={labelClass}>About P.E.N Schools</p>
              <h1 id="about-title" className="mt-6 text-balance font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,6.5vw,6rem)] leading-[1.06] tracking-[-0.045em]">
                Rooted in values.<br /><span className="italic">Growing together.</span>
              </h1>
              <p className="mt-8 max-w-xl text-pretty text-base leading-[1.9] text-[#44321b]/75 sm:text-lg">
                A school is more than a place to learn. It is where children find
                their voice, discover what moves them, and begin to understand
                who they can become.
              </p>
              <a href="#our-story" className="mt-8 inline-flex min-h-11 items-center gap-5 text-base underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
                Discover our story <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="relative isolate mx-auto flex aspect-square w-full max-w-[400px] flex-col items-center justify-center px-8 text-center lg:mt-10">
              <div aria-hidden="true" className="absolute inset-3 -z-10 rotate-[-8deg] rounded-[28%_4%_28%_4%] bg-[#e8dfce]" />
              <div aria-hidden="true" className="absolute inset-3 -z-10 rotate-[5deg] rounded-[28%_4%_28%_4%] border border-[#b49a70]/60" />
              <span className={`${labelClass} text-[#44321b]/65`}>Our roots</span>
              <p className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-[clamp(5rem,9vw,8rem)] leading-none tracking-[-0.07em]">1983</p>
              <span aria-hidden="true" className="my-6 h-px w-12 bg-[#b49a70]" />
              <p className="font-[Georgia,'Times_New_Roman',serif] text-2xl italic">A legacy of learning.<br />A lifetime of possibility.</p>
              <p className="mt-7 text-sm tracking-[0.2em] uppercase">Visakhapatnam</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="purpose-title" className="bg-[#44321b] px-6 py-20 text-[#f8f6f0] sm:px-12 lg:px-20 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <p className={`${labelClass} mb-6 text-[#d9c6a5]`}>Our purpose</p>
          <h2 id="purpose-title" className={`${headingClass} max-w-3xl`}>An education for school.<br /><span className="italic text-[#d9c6a5]">A foundation for life.</span></h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#d9c6a5]/35 bg-[#d9c6a5]/10 p-7 sm:p-10">
              <p className={`${labelClass} mb-5 text-[#d9c6a5]`}>The future we believe in</p>
              <h3 className="font-[Georgia,'Times_New_Roman',serif] text-4xl text-[#ead7b6] sm:text-5xl">Our vision</h3>
              <p className="mt-4 max-w-lg text-base leading-[1.9] text-[#f8f6f0]/75">To nurture curious minds and compassionate hearts, helping every child build the confidence and character to contribute meaningfully to the world.</p>
            </div>
            <div className="rounded-2xl border border-[#d9c6a5]/35 bg-[#d9c6a5]/10 p-7 sm:p-10">
              <p className={`${labelClass} mb-5 text-[#d9c6a5]`}>The commitment we live by</p>
              <h3 className="font-[Georgia,'Times_New_Roman',serif] text-4xl text-[#ead7b6] sm:text-5xl">Our mission</h3>
              <p className="mt-4 max-w-lg text-base leading-[1.9] text-[#f8f6f0]/75">To bring learning, creativity, and wellbeing together in a welcoming school community, with teachers and families working together to support each child’s growth.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="our-story" aria-labelledby="story-title" className="scroll-mt-8 border-t border-[#44321b]/15 bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <figure className="relative w-full min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] sm:rounded-[40px] bg-[#eee8da]">
              {/* Illustrative stock photo: https://unsplash.com/photos/OcDJhBm8Jnc */}
              <Image
                src="https://images.unsplash.com/photo-1719159381916-062fa9f435a6?auto=format&fit=crop&w=1600&q=85"
                alt="Students studying at desks in a school classroom"
                fill
                unoptimized
                sizes="(min-width: 1480px) 738px, (min-width: 1024px) 52vw, 94vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#44321b]/65 via-transparent to-transparent" />
              <p className="absolute inset-x-6 bottom-8 text-center font-[Georgia,'Times_New_Roman',serif] text-3xl text-white italic">Learning together.<br />Growing for life.</p>
            </div>
          </figure>
          <div>
            <p className={`${labelClass} mb-6`}>Our story</p>
            <h2 id="story-title" className={headingClass}>Four decades.<br /><span className="italic">One enduring belief.</span></h2>
            <div className="mt-7 space-y-5 text-base leading-[1.9] text-[#44321b]/75">
              <p>Since 1983, Pereira English Noble School has been part of the learning journey of children in Vizag. At the heart of P.E.N is a simple belief: a child’s growth is measured in character as much as in marks.</p>
              <p>That belief shapes our approach to school life. Academic learning sits alongside sport, art, and service, giving children opportunities to discover their strengths and learn to care for the world around them.</p>
              <p>Across our school community, we share a purpose: to help children grow into thoughtful, capable people who approach life with confidence and kindness.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="leadership-team" aria-labelledby="leadership-title" className="border-t border-[#44321b]/15 px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div>
            <p className={`${labelClass} mb-6`}>Our leadership team</p>
            <h2 id="leadership-title" className={headingClass}>A shared vision.<br /><span className="italic">A personal commitment.</span></h2>
            <div className="mt-7 space-y-5 text-base leading-[1.9] text-[#44321b]/75">
              <p>Behind every school community are people who believe in its children. At P.E.N, leadership begins with that belief — and a commitment to helping each child learn, belong, and grow.</p>
              <p>Our founder and principals bring our values into everyday school life, working alongside teachers and families to keep children at the heart of the conversation.</p>
              <p>With a shared focus on learning and character, our leadership team carries the spirit of P.E.N forward: rooted in our founding purpose and looking ahead to the possibilities of tomorrow.</p>
            </div>
            <p className="mt-8 border-l-2 border-[#b49a70] pl-5 font-[Georgia,'Times_New_Roman',serif] text-2xl leading-relaxed italic">Leading with care.<br />Growing with purpose.</p>
          </div>
          <div className="relative w-full min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] sm:rounded-[40px] bg-[#eee8da]">
              {/* Illustrative stock image; replace with the P.E.N leadership team photo when available. */}
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85"
                alt="Illustrative photograph of a team collaborating around a table"
                fill
                unoptimized
                sizes="(min-width: 1480px) 738px, (min-width: 1024px) 52vw, 94vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="community-title" className="border-t border-[#44321b]/15 bg-[#eee8da] px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className={`${labelClass} mb-6`}>Your next chapter</p>
          <h2 id="community-title" className={headingClass}>Get to know <span className="italic">P.E.N.</span></h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-[#44321b]/75">Explore our school community, or start a conversation with us about your child’s learning journey.</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link href="/admission#enquiry" className={`${linkClass} border-[#44321b] bg-[#44321b] text-[#f8f6f0] hover:bg-[#302416] focus-visible:outline-[#44321b]`}>Enquire now <span aria-hidden="true">↗</span></Link>
            <Link href="/#campus" className={`${linkClass} border-[#44321b]/35 hover:bg-[#44321b] hover:text-white focus-visible:outline-[#44321b]`}>Explore our campuses <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
