import { Bookmark, Clock3, Eye, Heart, Link2 } from "lucide-react";

export default function BlogDetail() {
  return (
    <section className="bg-bg-main px-4 py-3 text-text-main sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src="https://www.figma.com/api/mcp/asset/d7ce833c-3bf2-4760-97d4-83c33bd0cda2"
            alt="Sleep science"
            className="h-55 w-full object-cover sm:h-80 md:h-105"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-[#00c8b3] px-3 py-1.5 text-sm text-white sm:text-base">
            Health & Lifestyle
          </span>
        </div>

        <div className="mx-auto mt-6 max-w-5xl">
          <h1 className="text-3xl font-bold text-[#9f430a] sm:text-4xl">
            Sleep Science: Optimizing Your Rest
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#30393e]">
            <div className="flex items-center gap-2">
              <img
                src="https://www.figma.com/api/mcp/asset/1b2b90c0-62e6-4de8-8635-d0269d5a0b20"
                alt="Author"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p className="font-medium leading-none">Theara</p>
                <p className="mt-1 text-xs text-[#797f84]">February 12, 2026</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs sm:text-sm">
              <Clock3 size={14} /> 10 min read
            </span>
            <span className="flex items-center gap-1 text-xs sm:text-sm">
              <Eye size={14} /> 16,800 views
            </span>
          </div>

          <article className="mt-8 space-y-5 text-[15px] leading-7 text-[#222426] sm:text-base">
            <h2 className="text-2xl font-bold text-[#9f430a] sm:text-4xl">
              The Architecture of Sleep
            </h2>
            <p>
              Sleep isn't a single state—it's a complex cycle of stages, each
              serving different biological functions. Deep slow-wave sleep
              consolidates memories and repairs tissue. REM sleep processes
              emotions and fosters creativity. Disrupting either has cascading
              effects on health and performance.
            </p>
            <p>
              Your circadian rhythm—the internal clock governing sleep-wake
              cycles—is sensitive to light, temperature, and meal timing.
              Morning sunlight exposure is the single most powerful tool for
              regulating your rhythm, far more effective than any supplement.
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Keep a consistent sleep schedule, even on weekends</li>
              <li>Cool your bedroom to 65–68°F (18–20°C)</li>
              <li>Eliminate screens 60 minutes before bed</li>
              <li>Use morning sunlight to anchor your circadian rhythm</li>
            </ul>
            <p>
              The cost of chronic sleep deprivation extends far beyond
              tiredness: impaired immunity, increased cancer risk, accelerated
              aging, and cognitive decline. Sleep is not a luxury—it's a
              biological necessity.
            </p>
          </article>

          <div className="mt-8 border-t border-border-main pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-[#a5aaae] px-4 py-2 text-sm hover:bg-gray-50">
                <Heart size={16} /> 20
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-[#a5aaae] px-4 py-2 text-sm hover:bg-gray-50">
                <Bookmark size={16} /> 20
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-[#a5aaae] px-4 py-2 text-sm hover:bg-gray-50">
                <Link2 size={16} /> Copy link
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-[#9f430a]">
              Latest in This Topic
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {[
                {
                  title: "The Benefits of Cold Exposure",
                  summary: "From cold plunges to cold showers...",
                  image:
                    "https://www.figma.com/api/mcp/asset/0b590c91-c57f-45e0-8809-f89c45889e26",
                },
                {
                  title: "Gut Health and the Microbiome",
                  summary: "The trillions of microorganisms in...",
                  image:
                    "https://www.figma.com/api/mcp/asset/140ad330-1dce-4b87-8c93-0e8e3c23a3a8",
                },
                {
                  title: "Nutrition Myths Debunked",
                  summary: "Separating fact from fiction in the ...",
                  image:
                    "https://www.figma.com/api/mcp/asset/f7ab2946-efc5-4bfe-9560-eed7b54535ae",
                },
                {
                  title: "Mental Health in the Digital Age",
                  summary: "How constant connectivity affects...",
                  image:
                    "https://www.figma.com/api/mcp/asset/8f0caa5f-250e-4dc1-b728-83734b24d7b0",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="flex overflow-hidden rounded-2xl border border-[#797f84] bg-bg-main"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-32 object-cover sm:h-28 sm:w-40"
                  />
                  <div className="flex flex-1 flex-col justify-center p-3">
                    <h4 className="text-sm font-semibold text-black sm:text-base">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs text-black/80 sm:text-sm">
                      {item.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-border-main" />
        </div>
      </div>
    </section>
  );
}
