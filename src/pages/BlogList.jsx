import { useState } from "react";
import {
  Search,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ListBlog from "../components/BlogPage/ListBlog";
import { useGetAllProductQuery } from "../app/features/services/productApi";

export default function BlogList() {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt,desc");
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 12;

  const { data } = useGetAllProductQuery({ pageNumber: page, pageSize, sortBy });
  const totalPages = data?.data?.totalPages || 0;

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setPage(0); // Reset to first page when sorting changes
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const getPageNumbers = () => {
    const pages = [];
    const total = totalPages;

    if (total <= 7) {
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (page < 4) {
        for (let i = 0; i < 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total - 1);
      } else if (page > total - 5) {
        pages.push(0);
        pages.push("...");
        for (let i = total - 5; i < total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total - 1);
      }
    }
    return pages;
  };

  return (
    <section className="bg-bg-main text-text-main">
      <div className="relative overflow-hidden border-b border-border-main/80 bg-[#f4802405] px-4 py-12 sm:py-16">
        <span className="absolute left-[13%] top-8 h-4 w-4 rounded-full bg-[#f7b078]" />
        <span className="absolute left-[17%] top-2 h-4 w-4 rounded-full bg-[#c3c7c9]" />
        <span className="absolute left-[16%] top-[70%] h-3 w-3 rounded-full bg-[#f7b078]" />
        <span className="absolute right-[16%] top-[70%] h-3 w-3 rounded-full bg-[#a5aaae]" />

        <img
          src="../src/assets/blogpage/Idea lamp.png"
          alt="Idea lamp"
          className="absolute right-[14%] top-8 hidden w-24 opacity-80 md:block"
        />
        <img
          src="https://www.figma.com/api/mcp/asset/e57b8f23-51fd-4fe9-9a66-cad6b3a43d44"
          alt="Planet"
          className="absolute bottom-8 left-1/2 hidden w-20 -translate-x-1/2 opacity-80 md:block"
        />

        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            <span className="text-text-main">Discover </span>
            <span className="text-primary-orange">
              Inspiring Stories & Ideas
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-6 text-[#5e6569] md:text-base">
            This space is dedicated to my daily writing — a collection of
            reflections, experiences, and quiet thoughts that might otherwise be
            forgotten. Writing every day keeps me grounded, mindful, and
            inspired.
          </p>

          <div className="mx-auto mt-7 flex h-12 w-full max-w-3xl items-center rounded-2xl border border-[#a5aaae] bg-bg-main px-4">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-[#797f84]"
            />
            <Search size={20} className="text-[#5e6569]" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[
            "moon",
            "Front-End",
            "Art-History",
            "Front-End",
            "Front-End",
            "Cyber Security",
            "Cyber Security",
            "Mobile App",
          ].map((chip, index) => (
            <button
              key={`${chip}-${index}`}
              onClick={() => {
                setSearchQuery(chip === searchQuery ? "" : chip);
                setPage(0);
              }}
              className={`shrink-0 rounded-md border border-border-main px-5 py-2 text-xs transition-colors hover:bg-orange-50 ${
                searchQuery.toLowerCase() === chip.toLowerCase()
                  ? "bg-primary-orange text-white"
                  : "bg-bg-main text-primary-orange"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-3xl font-bold text-primary-orange">All Blogs</h2>
          <div className="flex items-center gap-3">
            <span className="text-lg font-medium text-primary-orange">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="rounded-lg border border-[#a5aaae] bg-bg-main px-3 py-2 text-sm text-[#5e6569] outline-none"
            >
              <option value="createdAt,desc">Latest</option>
              <option value="view,desc">Popular</option>
              <option value="createdAt,asc">Oldest</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {/* Card blog */}
          <ListBlog page={page} pageSize={pageSize} sortBy={sortBy} searchQuery={searchQuery} />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          {getPageNumbers().map((pageNum, idx) => (
            pageNum === "..." ? (
              <span key={idx} className="px-2 text-[#a5aaae]">...</span>
            ) : (
              <button
                key={idx}
                onClick={() => setPage(pageNum)}
                className={`rounded-md px-3 py-1 ${
                  page === pageNum
                    ? "bg-primary-orange text-white"
                    : "border border-border-main text-[#5e6569] hover:bg-gray-100"
                }`}
              >
                {pageNum + 1}
              </button>
            )
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
            className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
