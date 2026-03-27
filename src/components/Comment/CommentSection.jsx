import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCreateCommentMutation,
  useGetCommentsByBlogQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import { getDecryptedAccessToken } from "../../utils/tokenUtil";
import { getMediaUrl } from "../../utils/mediaUrl";

export default function CommentSection({ blogUuid }) {
  const hasToken = Boolean(getDecryptedAccessToken());
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const { data: currentUserResponse } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken,
  });

  const currentUser = currentUserResponse?.data;

  const {
    data: commentsResponse,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useGetCommentsByBlogQuery(
    { blogUuid, pageNumber: 0, pageSize: 100 },
    { skip: !blogUuid },
  );

  const [createComment, { isLoading: creatingComment }] =
    useCreateCommentMutation();

  const allComments = commentsResponse?.data?.content || commentsResponse?.data || [];
  const totalPages = Math.ceil(allComments.length / pageSize);
  const comments = allComments.slice(page * pageSize, (page + 1) * pageSize);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!hasToken || !currentUser?.uuid) {
      setErrorMessage("Please login first to comment.");
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) {
      setErrorMessage("Comment cannot be empty.");
      return;
    }

    try {
      await createComment({
        blogUuid,
        userUuid: currentUser.uuid,
        content: trimmed,
      }).unwrap();
      setContent("");
      setPage(0); // Reset to first page to see the new comment
    } catch (error) {
      const message =
        error?.data?.message ||
        error?.data?.error ||
        "Failed to post comment. Please try again.";
      setErrorMessage(message);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (page < 3) {
        for (let i = 0; i < 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages - 1);
      } else if (page > totalPages - 4) {
        pages.push(0);
        pages.push("...");
        for (let i = totalPages - 4; i < totalPages; i++) pages.push(i);
      } else {
        pages.push(0);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages - 1);
      }
    }
    return pages;
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-[var(--primary-700)]">
          Comments
        </h3>
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          {allComments.length} comments
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={
            hasToken ? "Write your comment..." : "Login to write a comment"
          }
          disabled={!hasToken || creatingComment}
          className="input-field w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--primary-500)]"
          rows={4}
        />

        {errorMessage && (
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        )}

        {!hasToken && (
          <p className="text-sm text-[var(--text-primary)]">
            Please{" "}
            <Link to="/auth" className="text-[var(--primary-500)] font-semibold">
              login
            </Link>{" "}
            to post a comment.
          </p>
        )}

        <button
          type="submit"
          disabled={!hasToken || creatingComment}
          className="rounded-lg bg-[var(--primary-500)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--primary-600)] disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
        >
          {creatingComment ? "Posting..." : "Post comment"}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {commentsLoading && (
          <p className="text-sm text-[var(--text-primary)]">
            Loading comments...
          </p>
        )}

        {commentsError && (
          <p className="text-sm text-red-600">Failed to load comments.</p>
        )}

        {!commentsLoading && !commentsError && allComments.length === 0 && (
          <p className="text-sm text-[var(--text-primary)]">No comments yet.</p>
        )}

        {comments.map((item) => {
          const commentedDate = item?.commentedDate
            ? new Date(item.commentedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "";

          return (
            <article
              key={item.uuid}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-4 hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Link
                  to={`/bloggers/${item?.user?.uuid}`}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  {getMediaUrl(item?.user?.profileUrl) ? (
                    <img
                      src={getMediaUrl(item.user.profileUrl)}
                      alt={item?.user?.fullName || "User"}
                      className="h-8 w-8 rounded-full object-cover border border-[var(--border-color)]"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-[var(--primary-500)] text-white flex items-center justify-center text-xs font-semibold uppercase">
                      {(item?.user?.fullName || "U").charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {item?.user?.fullName || "Unknown User"}
                    </p>
                    {commentedDate && (
                      <p className="text-xs text-[var(--text-secondary)]">
                        {commentedDate}
                      </p>
                    )}
                  </div>
                </Link>
              </div>

              <p className="mt-3 text-sm text-[var(--text-primary)]">
                {item.content}
              </p>
            </article>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-md border border-[var(--border-color)] px-2 py-1 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          {getPageNumbers().map((pageNum, idx) =>
            pageNum === "..." ? (
              <span key={idx} className="px-2 text-[var(--text-secondary)]">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => setPage(pageNum)}
                className={`rounded-md px-3 py-1 transition-colors ${
                  page === pageNum
                    ? "bg-[var(--primary-500)] text-white"
                    : "border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {pageNum + 1}
              </button>
            ),
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-md border border-[var(--border-color)] px-2 py-1 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}