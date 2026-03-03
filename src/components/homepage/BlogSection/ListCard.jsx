import { Card, CardSidBar } from "../../Card/HomepageCard";
import SkeletonCard, { Skeleton } from "../../Card/Skeleton";
import {
  useGetAllProductQuery,
  useGetAllUserQuery,
  useGetLatestBlogsQuery,
  useGetTrendingBlogsQuery,
} from "../../../app/features/services/productApi";

export default function ListCard() {
  const { data, isLoading, isError } = useGetAllProductQuery({ pageNumber: 0, pageSize: 20 });
  const { data: userData } = useGetAllUserQuery();

  if (isLoading || isError) return <SkeletonCard />;

  const productData = data?.data?.content;
  const user = userData?.data?.content;

  // Manually find the blog with the highest view count
  const mostViewedBlog = productData && productData.length > 0 
    ? [...productData].reduce((prev, current) => (prev.view > current.view) ? prev : current)
    : null;

  if (!mostViewedBlog) return null;

  return (
    <>
      <Card
        uuid={mostViewedBlog.uuid}
        key={mostViewedBlog.uuid}
        title={mostViewedBlog.title}
        description={mostViewedBlog.content}
        image={mostViewedBlog.thumbnailUrl}
        user={
          user?.find((u) => u.uuid === mostViewedBlog.authorUuid)?.fullName ||
          mostViewedBlog.authorUuid
        }
        userImage={
          user?.find((u) => u.uuid === mostViewedBlog.authorUuid)?.profileUrl || null
        }
        view={mostViewedBlog.view}
      />
    </>
  );
}
export function SideBar() {
  const { data, isLoading, isError } = useGetTrendingBlogsQuery();
  const { data: userData } = useGetAllUserQuery();

  const productData = data?.data?.content;
  const user = userData?.data?.content;

  if (!productData || productData.length === 0 || isError || isLoading) {
    return (
      <div className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {productData.map((item) => (
        <CardSidBar
          uuid={item.uuid}
          key={item.uuid}
          title={item.title}
          image={item.thumbnailUrl}
          blogCategory={item.blogCategory}
          view={item.view}
          createdAt={new Date(item.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          user={
            user?.find((u) => u.uuid === item.authorUuid)?.fullName ||
            item.authorUuid
          }
          userImage={
            user?.find((u) => u.uuid === item.authorUuid)?.profileUrl || null
          }
        />
      ))}
    </div>
  );
}
