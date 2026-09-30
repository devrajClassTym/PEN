"use client";

import Image from "next/image";
import styles from "./fullscreen-menu.module.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Update these destinations as the site's pages are added.
const navigation = [
  { label: "About Us", href: "/about-us" },
  { label: "Academics", href: "/academics" },
  { label: "Beyond Academics", href: "/beyond-academics" },
  { label: "Admission", href: "/admission" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
];

const secondaryNavigation = [
  { label: "School Calendar", href: "/school-calendar" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Alumni", href: "/alumni" },
  { label: "Careers", href: "/careers" },
];

export default function FullscreenMenu({ enquiryHref }: { enquiryHref?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const closingRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => () => animationRef.current?.cancel(), []);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    closingRef.current = false;
    dialog.showModal();
    setIsOpen(true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animationRef.current = dialog.animate(
      [
        { transform: "translateX(100%)" },
        { transform: "translateX(0)" },
      ],
      { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }

  function closeMenu() {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || closingRef.current) return;
    closingRef.current = true;
    const currentTransform = getComputedStyle(dialog).transform;
    animationRef.current?.cancel();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }
    const animation = dialog.animate(
      [
        { transform: currentTransform },
        { transform: "translateX(100%)" },
      ],
      { duration: 450, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" },
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      dialog.close();
      animation.cancel();
      animationRef.current = null;
    };
  }

  const EnquiryControl = enquiryHref ? "a" : "button";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="site-navigation"
        aria-haspopup="dialog"
        className="fixed top-7 right-5 z-50 flex h-12 w-12 flex-col items-center justify-center gap-[7px] rounded-full border border-white/40 bg-[#44321b]/90 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49a70] sm:top-9 sm:right-10"
      >
        <span aria-hidden="true" className="h-px w-5 bg-current" />
        <span aria-hidden="true" className="h-px w-5 bg-current" />
      </button>

      {/* Native modal dialog contains keyboard focus and makes the page inert. */}
      <dialog
        ref={dialogRef}
        id="site-navigation"
        aria-labelledby="navigation-title"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => {
          closingRef.current = false;
          setIsOpen(false);
          triggerRef.current?.focus();
        }}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-hidden overscroll-none border-0 bg-[#44321b] p-0 text-white backdrop:bg-transparent"
      >
        <div className={styles.layout}>
          <div className="flex items-center justify-between gap-6">
            <p id="navigation-title" className="text-[10px] tracking-[0.26em] text-white/65 uppercase sm:text-xs">
              P.E.N Schools <span aria-hidden="true" className="mx-2">/</span> Explore
            </p>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation menu"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.links}>
              <nav aria-label="Main navigation">
                <ul className={styles.primary}>
                  {navigation.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        prefetch={false}
                        onClick={closeMenu}
                        className={`${styles.primaryLink} group transition-colors hover:text-[#d9c6a5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}
                      >
                        {label}
                        <span aria-hidden="true" className="text-lg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className={styles.secondary}>
                  {secondaryNavigation.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        prefetch={false}
                        onClick={closeMenu}
                        className="flex min-h-8 w-fit items-center py-1 text-[11px] font-medium tracking-[0.2em] text-white/70 uppercase transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className={styles.enquiry}>
                <EnquiryControl
                  href={enquiryHref}
                  type={enquiryHref ? undefined : "button"}
                  onClick={enquiryHref ? closeMenu : undefined}
                  className={styles.enquiryButton}
                >
                  Enquire now <span aria-hidden="true">↗</span>
                </EnquiryControl>
              </div>
            </div>

            <div className={styles.brand}>
              <Image
                src="/schoolLogo.png"
                alt="Pereira English Noble School — established 1983"
                width={800}
                height={800}
                sizes="(min-width: 1024px) 55vw, 256px"
                className={styles.logo}
              />
              <p className={styles.tagline}>
                Beyond a School — A Way of Life
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
