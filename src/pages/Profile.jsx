import React, { useState } from "react";
import {
  User,
  Info,
  Bookmark,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bookmark as BookmarkIcon,
} from "lucide-react";
import { useGetCurrentUserQuery } from "../app/features/auth/auth";
import { getDecryptedRefreshToken, clearTokens } from "../util/tokenUtil";
import { useNavigate } from "react-router-dom";
import { useGetAllProductQuery } from "../app/features/services/productApi";
import ListBlog from "../components/BlogPage/ListBlog";
import About from "../components/Profile/About";
import Blog from "../components/Profile/Blog";
import DraftBlog from "../components/Profile/DraftBlog";

const Profile = () => {
  const navigate = useNavigate();
  const token = getDecryptedRefreshToken();
  const [page, setPage] = useState(0);
  const pageSize = 12;

  const { data } = useGetAllProductQuery({ pageNumber: page, pageSize });
  const totalPages = data?.data?.totalPages || 0;
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

  const handleLogout = () => {
    clearTokens();
    navigate("/");
    window.location.reload();
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
          <div className="w-8 h-8 bg-(--primary-500) bg-opacity-10 rounded-lg flex items-center justify-center">
            <span className="text-(--primary-500) text-xl">🖋️</span>
          </div>
          <h1 className="font-bold text-xl text-(--text-primary)">
            DailyWrite
          </h1>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("blogs")}
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
            <User size={18} /> Profile
          </button>
          <button
            onClick={() => setActiveTab("about")}
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
            <Info size={18} /> About
          </button>
          <button
            onClick={() => setActiveTab("draft")}
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
            <Bookmark size={18} /> Draft
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
              {user?.fullName || "User"}
            </h2>
            <p className="text-(--text-secondary) text-sm">
              {user?.email || "email@example.com"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
        </header>

        {activeTab === "blogs" && (
          <>
            <section className="max-w-6xl mx-auto">
              <div className="flex justify-center items-center my-8  relative">
                <h2 className="text-4xl font-black text-(--primary-500) tracking-tight">
                  Blogs
                </h2>
                <div className="absolute right-0 flex items-center gap-2 text-sm">
                  <span className="text-(--text-secondary)">Sort by:</span>
                  <button className="flex items-center gap-1 border border-(--border-color) rounded-lg px-3 py-1 bg-(--bg-primary) text-(--text-primary)">
                    Latest <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Card blog */}
                <Blog page={page} pageSize={pageSize} />
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
                  Drafts
                </h2>
                <div className="absolute right-0 flex items-center gap-2 text-sm">
                  <span className="text-(--text-secondary)">Sort by:</span>
                  <button className="flex items-center gap-1 border border-(--border-color) rounded-lg px-3 py-1 bg-(--bg-primary) text-(--text-primary)">
                    Latest <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* Draft blogs */}
                <DraftBlog page={page} pageSize={pageSize} />
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
    </div>
  );
};

export default Profile;
