import Image from "next/image";

export default function FounderDesk() {
  return (
    <section
      id="founder-desk"
      aria-labelledby="founder-desk-title"
      className="border-b border-[#44321b]/15 bg-[#f8f6f0] px-5 py-14 text-[#44321b] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <figure className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]">
          <div
            aria-hidden="true"
            className="absolute -right-3 -bottom-3 h-full w-full rounded-t-[160px] border border-[#44321b]/20 sm:-right-4 sm:-bottom-4"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[160px] bg-[#e3ded1]">
            <Image
              src="/images/principle.png"
              alt="P.E.N. principal"
              fill
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div>
          <p className="mb-5 text-[11px] font-medium tracking-[0.25em] uppercase">
            THE VISION BEHIND P.E.N.
          </p>
          <h2
            id="founder-desk-title"
            className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.045em]"
          >
            From the <span className="italic">Founder’s Desk</span>
          </h2>
          <div className="mt-7 border-l-2 border-[#b49a70] pl-5">
            <h3 className="font-[Georgia,'Times_New_Roman',serif] text-2xl sm:text-3xl">
              Mrs. Anita Pereira
            </h3>
            <p className="mt-2 text-[11px] tracking-[0.18em] text-[#44321b]/65 uppercase">
              Founder, P.E.N Schools
            </p>
          </div>
          <div className="mt-6 max-w-xl space-y-4 text-sm leading-[1.9] text-[#44321b]/75 sm:text-base">
            <p>
              Every institution begins with a belief. <br /> <br />
              For P.E.N., that belief has always been simple: education should
              help a child become more capable, curious and grounded — not
              simply more accomplished on paper.
            </p>
            <p>
              Since 1983, that belief has shaped the way we think about school,
              learning and childhood. We believe children need the freedom to
              ask questions, the discipline to keep learning and the confidence
              to find their own voice.
            </p>
            <p>
              P.E.N. continues to grow, but the purpose remains unchanged — to
              create an environment where every child can learn deeply, grow
              confidently and discover the person they are becoming.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
