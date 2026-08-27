import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapPin, Phone, MessageCircle, Instagram, Facebook, Mail,
  Sparkles, Flame, HandHeart, Utensils, Music, Drama, Users, Camera,
  ChevronUp, Sun, Moon, Volume2, VolumeX, X, Cloud, Bell, QrCode, Heart,
} from "lucide-react";
import logoAsset from "@/assets/logo.webp.asset.json";
import processionAsset from "@/assets/procession.jpg.asset.json";
import heroImg from "@/assets/hero-ganesh.jpg";
import galleryAarti from "@/assets/gallery-aarti.jpg";
import galleryPandal from "@/assets/gallery-pandal.jpg";
import galleryDiya from "@/assets/gallery-diya.jpg";
import galleryVisarjan from "@/assets/gallery-visarjan.jpg";
import galleryBhajan from "@/assets/gallery-bhajan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bujji Ganapathi Youth · Bhimadole — Ganesh Chaturthi 2026" },
      {
        name: "description",
        content:
          "Join Bujji Ganapathi Youth, Bhimadole for a divine Ganesh Chaturthi 2026 celebration. Grand aarti, darshan, prasadam, cultural programs and community devotion.",
      },
      { property: "og:title", content: "Bujji Ganapathi Youth · Bhimadole — Ganesh Chaturthi 2026" },
      { property: "og:description", content: "Join Bujji Ganapathi Youth, Bhimadole for a divine Ganesh Chaturthi 2026 celebration. Grand aarti, darshan, prasadam, cultural programs and community devotion." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: logoAsset.url },
    ],
  }),
  component: Home,
});

const LOGO = logoAsset.url;
const HERO_PROCESSION = processionAsset.url;
const TARGET_DATE = new Date("2026-09-14T00:00:00+05:30").getTime();

const BLESSINGS = [
  "May Lord Ganesha remove every obstacle from your path.",
  "Where there is devotion, there is Ganesha — and where there is Ganesha, there is success.",
  "Start every good work with the name of Ganesha, and every ending will be auspicious.",
  "Vakratunda Mahakaya Suryakoti Samaprabha — may His radiance light your life.",
  "Ganapati Bappa Morya! Blessings today, tomorrow and always.",
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountdown(target: number) {
  const [t, setT] = useState(() => target - Date.now());
  useEffect(() => {
    const i = setInterval(() => setT(target - Date.now()), 1000);
    return () => clearInterval(i);
  }, [target]);
  const clamped = Math.max(0, t);
  const days = Math.floor(clamped / 86400000);
  const hours = Math.floor((clamped / 3600000) % 24);
  const minutes = Math.floor((clamped / 60000) % 60);
  const seconds = Math.floor((clamped / 1000) % 60);
  return { days, hours, minutes, seconds, done: t <= 0 };
}

/* ----------------------------- Background FX ----------------------------- */
function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        dur: 10 + Math.random() * 14,
        size: 10 + Math.random() * 18,
        hue: Math.random() > 0.5 ? "#FF9933" : "#D4AF37",
        key: i,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.key}
          className="animate-petal absolute block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            background: `radial-gradient(ellipse at 30% 30%, ${p.hue}, transparent 70%)`,
            borderRadius: "50% 10% 50% 10%",
            filter: "blur(0.3px)",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

function GoldenParticles({ count = 30 }: { count?: number }) {
  const parts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        bottom: -Math.random() * 40,
        delay: Math.random() * 10,
        dur: 8 + Math.random() * 10,
        size: 2 + Math.random() * 4,
        key: i,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {parts.map((p) => (
        <span
          key={p.key}
          className="animate-float-up absolute rounded-full bg-[color:var(--gold)]"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 4}px var(--gold)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function Diya({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <div className="animate-flame absolute left-1/2 top-0 h-6 w-3 -translate-x-1/2 -translate-y-full rounded-full bg-gradient-to-t from-[#FF9933] via-[#FFD27A] to-transparent" style={{ filter: "blur(0.4px)", boxShadow: "0 0 20px #FF9933" }} />
      <div className="h-3 w-8 rounded-b-full bg-gradient-to-b from-[#D4AF37] to-[#6B0F1A]" />
    </div>
  );
}

/* --------------------------------- Nav ---------------------------------- */
function Nav({ theme, setTheme, muted, setMuted }: {
  theme: "dark" | "light"; setTheme: (t: "dark" | "light") => void;
  muted: boolean; setMuted: (m: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Welcome", "welcome"], ["About", "about"], ["Highlights", "highlights"],
    ["Timeline", "timeline"], ["Gallery", "gallery"], ["Visit", "visit"], ["Contact", "contact"],
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 ${scrolled ? "glass rounded-full mx-3 sm:mx-6" : ""} transition-all`}>
        <a href="#top" className="flex items-center gap-3 min-w-0">
          <img src={LOGO} alt="Bujji Ganapathi Youth logo" width={44} height={44} className="h-11 w-11 shrink-0 rounded-full ring-1 ring-[color:var(--gold)]/60 shadow-[0_0_20px_rgba(212,175,55,0.35)]" />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-semibold tracking-wide gold-text">BUJJI GANAPATHI YOUTH</div>
            <div className="truncate text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Bhimadole</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-6">
          {links.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="text-sm text-foreground/80 hover:text-[color:var(--gold)] transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setMuted(!muted)} aria-label="Toggle music" className="glass grid h-10 w-10 place-items-center rounded-full text-[color:var(--gold)] hover:animate-glow">
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" className="glass grid h-10 w-10 place-items-center rounded-full text-[color:var(--gold)] hover:animate-glow">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="glass grid h-10 w-10 place-items-center rounded-full text-[color:var(--gold)] lg:hidden">
            <span className="text-lg">≡</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="glass mx-3 mt-2 rounded-2xl p-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {links.map(([label, id]) => (
              <a key={id} onClick={() => setOpen(false)} href={`#${id}`} className="rounded-lg px-3 py-2 text-sm hover:bg-[color:var(--gold)]/10">
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------- Ticker -------------------------------- */
function Ticker() {
  const items = [
    "🪔 Maha Aarti daily at 7:30 PM",
    "🙏 Free Prasadam served after every aarti",
    "🎶 Bhajan night — Saturday 8:00 PM",
    "🎭 Cultural programs every evening",
    "📸 Share your darshan #BujjiGanapathiYouth",
    "🚗 Free parking available near the pandal",
  ];
  return (
    <div className="relative overflow-hidden border-y border-[color:var(--gold)]/25 bg-[color:var(--card)]/50 py-2 backdrop-blur">
      <div className="animate-marquee flex whitespace-nowrap gap-12 text-sm text-[color:var(--gold-soft)]">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-[color:var(--saffron)]" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Hero ---------------------------------- */
function Hero() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.25);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const c = useCountdown(TARGET_DATE);
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ transform: `translateY(${offset}px) scale(1.08)` }}>
        <img src={heroImg} alt="Lord Ganesha idol" className="h-full w-full object-cover" width={1536} height={1920} />
      </div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="ray-bg absolute inset-0" />
      <GoldenParticles count={40} />

      {/* Floating diyas */}
      <div className="pointer-events-none absolute bottom-24 left-6 hidden sm:block"><Diya /></div>
      <div className="pointer-events-none absolute bottom-32 right-8 hidden sm:block"><Diya /></div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
        <img src={LOGO} alt="Logo" width={128} height={128} className="h-24 w-24 sm:h-32 sm:w-32 animate-glow rounded-full ring-2 ring-[color:var(--gold)]/70" />
        <div className="mt-6 text-xs tracking-[0.4em] uppercase text-[color:var(--gold-soft)]">🪔 Est. Devotion · Bhimadole</div>
        <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold leading-tight">
          <span className="gold-text">BUJJI GANAPATHI</span>
          <br />
          <span className="text-ivory">YOUTH</span>
        </h1>
        <div className="mt-3 text-sm tracking-[0.5em] text-[color:var(--gold)]">BHIMADOLE</div>
        <p className="mt-6 max-w-xl font-serif text-lg sm:text-2xl italic text-[color:var(--ivory)]/90">
          "Come with Faith. Leave with Blessings."
        </p>

        <div className="mt-8 w-full max-w-3xl">
          <div className="mb-3 text-xs uppercase tracking-[0.35em] text-[color:var(--gold-soft)]">
            Ganesh Chaturthi 2026 · 14 September
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              ["Days", c.days], ["Hours", c.hours], ["Minutes", c.minutes], ["Seconds", c.seconds],
            ].map(([l, v]) => (
              <div key={l as string} className="glass rounded-2xl p-3 sm:p-5">
                <div className="gold-text font-serif text-3xl sm:text-5xl font-bold tabular-nums">
                  {String(v).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <a href="#visit" className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium">
            🪔 Visit Our Temple
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Bhimadole"
            target="_blank" rel="noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium"
          >
            <MapPin className="h-4 w-4" /> Get Directions
          </a>
        </div>

        {c.done && <Celebration />}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

function Celebration() {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <Petals count={80} />
      <GoldenParticles count={120} />
      <div className="glass mx-4 rounded-3xl px-8 py-10 text-center">
        <img src={LOGO} alt="" className="mx-auto h-24 w-24 animate-glow rounded-full" />
        <h2 className="mt-4 font-serif text-4xl sm:text-6xl gold-text">🙏 Happy Ganesh Chaturthi</h2>
        <p className="mt-3 text-muted-foreground">Ganapati Bappa Morya!</p>
      </div>
    </div>
  );
}

/* ------------------------------- Sections ------------------------------- */
function Section({
  id, eyebrow, title, subtitle, children,
}: { id?: string; eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="reveal mx-auto max-w-3xl text-center">
        {eyebrow && (
          <div className="mb-3 text-xs uppercase tracking-[0.4em] text-[color:var(--saffron)]">{eyebrow}</div>
        )}
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold gold-text">{title}</h2>
        {subtitle && <p className="mt-5 text-base sm:text-lg text-muted-foreground">{subtitle}</p>}
        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
      </div>
      <div className="reveal mt-14">{children}</div>
    </section>
  );
}

function Welcome() {
  const cards = [
    { icon: Sparkles, title: "Importance", body: "Ganesh Chaturthi celebrates the birth of Lord Ganesha — remover of obstacles and lord of new beginnings." },
    { icon: HandHeart, title: "Significance", body: "Ganesha embodies wisdom, prosperity and good fortune. His blessings mark the auspicious start of every noble endeavour." },
    { icon: Flame, title: "Devotion", body: "Ten days of prayers, aartis and bhajans invite divine grace into every home and heart." },
    { icon: Users, title: "Community", body: "A festival that unites families, friends and neighbours in service, celebration and shared joy." },
  ];
  return (
    <Section
      id="welcome"
      eyebrow="Namaste"
      title="Welcome to Bujji Ganapathi Youth"
      subtitle="Every year, our committee comes together with devotion, unity and service to celebrate the grand festival of Lord Ganesha. We warmly invite every devotee and family to experience divine blessings, vibrant celebrations, devotional music, cultural programs and the joy of our community."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, title, body }, i) => (
          <div key={i} className="glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-[var(--glow-gold)]">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--gold)]/10 text-[color:var(--gold)] group-hover:animate-glow">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-xl text-[color:var(--gold-soft)]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function WhyVisit() {
  const items = [
    ["✨", "Beautiful Decorations", "Handcrafted floral arches, gold accents and cinematic lighting."],
    ["🪔", "Grand Maha Aarti", "A soul-stirring aarti with dozens of lamps every evening."],
    ["🙏", "Divine Darshan", "Peaceful darshan of Lord Ganesha in a serene, sacred setting."],
    ["🍛", "Free Prasadam", "Blessed prasadam served with love to every visitor."],
    ["🎶", "Devotional Music", "Live bhajans and classical devotional performances."],
    ["🎭", "Cultural Programs", "Dance, music and traditional performances every night."],
    ["👨‍👩‍👧‍👦", "Family Friendly", "A safe, joyous celebration for children and elders alike."],
    ["📸", "Festival Photography", "Beautiful photo moments across our decorated pandal."],
  ];
  return (
    <Section id="about" eyebrow="Why Visit Us" title="A Celebration Unlike Any Other" subtitle="Eight reasons devotees return to Bhimadole year after year.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([emoji, title, body], i) => (
          <div key={i} className="glass group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[color:var(--gold)]/10 blur-2xl transition group-hover:bg-[color:var(--gold)]/25" />
            <div className="text-4xl">{emoji}</div>
            <h3 className="mt-4 font-serif text-lg text-[color:var(--gold-soft)]">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Highlights() {
  const items = [
    ["Ganesh Idol Arrival", "The sacred procession welcomes Bappa to Bhimadole with music, flowers and devotion."],
    ["Daily Pooja", "Morning and evening pooja rituals performed by our temple priests."],
    ["Maha Aarti", "Grand aarti with a hundred diyas — the emotional heart of the festival."],
    ["Bhajans", "Devotional singing that fills the pandal with divine energy."],
    ["Annadanam", "Free community meals served with love throughout the ten days."],
    ["Cultural Events", "Classical dance, music and drama performed by local artists."],
    ["Children's Activities", "Fun, learning and cultural games designed for young devotees."],
    ["Grand Visarjan", "A vibrant, colourful farewell procession — Ganapati Bappa Morya!"],
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6" id="highlights-wrapper">
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0">
          <img src={HERO_PROCESSION} alt="Festival procession" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-[color:var(--maroon)]/60" />
        </div>
        <div className="relative p-6 sm:p-12">
          <div className="reveal text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--saffron)]">Festival Highlights</div>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl gold-text">Ten Divine Days</h2>
          </div>
          <div className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map(([title, body], i) => (
              <div key={i} className="group rounded-2xl border border-[color:var(--gold)]/25 bg-black/40 p-5 backdrop-blur-md transition hover:border-[color:var(--gold)]/70 hover:bg-black/60">
                <div className="font-serif text-lg text-[color:var(--gold-soft)]">{title}</div>
                <div className="mt-2 text-sm text-[color:var(--ivory)]/75">{body}</div>
                <div className="mt-4 h-px w-10 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const events = [
    { d: "Sep 14, 2026", t: "6:00 AM", title: "Ganesh Sthapana", body: "Sacred installation and pratishta of Lord Ganesha." },
    { d: "Sep 14–23", t: "7:00 AM & 7:30 PM", title: "Daily Pooja & Maha Aarti", body: "Morning abhishekam and grand evening aarti with hundred diyas." },
    { d: "Sep 16", t: "8:00 PM", title: "Bhajan Sandhya", body: "Devotional music evening with live vocalists." },
    { d: "Sep 18", t: "7:00 PM", title: "Cultural Night", body: "Classical dance and drama performances by local artists." },
    { d: "Sep 20", t: "12:00 PM", title: "Annadanam", body: "Grand community feast — all devotees warmly welcomed." },
    { d: "Sep 22", t: "6:00 PM", title: "Children's Program", body: "Games, storytelling and cultural activities for kids." },
    { d: "Sep 23, 2026", t: "4:00 PM", title: "Grand Visarjan", body: "Vibrant farewell procession — Ganapati Bappa Morya!" },
  ];
  return (
    <Section id="timeline" eyebrow="Event Timeline" title="Ten Days of Divine Celebration" subtitle="A schedule of sacred moments to plan your visit around.">
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-4 sm:left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[color:var(--gold)]/60 to-transparent" />
        {events.map((e, i) => (
          <div key={i} className={`relative mb-8 flex items-start gap-4 sm:gap-8 ${i % 2 ? "sm:flex-row-reverse" : ""}`}>
            <div className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[color:var(--gold)] text-[color:var(--background)] shadow-[0_0_20px_var(--gold)] sm:mx-auto">
              <Flame className="h-4 w-4" />
            </div>
            <div className={`glass flex-1 rounded-2xl p-5 ${i % 2 ? "sm:mr-8" : "sm:ml-8"}`}>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--saffron)]">
                <span>{e.d}</span><span>·</span><span>{e.t}</span>
              </div>
              <h3 className="mt-2 font-serif text-xl text-[color:var(--gold-soft)]">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  const imgs = [
    { src: bujji2.url, alt: "Bujji Ganapathi idol garlanded with roses and marigold", h: "row-span-2" },
    { src: bujji1.url, alt: "Ganapathi procession chariot under festive streamers", h: "" },
    { src: bujji3.url, alt: "Evening mandap with lamps and naivedyam offerings", h: "row-span-2" },
    { src: bujji4.url, alt: "Blessing hand of the Ganapathi idol", h: "" },
    { src: HERO_PROCESSION, alt: "Bujji Ganapathi procession tractor", h: "" },
    { src: bujji5.url, alt: "Decorated chariot with flower canopy during procession", h: "row-span-2" },
    { src: bujji6.url, alt: "Illuminated pandal stage during the celebrations", h: "" },
  ];

  const [active, setActive] = useState<number | null>(null);
  return (
    <Section id="gallery" eyebrow="Gallery" title="Moments of Devotion" subtitle="Cinematic memories from our celebrations — click to enlarge.">
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 lg:grid-cols-4">
        {imgs.map((im, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`group relative overflow-hidden rounded-2xl gold-border ${im.h}`}
          >
            <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 transition group-hover:opacity-100" />
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ boxShadow: "inset 0 0 60px rgba(212,175,55,0.35)" }} />
            <div className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-xs text-[color:var(--ivory)] opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              {im.alt}
            </div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md" onClick={() => setActive(null)}>
          <button className="absolute right-4 top-4 glass grid h-12 w-12 place-items-center rounded-full text-[color:var(--gold)]" aria-label="Close">
            <X />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + imgs.length) % imgs.length); }}
            className="absolute left-3 glass grid h-12 w-12 place-items-center rounded-full text-[color:var(--gold)]"
          >‹</button>
          <img src={imgs[active].src} alt={imgs[active].alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-[var(--shadow-elegant)]" />
          <button
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % imgs.length); }}
            className="absolute right-3 glass grid h-12 w-12 place-items-center rounded-full text-[color:var(--gold)]"
          >›</button>
        </div>
      )}
    </Section>
  );
}

function VideoBlock() {
  return (
    <Section eyebrow="Festival Film" title="Feel the Devotion" subtitle="A glimpse into our celebrations.">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl gold-border shadow-[var(--shadow-elegant)]">
        <div className="relative aspect-video bg-black">
          <img src={HERO_PROCESSION} alt="Festival film" className="h-full w-full object-cover opacity-70" loading="lazy" />
          <div className="absolute inset-0 grid place-items-center bg-black/40">
            <div className="text-center">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[color:var(--gold)] text-[color:var(--background)] shadow-[0_0_40px_var(--gold)]">
                <div className="ml-1 h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-current" />
              </div>
              <div className="mt-4 text-sm uppercase tracking-[0.4em] text-[color:var(--gold-soft)]">
                Video coming soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Visit() {
  return (
    <Section id="visit" eyebrow="Plan Your Visit" title="Temple Location" subtitle="Bhimadole, West Godavari district, Andhra Pradesh.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass overflow-hidden rounded-3xl">
          <iframe
            title="Temple location"
            src="https://www.google.com/maps?q=Bhimadole,%20Andhra%20Pradesh&output=embed"
            className="h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="space-y-4">
          {[
            ["📍 Address", "Bujji Ganapathi Pandal, Main Bazaar Road, Bhimadole, West Godavari, Andhra Pradesh 534425"],
            ["🚗 Landmark", "Opposite Bhimadole Bus Stand, near the central junction"],
            ["🅿️ Parking", "Free two-wheeler and car parking available adjacent to the pandal"],
            ["🕰️ Timings", "Darshan 6:00 AM – 10:30 PM · Maha Aarti at 7:30 PM daily"],
          ].map(([t, b]) => (
            <div key={t} className="glass rounded-2xl p-5">
              <div className="text-sm uppercase tracking-widest text-[color:var(--saffron)]">{t}</div>
              <div className="mt-1 text-[color:var(--ivory)]">{b}</div>
            </div>
          ))}
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Bhimadole"
            target="_blank" rel="noreferrer"
            className="btn-gold inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold"
          >
            <MapPin className="h-5 w-5" /> Navigate to Temple
          </a>
        </div>
      </div>
    </Section>
  );
}

function Announcements() {
  const items = [
    { tag: "Today's Pooja", body: "Sahasranama Archana · 7:00 AM", icon: Flame },
    { tag: "Today's Prasadam", body: "Modakam & Panakam served after aarti", icon: Utensils },
    { tag: "Important Update", body: "Extended darshan hours this weekend till 11:00 PM", icon: Bell },
    { tag: "Festival News", body: "Grand cultural night on Sep 18 — free entry for all", icon: Music },
  ];
  return (
    <Section eyebrow="Daily Announcements" title="Today at the Pandal" subtitle="Latest updates from the committee.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ tag, body, icon: Icon }, i) => (
          <div key={i} className="glass rounded-2xl p-5 transition hover:-translate-y-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[color:var(--saffron)]">
              <Icon className="h-4 w-4" /> {tag}
            </div>
            <div className="mt-3 text-[color:var(--ivory)]">{body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Weather() {
  return (
    <div className="glass mx-auto mt-8 flex max-w-md items-center justify-between gap-4 rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
          <Cloud className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Bhimadole Weather</div>
          <div className="text-sm text-[color:var(--ivory)]">Pleasant · 29°C · Perfect festival evening</div>
        </div>
      </div>
      <div className="gold-text text-3xl font-serif">29°</div>
    </div>
  );
}

function Blessing() {
  const [q] = useState(() => BLESSINGS[Math.floor(Math.random() * BLESSINGS.length)]);
  return (
    <div className="glass relative mx-auto max-w-2xl overflow-hidden rounded-3xl p-8 text-center">
      <div className="pointer-events-none absolute -inset-1 opacity-30" style={{ background: "radial-gradient(circle at 50% 0%, var(--gold) 0%, transparent 60%)" }} />
      <div className="relative">
        <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--saffron)]">Today's Ganesh Blessing</div>
        <p className="mt-5 font-serif text-xl sm:text-2xl italic text-[color:var(--ivory)]">"{q}"</p>
        <div className="mt-4 text-xs text-muted-foreground">🙏 Refresh for a new blessing</div>
      </div>
    </div>
  );
}

function Donation() {
  return (
    <Section eyebrow="Seva & Donation" title="Support the Celebration" subtitle="Your generous contribution helps us organize this divine celebration.">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl gold-border p-1" style={{ background: "var(--gradient-royal)" }}>
          <div className="rounded-[calc(1.5rem-4px)] bg-[color:var(--card)]/80 p-8 sm:p-10 backdrop-blur">
            <div className="grid gap-8 sm:grid-cols-2 items-center">
              <div className="text-center">
                <div className="mx-auto grid h-48 w-48 place-items-center rounded-2xl bg-[color:var(--ivory)] text-[color:var(--maroon)]">
                  <QrCode className="h-32 w-32" />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Scan UPI QR to donate</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--saffron)]">Contribute with love</div>
                <h3 className="mt-2 font-serif text-3xl gold-text">Bujji Ganapathi Seva</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Every rupee supports decorations, prasadam, cultural programs and community services.
                </p>
                <div className="mt-5 glass rounded-xl p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">UPI ID</div>
                  <div className="mt-1 font-mono text-[color:var(--gold-soft)]">bujjiganapathi@upi</div>
                </div>
                <a href="#" className="btn-gold mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold">
                  <Heart className="h-5 w-5" /> Donate Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Team() {
  const roles = ["President", "Vice President", "Secretary", "Treasurer", "Cultural Head", "Coordinator", "Coordinator", "Coordinator"];
  return (
    <Section eyebrow="Meet Our Team" title="The Devoted Volunteers" subtitle="Our dedicated volunteers work together with devotion and unity to make this celebration memorable.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {roles.map((r, i) => (
          <div key={i} className="glass group rounded-2xl p-6 text-center transition hover:-translate-y-1">
            <div className="relative mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full ring-2 ring-[color:var(--gold)]/40" style={{ background: "var(--gradient-royal)" }}>
              <img src={LOGO} alt="" className="h-16 w-16 opacity-90" />
              <div className="absolute inset-0 rounded-full opacity-0 transition group-hover:opacity-100 group-hover:animate-glow" />
            </div>
            <div className="mt-4 h-4 w-24 mx-auto rounded bg-[color:var(--gold)]/15" />
            <div className="mt-2 text-xs uppercase tracking-widest text-[color:var(--saffron)]">{r}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ShareMemories() {
  return (
    <Section eyebrow="Share Your Memories" title="#BujjiGanapathiYouth" subtitle="Tag us on Instagram and Facebook to be featured on our official page.">
      <div className="mx-auto flex max-w-2xl flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#" className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-6 py-3"><Instagram className="h-5 w-5" /> @bujjiganapathi</a>
        <a href="#" className="btn-outline-gold inline-flex items-center gap-2 rounded-full px-6 py-3"><Facebook className="h-5 w-5" /> Bujji Ganapathi Youth</a>
        <a href="#" className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3"><Camera className="h-5 w-5" /> Upload Photo</a>
      </div>
    </Section>
  );
}

function Contact() {
  const items = [
    { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
    { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
    { icon: Instagram, label: "Instagram", value: "@bujjiganapathi", href: "#" },
    { icon: Facebook, label: "Facebook", value: "Bujji Ganapathi Youth", href: "#" },
    { icon: Mail, label: "Email", value: "info@bujjiganapathi.org", href: "mailto:info@bujjiganapathi.org" },
  ];
  return (
    <Section id="contact" eyebrow="Get in Touch" title="Contact the Committee" subtitle="We are here to help and welcome every devotee.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, label, value, href }) => (
          <a key={label} href={href} className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-[var(--glow-gold)]">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--gold)]/10 text-[color:var(--gold)] group-hover:animate-glow">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
              <div className="truncate text-[color:var(--ivory)]">{value}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold">
          <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-16 border-t border-[color:var(--gold)]/20 bg-[color:var(--card)]/40 py-14 backdrop-blur">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="" className="h-14 w-14 rounded-full ring-1 ring-[color:var(--gold)]/60" />
            <div>
              <div className="font-serif text-lg gold-text">Bujji Ganapathi Youth</div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Bhimadole</div>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A community of devoted youth celebrating Lord Ganesha with faith, unity and service.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--saffron)]">Quick Links</div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {[["Welcome","welcome"],["About","about"],["Highlights","highlights-wrapper"],["Timeline","timeline"],["Gallery","gallery"],["Visit","visit"],["Contact","contact"]].map(([l,i])=>(
              <li key={i}><a href={`#${i}`} className="text-foreground/75 hover:text-[color:var(--gold)]">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--saffron)]">Follow</div>
          <div className="mt-4 flex gap-3">
            <a href="#" className="glass grid h-11 w-11 place-items-center rounded-full text-[color:var(--gold)]"><Instagram className="h-5 w-5"/></a>
            <a href="#" className="glass grid h-11 w-11 place-items-center rounded-full text-[color:var(--gold)]"><Facebook className="h-5 w-5"/></a>
            <a href="https://wa.me/919876543210" className="glass grid h-11 w-11 place-items-center rounded-full text-[color:var(--gold)]"><MessageCircle className="h-5 w-5"/></a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[color:var(--gold)]/15 px-4 pt-6 text-center text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} Bujji Ganapathi Youth · Bhimadole. Made with <span className="text-[color:var(--saffron)]">❤</span> by Bujji Ganapathi Youth.
      </div>
    </footer>
  );
}

/* ------------------------------- Floating ------------------------------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="btn-gold fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full shadow-[var(--glow-gold)]"
      aria-label="Back to top"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank" rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_rgba(37,211,102,0.5)] animate-glow"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function Loader({ done }: { done: boolean }) {
  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-[color:var(--background)] transition-opacity duration-700 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}>
      <div className="text-center">
        <img src={LOGO} alt="" className="mx-auto h-24 w-24 animate-glow rounded-full" />
        <div className="mt-6 gold-text font-serif text-xl tracking-widest">BUJJI GANAPATHI YOUTH</div>
        <div className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">Loading blessings…</div>
      </div>
    </div>
  );
}

/* --------------------------------- Home --------------------------------- */
function Home() {
  useReveal();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Loader done={loaded} />
      <Petals />
      <Nav theme={theme} setTheme={setTheme} muted={muted} setMuted={setMuted} />
      <main>
        <Hero />
        <Ticker />
        <Welcome />
        <WhyVisit />
        <Highlights />
        <Timeline />
        <Gallery />
        <VideoBlock />
        <Weather />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16">
          <Blessing />
        </div>
        <Visit />
        <Announcements />
        <Donation />
        <Team />
        <ShareMemories />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppFloat />
    </div>
  );
}
