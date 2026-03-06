import {
  useGetAllProductByCurrentUserUuidQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import { useEffect } from "react";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function DraftBlog({
  page = 0,
  pageSize = 12,
  mode = "view",
  sortBy = "latest",
  onTotalPagesChange,
  onRequestDelete,
}) {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;

  const { data, isLoading, isError } = useGetAllProductByCurrentUserUuidQuery(
    { userUuid: currentUser?.uuid, pageNumber: 0, pageSize: 1000 },
    { skip: !currentUser?.uuid },
  );
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content || data?.data || data || [];
  const user = userData?.data?.content || userData?.data || userData || [];

  const userDraftBlogs = productData.filter(
    (blog) => blog.status?.toUpperCase() === "DRAFT",
  );

  const sortedDraftBlogs = [...userDraftBlogs].sort((a, b) => {
    const dateA = new Date(a?.createdAt || 0).getTime();
    const dateB = new Date(b?.createdAt || 0).getTime();

    if (sortBy === "oldest") {
      return dateA - dateB;
    }

    return dateB - dateA;
  });

  const totalPages = Math.ceil(sortedDraftBlogs.length / pageSize);
  const paginatedBlogs = sortedDraftBlogs.slice(
    page * pageSize,
    page * pageSize + pageSize,
  );

  useEffect(() => {
    onTotalPagesChange?.(totalPages);
  }, [onTotalPagesChange, totalPages]);

  if (isError) {
    return <div>Error loading drafts</div>;
  }

  if (isLoading || !data || !currentUser) {
    return (
      <div className="contents">
        {[...Array(pageSize)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (sortedDraftBlogs.length === 0) {
    return (
      <div className="col-span-full py-10 text-center text-gray-500 text-lg">
        No draft blogs found.
      </div>
    );
  }

  return (
    <>
      {paginatedBlogs.map((blog) => {
        const author = user?.find((u) => u.uuid === blog.authorUuid);
        return (
          <BlogCard
            key={blog.id}
            uuid={blog.uuid}
            status={blog.status}
            image={blog.thumbnailUrl}
            author={author?.fullName || currentUser?.fullName}
            tag="DRAFT"
            title={blog.title}
            summary={blog.content}
            views={blog.view}
            time={new Date(blog.createdAt).toLocaleDateString()}
            userImage={author?.profileUrl || currentUser?.profileUrl}
            mode={mode}
            onDelete={() => onRequestDelete?.(blog)}
          />
        );
      })}
    </>
  );
}
