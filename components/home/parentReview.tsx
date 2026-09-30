"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./parentReview.module.css";

// Sample reviews for the layout; replace with approved parent testimonials.
const reviews = [
  { initials: "AS", name: "A. Sharma", role: "Primary school parent", quote: "Our child looks forward to school every morning. The encouragement from the teachers has made such a difference to her confidence." },
  { initials: "RK", name: "R. Kumar", role: "Middle school parent", quote: "We love how learning goes beyond textbooks. There is always something new to explore, create, and talk about at home." },
  { initials: "PM", name: "P. Mehta", role: "Primary school parent", quote: "The teachers take time to understand each child. We feel involved, heard, and truly part of the school community." },
  { initials: "SR", name: "S. Rao", role: "High school parent", quote: "A wonderful balance of academics and activities. We have watched our son become more independent, curious, and willing to try." },
  { initials: "ND", name: "N. Desai", role: "Primary school parent", quote: "From the very first day, our daughter felt welcome. The friendships and care she has found here mean so much to our family." },
  { initials: "AV", name: "A. Varma", role: "Middle school parent", quote: "Regular conversations with the teachers keep us connected to our child’s progress. It feels like we are growing together." },
];

export default function ParentReview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="parent-reviews" aria-labelledby="parent-reviews-title" className={`${styles.section} ${visible ? styles.visible : ""}`}>
      <div className={styles.stage}>
        <div className={styles.heading}>
          <p className="mb-4 text-[11px] font-medium tracking-[0.25em] uppercase">Our parent community</p>
          <h2 id="parent-reviews-title" className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.3rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.045em]">Little stories.<br /><span className="italic">Lasting trust.</span></h2>
          <p className="mx-auto mt-5 max-w-64 text-sm leading-relaxed text-[#44321b]/65">A glimpse into the journeys we share with our families.</p>
        </div>
        {reviews.map((review, index) => (
          <figure key={review.initials} className={`${styles.card} ${styles[`card${index + 1}`]}`}>
            <span aria-hidden="true" className="block h-9 font-[Georgia,serif] text-6xl leading-none text-[#b49a70]">“</span>
            <blockquote className="mt-3 text-sm leading-[1.8] text-[#44321b]/85">{review.quote}</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-[#44321b]/10 pt-4">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e9e1d3] text-xs font-medium">{review.initials}</span>
              <div><p className="text-sm font-medium">{review.name}</p><p className="mt-1 text-[11px] text-[#44321b]/60">{review.role}</p></div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
