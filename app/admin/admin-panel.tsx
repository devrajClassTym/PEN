"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import SchoolLogo from "@/components/school-logo";
import type { SchoolBlog } from "@/lib/school-blogs";
import type { SchoolEvent } from "@/lib/school-events";

const tabs = ["Events", "Blogs", "Gallery"] as const;
type Tab = (typeof tabs)[number];
type Editor =
  | { kind: "event"; mode: "add" }
  | { kind: "event"; mode: "edit"; key: string }
  | { kind: "blog"; mode: "add" }
  | { kind: "blog"; mode: "edit"; key: string };
const galleryFiles = [
  "image.png", ...Array.from({ length: 9 }, (_, i) => `image${i + 2}.${i === 4 ? "jpeg" : "png"}`),
  "image copy.png", ...Array.from({ length: 12 }, (_, i) => `image copy ${i + 2}.png`),
];
const inputClass = "mt-2 w-full rounded-xl border border-[#44321b]/20 bg-white px-4 py-3 outline-none focus:border-[#44321b] focus:ring-2 focus:ring-[#44321b]/15";
const textareaClass = `${inputClass} min-h-28 resize-y leading-6`;

function VisibilityToggle({ visible, onToggle, label }: { visible: boolean; onToggle: () => void; label: string }) {
  return (
    <button type="button" onClick={onToggle} aria-label={`${visible ? "Hide" : "Show"} ${label}`} aria-pressed={visible} className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#44321b]/65 hover:bg-[#44321b]/5 hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-2">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        {visible ? <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></> : <><path d="m3 3 18 18" /><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" /><path d="M9.9 5.2A10.9 10.9 0 0 1 12 5c5 0 8.5 3.4 10 7-.7 1.7-1.9 3.2-3.4 4.4" /><path d="M6.6 6.6C4.4 7.8 2.8 9.7 2 12c1.5 3.6 5 7 10 7 1.3 0 2.5-.3 3.6-.8" /></>}
      </svg>
    </button>
  );
}

function createUniqueKey(value: string, currentKeys: string[]) {
  const base = value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "record";
  let key = base;
  let suffix = 2;
  while (currentKeys.includes(key)) key = `${base}-${suffix++}`;
  return key;
}

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Events");
  const [error, setError] = useState("");
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [blogs, setBlogs] = useState<SchoolBlog[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [contentStatus, setContentStatus] = useState("");
  const [editor, setEditor] = useState<Editor | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!editor || !dialog) return;
    dialog.showModal();
    return () => { if (dialog.open) dialog.close(); };
  }, [editor]);

  useEffect(() => {
    if (!authenticated) return;
    let current = true;
    const load = async (kind: "events" | "blogs") => {
      const response = await fetch(`/api/${kind}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load the event and blog records.");
      return response.json();
    };
    Promise.all([
      load("events"),
      load("blogs"),
    ])
      .then(([events, blogs]) => {
        if (!current) return;
        setEvents(events);
        setBlogs(blogs);
        setError("");
      })
      .catch(() => {
        if (current) setError("Could not load the event and blog JSON files.");
      })
      .finally(() => {
        if (current) setLoadingContent(false);
      });
    return () => { current = false; };
  }, [authenticated]);

  async function saveCollection(kind: "events" | "blogs", records: SchoolEvent[] | SchoolBlog[]) {
    setSavingContent(true);
    setError("");
    setContentStatus("");
    try {
      const response = await fetch(`/api/${kind}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(records),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error ?? "Could not save the records.");
      }
      if (kind === "events") setEvents(records as SchoolEvent[]);
      else setBlogs(records as SchoolBlog[]);
      setContentStatus(`${kind === "events" ? "Events" : "Blogs"} saved.`);
      return true;
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save the records.");
      return false;
    } finally {
      setSavingContent(false);
    }
  }

  async function submitEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor || editor.kind !== "event") return;
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title")).trim();
    const id = editor.mode === "edit" ? editor.key : createUniqueKey(title, events.map((item) => item.id));
    const scheduleValues = {
      date: String(form.get("date")).trim(),
      day: String(form.get("day")).trim(),
      month: String(form.get("month")).trim(),
      time: String(form.get("time")).trim(),
    };
    const hasSchedule = Object.values(scheduleValues).some(Boolean);
    if (hasSchedule && Object.values(scheduleValues).some((value) => !value)) {
      setError("Complete every schedule field or leave the whole schedule blank.");
      return;
    }
    const record: SchoolEvent = {
      id,
      category: String(form.get("category")).trim(),
      title,
      description: String(form.get("description")).trim(),
      details: String(form.get("details")).trim(),
      ...(hasSchedule ? { schedule: scheduleValues } : {}),
    };
    const next = editor.mode === "edit"
      ? events.map((item) => item.id === editor.key ? record : item)
      : [...events, record];
    if (await saveCollection("events", next)) setEditor(null);
  }

  async function submitBlog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor || editor.kind !== "blog") return;
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title")).trim();
    const slug = editor.mode === "edit" ? editor.key : createUniqueKey(title, blogs.map((item) => item.slug));
    const record: SchoolBlog = {
      slug,
      category: String(form.get("category")).trim(),
      title,
      excerpt: String(form.get("excerpt")).trim(),
      paragraphs: String(form.get("paragraphs")).split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean),
    };
    const next = editor.mode === "edit"
      ? blogs.map((item) => item.slug === editor.key ? record : item)
      : [...blogs, record];
    if (await saveCollection("blogs", next)) setEditor(null);
  }

  async function deleteEvent(id: string) {
    if (!window.confirm("Delete this event?")) return;
    await saveCollection("events", events.filter((event) => event.id !== id));
  }

  async function deleteBlog(slug: string) {
    if (!window.confirm("Delete this blog?")) return;
    await saveCollection("blogs", blogs.filter((blog) => blog.slug !== slug));
  }

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
    if (!email || !password || !secret) {
      setError("Admin login is not configured. Please check the environment settings.");
      return;
    }
    if (String(data.get("email")).trim() !== email || data.get("password") !== password || data.get("secret") !== secret) {
      setError("The email, password, or secret key is incorrect. Please try again.");
      return;
    }
    form.reset();
    setError("");
    setLoadingContent(true);
    setAuthenticated(true);
  }

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(tabs[next]);
    document.getElementById(`admin-tab-${tabs[next]}`)?.focus();
  }

  return (
    <main className="flex-1 bg-[#f8f6f0] px-6 py-10 text-[#44321b] sm:py-14">
      <Link href="/" aria-label="P.E.N Schools home" className="mx-auto mb-8 flex w-fit rounded-full focus-visible:outline-2 focus-visible:outline-offset-4">
        <SchoolLogo />
      </Link>
      {!authenticated ? (
        <section className="mx-auto max-w-md rounded-3xl border border-[#44321b]/10 bg-white p-6 shadow-sm sm:p-9" aria-labelledby="login-heading">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase">P.E.N Schools</p>
          <h1 id="login-heading" className="mt-3 font-serif text-4xl">Admin login</h1>
          <p className="mt-3 text-sm leading-6 text-[#44321b]/70">Enter your email, password, and secret key to access the dashboard.</p>
          <form onSubmit={login} className="mt-7 space-y-5">
            <label className="block text-sm font-medium" htmlFor="admin-email">Email
              <input id="admin-email" name="email" type="email" autoComplete="username" required className={inputClass} />
            </label>
            <label className="block text-sm font-medium" htmlFor="admin-password">Password
              <span className="relative mt-2 block"><input id="admin-password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className={`${inputClass} mt-0 pr-12`} /><VisibilityToggle visible={showPassword} onToggle={() => setShowPassword((visible) => !visible)} label="password" /></span>
            </label>
            <label className="block text-sm font-medium" htmlFor="admin-secret">Secret key
              <span className="relative mt-2 block"><input id="admin-secret" name="secret" type={showSecret ? "text" : "password"} autoComplete="off" required className={`${inputClass} mt-0 pr-12`} /><VisibilityToggle visible={showSecret} onToggle={() => setShowSecret((visible) => !visible)} label="secret key" /></span>
            </label>
            {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button type="submit" className="w-full rounded-xl bg-[#44321b] px-5 py-3 font-medium text-white hover:bg-[#60492b] focus-visible:outline-2 focus-visible:outline-offset-4">Log in</button>
          </form>
        </section>
      ) : (
        <section className="mx-auto max-w-6xl" aria-labelledby="dashboard-heading">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div><p className="text-xs font-semibold tracking-[0.2em] uppercase">Administration</p><h1 id="dashboard-heading" className="mt-2 font-serif text-4xl sm:text-5xl">School dashboard</h1></div>
            <button type="button" onClick={() => { setAuthenticated(false); setActiveTab("Events"); }} className="rounded-full border border-[#44321b]/25 px-5 py-2.5 text-sm font-medium hover:bg-[#44321b]/5">Log out</button>
          </header>
          <div role="tablist" aria-label="Admin sections" className="mb-6 flex gap-2 border-b border-[#44321b]/15 pb-3">
            {tabs.map((tab, index) => (
              <button key={tab} id={`admin-tab-${tab}`} role="tab" type="button" aria-selected={activeTab === tab} aria-controls={`admin-panel-${tab}`} tabIndex={activeTab === tab ? 0 : -1} onClick={() => setActiveTab(tab)} onKeyDown={(event) => navigateTabs(event, index)} className={`rounded-full px-5 py-3 text-sm font-medium transition-colors ${activeTab === tab ? "bg-[#44321b] text-white" : "hover:bg-[#44321b]/5"}`}>{tab}</button>
            ))}
          </div>
          <div key={activeTab} id={`admin-panel-${activeTab}`} role="tabpanel" aria-labelledby={`admin-tab-${activeTab}`} tabIndex={0} className="rounded-3xl border border-[#44321b]/10 bg-white p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-3xl">{activeTab}</h2>
              {activeTab !== "Gallery" && <button type="button" onClick={() => { setError(""); setEditor(activeTab === "Events" ? { kind: "event", mode: "add" } : { kind: "blog", mode: "add" }); }} disabled={loadingContent || savingContent} className="rounded-xl bg-[#44321b] px-5 py-3 text-sm font-medium text-white hover:bg-[#60492b] disabled:opacity-50">{activeTab === "Events" ? "Add event" : "Add blog"}</button>}
            </div>
            {activeTab === "Events" && <div className="grid gap-4 sm:grid-cols-2">{events.map((event) => <article key={event.id} className="flex min-w-0 flex-col rounded-xl border border-[#44321b]/15 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#92774f]">{event.category}</p><h3 className="mt-2 text-xl font-semibold">{event.title}</h3><p className="mt-3 text-sm leading-6 text-[#44321b]/75">{event.description}</p><p className="mt-4 text-xs text-[#44321b]/65">{event.schedule ? `${event.schedule.day} ${event.schedule.month} · ${event.schedule.time}` : "Date to be confirmed"}</p><div className="mt-5 flex gap-2 border-t border-[#44321b]/10 pt-4"><button type="button" onClick={() => { setError(""); setEditor({ kind: "event", mode: "edit", key: event.id }); }} disabled={savingContent} className="rounded-lg border border-[#44321b]/20 px-4 py-2 text-sm font-medium hover:bg-[#44321b]/5 disabled:opacity-50">Edit</button><button type="button" onClick={() => void deleteEvent(event.id)} disabled={savingContent} className="rounded-lg border border-red-800/20 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-50 disabled:opacity-50">Delete</button></div></article>)}</div>}
            {activeTab === "Blogs" && <div className="grid gap-4 sm:grid-cols-2">{blogs.map((blog) => <article key={blog.slug} className="flex min-w-0 flex-col rounded-xl border border-[#44321b]/15 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#92774f]">{blog.category}</p><h3 className="mt-2 text-xl font-semibold">{blog.title}</h3><p className="mt-3 text-sm leading-6 text-[#44321b]/75">{blog.excerpt}</p><p className="mt-4 text-xs text-[#44321b]/65">{blog.paragraphs.length} paragraphs</p><div className="mt-5 flex gap-2 border-t border-[#44321b]/10 pt-4"><button type="button" onClick={() => { setError(""); setEditor({ kind: "blog", mode: "edit", key: blog.slug }); }} disabled={savingContent} className="rounded-lg border border-[#44321b]/20 px-4 py-2 text-sm font-medium hover:bg-[#44321b]/5 disabled:opacity-50">Edit</button><button type="button" onClick={() => void deleteBlog(blog.slug)} disabled={savingContent} className="rounded-lg border border-red-800/20 px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-50 disabled:opacity-50">Delete</button></div></article>)}</div>}
            {loadingContent && <p role="status" className="mt-4 text-sm">Loading JSON files…</p>}
            {contentStatus && <p role="status" className="mt-4 text-sm text-green-800">{contentStatus}</p>}
            {error && authenticated && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
            {activeTab === "Gallery" && <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{galleryFiles.map((filename, index) => <figure key={filename} className="relative aspect-square overflow-hidden rounded-2xl bg-[#e8dfce]"><Image src={`/images/gallery/${filename}`} alt={`P.E.N school life photograph ${index + 1}`} fill sizes="(min-width: 1024px) 250px, (min-width: 640px) 30vw, 45vw" className="object-cover" /></figure>)}</div>}
          </div>
        </section>
      )}
      {editor && <dialog ref={dialogRef} aria-labelledby="content-editor-title" onCancel={(event) => { event.preventDefault(); setEditor(null); }} onClick={(event) => { if (event.target === event.currentTarget) setEditor(null); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-[#44321b]/15 bg-[#f8f6f0] p-0 text-[#44321b] shadow-2xl backdrop:bg-[#201b13]/65">
        <div className="p-6 sm:p-9">
          <div className="mb-7 flex items-start justify-between gap-4 border-b border-[#44321b]/15 pb-5"><div><p className="text-xs font-semibold tracking-[0.18em] text-[#92774f] uppercase">{editor.kind === "event" ? "School calendar" : "The newsletter"}</p><h2 id="content-editor-title" className="mt-2 font-serif text-3xl">{editor.mode === "add" ? `Add ${editor.kind}` : `Edit ${editor.kind}`}</h2></div><button type="button" onClick={() => setEditor(null)} aria-label="Close editor" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#44321b]/20 text-xl hover:bg-[#eee8da]">×</button></div>
          {editor.kind === "event" && (() => {
            const record = editor.mode === "edit" ? events.find((item) => item.id === editor.key) : undefined;
            return <form key={`event-${editor.mode}-${editor.mode === "edit" ? editor.key : "new"}`} onSubmit={(event) => void submitEvent(event)} className="space-y-5">
              <p className="text-xs text-[#44321b]/60">Event ID: {record?.id ?? "Generated from the title when saved"}</p>
              <label className="block text-sm font-medium">Category<input name="category" required defaultValue={record?.category ?? ""} className={inputClass} /></label>
              <label className="block text-sm font-medium">Title<input name="title" required defaultValue={record?.title ?? ""} className={inputClass} /></label>
              <label className="block text-sm font-medium">Description<textarea name="description" required defaultValue={record?.description ?? ""} className={textareaClass} /></label>
              <label className="block text-sm font-medium">Details<textarea name="details" required defaultValue={record?.details ?? ""} className={textareaClass} /></label>
              <fieldset className="rounded-xl border border-[#44321b]/15 p-4"><legend className="px-2 text-sm font-medium">Schedule (optional)</legend><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm">Date<input name="date" type="date" defaultValue={record?.schedule?.date ?? ""} className={inputClass} /></label><label className="block text-sm">Day<input name="day" defaultValue={record?.schedule?.day ?? ""} className={inputClass} /></label><label className="block text-sm">Month and year<input name="month" defaultValue={record?.schedule?.month ?? ""} className={inputClass} /></label><label className="block text-sm">Time<input name="time" defaultValue={record?.schedule?.time ?? ""} className={inputClass} /></label></div></fieldset>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <div className="flex justify-end gap-3 border-t border-[#44321b]/15 pt-5"><button type="button" onClick={() => setEditor(null)} className="rounded-xl border border-[#44321b]/20 px-5 py-3 text-sm font-medium hover:bg-[#44321b]/5">Cancel</button><button type="submit" disabled={savingContent} className="rounded-xl bg-[#44321b] px-5 py-3 text-sm font-medium text-white hover:bg-[#60492b] disabled:opacity-50">{savingContent ? "Saving…" : "Save event"}</button></div>
            </form>;
          })()}
          {editor.kind === "blog" && (() => {
            const record = editor.mode === "edit" ? blogs.find((item) => item.slug === editor.key) : undefined;
            return <form key={`blog-${editor.mode}-${editor.mode === "edit" ? editor.key : "new"}`} onSubmit={(event) => void submitBlog(event)} className="space-y-5">
              <p className="text-xs text-[#44321b]/60">Blog slug: {record?.slug ?? "Generated from the title when saved"}</p>
              <label className="block text-sm font-medium">Category<input name="category" required defaultValue={record?.category ?? ""} className={inputClass} /></label>
              <label className="block text-sm font-medium">Title<input name="title" required defaultValue={record?.title ?? ""} className={inputClass} /></label>
              <label className="block text-sm font-medium">Excerpt<textarea name="excerpt" required defaultValue={record?.excerpt ?? ""} className={textareaClass} /></label>
              <label className="block text-sm font-medium">Story paragraphs<textarea name="paragraphs" required defaultValue={record?.paragraphs.join("\n\n") ?? ""} className={`${textareaClass} min-h-48`} /></label>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <div className="flex justify-end gap-3 border-t border-[#44321b]/15 pt-5"><button type="button" onClick={() => setEditor(null)} className="rounded-xl border border-[#44321b]/20 px-5 py-3 text-sm font-medium hover:bg-[#44321b]/5">Cancel</button><button type="submit" disabled={savingContent} className="rounded-xl bg-[#44321b] px-5 py-3 text-sm font-medium text-white hover:bg-[#60492b] disabled:opacity-50">{savingContent ? "Saving…" : "Save blog"}</button></div>
            </form>;
          })()}
        </div>
      </dialog>}
    </main>
  );
}
