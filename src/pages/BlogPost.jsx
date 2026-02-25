import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function BlogPost() {
  const navigate = useNavigate();
  const editorRootRef = useRef(null);
  const quillInstanceRef = useRef(null);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!editorRootRef.current || quillInstanceRef.current) return;

    quillInstanceRef.current = new Quill(editorRootRef.current, {
      theme: "snow",
      placeholder: "Write your post content...",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: [1, 2, false] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    return () => {
      quillInstanceRef.current = null;
    };
  }, []);

  return (
    <section className="bg-bg-main text-text-main pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[22px] font-semibold text-text-main hover:text-primary-orange transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="text-xl md:text-2xl">Back</span>
          </button>

          <h1 className="text-primary-orange text-2xl md:text-4xl font-bold text-center">
            Create New Post
          </h1>

          <button className="bg-primary-orange text-white text-lg md:text-2xl font-semibold px-6 md:px-10 py-2.5 rounded-lg hover:brightness-110 transition-all">
            Publish
          </button>
        </div>

        <div className="rounded-lg border border-border-main px-4 md:px-6 py-6 md:py-8">
          <h2 className="text-primary-orange text-2xl md:text-4xl font-semibold mb-6">
            Post Details
          </h2>

          <button className="bg-bg-side text-primary-orange text-base md:text-3xl font-semibold px-6 py-2 rounded-full mb-6 hover:brightness-95 transition-all">
            Add Image Cover *
          </button>

          <div className="space-y-6">
            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                Category <span className="text-primary-orange">*</span>
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full appearance-none bg-bg-side border border-border-main rounded-lg h-12 px-4 text-primary-orange text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-primary-orange"
                >
                  <option value="">Select category</option>
                  <option value="front-end">Front-End</option>
                  <option value="back-end">Back-End</option>
                  <option value="cyber-security">Cyber Security</option>
                  <option value="ux-ui-design">UXUI Design</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-sub"
                  size={22}
                />
              </div>
            </div>

            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                Title <span className="text-primary-orange">*</span>
              </label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter your title here..."
                className="w-full bg-bg-side border border-border-main rounded-lg h-12 px-4 text-base md:text-xl placeholder:text-primary-orange/70 focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
            </div>

            <div>
              <label className="block text-lg md:text-2xl font-semibold mb-2">
                Content <span className="text-primary-orange">*</span>
              </label>
              <div className="blog-post-editor rounded-lg border border-border-main overflow-hidden bg-bg-main">
                <div
                  ref={editorRootRef}
                  className="text-base md:text-lg"
                  style={{ minHeight: "320px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
