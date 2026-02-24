import React, { useMemo, useState, useEffect } from "react";
import { Icon } from "@iconify/react";

/**
 * NOTE:
 * - Tailwind CSS required
 * - Install Iconify: npm i @iconify/react
 * - Add Poppins in your index.css (Google Font) or via <link> in index.html
 */

const CATEGORIES = [
  { key: "moon", label: "moon", icon: "mdi:moon-waning-crescent" },
  { key: "frontend", label: "Front-End", icon: "mdi:code-tags" },
  { key: "arthistory", label: "Art-History", icon: "mdi:brush-variant" },
  { key: "cyber", label: "Cyber Security", icon: "mdi:shield-check" },
  { key: "mobile", label: "Mobile App", icon: "mdi:cellphone" },
  { key: "programming", label: "Programming", icon: "mdi:code-braces" },
];

const MOCK_POSTS = [
  {
    id: 1,
    author: "Rothanak",
    category: "frontend",
    categoryLabel: "Front-End",
    title: "POV: You spent 3 hours on this Roblox character 😭",
    excerpt:
      "Me and my bro on the roblox, while we also have thousands of assignment, lmao too random...",
    time: "16h ago",
    likes: "41",
    comments: "21",
    cover:
      "https://images.unsplash.com/photo-1627843240167-b1f147aa36bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    author: "Sean",
    category: "arthistory",
    categoryLabel: "Art-History",
    title: "The timeless beauty of The Starry Night",
    excerpt:
      "The emotional depth and swirling energy of The Starry Night go far beyond its glowing night sky...",
    time: "2h ago",
    likes: "411k",
    comments: "21k",
    cover:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    author: "Mar",
    category: "moon",
    categoryLabel: "Astronomy",
    title: "The giant mysteries of Jupiter of the Solar System",
    excerpt:
      "The massive power and swirling storms of Jupiter make it one of the most fascinating planets in our...",
    time: "2 mins ago",
    likes: "1M",
    comments: "567k",
    cover:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    author: "Ian",
    category: "programming",
    categoryLabel: "Programming",
    title: "Why C++ remains powerful in modern software development",
    excerpt:
      "C++ is one of the most influential and high-performance programming languages in the world.",
    time: "1h ago",
    likes: "677k",
    comments: "456k",
    cover:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    author: "Lisa",
    category: "moon",
    categoryLabel: "Winter",
    title: "Small but mighty ☃️❄️",
    excerpt:
      "He's tiny, he's wobbly, and he's absolutely perfect. Little carrot nose, twig arms and all...",
    time: "44s ago",
    likes: "3",
    comments: "2",
    cover:
      "https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    author: "kimhorng",
    category: "mobile",
    categoryLabel: "movie recommend",
    title: "If you know, you know ✨",
    excerpt:
      "This little guy reminds me of that scene — calm, unbothered, just vibing while something wild is hea...",
    time: "12h ago",
    likes: "41k",
    comments: "12k",
    cover:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    author: "Rosa",
    category: "mobile",
    categoryLabel: "Minecraft",
    title: "Just a little guys chill in the Minecraft world ✨",
    excerpt:
      "Golden hour, good vibes, and some blocky adventures. Sometimes simple is best.",
    time: "12h ago",
    likes: "90",
    comments: "17",
    cover:
      "https://images.unsplash.com/photo-1535909339361-9b7f5a1f4e2a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    author: "Sothea",
    category: "moon",
    categoryLabel: "Moon",
    title: "This is the moon tonight",
    excerpt:
      "Today is the beautiful day, It's be long time since I have no idea what is going on with myself, but to...",
    time: "4h ago",
    likes: "400",
    comments: "21",
    cover:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200&auto=format&fit=crop",
  },
];

const cn = (...classes) => classes.filter(Boolean).join(" ");

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);

  const pageSize = 8;

  const filtered = useMemo(() => {
    let list = [...MOCK_POSTS];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
      );
    }

    if (sortBy === "latest") list = list.sort((a, b) => b.id - a.id);
    if (sortBy === "popular")
      list = list.sort((a, b) => ("" + b.likes).localeCompare("" + a.likes));

    return list;
  }, [search, activeCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [search, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#fbfbfb] text-slate-900 [font-family:Poppins,ui-sans-serif,system-ui]">
      {/* decorative dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-16 h-3 w-3 rounded-full bg-orange-300/70" />
        <div className="absolute left-64 top-32 h-2 w-2 rounded-full bg-slate-300/70" />
        <div className="absolute right-16 top-24 h-2.5 w-2.5 rounded-full bg-slate-300/70" />
        <div className="absolute right-40 top-40 h-3 w-3 rounded-full bg-orange-200/70" />
        <div className="absolute left-1/2 top-[260px] -translate-x-1/2 text-4xl opacity-70">
          🪐
        </div>
        <div className="absolute right-24 top-16 text-3xl opacity-80">💡</div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-10">
        {/* HERO */}
        <div className="text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Discover <span className="text-[#ff7a00]">Inspiring Stories</span>
            <br className="hidden sm:block" />{" "}
            <span className="text-[#ff7a00]">&amp; Ideas</span>
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            This space is dedicated to my daily writing — a collection of
            reflections, experiences, and quiet thoughts that might otherwise be
            forgotten. Writing every day keeps me grounded, mindful, and
            inspired.
          </p>

          {/* Search */}
          <div className="mx-auto mt-7 flex max-w-3xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white">
              <Icon icon="mdi:magnify" className="text-xl text-slate-500" />
            </span>
          </div>

          {/* category chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Chip
              active={activeCategory === "moon"}
              onClick={() => setActiveCategory("moon")}
              icon="mdi:moon-waning-crescent"
              label="moon"
            />
            {CATEGORIES.filter((c) => c.key !== "moon").map((c) => (
              <Chip
                key={c.key}
                active={activeCategory === c.key}
                onClick={() => setActiveCategory(c.key)}
                icon={c.icon}
                label={c.label}
              />
            ))}
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm shadow-sm transition",
                activeCategory === "all"
                  ? "border-[#ff7a00]/40 bg-[#ff7a00]/10 text-slate-900"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              <span className="font-medium">All</span>
            </button>
          </div>
        </div>

        {/* ALL BLOGS + SORT */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-extrabold text-[#ff7a00]">All Blogs</h2>

          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-[#ff7a00]">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2 pr-10 text-sm outline-none shadow-sm"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
              </select>
              <Icon
                icon="mdi:chevron-down"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-[#ff7a00]"
              />
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="mt-6 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {paged.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <PageBtn
            disabled={page === 1}
            onClick={() => setPage((v) => Math.max(1, v - 1))}
            icon="mdi:chevron-left"
          />

          <PageNumber active={page === 1} onClick={() => setPage(1)}>
            1
          </PageNumber>

          {totalPages >= 2 && (
            <PageNumber active={page === 2} onClick={() => setPage(2)}>
              2
            </PageNumber>
          )}

          {totalPages > 4 && <span className="px-2 text-slate-500">...</span>}

          {totalPages > 2 && (
            <PageNumber
              active={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </PageNumber>
          )}

          <PageBtn
            disabled={page === totalPages}
            onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
            icon="mdi:chevron-right"
          />
        </div>
      </div>
    </div>
  );
}

function Chip({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-xl border px-4 py-2 text-sm shadow-sm transition",
        active
          ? "border-[#ff7a00]/40 bg-[#ff7a00]/10 text-slate-900"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      )}
    >
      <span
        className={cn(
          "grid h-8 w-8 place-items-center rounded-lg border",
          active ? "border-[#ff7a00]/30 bg-white" : "border-slate-200 bg-white"
        )}
      >
        <Icon
          icon={icon}
          className={cn("text-lg", active ? "text-[#ff7a00]" : "text-slate-700")}
        />
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function BlogCard({ post }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="relative h-44 w-full">
        <img
          src={post.cover}
          alt={post.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-xs shadow">
          <span className="h-5 w-5 rounded-full bg-slate-200" />
          <span className="font-semibold">{post.author}</span>
        </div>

        <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow">
          {post.categoryLabel}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug">
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>{post.time}</span>

            <span className="flex items-center gap-1">
              <Icon icon="mdi:heart-outline" className="text-base" />
              {post.likes}
            </span>

            <span className="flex items-center gap-1">
              <Icon icon="mdi:comment-outline" className="text-base" />
              {post.comments}
            </span>
          </div>

          <button className="rounded-full bg-[#ff7a00] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:brightness-95 active:brightness-90">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
}

function PageBtn({ onClick, disabled, icon }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-xl border shadow-sm transition",
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      )}
    >
      <Icon icon={icon} className="text-xl" />
    </button>
  );
}

function PageNumber({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-xl border text-sm font-semibold shadow-sm transition",
        active
          ? "border-[#ff7a00]/30 bg-[#ff7a00] text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      )}
    >
      {children}
    </button>
  );
}