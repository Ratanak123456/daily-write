import { useEffect, useState } from "react";
import { Clock3, Eye, Link2, User, Check } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Helmet } from "react-helmet-async";
import { Icon } from "@iconify/react";
import {
  useGetBlogByUuidQuery,
  useGetAllUserQuery,
  useGetUserByUuidQuery,
  useGetLatestBlogsQuery,
} from "../app/features/services/productApi";
import CommentSection from "../components/Comment/CommentSection";
import { useI18n } from "../i18n/useI18n";
import { BlogDetailSkeleton } from "../components/Card/Skeleton";
import Toast from "../components/Toast";
import { getMediaUrl } from "../utils/mediaUrl";
import NotFound from "./NotFound";

export default function BlogDetail() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { t } = useI18n();
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [uuid]);

  const {
    data: blogResult,
    isLoading: blogLoading,
    isError: blogError,
  } = useGetBlogByUuidQuery(uuid, { skip: !uuid });

  const { data: usersResult } = useGetAllUserQuery();
  const { data: latestResult } = useGetLatestBlogsQuery();

  // Safely extract data from API response wrappers
  const blog = blogResult?.data || null;
  const users = Array.isArray(usersResult?.data?.content)
    ? usersResult.data.content
    : [];
  const latest = Array.isArray(latestResult?.data?.content)
    ? latestResult.data.content
    : [];

  // Try to find author in the users list first, otherwise fetch by UUID directly
  const authorFromList = blog
    ? users.find((u) => u.uuid === blog.authorUuid)
    : null;
  const { data: authorResult } = useGetUserByUuidQuery(blog?.authorUuid, {
    skip: !!authorFromList || !blog?.authorUuid,
  });

  const author = authorFromList || authorResult?.data || null;
  const latestBlogs = blog
    ? latest.filter((item) => item.uuid !== blog.uuid).slice(0, 4)
    : [];

  const loading = blogLoading;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setShowToast(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
    }
  };

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || "");
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  if (loading) {
    return (
      <section className="bg-(--bg-primary) px-4 py-6 text-(--text-primary) sm:px-6 lg:px-10">
        <BlogDetailSkeleton />
      </section>
    );
  }

  if (blogError || !blog) {
    return <NotFound />;
  }

  const createdDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Prepare meta description by stripping HTML tags and limiting length
  const metaDescription = (blog.content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 160);

  let thumbnailUrl = getMediaUrl(blog.thumbnailUrl);
  // Ensure the URL is absolute for Open Graph
  if (thumbnailUrl && !thumbnailUrl.startsWith("http")) {
    const origin = window.location.origin.replace(/\/+$/, "");
    thumbnailUrl = `${origin}/${thumbnailUrl.replace(/^\/+/, "")}`;
  }
  
  const currentUrl = window.location.href;

  return (
    <section className="bg-(--bg-primary) px-4 py-3 text-(--text-primary) sm:px-6 lg:px-10">
      <Helmet>
        <title>{blog.title} | DailyWrite</title>
        <meta name="description" content={metaDescription} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="DailyWrite" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={thumbnailUrl} />
      </Helmet>

      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={getMediaUrl(blog.thumbnailUrl)}
            alt={blog.title}
            className="h-55 w-full object-cover sm:h-80 md:h-105"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-(--primary-500) px-3 py-1.5 text-sm text-white sm:text-base">
            {blog.blogCategory}
          </span>
        </div>

        <div className="mx-auto mt-6 max-w-5xl">
          <h1 className="text-3xl font-bold text-(--primary-500) sm:text-4xl">
            {blog.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-(--text-secondary)">
            <Link
              to={`/bloggers/${author?.uuid}`}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="h-8 w-8 rounded-full border border-(--border-color) overflow-hidden bg-(--bg-secondary) flex items-center justify-center">
                {getMediaUrl(author?.profileUrl) ? (
                  <img
                    src={getMediaUrl(author.profileUrl)}
                    alt={author.fullName || "Author"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={16} className="text-(--text-secondary)" />
                )}
              </div>
              <div>
                <p className="font-medium leading-none text-(--text-primary)">
                  {author?.fullName || "Unknown Author"}
                </p>
                <p className="mt-1 text-xs text-(--text-secondary)">
                  {createdDate}
                </p>
              </div>
            </Link>
            <span className="flex items-center gap-1 text-xs sm:text-sm text-(--text-secondary)">
              <Clock3 size={14} /> {t("blogDetail.minRead")}
            </span>
            <span className="flex items-center gap-1 text-xs sm:text-sm text-(--text-secondary)">
              <Eye size={14} /> {blog.view} {t("blogDetail.views")}
            </span>
          </div>

          <article className="prose blog-content prose-sm mt-8 max-w-none text-(--text-primary) sm:prose-base">
            {parse(blog.content || "", {
              replace: (domNode) => {
                if (domNode.name === "img" && domNode.attribs) {
                  const { src, ...attribs } = domNode.attribs;
                  return (
                    <img
                      src={getMediaUrl(src)}
                      {...attribs}
                    />
                  );
                }
              },
            })}
          </article>

          <div className="mt-8 border-t border-(--border-color) pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className={`flex items-center gap-2 rounded-xl border border-(--border-color) px-4 py-2 text-sm transition-all duration-300 ${
                  copied
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "text-(--text-primary) hover:bg-(--bg-secondary)"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    {t("blogDetail.copied") || "Copied!"}
                  </>
                ) : (
                  <>
                    <Link2 size={16} className="text-(--text-secondary)" />
                    {t("blogDetail.copyLink")}
                  </>
                )}
              </button>

              <div className="h-6 w-px bg-(--border-color) mx-1 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSocialShare("facebook")}
                  className="p-2 rounded-full border border-(--border-color) text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                  title="Share on Facebook"
                >
                  <Icon icon="fa6-brands:facebook-f" className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialShare("twitter")}
                  className="p-2 rounded-full border border-(--border-color) text-black dark:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all duration-300"
                  title="Share on X (Twitter)"
                >
                  <Icon icon="fa6-brands:x-twitter" className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialShare("linkedin")}
                  className="p-2 rounded-full border border-(--border-color) text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
                  title="Share on LinkedIn"
                >
                  <Icon icon="fa6-brands:linkedin-in" className="text-lg" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialShare("telegram")}
                  className="p-2 rounded-full border border-(--border-color) text-[#24A1DE] hover:bg-[#24A1DE] hover:text-white transition-all duration-300"
                  title="Share on Telegram"
                >
                  <Icon icon="fa6-brands:telegram" className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {showToast && (
            <Toast
              message="Link Copied"
              type="success"
              onClose={() => setShowToast(false)}
            />
          )}

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-(--primary-700)">
              {t("blogDetail.latestInTopic")}
            </h3>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {latestBlogs.map((item) => (
                <article
                  key={item.uuid}
                  onClick={() => navigate(`/blogs/${item.uuid}`)}
                  className="flex min-h-32 cursor-pointer overflow-hidden rounded-2xl border border-(--border-color) bg-(--bg-primary) hover:bg-(--bg-secondary) transition-colors"
                >
                  <img
                    src={getMediaUrl(item.thumbnailUrl)}
                    alt={item.title}
                    className="h-full w-32 shrink-0 object-cover sm:w-40"
                  />
                  <div className="flex flex-1 flex-col justify-center p-3">
                    <h4 className="text-sm font-semibold text-(--text-primary) sm:text-base">
                      {item.title}
                    </h4>
                    <p className="mt-1 line-clamp-3 text-xs text-(--text-secondary) sm:text-sm">
                      {(item.content || "")
                        .replace(/<[^>]+>/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <CommentSection blogUuid={blog.uuid} />

          <div className="mt-5 border-t border-(--border-color)" />
        </div>
      </div>
    </section>
  );
}
