"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./activity-tabs.module.css";

const activities = [
  {
    id: "sports-meet",
    label: "Sports Meet",
    theme: "#e4e8dc",
    kicker: "Find your stride",
    heading: "Play hard.",
    accent: "Grow stronger.",
    subtitle:
      "Sports teach children more than how to win. They learn teamwork, discipline, resilience and the confidence to keep going.",
    icon: "M8 3h8v6a4 4 0 0 1-8 0V3ZM8 5H4v3a4 4 0 0 0 4 4M16 5h4v3a4 4 0 0 1-4 4M12 13v5M8 21v-3h8v3M6 21h12",
    photos: [
      {
        id: "sport1.JPG",
        alt: "Outdoor school recreation area",
      },
      {
        id: "sport2.JPG",
        alt: "School sports field prepared for an athletics meet",
      },
      {
        id: "sport3.JPG",
        alt: "Students racing on an athletics track",
      },
      {
        id: "sport5.JPG",
        alt: "Students taking part in a school sports meet",
      },
      {
        id: "sport6.JPG",
        alt: "Students competing in a field event",
      },
      {
        id: "sport7.JPG",
        alt: "Students gathered during a school sports meet",
      },
    ],
  },
  {
    id: "awards-nights",
    label: "Awards Nights",
    theme: "#eee2c8",
    kicker: "Celebrate the journey",
    heading: "Proud moments.",
    accent: "Lasting memories.",
    subtitle:
      "We celebrate effort, progress and achievement — not just the final result.",
    icon: "M8 3h8l-1 7h-6L8 3ZM9 3 6 1M15 3l3-2M12 10a5 5 0 1 0 0 10 5 5 0 0 0 0-10ZM9 19l-1 4 4-2 4 2-1-4",
    photos: [
      {
        id: "awardNight1.JPG",
        alt: "P.E.N. Schools award night photo 1",
      },
      {
        id: "awardNight2.png",
        alt: "P.E.N. Schools award night photo 2",
      },
      {
        id: "awardNight3.png",
        alt: "P.E.N. Schools award night photo 3",
      },
      {
        id: "awardNight4.png",
        alt: "P.E.N. Schools award night photo 4",
      },
      {
        id: "awardNight5.png",
        alt: "P.E.N. Schools award night photo 5",
      },
      {
        id: "awardNight6.png",
        alt: "P.E.N. Schools award night photo 6",
      },
    ],
  },
  {
    id: "educational-trips",
    label: "Educational Trips",
    theme: "#dfe8e6",
    kicker: "Let curiosity lead",
    heading: "Take learning out",
    accent: "into the real world.",
    subtitle:
      "Educational trips give children the chance to explore new places, see ideas in action and learn beyond the classroom.",
    icon: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6ZM9 3v15M15 6v15",
    photos: [
      {
        id: "image9.png",
        alt: "P.E.N. Schools educational trip photo 1",
      },
      {
        id: "image10.png",
        alt: "P.E.N. Schools educational trip photo 2",
      },
      {
        id: "image2.png",
        alt: "P.E.N. Schools educational trip photo 3",
      },
    ],
  },
  {
    id: "penclubs",
    label: "PenClubs",
    theme: "#e8dfe9",
    kicker: "Find your people",
    heading: "Shared interests.",
    accent: "New possibilities.",
    subtitle:
      "PEN Clubs give children space to explore their interests, meet like-minded peers and try something beyond their everyday routine.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    photos: [
      {
        id: "image copy 8.png",
        alt: "P.E.N. school club activity",
      },
      {
        id: "penClub2.JPG",
        alt: "P.E.N. school club activity 2",
      },
      {
        id: "penClub3.JPG",
        alt: "P.E.N. school club activity 3",
      },
      {
        id: "penClub4.JPG",
        alt: "P.E.N. school club activity 4",
      },
      {
        id: "penClub5.JPG",
        alt: "P.E.N. school club activity 5",
      },
      {
        id: "penClub6.JPG",
        alt: "P.E.N. school club activity 6",
      },
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
    <section
      id="activities"
      aria-label="Life beyond academics"
      className={styles.activities}
    >
      <div className={styles.tabBar}>
        <div
          role="tablist"
          aria-label="Explore activities"
          className={styles.tabs}
        >
          {activities.map((activity, index) => (
            <button
              key={activity.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`tab-${activity.id}`}
              aria-controls={`panel-${activity.id}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowRight")
                  next = (index + 1) % activities.length;
                else if (event.key === "ArrowLeft")
                  next = (index - 1 + activities.length) % activities.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = activities.length - 1;
                else return;
                event.preventDefault();
                selectTab(next);
              }}
              className={styles.tab}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={activity.icon} />
              </svg>
              {activity.label}
            </button>
          ))}
        </div>
      </div>
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          role="tabpanel"
          id={`panel-${activity.id}`}
          aria-labelledby={`tab-${activity.id}`}
          hidden={active !== index}
          tabIndex={0}
          className={styles.panel}
        >
          {active === index && (
            <div className={styles.layout}>
              <div className={styles.heading}>
                <p className={styles.eyebrow}>{activity.kicker}</p>
                <h2>
                  {activity.heading} <span>{activity.accent}</span>
                </h2>
                <p className={styles.subtitle}>{activity.subtitle}</p>
              </div>
              <div
                className={styles.collage}
                aria-label={`${activity.label} inspiration gallery`}
              >
                <div
                  aria-hidden="true"
                  className={styles.backdrop}
                  style={{ backgroundColor: activity.theme }}
                />
                {activity.photos.map((photo) => {
                  const isExternalPhoto = photo.id.startsWith("photo-");
                  return (
                    <figure key={photo.id} className={styles.photo}>
                      <div className={styles.imageWrap}>
                        <Image
                          src={
                            isExternalPhoto
                              ? `https://images.unsplash.com/${photo.id}?auto=format&fit=crop&w=1000&q=85`
                              : `/images/gallery/${photo.id}`
                          }
                          alt={photo.alt}
                          fill
                          unoptimized={isExternalPhoto}
                          sizes="(min-width: 1024px) 30vw, (min-width: 601px) 44vw, 85vw"
                          className={styles.image}
                        />
                      </div>
                    </figure>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
