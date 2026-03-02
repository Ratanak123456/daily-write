import {
  useGetAllProductByCurrentUserUuidQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function DraftBlog({ page = 0, pageSize = 12 }) {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;

  const { data, isLoading, isError } = useGetAllProductByCurrentUserUuidQuery(
    { userUuid: currentUser?.uuid, pageNumber: page, pageSize },
    { skip: !currentUser?.uuid }
  );
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content || data?.data || data || [];
  const user = userData?.data?.content || userData?.data || userData || [];

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

  const userDraftBlogs = productData.filter(
    (blog) =>
      blog.status?.toUpperCase() === "DRAFT",
  );

  if (userDraftBlogs.length === 0) {
    return (
      <div className="col-span-full py-10 text-center text-gray-500 text-lg">
        No draft blogs found.
      </div>
    );
  }

  return (
    <>
      {userDraftBlogs.map((blog) => {
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
          />
        );
      })}
    </>
  );
}
