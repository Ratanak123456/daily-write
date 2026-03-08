import { Eye, MessageSquare, User, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogCard({
  image,
  author,
  tag,
  title,
  views,
  comments,
  time,
  userImage,
  uuid,
  status,
  mode = "view",
  onCardClick,
  onDelete,
  onTagClick,
}) {
  const isDraft = status?.toUpperCase() === "DRAFT" || tag === "DRAFT";
  const linkTo = isDraft ? `/blog-post?uuid=${uuid}` : `/blogs/${uuid}`;
  const isInteractiveMode = mode === "update" || mode === "delete";

  const cardContent = (
    <article
      className={`overflow-hidden rounded-2xl border border-border-main bg-bg-main transition hover:shadow-md ${
        mode === "update" ? "cursor-pointer" : ""
      }`}
      onClick={isInteractiveMode ? onCardClick : undefined}
    >
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

        {mode === "delete" && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onDelete?.();
            }}
            className="absolute right-3 top-3 rounded-full bg-white p-1 text-primary-orange shadow hover:bg-orange-50"
            aria-label="Delete post"
          >
            <X size={16} />
          </button>
        )}

        {onTagClick ? (
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onTagClick(tag);
            }}
            className="absolute bottom-3 left-3 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors z-10"
          >
            {tag}
          </button>
        ) : (
          <span className="absolute bottom-3 left-3 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
            {tag}
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-text-main">
          {title}
        </h3>

        {mode === "update" && (
          <p className="text-xs font-semibold text-primary-orange">
            Select this post to update
          </p>
        )}

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

        <div className="flex justify-center">
          <button className="rounded-full bg-primary-orange px-3 py-1.5 text-[10px] font-semibold text-white hover:brightness-105">
            Read More
          </button>
        </div>
      </div>
    </article>
  );

  if (isInteractiveMode) {
    return cardContent;
  }

  return <Link to={linkTo}>{cardContent}</Link>;
}
