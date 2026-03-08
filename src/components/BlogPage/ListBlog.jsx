import {
  useGetAllProductQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function ListBlog({
  blogs = [],
  isLoading = false,
  pageSize = 12,
  onTagClick,
}) {
  const { data: userData } = useGetAllUserQuery();
  const user = userData?.data?.content;

  if (isLoading) {
    return (
      <div className="contents">
        {[...Array(pageSize)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="col-span-full py-10 text-center text-gray-500 text-lg">
        No blogs found matching your criteria.
      </div>
    );
  }

  return (
    <>
      {blogs.map((blog) => {
        const author = user?.find((u) => u.uuid === blog.authorUuid);
        return (
          <BlogCard
            key={blog.uuid}
            image={blog.thumbnailUrl}
            author={author?.fullName || "Unknown Author"}
            tag={blog.blogCategory}
            title={blog.title}
            summary={blog.content}
            views={blog.view}
            time={new Date(blog.createdAt).toLocaleDateString()}
            userImage={author?.profileUrl}
            uuid={blog.uuid}
            onTagClick={onTagClick}
          />
        );
      })}
    </>
  );
}
