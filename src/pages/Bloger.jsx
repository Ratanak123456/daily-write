import React from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../components/Card/BlogCard";
import { 
  useGetAllUserQuery, 
  useGetAllProductByCurrentUserUuidQuery 
} from "../app/features/services/productApi";

export default function Bloger() {
  const { uuid } = useParams();

  // Fetch all users to find the specific blogger
  const { data: usersResult, isLoading: usersLoading } = useGetAllUserQuery();
  
  // Fetch blogs by this specific author
  const { 
    data: blogsResult, 
    isLoading: blogsLoading 
  } = useGetAllProductByCurrentUserUuidQuery({ userUuid: uuid });

  // Handle both direct blog return and wrapped response
  const users = usersResult?.data?.content || usersResult || [];
  const blogger = users.find((u) => u.uuid === uuid);
  const blogs = blogsResult?.data?.content || blogsResult || [];

  if (usersLoading || blogsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50/30">
        <p className="text-lg text-orange-500 animate-pulse font-semibold">Loading Blogger Profile...</p>
      </div>
    );
  }

  if (!blogger) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-orange-50/30">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">Blogger Not Found</p>
          <p className="text-gray-500">The user you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50/30 min-h-screen p-6 md:p-12 font-sans text-gray-800 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-20 -left-20 w-64 h-64 border border-orange-200 rounded-full opacity-50"></div>
      <div className="absolute -top-10 -left-10 w-64 h-64 border border-orange-200 rounded-full opacity-50"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Sidebar: Blogger Profile */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-orange-400 overflow-hidden">
                <img
                  src={blogger.profileUrl || "https://via.placeholder.com/150"}
                  alt={blogger.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-sm">
                <span className="text-xs">✌️</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900">{blogger.fullName}</h2>
            <p className="text-gray-500 text-sm mb-6 truncate w-full">{blogger.email}</p>

            <div className="w-full border-t border-gray-100 pt-6 mb-6">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                Member Since
              </p>
              <p className="text-lg font-bold text-gray-700">
                {blogger.createdAt ? new Date(blogger.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "N/A"}
              </p>
            </div>

            <div className="w-full space-y-3">
              <div className="w-full bg-orange-500 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium shadow-sm">
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
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content: Blogger's Blogs */}
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-orange-500">
              Blogs by {blogger.fullName.split(' ')[0]}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Total:</span>
              <span className="font-bold text-orange-600">{blogs.length} Posts</span>
            </div>
          </div>

          {blogs.length > 0 ? (
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
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
              <svg 
                className="mx-auto h-12 w-12 text-gray-300 mb-4" 
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
              <p className="text-gray-500 font-medium">This author hasn't published any blogs yet.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
