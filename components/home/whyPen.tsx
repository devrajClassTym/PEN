const distinctions = [
  {
    title: "Legacy Since 1983",
    description: "Four decades of trusted schooling in Vizag.",
    icon: "M12 3 3 8l9 5 9-5-9-5ZM5 12v5l7 4 7-4v-5M21 8v7",
  },
  {
    title: "Whole-Child Focus",
    description: "Academics balanced with sport, art and service.",
    icon: "M12 20s-8-4.5-8-10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 10-8 10Z",
  },
  {
    title: "Present Leadership",
    description: "Founder and principals on campus, not behind closed doors.",
    icon: "M4 21V4h16v17M2 21h20M9 21V8l6-2v15M12 13v2",
  },
  {
    title: "One Family, Three Campuses",
    description: "Same values and standards, wherever you study.",
    icon: "M9 21V7l3-3 3 3v14M3 21V12l3-3 3 3M15 12l3-3 3 3v9M1 21h22M12 10v2M6 14v2M18 14v2",
  },
  {
    title: "Real Feedback",
    description: "Regular PTMs and transparent assessment.",
    icon: "M20 4H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4v4l5-4h7a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM7 9h10M7 13h6",
  },
  {
    title: "Beyond the Classroom",
    description: "Sports meets, clubs, trips and awards nights.",
    icon: "M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v3a4 4 0 0 0 4 4M16 5h4v3a4 4 0 0 1-4 4M12 13v5M8 21v-3h8v3M6 21h12",
  },
];

export default function WhyPen() {
  return (
    <section
      id="why-pen"
      aria-labelledby="why-pen-title"
      className="bg-[#44321b] px-6 py-14 text-[#f8f6f0] sm:px-10 sm:py-16 lg:px-12 lg:py-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-4 text-[11px] font-medium tracking-[0.25em] text-[#d9c6a5] uppercase">
            Why P.E.N
          </p>
          <h2
            id="why-pen-title"
            className="text-balance font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.045em]"
          >
            What Sets Us <span className="italic text-[#d9c6a5]">Apart</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#d9c6a5]/20 bg-[#d9c6a5]/20 sm:grid-cols-2 lg:grid-cols-3">
          {distinctions.map(({ title, description, icon }, index) => (
            <li
              key={title}
              className="bg-[#44321b] px-6 py-6 transition-colors duration-300 hover:bg-[#4d3b24] motion-reduce:transition-none sm:px-7 lg:px-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-[#d9c6a5]"
                >
                  <path d={icon} />
                </svg>
                <span aria-hidden="true" className="text-[10px] tracking-[0.2em] text-[#d9c6a5]/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-balance font-[Georgia,'Times_New_Roman',serif] text-[22px] leading-[1.25] tracking-[-0.02em]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-[1.65] text-[#f8f6f0]/70">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
