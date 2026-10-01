"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./parentReview.module.css";

const reviews = [
  {
    initials: "AS",
    name: "A. Sharma",
    role: "P.E.N. Parent",
    quote:
      "Our daughter looks forward to school every morning. What has stood out most to us is the encouragement she receives from her teachers — it has helped her become much more confident.",
  },
  {
    initials: "RK",
    name: "R. Kumar",
    role: "P.E.N. Parent",
    quote:
      "We love that learning at P.E.N. extends beyond textbooks. There is always something new to explore, create and talk about at home.",
  },
  {
    initials: "PM",
    name: "P. Mehta",
    role: "P.E.N. Parent",
    quote:
      "The teachers take the time to understand each child. We feel involved, heard and genuinely connected to the school community.",
  },
  {
    initials: "SR",
    name: "S. Rao",
    role: "P.E.N. Parent",
    quote:
      "There is a wonderful balance between academics and activities. We have watched our son become more independent, curious and willing to try new things.",
  },
  {
    initials: "ND",
    name: "N. Desai",
    role: "P.E.N. Parent",
    quote:
      "From the very first day, our daughter felt welcome. The friendships she has built and the care she receives mean a great deal to our family.",
  },
  {
    initials: "AV",
    name: "A. Varma",
    role: "P.E.N. Parent",
    quote:
      "The warmth and openness of the school have made every step of our child's journey feel supported. We are grateful to be part of such a thoughtful community.",
  },
];

export default function ParentReview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parent-reviews"
      aria-labelledby="parent-reviews-title"
      className={`${styles.section} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.stage}>
        <div className={styles.heading}>
          <p className="mb-4 text-[11px] font-medium tracking-[0.25em] uppercase">
            Our parent community
          </p>
          <h2
            id="parent-reviews-title"
            className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.045em]"
          >
            Little Moments.
            <br />
            <span className="italic">Lasting Impressions.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-64 text-sm leading-relaxed text-[#44321b]/65">
            Choosing a school is a deeply personal decision. Here are a few
            words from the families who experience P.E.N. every day.{" "}
          </p>
        </div>
        {reviews.map((review, index) => (
          <figure
            key={review.initials}
            className={`${styles.card} ${styles[`card${index + 1}`]}`}
          >
            <span
              aria-hidden="true"
              className="block h-9 font-[Georgia,serif] text-6xl leading-none text-[#b49a70]"
            >
              “
            </span>
            <blockquote className="mt-3 text-sm leading-[1.8] text-[#44321b]/85">
              {review.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[#44321b]/10 pt-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9e1d3] text-xs font-medium"
              >
                {review.initials}
              </span>
              <div>
                <p className="text-sm font-medium">{review.name}</p>
                <p className="mt-1 text-[11px] text-[#44321b]/60">
                  {review.role}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
