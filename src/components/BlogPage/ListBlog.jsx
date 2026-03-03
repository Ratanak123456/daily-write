import {
  useGetAllProductQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function ListBlog({
  page = 0,
  pageSize = 12,
  sortBy = "createdAt,desc",
  searchQuery = "",
}) {
  const { data, isLoading, isError } = useGetAllProductQuery({
    pageNumber: page,
    pageSize,
    sortBy,
  });
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content;
  const user = userData?.data?.content;

  if (isLoading || !productData) {
    return (
      <div className="contents">
        {[...Array(pageSize)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading blogs</div>;
  }

  // Filter and Sort data on the client side to ensure it works as expected
  let displayData = [...productData];

  // Apply search filtering
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    displayData = displayData.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(query) ||
        blog.content?.toLowerCase().includes(query) ||
        blog.blogCategory?.toLowerCase().includes(query),
    );
  }

  // Apply sorting
  displayData.sort((a, b) => {
    if (sortBy === "view,desc") {
      return (b.view || 0) - (a.view || 0);
    } else if (sortBy === "createdAt,desc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "createdAt,asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  if (displayData.length === 0) {
    return (
      <div className="col-span-full py-10 text-center text-gray-500 text-lg">
        No blogs found matching your criteria.
      </div>
    );
  }
  
  return (
    <>
      {displayData.map((blog) => {
        const author = user?.find((u) => u.uuid === blog.authorUuid);
        return (
          <BlogCard
            key={blog.id}
            image={blog.thumbnailUrl}
            author={author?.fullName || "Unknown Author"}
            tag={blog.blogCategory}
            title={blog.title}
            summary={blog.content}
            views={blog.view}
            time={new Date(blog.createdAt).toLocaleDateString()}
            userImage={author?.profileUrl}
            uuid={blog.uuid}
          />
        );
      })}
    </>
  );
}
