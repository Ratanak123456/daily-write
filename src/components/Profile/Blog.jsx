import {
  useGetAllProductByCurrentUserUuidQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import { useEffect } from "react";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";
import { useNavigate } from "react-router-dom";

export default function Blog({
  page = 0,
  pageSize = 12,
  mode = "view",
  sortBy = "latest",
  onTotalPagesChange,
  onRequestDelete,
}) {
  const navigate = useNavigate();
  const { data: currentUserData } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;

  const { data, isLoading, isError } = useGetAllProductByCurrentUserUuidQuery(
    { userUuid: currentUser?.uuid, pageNumber: 0, pageSize: 1000 },
    { skip: !currentUser?.uuid },
  );
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content || data?.data || data || [];
  const user = userData?.data?.content || userData?.data || userData || [];

  const userPublishedBlogs = productData.filter(
    (blog) => blog.status?.toUpperCase() === "PUBLISHED",
  );

  const sortedPublishedBlogs = [...userPublishedBlogs].sort((a, b) => {
    const dateA = new Date(a?.createdAt || 0).getTime();
    const dateB = new Date(b?.createdAt || 0).getTime();

    if (sortBy === "oldest") {
      return dateA - dateB;
    }

    return dateB - dateA;
  });

  const totalPages = Math.ceil(sortedPublishedBlogs.length / pageSize);
  const paginatedBlogs = sortedPublishedBlogs.slice(
    page * pageSize,
    page * pageSize + pageSize,
  );

  useEffect(() => {
    onTotalPagesChange?.(totalPages);
  }, [onTotalPagesChange, totalPages]);

  if (isLoading || !data || !currentUser) {
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

  if (sortedPublishedBlogs.length === 0) {
    return (
      <div className="col-span-full py-10 text-center text-gray-500 text-lg">
        You haven't published any blogs yet.
      </div>
    );
  }

  return (
    <>
      {paginatedBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          uuid={blog.uuid}
          status={blog.status}
          image={blog.thumbnailUrl}
          author={
            user?.find((u) => u.uuid === blog.authorUuid)?.fullName ||
            currentUser?.fullName
          }
          tag={blog.blogCategory}
          title={blog.title}
          summary={blog.content}
          views={blog.view}
          time={new Date(blog.createdAt).toLocaleDateString()}
          userImage={
            user?.find((u) => u.uuid === blog.authorUuid)?.profileUrl ||
            currentUser?.profileUrl
          }
          mode={mode}
          onCardClick={() => {
            if (mode === "update") {
              navigate(`/blog-post?uuid=${blog.uuid}`);
            }
          }}
          onDelete={() => onRequestDelete?.(blog)}
        />
      ))}
    </>
  );
}
