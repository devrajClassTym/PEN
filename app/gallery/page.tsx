import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | P.E.N Schools",
  description: "A glimpse of life at P.E.N Schools — learning, creativity, sport, and shared moments.",
};

const photos = [
  { filename: "image.png", alt: "P.E.N. school life photograph 1", tall: true },
  { filename: "image2.png", alt: "P.E.N. school life photograph 2", tall: false },
  { filename: "image3.png", alt: "P.E.N. school life photograph 3", tall: true },
  { filename: "image4.png", alt: "P.E.N. school life photograph 4", tall: false },
  { filename: "image5.png", alt: "P.E.N. school life photograph 5", tall: false },
  { filename: "image6.jpeg", alt: "P.E.N. school life photograph 6", tall: true },
  { filename: "image7.png", alt: "P.E.N. school life photograph 7", tall: true },
  { filename: "image8.png", alt: "P.E.N. school life photograph 8", tall: false },
  { filename: "image9.png", alt: "P.E.N. school life photograph 9", tall: true },
  { filename: "image10.png", alt: "P.E.N. school life photograph 10", tall: false },
  { filename: "image copy.png", alt: "P.E.N. school life photograph 11", tall: true },
  { filename: "image copy 2.png", alt: "P.E.N. school life photograph 12", tall: false },
  { filename: "image copy 3.png", alt: "P.E.N. school life photograph 13", tall: true },
  { filename: "image copy 4.png", alt: "P.E.N. school life photograph 14", tall: false },
  { filename: "image copy 5.png", alt: "P.E.N. school life photograph 15", tall: true },
  { filename: "image copy 6.png", alt: "P.E.N. school life photograph 16", tall: false },
  { filename: "image copy 7.png", alt: "P.E.N. school life photograph 17", tall: true },
  { filename: "image copy 8.png", alt: "P.E.N. school life photograph 18", tall: false },
  { filename: "image copy 9.png", alt: "P.E.N. school life photograph 19", tall: true },
  { filename: "image copy 10.png", alt: "P.E.N. school life photograph 20", tall: false },
  { filename: "image copy 11.png", alt: "P.E.N. school life photograph 21", tall: true },
  { filename: "image copy 12.png", alt: "P.E.N. school life photograph 22", tall: false },
  { filename: "image copy 13.png", alt: "P.E.N. school life photograph 23", tall: true },
];

export default function GalleryPage() {
  return (
    <main id="top" className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <header className="px-6 pt-6 pb-12 text-center sm:pt-8 sm:pb-16">
        <Link href="/" aria-label="P.E.N Schools home" className="mx-auto flex w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">
          <SchoolLogo />
        </Link>
        <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <p className="mb-5 text-sm font-medium tracking-[0.2em] uppercase">The gallery</p>
          <h1 className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,6.5vw,6rem)] leading-[1.08] tracking-[-0.045em]">Life at P.E.N.<br /><span className="italic">Moments that stay.</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-[#44321b]/75 sm:text-lg">A little learning, a little adventure, and a whole lot of growing together.</p>
        </div>
      </header>

      <section aria-label="Photo gallery" className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
          {photos.map((photo, index) => (
            <figure key={photo.filename} className={`relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8dfce] sm:mb-5 ${photo.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
              <Image
                src={`/images/gallery/${photo.filename}`}
                alt={photo.alt}
                fill
                loading={index < 3 ? "eager" : "lazy"}
                sizes="(min-width: 1600px) 493px, (min-width: 1024px) 32vw, (min-width: 640px) 48vw, 94vw"
                className="object-cover transition-transform duration-700 hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
