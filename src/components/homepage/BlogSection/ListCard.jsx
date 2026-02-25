import { useState, useEffect } from "react";
import { Card, CardSidBar } from "../../Card/HomepageCard";
import SkeletonCard, { Skeleton } from "../../Card/Skeleton";

export default function ListCard() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://blog-api.bykh.org/api/v100/blogs?pageSize=1",
        );
        const result = await response.json();
        setData(result.data.content);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          "https://blog-api.bykh.org/api/v100/users",
        );
        const result = await response.json();
        setUser(result.data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);
  if (loading) return <SkeletonCard />;
  if (error) return <div>Error: {error}</div>;
  if (data.length === 0) return <Skeleton />;
  return (
    <>
      {data.map((item) => (
        <Card
          key={item.uuid}
          title={item.title}
          description={item.content}
          image={item.thumbnailUrl}
          user={
            user.find((u) => u.uuid === item.authorUuid)?.fullName ||
            item.authorUuid
          }
          userImage={
            user.find((u) => u.uuid === item.authorUuid)?.profileUrl || null
          }
        />
      ))}
    </>
  );
}

export function SideBar() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://blog-api.bykh.org/api/v100/blogs?pageSize=6",
        );
        const result = await response.json();
        setData(result.data.content);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(
          "https://blog-api.bykh.org/api/v100/users",
        );
        const result = await response.json();
        setUser(result.data.content);
      } catch (err) {
        setError(err.message);
      }
    }
    getUser();
  }, []);

  if (error) return <div>Error: {error}</div>;

if (data.length === 0) {
  return (
    <div className="flex flex-col gap-8 p-4 max-w-2xl mx-auto">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex gap-4 items-start animate-pulse">
          
          {/* Left Side: Text Content */}
          <div className="flex-1 space-y-3">
            {/* Category Skeleton */}
            <div className="h-4 w-20 bg-gray-200 rounded" />
            
            {/* Title Skeletons (2 lines) */}
            <div className="space-y-2">
              <div className="h-5 w-full bg-gray-200 rounded" />
              <div className="h-5 w-2/3 bg-gray-200 rounded" />
            </div>
            
            {/* Footer Metadata (Date and User) */}
            <div className="flex items-center gap-4 mt-4">
              <div className="h-3 w-16 bg-gray-100 rounded" />
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full" />
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
            </div>
          </div>

          {/* Right Side: Image Skeleton (Matches your w-28 h-20) */}
          <div className="w-28 h-20 bg-gray-200 rounded-xl shrink-0" />
          
        </div>
      ))}
    </div>
  );
}
  return (
    <div className="space-y-8">
      {data.map((item) => (
        <CardSidBar
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
            user.find((u) => u.uuid === item.authorUuid)?.fullName ||
            item.authorUuid
          }
          userImage={
            user.find((u) => u.uuid === item.authorUuid)?.profileUrl || null
          }
        />
      ))}
    </div>
  );
}
