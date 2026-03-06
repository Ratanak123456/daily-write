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
  Moon,
  Sun,
} from "lucide-react";
import { useGetCurrentUserQuery } from "../app/features/auth/auth";
import { getDecryptedRefreshToken, clearTokens } from "../util/tokenUtil";
import { useNavigate } from "react-router-dom";
import { useDeleteBlogMutation } from "../app/features/services/productApi";
import About from "../components/Profile/About";
import Blog from "../components/Profile/Blog";
import DraftBlog from "../components/Profile/DraftBlog";
import DaliyWriteLogo from "../assets/DaliyWriteLogo.svg";
import { useI18n } from "../i18n/useI18n";

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
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const [activeTab, setActiveTab] = useState("blogs");

  const { data: userData, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  const user = userData?.data;

  React.useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--bg-primary)">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-(--primary-500)"></div>
      </div>
    );
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
    <div className="flex min-h-screen bg-(--bg-primary)">
      {/* Sidebar */}
      <aside className="w-64 border-r border-(--border-color) flex flex-col p-6 fixed h-full bg-(--bg-primary)">
        <div
          className="flex items-center gap-2 mb-12 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-opacity-10 rounded-lg flex items-center justify-center">
            <img
              src={DaliyWriteLogo}
              alt="DailyWrite logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <h1 className="font-bold text-xl text-(--text-primary)">
            DailyWrite
          </h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => handleSwitchTab("blogs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "blogs"
                ? "bg-(--primary-500) text-white shadow-md"
                : "text-(--primary-500) hover:bg-(--primary-500) hover:text-white hover:bg-opacity-10"
            }`}
            style={
              activeTab === "blogs"
                ? { boxShadow: "0 4px 6px -1px rgba(244, 128, 36, 0.2)" }
                : {}
            }
          >
            <User size={18} /> {t("profile.profile")}
          </button>

          <button
            onClick={() => handleSwitchTab("about")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "about"
                ? "bg-(--primary-500) text-white shadow-md"
                : "text-(--primary-500) hover:bg-(--primary-500) hover:text-white hover:bg-opacity-10"
            }`}
            style={
              activeTab === "about"
                ? { boxShadow: "0 4px 6px -1px rgba(244, 128, 36, 0.2)" }
                : {}
            }
          >
            <Info size={18} /> {t("profile.about")}
          </button>
          <button
            onClick={() => handleSwitchTab("draft")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "draft"
                ? "bg-(--primary-500) text-white shadow-md"
                : "text-(--primary-500) hover:bg-(--primary-500) hover:text-white hover:bg-opacity-10"
            }`}
            style={
              activeTab === "draft"
                ? { boxShadow: "0 4px 6px -1px rgba(244, 128, 36, 0.2)" }
                : {}
            }
          >
            <Bookmark size={18} /> {t("profile.draft")}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <header className="flex justify-between items-start">
          <div className="flex flex-col items-center mx-auto">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-(--primary-500) overflow-hidden bg-(--bg-secondary) flex items-center justify-center">
                {user?.profileUrl ? (
                  <img
                    src={user.profileUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-(--text-secondary)" />
                )}
              </div>
              <div className="absolute -top-2 -right-2 bg-(--bg-primary) rounded-full p-1 shadow-sm border border-(--border-color)">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=1"
                  className="w-5 h-5"
                  alt="badge"
                />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-(--text-primary)">
              {user?.fullName || t("profile.user")}
            </h2>
            <p className="text-(--text-secondary) text-sm">
              {user?.email || t("profile.emailFallback")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-(--border-color) bg-(--bg-primary) px-4 py-2 text-sm font-bold text-(--text-primary) hover:bg-(--bg-secondary) transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? t("profile.light") : t("profile.dark")}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
            >
              {t("profile.logOut")}
            </button>
          </div>
        </header>

        {activeTab === "blogs" && (
          <>
            <section className="max-w-6xl mx-auto">
              <div className="flex justify-center items-center my-8  relative">
                <h2 className="text-4xl font-black text-(--primary-500) tracking-tight">
                  {t("profile.blogs")}
                </h2>
                <div className="absolute left-0 flex items-center gap-2">
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
                {blogMode === "update" && (
                  <p className="absolute left-0 top-12 text-sm font-semibold text-(--text-secondary)">
                    {t("profile.selectBlogUpdate")}
                  </p>
                )}
                {blogMode === "delete" && (
                  <p className="absolute left-0 top-12 text-sm font-semibold text-(--primary-500)">
                    {t("profile.selectBlogDelete")}
                  </p>
                )}
                <div className="absolute right-0 flex items-center gap-2 text-sm">
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
                {/* Card blog */}
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
          </>
        )}
        {activeTab === "about" && (
          <>
            <About
              key={user.uuid}
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
          </>
        )}
        {activeTab === "draft" && (
          <>
            <section className="max-w-6xl mx-auto">
              <div className="flex justify-center items-center my-8  relative">
                <h2 className="text-4xl font-black text-(--primary-500) tracking-tight">
                  {t("profile.drafts")}
                </h2>
                <div className="absolute left-0 flex items-center gap-2">
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
                {draftMode === "delete" && (
                  <p className="absolute left-0 top-12 text-sm font-semibold text-(--primary-500)">
                    {t("profile.selectDraftDelete")}
                  </p>
                )}
                <div className="absolute right-0 flex items-center gap-2 text-sm">
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
                {/* Draft blogs */}
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
          </>
        )}
      </main>

      {blogToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
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
