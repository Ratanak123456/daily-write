import { Eye, MessageSquare, User } from "lucide-react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export default function BlogCard({
  image,
  author,
  tag,
  title,
  summary,
  views,
  comments,
  time,
  userImage,
  uuid,
  status
}) {
  const isDraft = status?.toUpperCase() === "DRAFT" || tag === "DRAFT";
  const linkTo = isDraft ? `/blog-post?uuid=${uuid}` : `/blogs/${uuid}`;

  return (
    <Link to={linkTo}>
        <article className="overflow-hidden rounded-2xl border border-border-main bg-bg-main shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-[#00b33d]">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center bg-orange-50 border border-primary-orange">
              {userImage ? (
                <img
                  src={userImage}
                  alt={author}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={14} className="text-primary-orange" />
              )}
            </div>

            <span className="text-xs font-semibold text-[#00b33d]">
              {author}
            </span>
          </div>
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
          {tag}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-text-main">
          {title}
        </h3>
        <p className="line-clamp-2 text-xs leading-5 text-[#a5aaae]">
          {parse(summary)}
        </p>

        <div className="flex items-center justify-between text-[10px] text-[#797f84]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {views}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={12} />
              {comments}
            </span>
          </div>
          <span>{time}</span>
        </div>

        <div className="flex justify-end">
          <button className="rounded-full bg-primary-orange px-3 py-1.5 text-[10px] font-semibold text-white hover:brightness-105">
            Read More
          </button>
        </div>
      </div>
    </article>
    </Link>
  );
}
