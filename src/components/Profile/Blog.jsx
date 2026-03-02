import {
  useGetAllProductByCurrentUserUuidQuery,
  useGetAllUserQuery,
} from "../../app/features/services/productApi";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import BlogCard from "../Card/BlogCard";
import SkeletonCard from "../Card/Skeleton";

export default function Blog({ page = 0, pageSize = 12 }) {
  const { data: currentUserData } = useGetCurrentUserQuery();
  const currentUser = currentUserData?.data;

  const { data, isLoading, isError } = useGetAllProductByCurrentUserUuidQuery(
    { userUuid: currentUser?.uuid, pageNumber: page, pageSize },
    { skip: !currentUser?.uuid }
  );
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content || data?.data || data || [];
  const user = userData?.data?.content || userData?.data || userData || [];

  if (isLoading || !data || !currentUser) {
    return (
      <div className="flex gap-8 p-4 max-w-2xl mx-auto">
        {[...Array(pageSize)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div>Error loading blogs</div>;
  }

  // Filter only PUBLISHED blogs for the main blog tab that belong to current user
  const userPublishedBlogs = productData.filter(
    (blog) => blog.status?.toUpperCase() === "PUBLISHED"
  );

  if (userPublishedBlogs.length === 0) {
    return <div className="col-span-full py-10 text-center text-gray-500 text-lg">You haven't published any blogs yet.</div>;
  }

  return (
    <>
      {userPublishedBlogs.map((blog) => (
        <BlogCard
          key={blog.id}
          uuid={blog.uuid}
          status={blog.status}
          image={blog.thumbnailUrl}
          author={user?.find((u) => u.uuid === blog.authorUuid)?.fullName || currentUser?.fullName}
          tag={blog.blogCategory}
          title={blog.title}
          summary={blog.content}
          views={blog.view}
          time={new Date(blog.createdAt).toLocaleDateString()}
          userImage={
            user?.find((u) => u.uuid === blog.authorUuid)?.profileUrl || currentUser?.profileUrl
          }
        />
      ))}
    </>
  );
}
