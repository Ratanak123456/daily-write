import { Card, CardSidBar } from "../../../../components/Card/HomepageCard";
import SkeletonCard, { Skeleton } from "../../../../components/Card/Skeleton";
import { useGetAllProductQuery, useGetAllUserQuery, useGetTrendingBlogsQuery } from "../../../../app/features/services/productApi";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation";

export default function ListCard() {
  const { data, isLoading, isError } = useGetAllProductQuery({ pageNumber: 0, pageSize: 100 });
  const { data: userData } = useGetAllUserQuery();
  const { ref: animationRef, isInView } = useScrollAnimation({ id: 'home-blog-list', amount: 0.1 });

  return (
    <div 
      ref={animationRef} 
      className={`transition-all duration-1000 ease-out transform ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        willChange: 'transform, opacity'
      }}
    >
      {isLoading || isError ? (
        <SkeletonCard />
      ) : (() => {
        const blogs = data?.data?.content || [];
        const user = userData?.data?.content;
        const mostViewedBlog = [...blogs].sort((a, b) => b.view - a.view)[0];

        if (!mostViewedBlog) return null;

        return (
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
        );
      })()}
    </div>
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
      {productData.map((item, index) => (
        <div 
          key={item.uuid}
          className=""
          style={{ 
            animationDelay: `${index * 0.1}s`,
            animationFillMode: "forwards",
            willChange: 'transform, opacity'
          }}
        >
          <CardSidBar
            uuid={item.uuid}
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
        </div>
      ))}
    </div>
  );
}
