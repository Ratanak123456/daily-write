import React from "react";

export function Card({ title, description, image }) {
  return (
    <section>
      <div className="rounded-3xl overflow-hidden mb-8">
        <img src={image} alt={title} className="w-full h-auto object-cover" />
      </div>

      <h1 className="text-5xl font-extrabold leading-tight mb-4 text-text-main">
        {title}
      </h1>
      <p className="text-xl mb-8 text-text-sub line-clamp-2">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 px-4 py-2 bg-primary-orange text-white rounded-full font-semibold opacity-90">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
            </svg>
            20k
          </span>
          <div className="p-2 bg-bg-side rounded-lg text-text-sub">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
          </div>
          <div className="flex items-center gap-2 text-text-sub">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
            <span className="font-medium text-primary-orange">100K</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <span className="font-bold text-text-sub">Ratanak</span>
        </div>
      </div>
    </section>
  );
}

export default function CardSidBar() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4 items-start group">
        <div className="flex-1">
          <h4 className="text-primary-orange font-bold mb-1">Technology</h4>
          <p className="font-bold text-text-main leading-snug mb-2 group-hover:underline">
            The best AMD processor in 2025: top AMD CPUs for gaming...
          </p>
          <div className="flex items-center gap-4 text-xs text-text-sub uppercase tracking-widest font-bold">
            <span>NOV 24, 2025</span>
            <span className="flex items-center gap-1 capitalize">
              <span className="w-4 h-4 bg-primary-orange rounded-full inline-block"></span>{" "}
              Ratanak
            </span>
          </div>
        </div>
        <img
          src="https://placehold.co/120x80/333/white"
          className="w-28 h-20 rounded-xl object-cover"
          alt="Technology news thumbnail"
        />
      </div>

      <div className="flex gap-4 items-start group">
        <div className="flex-1">
          <h4 className="text-primary-orange font-bold mb-1">
            Artificial Intelligence
          </h4>
          <p className="font-bold text-text-main leading-snug mb-2 group-hover:underline">
            AI is teaching machines to "think" and solve problems like humans.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-sub uppercase tracking-widest font-bold">
            <span>DEC 24, 2025</span>
            <span className="flex items-center gap-1 capitalize">
              <span className="w-4 h-4 bg-primary-orange rounded-full inline-block"></span>{" "}
              Seannn
            </span>
          </div>
        </div>
        <img
          src="https://placehold.co/120x80/333/white"
          className="w-28 h-20 rounded-xl object-cover"
          alt="AI news thumbnail"
        />
      </div>

      <div className="flex gap-4 items-start group">
        <div className="flex-1">
          <h4 className="text-primary-orange font-bold mb-1">
            Kaynes Technology
          </h4>
          <p className="font-bold text-text-main leading-snug mb-2 group-hover:underline">
            The stock has been declining from its recent high close to Rs 7,600.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-sub uppercase tracking-widest font-bold">
            <span>MAY 24, 2022</span>
            <span className="flex items-center gap-1 capitalize">
              <span className="w-4 h-4 bg-primary-orange rounded-full inline-block"></span>{" "}
              Rodrigo
            </span>
          </div>
        </div>
        <img
          src="https://placehold.co/120x80/333/white"
          className="w-28 h-20 rounded-xl object-cover"
          alt="Kaynes Technology news thumbnail"
        />
      </div>

      <div className="flex gap-4 items-start group">
        <div className="flex-1">
          <h4 className="text-primary-orange font-bold mb-1">
            Kaynes Technology
          </h4>
          <p className="font-bold text-text-main leading-snug mb-2 group-hover:underline">
            The stock has been declining from its recent high close to Rs 7,600.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-sub uppercase tracking-widest font-bold">
            <span>MAY 24, 2022</span>
            <span className="flex items-center gap-1 capitalize">
              <span className="w-4 h-4 bg-primary-orange rounded-full inline-block"></span>{" "}
              Rodrigo
            </span>
          </div>
        </div>
        <img
          src="https://placehold.co/120x80/333/white"
          className="w-28 h-20 rounded-xl object-cover"
          alt="Kaynes Technology news thumbnail"
        />
      </div>

      <div className="flex gap-4 items-start group">
        <div className="flex-1">
          <h4 className="text-primary-orange font-bold mb-1">
            Kaynes Technology
          </h4>
          <p className="font-bold text-text-main leading-snug mb-2 group-hover:underline">
            The stock has been declining from its recent high close to Rs 7,600.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-sub uppercase tracking-widest font-bold">
            <span>MAY 24, 2022</span>
            <span className="flex items-center gap-1 capitalize">
              <span className="w-4 h-4 bg-primary-orange rounded-full inline-block"></span>{" "}
              Rodrigo
            </span>
          </div>
        </div>
        <img
          src="https://placehold.co/120x80/333/white"
          className="w-28 h-20 rounded-xl object-cover"
          alt="Kaynes Technology news thumbnail"
        />
      </div>
    </div>
  );
}
