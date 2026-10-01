"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./activity-tabs.module.css";

// Draft activity copy and illustrative stock photographs; replace with approved school content.
const activities = [
  {
    id: "sports-meet", label: "Sports Meet", theme: "#e4e8dc", kicker: "Find your stride",
    heading: "Big energy.", accent: "Even bigger spirit.",
    subtitle: "Every race, every cheer, every small victory.",
    icon: "M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v3a4 4 0 0 0 4 4M16 5h4v3a4 4 0 0 1-4 4M12 13v5M8 21v-3h8v3M6 21h12",
    photos: [
      { id: "photo-1546519638-68e109498ffc", alt: "Basketball game on an indoor court", caption: "Play with heart" },
      { id: "photo-1461896836934-ffe607ba8211", alt: "Runners competing on an athletics track", caption: "Go a little further" },
      { id: "photo-1574629810360-7efbbe195018", alt: "Football on a grass pitch", caption: "One team. One spirit." },
      // Extra stock photos to test a larger, multi-row gallery.
      { id: "photo-1531415074968-036ba1b575da", alt: "Cricket ground during a match", caption: "Every run counts" },
      { id: "photo-1554068865-24cecd4e34b8", alt: "Tennis court ready for play", caption: "Rise to the challenge" },
      { id: "photo-1530549387789-4c1017266635", alt: "Swimmer moving through a pool", caption: "Find your own pace" },
    ],
  },
  {
    id: "competitions", label: "Competitions", theme: "#ede2d5", kicker: "Dare to try",
    heading: "Fresh ideas.", accent: "Fearless expression.",
    subtitle: "A little challenge can open a whole new world.",
    icon: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z",
    photos: [
      { id: "photo-1587654780291-39c9404d746b", alt: "Colourful building blocks for creative projects", caption: "Imagine something new" },
      { id: "photo-1513364776144-60967b0f800f", alt: "Paints and brushes ready for an art project", caption: "Make your mark" },
      { id: "photo-1522071820081-009f0129c71c", alt: "A group collaborating on ideas", caption: "Better ideas, together" },
    ],
  },
  {
    id: "awards-nights", label: "Awards Nights", theme: "#eee2c8", kicker: "Celebrate the journey",
    heading: "Proud moments.", accent: "Lasting memories.",
    subtitle: "Celebrating the effort behind every achievement.",
    icon: "M8 3h8l-1 7h-6L8 3ZM9 3 6 1M15 3l3-2M12 10a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM9 19l-1 4 4-2 4 2-1-4",
    photos: [
      { id: "photo-1511795409834-ef04bbd61622", alt: "An event space prepared for a celebration", caption: "An evening to remember" },
      { id: "photo-1470229722913-7c0e2dbbafd3", alt: "Colourful stage lighting at a live event", caption: "A moment in the spotlight" },
      { id: "photo-1523580494863-6f3031224c94", alt: "A gathering celebrating an educational milestone", caption: "Celebrate how far you’ve come" },
    ],
  },
  {
    id: "educational-trips", label: "Educational Trips", theme: "#dfe8e6", kicker: "Let curiosity lead",
    heading: "Step outside.", accent: "See things differently.",
    subtitle: "When the world becomes the classroom.",
    icon: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6ZM9 3v15M15 6v15",
    photos: [
      { id: "photo-1564399579883-451a5d44ec08", alt: "Exhibits inside a museum", caption: "A world of questions" },
      { id: "photo-1441974231531-c6227db76b6e", alt: "Sunlight filtering through a green forest", caption: "Take the scenic route" },
      { id: "photo-1500530855697-b586d89ba3ee", alt: "An expansive landscape beneath an open sky", caption: "Look a little closer" },
    ],
  },
  {
    id: "penclubs", label: "PenClubs", theme: "#e8dfe9", kicker: "Find your people",
    heading: "Shared interests.", accent: "New possibilities.",
    subtitle: "A space for the things that make you, you.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    photos: [
      { id: "photo-1513364776144-60967b0f800f", alt: "Art materials for creative exploration", caption: "Create your own colour" },
      { id: "photo-1511379938547-c1f69419868d", alt: "Musical instruments in a rehearsal space", caption: "Find your rhythm" },
      { id: "photo-1522071820081-009f0129c71c", alt: "People working together around a table", caption: "Find your circle" },
    ],
  },
];

export default function ActivityTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function selectTab(index: number) {
    setActive(index);
    tabs.current[index]?.focus();
  }

  return (
    <section id="activities" aria-label="Life beyond academics" className={styles.activities}>
      <div className={styles.tabBar}>
        <div role="tablist" aria-label="Explore activities" className={styles.tabs}>
          {activities.map((activity, index) => (
            <button key={activity.id} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab" id={`tab-${activity.id}`} aria-controls={`panel-${activity.id}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight") next = (index + 1) % activities.length;
              else if (event.key === "ArrowLeft") next = (index - 1 + activities.length) % activities.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = activities.length - 1;
              else return;
              event.preventDefault();
              selectTab(next);
            }} className={styles.tab}>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={activity.icon} /></svg>
              {activity.label}
            </button>
          ))}
        </div>
      </div>
      {activities.map((activity, index) => (
        <div key={activity.id} role="tabpanel" id={`panel-${activity.id}`} aria-labelledby={`tab-${activity.id}`} hidden={active !== index} tabIndex={0} className={styles.panel}>
          {active === index && (
            <div className={styles.layout}>
              <div className={styles.heading}>
                <p className={styles.eyebrow}>{activity.kicker}</p>
                <h2>{activity.heading} <span>{activity.accent}</span></h2>
                <p className={styles.subtitle}>{activity.subtitle}</p>
              </div>
              <div className={styles.collage} aria-label={`${activity.label} inspiration gallery`}>
                <div aria-hidden="true" className={styles.backdrop} style={{ backgroundColor: activity.theme }} />
                {activity.photos.map((photo) => (
                  <figure key={photo.id} className={styles.photo}>
                    <div className={styles.imageWrap}>
                      <Image src={`https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=1000&q=85`} alt={photo.alt} fill unoptimized sizes="(min-width: 1024px) 30vw, (min-width: 601px) 44vw, 85vw" className={styles.image} />
                    </div>
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
