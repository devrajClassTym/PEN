import Image from "next/image";
import Link from "next/link";
import styles from "./gallery.module.css";

const images = [
  "image.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.png",
  "image6.jpeg",
  "image7.png",
  "image8.png",
  "image9.png",
  "image10.png",
  "image copy.png",
  "image copy 2.png",
  "image copy 3.png",
  "image copy 4.png",
  "image copy 5.png",
  "image copy 6.png",
  "image copy 7.png",
  "image copy 8.png",
  "image copy 9.png",
  "image copy 10.png",
  "image copy 11.png",
  "image copy 12.png",
  "image copy 13.png",
].map((filename, index) => ({
  src: `/images/gallery/${filename}`,
  alt: `P.E.N. school life photograph ${index + 1}`,
}));

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="bg-[#f8f6f0] px-3 py-16 text-[#44321b] sm:px-4 sm:py-20 lg:px-6"
    >
      <div className="w-full">
        <div className="mb-10 text-center">
          <p className="mb-4 text-[11px] font-medium tracking-[0.25em] uppercase">
            GALLERY
          </p>
          <h2
            id="gallery-title"
            className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.045em]"
          >
            Life at <span className="italic">P.E.N</span>
          </h2>
        </div>

        <div
          className={styles.marquee}
          tabIndex={0}
          role="region"
          aria-label="Gallery preview. Hover or focus to pause the images."
        >
          <div className={styles.track}>
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className={styles.group}
                aria-hidden={copy === 1 ? true : undefined}
              >
                {images.map(({ src, alt }) => (
                  <div key={src} className={styles.frame}>
                    <Image
                      src={src}
                      alt={copy === 0 ? alt : ""}
                      width={1200}
                      height={900}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex min-h-12 items-center justify-center gap-5 rounded-full border border-[#44321b]/40 px-7 py-3 text-sm font-medium transition-colors hover:bg-[#44321b] hover:text-[#f8f6f0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]"
          >
            View full gallery <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
