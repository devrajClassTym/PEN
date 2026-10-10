import { readdir } from "node:fs/promises";
import path from "node:path";
import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "Gallery | P.E.N Schools",
  description:
    "A glimpse of life at P.E.N Schools — learning, creativity, sport, and shared moments.",
};

const imageExtension = /\.(avif|bmp|gif|ico|jpe?g|png|svg|webp)$/i;

async function findImages(directory: string, relativePath = ""): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = await Promise.all(
    entries.map(async (entry) => {
      const filename = path.posix.join(relativePath, entry.name);
      if (entry.isDirectory()) {
        return findImages(path.join(directory, entry.name), filename);
      }
      return entry.isFile() && imageExtension.test(entry.name) ? [filename] : [];
    }),
  );
  return images.flat();
}

export default async function GalleryPage() {
  await connection();
  const photos = (await findImages(path.join(process.cwd(), "public", "images"))).sort(
    (a, b) => a.localeCompare(b, undefined, { numeric: true }),
  );

  return (
    <main id="top" className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <header className="px-6 pt-6 pb-12 text-center sm:pt-8 sm:pb-16">
        <Link
          href="/"
          aria-label="P.E.N Schools home"
          className="mx-auto flex w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]"
        >
          <SchoolLogo />
        </Link>
        <div className="mx-auto mt-12 max-w-3xl sm:mt-16">
          <p className="mb-5 text-sm font-medium tracking-[0.2em] uppercase">
            The gallery
          </p>
          <h1 className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,6.5vw,6rem)] leading-[1.08] tracking-[-0.045em]">
            Life at P.E.N.
            <br />
            <span className="italic">Moments that stay.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.9] text-[#44321b]/75 sm:text-lg">
            From everyday discoveries to big milestones, these are the moments
            that make school more than a classroom.
          </p>
        </div>
      </header>

      <section
        aria-label="Photo gallery"
        className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10"
      >
        <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
          {photos.map((photo, index) => (
            <figure
              key={photo}
              className={`relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8dfce] sm:mb-5 ${index % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
            >
              <Image
                src={`/images/${photo.split("/").map(encodeURIComponent).join("/")}`}
                alt={path.parse(photo).name.replace(/[-_]/g, " ")}
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
