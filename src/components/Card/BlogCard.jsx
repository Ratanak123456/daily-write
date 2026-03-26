import { Eye, MessageSquare, User, X, Calendar, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getMediaUrl } from "../../utils/mediaUrl";

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
      className={`group relative overflow-hidden rounded-2xl border border-border-main bg-bg-main transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        mode === "update" ? "cursor-pointer" : ""
      }`}
      onClick={isInteractiveMode ? onCardClick : undefined}
    >
      {/* Image Container */}
      <div className="relative h-44 w-full overflow-hidden">
        <img 
          src={getMediaUrl(image)} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Author Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-bg-main/95 backdrop-blur-sm px-2 py-1 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full overflow-hidden flex items-center justify-center bg-primary-orange/10 border border-border-main">
              {getMediaUrl(userImage) ? (
                <img
                  src={getMediaUrl(userImage)}
                  alt={author}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={14} className="text-primary-orange" />
              )}
            </div>
            <span className="text-xs font-semibold text-primary-orange">
              {author}
            </span>
          </div>
        </div>

        {/* Delete Button */}
        {mode === "delete" && (
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onDelete?.();
            }}
            className="absolute right-3 top-3 rounded-full bg-bg-main/95 backdrop-blur-sm p-1.5 text-red-500 shadow-lg transition-all hover:scale-110 hover:bg-red-50/50"
            aria-label="Delete post"
          >
            <X size={14} />
          </button>
        )}

        {/* Tag Button/Badge */}
        {onTagClick ? (
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onTagClick(tag);
            }}
            className="absolute bottom-3 left-3 rounded-full bg-primary-orange/90 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-white shadow-lg transition-all hover:bg-primary-orange-dark hover:scale-105 z-10"
          >
            {tag}
          </button>
        ) : (
          <span className="absolute bottom-3 left-3 rounded-full bg-primary-orange/90 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-white shadow-lg">
            {tag}
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        {/* Title with hover effect */}
        <h3 className="line-clamp-1 text-sm font-semibold text-text-main transition-colors group-hover:text-primary-orange">
          {title}
        </h3>

        {/* Update Mode Indicator */}
        {mode === "update" && (
          <div className="flex items-center gap-1 text-xs font-semibold text-primary-orange">
            <div className="h-1.5 w-1.5 rounded-full bg-primary-orange animate-pulse" />
            <span>Click to update this post</span>
          </div>
        )}

        {/* Stats Section */}
        <div className="flex items-center justify-between text-[11px] text-text-sub">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 transition-colors hover:text-primary-orange">
              <Eye size={12} />
              {views}
            </span>
            <span className="flex items-center gap-1 transition-colors hover:text-primary-orange">
              <MessageSquare size={12} />
              {comments}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {time}
            </span>
          </div>
        </div>

        {/* Interactive Footer - Arrow Icon with Hover Effect */}
        <div className="pt-2 border-t border-border-main">
          <div className="flex items-center justify-between group/footer">
            <span className="text-xs font-medium text-text-sub">
              {isDraft ? "Draft Post" : "Published"}
            </span>
            <div className="flex items-center gap-1 text-xs font-medium text-primary-orange transition-all group-hover:gap-2">
              <span className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:mr-1">
                View
              </span>
              <ArrowUpRight 
                size={14} 
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );

  if (isInteractiveMode) {
    return cardContent;
  }

  return <Link to={linkTo}>{cardContent}</Link>;
}