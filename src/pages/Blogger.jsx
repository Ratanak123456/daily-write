import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "../components/Card/BlogCard";
import SkeletonCard from "../components/Card/Skeleton";
import { getMediaUrl } from "../utils/mediaUrl";
import {
  useGetAllUserQuery,
  useGetUserByUuidQuery,
  useGetAllProductByCurrentUserUuidQuery,
} from "../app/features/services/productApi";

export default function Blogger() {
  const { uuid } = useParams();
  const [activeTab, setActiveTab] = React.useState("blogs");
  const [page, setPage] = useState(0);
  const pageSize = 6;

  const getCollection = (result) => {
    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.data?.content)) return result.data.content;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.content)) return result.content;
    return [];
  };

  const getPaginationMeta = (result) => result?.data || result || {};

  // Fetch all users (as a fallback or for lists)
  const { data: usersResult, isLoading: usersLoading } = useGetAllUserQuery();

  // Fetch this specific blogger directly by UUID
  const { data: userResult, isLoading: userLoading } = useGetUserByUuidQuery(
    uuid,
    {
      skip: !uuid,
    },
  );

  // Fetch this author's blogs page by page so pagination metadata stays accurate
  const { data: blogsResult, isLoading: blogsLoading } =
    useGetAllProductByCurrentUserUuidQuery({
      userUuid: uuid,
      pageNumber: page,
      pageSize,
    }, {
      skip: !uuid,
    });

  // Handle both direct blog return and wrapped response
  const users = getCollection(usersResult);
  const blogger =
    userResult?.data || userResult || users.find((u) => u.uuid === uuid) || null;

  const blogs = getCollection(blogsResult);
  const blogsMeta = getPaginationMeta(blogsResult);

  const totalPosts = blogsMeta.totalElements || blogs.length;
  const totalPages = Math.max(
    blogsMeta.totalPages || 0,
    Math.ceil(totalPosts / pageSize),
  );

  useEffect(() => {
    setPage(0);
  }, [uuid, activeTab]);

  useEffect(() => {
    if (totalPages === 0 && page !== 0) {
      setPage(0);
      return;
    }

    if (page > totalPages - 1) {
      setPage(Math.max(0, totalPages - 1));
    }
  }, [page, totalPages]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const visibleTotalPages = Math.max(totalPages, 1);
    if (visibleTotalPages <= 7) {
      for (let i = 0; i < visibleTotalPages; i++) pages.push(i);
    } else {
      if (page < 4) {
        for (let i = 0; i < 5; i++) pages.push(i);
        pages.push("...");
        pages.push(visibleTotalPages - 1);
      } else if (page > visibleTotalPages - 5) {
        pages.push(0);
        pages.push("...");
        for (let i = visibleTotalPages - 5; i < visibleTotalPages; i++) pages.push(i);
      } else {
        pages.push(0);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(visibleTotalPages - 1);
      }
    }
    return pages;
  };

  if (usersLoading || userLoading || blogsLoading) {
    return (
      <div className="bg-[var(--bg-secondary)] min-h-screen p-6 md:p-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <div className="bg-[var(--bg-primary)] rounded-2xl p-8 border border-[var(--border-color)] animate-pulse">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          </aside>
          <main className="w-full lg:w-3/4">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-8 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!blogger) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-secondary)]">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2 text-[var(--text-primary)]">
            Blogger Not Found
          </p>
          <p className="text-[var(--text-secondary)]">
            The user you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans relative overflow-hidden bg-bg-main">
      <div className="flex justify-between w-[70%] items-center mb-8 m-auto">
        <h1 className="text-3xl font-bold text-[var(--primary-500)] text-right w-[60%]">
          Blogs by {blogger.fullName.split(" ")[0]}
        </h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--text-secondary)]">Total:</span>
          <span className="font-bold text-[var(--primary-500)]">
            {totalPosts} Posts
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Sidebar: Blogger Profile */}
        <aside className="w-full lg:w-1/4">
          <div className="rounded-2xl shadow-sm p-8 flex flex-col items-center text-center bg-[var(--bg-primary)] border border-[var(--border-color)]">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-[var(--primary-500)] overflow-hidden flex items-center justify-center bg-[var(--bg-secondary)]">
                {getMediaUrl(blogger.profileUrl) ? (
                  <img
                    src={getMediaUrl(blogger.profileUrl)}
                    alt={blogger.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-[var(--primary-500)]" />
                )}
              </div>
              <div className="absolute bottom-1 right-1 rounded-full p-1 shadow-sm bg-[var(--bg-primary)]">
                <span className="text-xs">✌️</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {blogger.fullName}
            </h2>
            <p className="text-sm mb-6 truncate w-full text-[var(--text-secondary)]">
              {blogger.email}
            </p>

            <div className="w-full pt-6 mb-6 border-t border-[var(--border-color)]">
              <p className="text-xs uppercase tracking-wider mb-1 text-[var(--text-secondary)]">
                Member Since
              </p>
              <p className="text-lg font-bold text-[var(--text-primary)]">
                {blogger.createdAt
                  ? new Date(blogger.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => {
                  setActiveTab("blogs");
                  setPage(0);
                }}
                className={`w-full rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium shadow-sm transition-colors ${
                  activeTab === "blogs"
                    ? "text-white bg-[var(--primary-500)]"
                    : "bg-[var(--bg-secondary)] text-[var(--primary-500)]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                AUTHOR
              </button>

              <button
                onClick={() => setActiveTab("about")}
                className={`w-full rounded-xl py-3 px-4 font-medium shadow-sm transition-colors ${
                  activeTab === "about"
                    ? "text-white bg-[var(--primary-500)]"
                    : "bg-[var(--bg-secondary)] text-[var(--primary-500)]"
                }`}
              >
                ABOUT
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content: Blogger's Blogs */}
        <main className="w-full lg:w-3/4">
          {activeTab === "blogs" ? (
            <>
              {blogs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                    {blogs.map((blog) => (
                      <BlogCard
                        key={blog.uuid}
                        image={blog.thumbnailUrl}
                        author={blogger.fullName}
                        tag={blog.blogCategory}
                        title={blog.title}
                        summary={blog.content}
                        views={blog.view}
                        time={new Date(blog.createdAt).toLocaleDateString()}
                        userImage={blogger.profileUrl}
                        uuid={blog.uuid}
                      />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  <div className="mt-8 flex items-center justify-center gap-2 text-sm">
                    <button
                      onClick={() => handlePageChange(Math.max(0, page - 1))}
                      disabled={page === 0}
                      className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {getPageNumbers().map((pageNum, idx) =>
                      pageNum === "..." ? (
                        <span key={idx} className="px-2 text-[#a5aaae]">
                          ...
                        </span>
                      ) : (
                        <button
                          key={idx}
                          onClick={() => handlePageChange(pageNum)}
                          className={`rounded-md px-3 py-1 ${
                            page === pageNum
                              ? "bg-[var(--primary-500)] text-white"
                              : "border border-border-main text-[#5e6569] hover:bg-gray-100"
                          }`}
                        >
                          {pageNum + 1}
                        </button>
                      ),
                    )}
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page >= Math.max(totalPages, 1) - 1}
                      className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl p-12 text-center border border-dashed bg-[var(--bg-primary)] border-[var(--border-color)]">
                    <svg
                      className="mx-auto h-12 w-12 mb-4 text-[var(--text-secondary)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M14 4v4h4"
                      />
                    </svg>
                    <p className="font-medium text-[var(--text-secondary)]">
                      This author hasn't published any blogs yet.
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-center gap-2 text-sm">
                    <button
                      disabled
                      className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button className="rounded-md bg-[var(--primary-500)] px-3 py-1 text-white">
                      1
                    </button>
                    <button
                      disabled
                      className="rounded-md border border-border-main px-2 py-1 text-[#a5aaae] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <section className="rounded-2xl shadow-sm p-6 md:p-8 bg-[var(--bg-primary)] border border-[var(--border-color)]">
              <h2 className="text-2xl font-bold mb-6 text-[var(--primary-500)]">
                About {blogger.fullName}
              </h2>

              {getMediaUrl(blogger.coverUrl) ? (
                <div className="mb-6 overflow-hidden rounded-xl border border-[var(--border-color)]">
                  <img
                    src={getMediaUrl(blogger.coverUrl)}
                    alt={`${blogger.fullName} cover`}
                    className="w-full h-56 object-cover"
                  />
                </div>
              ) : null}

              <p className="leading-relaxed text-base text-[var(--text-primary)]">
                {blogger.bio || "This author has not added a biography yet."}
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
