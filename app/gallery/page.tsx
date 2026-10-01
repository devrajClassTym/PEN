import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | P.E.N Schools",
  description: "A glimpse of life at P.E.N Schools — learning, creativity, sport, and shared moments.",
};

// Illustrative stock photographs; replace with approved school gallery images.
const photos = [
  { id: "photo-1719159381916-062fa9f435a6", alt: "Students studying together in a classroom", tall: true },
  { id: "photo-1546519638-68e109498ffc", alt: "Basketball players on an indoor court", tall: false },
  { id: "photo-1513364776144-60967b0f800f", alt: "Colourful paints and brushes for an art project", tall: true },
  { id: "photo-1461896836934-ffe607ba8211", alt: "Athletes racing on a running track", tall: false },
  { id: "photo-1587654780291-39c9404d746b", alt: "Colourful construction blocks for creative play", tall: false },
  { id: "photo-1511379938547-c1f69419868d", alt: "Musical instruments in a rehearsal space", tall: true },
  { id: "photo-1574629810360-7efbbe195018", alt: "Football resting on a grass pitch", tall: true },
  { id: "photo-1522071820081-009f0129c71c", alt: "A group collaborating around a table", tall: false },
  { id: "photo-1441974231531-c6227db76b6e", alt: "Sunlight streaming through a forest", tall: true },
  { id: "photo-1530549387789-4c1017266635", alt: "Swimmer moving through a pool", tall: false },
  { id: "photo-1523580494863-6f3031224c94", alt: "People gathering to celebrate an educational milestone", tall: true },
  { id: "photo-1531415074968-036ba1b575da", alt: "A cricket ground during a match", tall: false },
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
            <figure key={photo.id} className={`relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8dfce] sm:mb-5 ${photo.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
              <Image
                src={`https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=1200&q=85`}
                alt={photo.alt}
                fill
                unoptimized
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
