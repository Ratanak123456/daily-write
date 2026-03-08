import React, { useState } from "react";
import {
  User,
  Info,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  X,
  LogOut,
  Menu,
} from "lucide-react";
import { useGetCurrentUserQuery } from "../app/features/auth/auth";
import { getDecryptedRefreshToken, clearTokens } from "../util/tokenUtil";
import { useNavigate } from "react-router-dom";
import { useDeleteBlogMutation } from "../app/features/services/productApi";
import About from "../components/Profile/About";
import Blog from "../components/Profile/Blog";
import DraftBlog from "../components/Profile/DraftBlog";
import { useI18n } from "../i18n/useI18n";
import { ProfileSkeleton } from "../components/Card/Skeleton";

const Profile = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const token = getDecryptedRefreshToken();
  const [page, setPage] = useState(0);
  const pageSize = 12;
  const [totalPages, setTotalPages] = useState(0);
  const [blogMode, setBlogMode] = useState("view");
  const [draftMode, setDraftMode] = useState("view");
  const [blogSortBy, setBlogSortBy] = useState("latest");
  const [draftSortBy, setDraftSortBy] = useState("latest");
  const [blogToDelete, setBlogToDelete] = useState(null);

  const [activeTab, setActiveTab] = useState("blogs");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { data: userData, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const user = userData?.data;

  React.useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  React.useEffect(() => {
    const lastValidPage = Math.max(0, totalPages - 1);
    if (page > lastValidPage) {
      setPage(lastValidPage);
    }
  }, [page, totalPages]);

  const handleLogout = () => {
    clearTokens();
    navigate("/");
    window.location.reload();
  };

  const handleSwitchTab = (tab) => {
    setActiveTab(tab);
    setPage(0);
    if (tab !== "blogs") {
      setBlogMode("view");
    }
    if (tab !== "draft") {
      setDraftMode("view");
    }
    setBlogToDelete(null);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete?.uuid) return;
    try {
      await deleteBlog(blogToDelete.uuid).unwrap();
      setBlogToDelete(null);
    } catch (error) {
      console.error("Delete blog failed", error);
    }
  };

  if (!token) {
    return null;
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  const getPageNumbers = () => {
    const pages = [];
    const total = totalPages;

    if (total <= 7) {
      for (let i = 0; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (page < 4) {
        for (let i = 0; i < 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total - 1);
      } else if (page > total - 5) {
        pages.push(0);
        pages.push("...");
        for (let i = total - 5; i < total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(0);
        pages.push("...");
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total - 1);
      }
    }
    return pages;
  };

  return (
    <div className="flex min-h-screen bg-(--bg-primary) relative flex-col lg:flex-row overflow-x-hidden">
      {/* Mobile Header with Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-(--border-color) bg-(--bg-primary) sticky top-0 z-30">
        <h1 className="text-xl font-bold text-(--primary-500) ">
          {t("profile.profile")}
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg text-(--primary-500) hover:bg-(--primary-500) hover:bg-opacity-10 transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Backdrop (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 border-r border-(--border-color) bg-(--bg-primary) z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } h-full lg:h-auto p-6`}
      >
        <nav className="flex flex-col gap-2 h-80">
          <div className="hidden lg:block mb-8">
            <h1 className="text-2xl font-bold text-(--primary-500) text-center">
              {t("profile.profile")}
            </h1>
          </div>

          <button
            onClick={() => handleSwitchTab("blogs")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "blogs"
                ? "bg-(--primary-500) text-white shadow-md"
                : "text-(--primary-500) hover:bg-(--primary-500) hover:text-white hover:bg-opacity-10"
            }`}
          >
            <User size={18} /> {t("profile.profile")}
          </button>

          <button
            onClick={() => handleSwitchTab("about")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "about"
                ? "bg-(--primary-500) text-white shadow-md"
                : "text-(--primary-500) hover:bg-(--primary-500) hover:text-white hover:bg-opacity-10"
            }`}
          >
            <Info size={18} /> {t("profile.about")}
          </button>
          <button
            onClick={() => handleSwitchTab("draft")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "draft"
                ? "bg-(--primary-500) text-white shadow-md"
                : "text-(--primary-500) hover:bg-(--primary-500) hover:text-white hover:bg-opacity-10"
            }`}
          >
            <Bookmark size={18} /> {t("profile.draft")}
          </button>

          <div className="mt-auto pt-6 border-t border-(--border-color)">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} /> {t("profile.logOut")}
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 w-full overflow-y-auto">
        {/* Header Section removed as logout button moved to sidebar */}

        {activeTab === "blogs" && (
          <section className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center my-8 gap-4 relative">
              <h2 className="text-4xl font-black text-(--primary-500) tracking-tight">
                {t("profile.blogs")}
              </h2>
              <div className="md:absolute md:left-0 flex items-center gap-2">
                <button
                  onClick={() =>
                    setBlogMode((prev) =>
                      prev === "update" ? "view" : "update",
                    )
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    blogMode === "update"
                      ? "bg-(--primary-500) text-white"
                      : "text-(--primary-500) border border-(--border-color)"
                  }`}
                >
                  <Pencil size={14} /> {t("profile.update")}
                </button>
                <button
                  onClick={() =>
                    setBlogMode((prev) =>
                      prev === "delete" ? "view" : "delete",
                    )
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    blogMode === "delete"
                      ? "bg-(--primary-500) text-white"
                      : "text-(--primary-500) border border-(--border-color)"
                  }`}
                >
                  <Trash2 size={14} /> {t("profile.delete")}
                </button>
              </div>
              <div className="md:absolute md:right-0 flex items-center gap-2 text-sm">
                <span className="text-(--text-secondary)">
                  {t("profile.sortBy")}
                </span>
                <div className="relative">
                  <select
                    value={blogSortBy}
                    onChange={(event) => {
                      setBlogSortBy(event.target.value);
                      setPage(0);
                    }}
                    className="appearance-none border border-(--border-color) rounded-lg pl-3 pr-8 py-1 bg-(--bg-primary) text-(--text-primary)"
                  >
                    <option value="latest">{t("profile.latest")}</option>
                    <option value="oldest">{t("profile.oldest")}</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Blog
                page={page}
                pageSize={pageSize}
                mode={blogMode}
                sortBy={blogSortBy}
                onTotalPagesChange={setTotalPages}
                onRequestDelete={(blog) => setBlogToDelete(blog)}
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-md border border-(--border-color) px-2 py-1 text-(--text-secondary) hover:bg-(--bg-secondary) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {getPageNumbers().map((pageNum, idx) =>
                pageNum === "..." ? (
                  <span key={idx} className="px-2 text-(--text-secondary)">
                    ...
                  </span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => setPage(pageNum)}
                    className={`rounded-md px-3 py-1 ${
                      page === pageNum
                        ? "bg-(--primary-500) text-white"
                        : "border border-(--border-color) text-(--text-secondary) hover:bg-(--bg-secondary)"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
                className="rounded-md border border-(--border-color) px-2 py-1 text-(--text-secondary) hover:bg-(--bg-secondary) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}
        {activeTab === "about" && user && (
          <About
            uuid={user.uuid}
            fullName={user.fullName}
            email={user.email}
            profileUrl={user.profileUrl}
            coverUrl={user.coverUrl}
            bio={user.bio}
            createdAt={new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          />
        )}
        {activeTab === "draft" && (
          <section className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-center items-center my-8 gap-4 relative">
              <h2 className="text-4xl font-black text-(--primary-500) tracking-tight">
                {t("profile.drafts")}
              </h2>
              <div className="md:absolute md:left-0 flex items-center gap-2">
                <button
                  onClick={() =>
                    setDraftMode((prev) =>
                      prev === "delete" ? "view" : "delete",
                    )
                  }
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    draftMode === "delete"
                      ? "bg-(--primary-500) text-white"
                      : "text-(--primary-500) border border-(--border-color)"
                  }`}
                >
                  <Trash2 size={14} /> {t("profile.delete")}
                </button>
              </div>
              <div className="md:absolute md:right-0 flex items-center gap-2 text-sm">
                <span className="text-(--text-secondary)">
                  {t("profile.sortBy")}
                </span>
                <div className="relative">
                  <select
                    value={draftSortBy}
                    onChange={(event) => {
                      setDraftSortBy(event.target.value);
                      setPage(0);
                    }}
                    className="appearance-none border border-(--border-color) rounded-lg pl-3 pr-8 py-1 bg-(--bg-primary) text-(--text-primary)"
                  >
                    <option value="latest">{t("profile.latest")}</option>
                    <option value="oldest">{t("profile.oldest")}</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-secondary)"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <DraftBlog
                page={page}
                pageSize={pageSize}
                mode={draftMode}
                sortBy={draftSortBy}
                onTotalPagesChange={setTotalPages}
                onRequestDelete={(blog) => setBlogToDelete(blog)}
              />
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-md border border-(--border-color) px-2 py-1 text-(--text-secondary) hover:bg-(--bg-secondary) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {getPageNumbers().map((pageNum, idx) =>
                pageNum === "..." ? (
                  <span key={idx} className="px-2 text-(--text-secondary)">
                    ...
                  </span>
                ) : (
                  <button
                    key={idx}
                    onClick={() => setPage(pageNum)}
                    className={`rounded-md px-3 py-1 ${
                      page === pageNum
                        ? "bg-(--primary-500) text-white"
                        : "border border-(--border-color) text-(--text-secondary) hover:bg-(--bg-secondary)"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
                className="rounded-md border border-(--border-color) px-2 py-1 text-(--text-secondary) hover:bg-(--bg-secondary) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        )}
      </main>

      {blogToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-(--bg-primary) p-6 shadow-xl border border-(--border-color)">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-bold text-(--text-primary)">
                {t("profile.confirmDelete")}
              </h3>
              <button
                type="button"
                onClick={() => setBlogToDelete(null)}
                className="rounded-full p-1 text-(--text-secondary) hover:bg-(--bg-secondary)"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm text-(--text-secondary)">
              {t("profile.deleteConfirmText")}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setBlogToDelete(null)}
                disabled={isDeleting}
                className="rounded-lg border border-(--border-color) px-4 py-2 text-sm font-semibold text-(--text-secondary) hover:bg-(--bg-secondary)"
              >
                {t("profile.cancel")}
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="rounded-lg bg-(--primary-500) px-4 py-2 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-60"
              >
                {isDeleting ? t("profile.deleting") : t("profile.delete")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
