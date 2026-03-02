import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreateCommentMutation,
  useGetCommentsByBlogQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import { getDecryptedAccessToken } from "../../util/tokenUtil";

export default function CommentSection({ blogUuid }) {
  const hasToken = Boolean(getDecryptedAccessToken());
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: currentUserResponse } = useGetCurrentUserQuery(undefined, {
    skip: !hasToken,
  });

  const currentUser = currentUserResponse?.data;

  const {
    data: commentsResponse,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useGetCommentsByBlogQuery(
    { blogUuid, pageNumber: 0, pageSize: 20 },
    { skip: !blogUuid },
  );

  const [createComment, { isLoading: creatingComment }] =
    useCreateCommentMutation();

  const comments = commentsResponse?.data?.content || [];

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
    } catch (error) {
      const message =
        error?.data?.message ||
        error?.data?.error ||
        "Failed to post comment. Please try again.";
      setErrorMessage(message);
    }
  };

  return (
    <section className="mt-10">
      <h3 className="text-2xl font-semibold text-[var(--primary-700)]">Comments</h3>

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
          <p className="text-sm text-[var(--text-primary)]">Loading comments...</p>
        )}

        {commentsError && (
          <p className="text-sm text-red-600">Failed to load comments.</p>
        )}

        {!commentsLoading && !commentsError && comments.length === 0 && (
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
                {item?.user?.profileUrl ? (
                  <img
                    src={item.user.profileUrl}
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
                    <p className="text-xs text-[var(--text-secondary)]">{commentedDate}</p>
                  )}
                </div>
              </div>

              <p className="mt-3 text-sm text-[var(--text-primary)]">{item.content}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}