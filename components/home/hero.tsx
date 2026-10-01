import SchoolLogo from "@/components/school-logo";

type HeroProps = {
  videoSrc?: string;
  posterSrc?: string;
  enquiryHref?: string;
};

export default function Hero({
  videoSrc = "https://assets.mixkit.co/videos/21589/21589-720.mp4",
  posterSrc,
  enquiryHref = "/admission#enquiry",
}: HeroProps) {
  const enquiryClassName =
    "inline-flex min-h-12 items-center justify-center gap-4 rounded-full border border-white/70 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <div className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-[#44321b] px-6 pt-48 pb-20 sm:pt-56 sm:pb-24 text-center text-white sm:px-12">
        <div className="absolute inset-x-0 top-6 flex justify-center sm:top-8">
          <SchoolLogo
            alt="Pereira English Noble School — established 1983"
            className="bg-[#f5f1e6] shadow-lg ring-4 ring-white/15"
          />
        </div>
        {/* Empty school-library footage from Mixkit (Stock Video Free License):
          https://mixkit.co/free-stock-video/walking-down-a-library-corridor-with-tables-and-bookcases-21589/ */}
        <video
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(25,18,10,0.62)_0%,rgba(25,18,10,0.35)_40%,rgba(25,18,10,0.45)_100%)]"
        />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
          <p className="mb-7 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white/90 sm:text-xs sm:tracking-[0.3em]">
            P.E.N. SCHOOLS, VISAKHAPATNAM — SINCE 1983
          </p>
          <h1
            id="hero-title"
            className="text-balance font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.7rem,6.8vw,6.5rem)] leading-[1.08] font-normal tracking-[-0.045em]"
          >
            More Than a School
            <br />
            <span className="italic">A Way of Growing</span>
          </h1>
          <p className="mt-8 max-w-[39rem] text-pretty font-sans text-sm leading-[1.9] font-normal text-white/90 sm:mt-10 sm:text-base lg:text-lg">
            For over four decades, P.E.N. Schools has been a place where
            children learn beyond the classroom — building knowledge, character,
            confidence and curiosity along the way.
          </p>
          <div className="mt-9 sm:mt-10">
            <a href={enquiryHref} className={enquiryClassName}>
              Admissions Enquiry <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
