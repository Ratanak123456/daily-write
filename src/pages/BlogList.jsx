import {
  Search,
  Eye,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function BlogList() {
  return (
    <section className="bg-bg-main text-text-main">
      <div className="relative overflow-hidden border-b border-border-main/80 bg-[#f4802405] px-4 py-12 sm:py-16">
        <span className="absolute left-[13%] top-8 h-4 w-4 rounded-full bg-[#f7b078]" />
        <span className="absolute left-[17%] top-2 h-4 w-4 rounded-full bg-[#c3c7c9]" />
        <span className="absolute left-[16%] top-[70%] h-3 w-3 rounded-full bg-[#f7b078]" />
        <span className="absolute right-[16%] top-[70%] h-3 w-3 rounded-full bg-[#a5aaae]" />

        <img
          src="https://www.figma.com/api/mcp/asset/a71766b1-ca85-4600-8bb0-1e13f4912663"
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
              className="shrink-0 rounded-md border border-border-main bg-bg-main px-5 py-2 text-xs text-primary-orange hover:bg-orange-50"
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
            <select className="rounded-lg border border-[#a5aaae] bg-bg-main px-3 py-2 text-sm text-[#5e6569] outline-none">
              <option>Latest</option>
              <option>Popular</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[
            {
              id: 1,
              author: "roblox",
              tag: "UI/UX",
              title: "POV: You spent 3 hours on this Roblox character",
              summary:
                "Me and my bro on Roblox while we still had a thousand assignments. Too random.",
              time: "16h ago",
              views: "42",
              comments: "21",
              image:
                "https://www.figma.com/api/mcp/asset/717dd577-8058-480c-b866-aafc05c571b8",
            },
            {
              id: 2,
              author: "sopi",
              tag: "Art-History",
              title: "The timeless beauty of The Starry Night",
              summary:
                "An emotional depth and swirling energy from Van Gogh that still inspires.",
              time: "1 day ago",
              views: "47",
              comments: "2",
              image:
                "https://www.figma.com/api/mcp/asset/49d1cce2-3ef5-43a2-9113-0093fb24275a",
            },
            {
              id: 3,
              author: "Ali",
              tag: "Science",
              title: "The giant mysteries of Jupiter of the Solar System",
              summary:
                "A massive gas giant with storms and secrets that keep astronomers curious.",
              time: "1 day ago",
              views: "56",
              comments: "8",
              image:
                "https://www.figma.com/api/mcp/asset/fe590e21-9312-4243-9ac9-fdbb8b480919",
            },
            {
              id: 4,
              author: "Tia",
              tag: "Programming",
              title: "Why C++ remains powerful in modern software development",
              summary:
                "From game engines to systems-level tools, C++ still delivers top performance.",
              time: "1 day ago",
              views: "570",
              comments: "46",
              image:
                "https://www.figma.com/api/mcp/asset/aa14e20a-2661-4d1e-bc4c-4ba0f113fb36",
            },
            {
              id: 5,
              author: "Zi",
              tag: "React",
              title: "Why ReactJS dominates modern web application",
              summary:
                "Component architecture and ecosystem make React a top pick for teams.",
              time: "4 min ago",
              views: "23",
              comments: "29",
              image:
                "https://www.figma.com/api/mcp/asset/1cf5a4f7-fa13-4b78-9610-88443b8a1592",
            },
            {
              id: 6,
              author: "Pans",
              tag: "Automobile",
              title: "The timeless performance of the Porsche 911",
              summary:
                "Precision design and thrilling performance define a true icon.",
              time: "1 day ago",
              views: "89",
              comments: "100",
              image:
                "https://www.figma.com/api/mcp/asset/9aa36d26-cda2-48d5-a5d5-6860b9804f91",
            },
            {
              id: 7,
              author: "Ney",
              tag: "UX/UI",
              title: "The new poster design inspiration by Aristotle",
              summary:
                "Contrast, hierarchy and typography choices that make concepts stand out.",
              time: "4 days ago",
              views: "120",
              comments: "39",
              image:
                "https://www.figma.com/api/mcp/asset/6b904377-6be3-4af3-afee-3e824a577a94",
            },
            {
              id: 8,
              author: "Rin",
              tag: "Classic Art",
              title: "The Devil's Gambit",
              summary:
                "An iconic allegory painting that still sparks debate in modern culture.",
              time: "7h ago",
              views: "102",
              comments: "21",
              image:
                "https://www.figma.com/api/mcp/asset/7484cf25-dff1-4e1d-84fc-1667197a0ce5",
            },
            {
              id: 9,
              author: "Lila",
              tag: "Mini",
              title: "Small but mighty",
              summary:
                "Tiny things with a huge impact, and why detail matters in daily creativity.",
              time: "43 days ago",
              views: "3",
              comments: "8",
              image:
                "https://www.figma.com/api/mcp/asset/b71e1bcc-4da6-4a7b-9506-fd3907e9c8eb",
            },
            {
              id: 10,
              author: "Kinhorng",
              tag: "Motivation",
              title: "If you know, you know",
              summary:
                "The little moments of effort and consistency become the real success story.",
              time: "1h ago",
              views: "625",
              comments: "15",
              image:
                "https://www.figma.com/api/mcp/asset/da78a647-3230-487c-8c95-5acde4615b10",
            },
            {
              id: 11,
              author: "Riza",
              tag: "Minecraft",
              title: "Just a little guy's chill in the Minecraft world",
              summary:
                "Simple scenes, warm sunset light, and peaceful exploration vibes.",
              time: "4h ago",
              views: "99",
              comments: "7",
              image:
                "https://www.figma.com/api/mcp/asset/9d46242e-0857-4d7f-af7e-3dfc1abb1fcd",
            },
            {
              id: 12,
              author: "Sothea",
              tag: "Moon",
              title: "This is the moon tonight",
              summary:
                "Today it feels beautiful, as if the sky itself wrote a quiet poem.",
              time: "4h ago",
              views: "400",
              comments: "21",
              image:
                "https://www.figma.com/api/mcp/asset/99fb4d52-3cd1-40e7-8108-8d7c5a38e3b7",
            },
          ].map((blog) => (
            <article
              key={blog.id}
              className="overflow-hidden rounded-2xl border border-border-main bg-bg-main shadow-sm transition hover:shadow-md"
            >
              <div className="relative h-44 w-full">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-[#00b33d]">
                  {blog.author}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                  {blog.tag}
                </span>
              </div>

              <div className="space-y-3 p-4">
                <h3 className="line-clamp-2 text-sm font-semibold text-text-main">
                  {blog.title}
                </h3>
                <p className="line-clamp-2 text-xs leading-5 text-[#a5aaae]">
                  {blog.summary}
                </p>

                <div className="flex items-center justify-between text-[10px] text-[#797f84]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {blog.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={12} />
                      {blog.comments}
                    </span>
                  </div>
                  <span>{blog.time}</span>
                </div>

                <div className="flex justify-end">
                  <button className="rounded-full bg-primary-orange px-3 py-1.5 text-[10px] font-semibold text-white hover:brightness-105">
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <button className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100">
            <ChevronLeft size={16} />
          </button>
          <button className="rounded-md bg-primary-orange px-3 py-1 text-white">
            1
          </button>
          <button className="rounded-md border border-border-main px-3 py-1 text-[#5e6569]">
            2
          </button>
          <span className="px-2 text-[#a5aaae]">...</span>
          <button className="rounded-md border border-border-main px-3 py-1 text-[#5e6569]">
            10
          </button>
          <button className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
