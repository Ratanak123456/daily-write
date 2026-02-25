import { Link } from "react-router-dom";
import image from "../../../assets/homepage/Wall post-amico.svg";
export default function EncourageSection() {
  return (
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative flex justify-center items-center">
            <img
              src={image}
              alt="Technology and Life Illustration"
              className="w-full max-w-lg h-auto relative z-10"
            />
          </div>

          <div className="max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              <span className="text-[#E87121]">Thoughts on</span> Technology,
              Life, <span className="text-[#E87121]">and Everything</span> In
              Between
            </h2>

            <p className="mt-6 text-slate-500 text-lg leading-relaxed">
              Discover thoughtful articles on technology, daily life, and
              general topics shared by a growing community of writers.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-4 text-slate-600 font-medium">
                <span className="w-4 h-4 rounded-full bg-[#E87121] shrink-0"></span>
                Quality-vetted pieces
              </li>
              <li className="flex items-center gap-4 text-slate-600 font-medium">
                <span className="w-4 h-4 rounded-full bg-slate-800 shrink-0"></span>
                Carefully curated selection
              </li>
              <li className="flex items-center gap-4 text-slate-600 font-medium">
                <span className="w-4 h-4 rounded-full bg-slate-400 shrink-0"></span>
                Global brand discovery
              </li>
            </ul>

            <Link
              to="/about"
              className="inline-flex items-center mt-10 text-[#E87121] font-bold text-lg group"
            >
              Learn More About Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
  );
}
