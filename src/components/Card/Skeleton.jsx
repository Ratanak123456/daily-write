export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-main bg-bg-main shadow-sm animate-pulse">
      {/* Image Skeleton - Matches h-44 in BlogCard */}
      <div className="h-44 w-full bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-3 p-4">
        {/* Title Skeleton - Matches text-sm line-clamp-1 */}
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

        {/* Info Skeleton - Matches Eye/MessageSquare */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="h-3 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="h-3 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
          </div>
          <div className="h-3 w-12 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>

        {/* Read More Button Skeleton */}
        <div className="flex justify-center pt-1">
          <div className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="flex gap-4 items-start animate-pulse">
      {/* Left Side: Text Content */}
      <div className="flex-1 space-y-3">
        {/* Category Skeleton */}
        <div className="h-4 w-20 bg-gray-200 rounded dark:bg-gray-700" />

        {/* Title Skeletons (2 lines) */}
        <div className="space-y-2">
          <div className="h-5 w-full bg-gray-200 rounded dark:bg-gray-700" />
          <div className="h-5 w-2/3 bg-gray-200 rounded dark:bg-gray-700" />
        </div>

        {/* Footer Metadata (Date and User) */}
        <div className="flex items-center gap-4 mt-4">
          <div className="h-3 w-16 bg-gray-100 rounded dark:bg-gray-800" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full dark:bg-gray-700" />
            <div className="h-3 w-12 bg-gray-100 rounded dark:bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Right Side: Image Skeleton (Matches your w-28 h-20) */}
      <div className="w-28 h-20 bg-gray-200 rounded-xl shrink-0 dark:bg-gray-700" />
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="flex gap-3 items-center animate-pulse py-1">
      {/* Left Side: Text Content */}
      <div className="flex-1 space-y-1.5">
        {/* Category Skeleton */}
        <div className="h-2.5 w-12 bg-gray-200 rounded dark:bg-gray-700" />

        {/* Title Skeletons */}
        <div className="space-y-1">
          <div className="h-3.5 w-full bg-gray-200 rounded dark:bg-gray-700" />
        </div>

        {/* Footer Metadata */}
        <div className="flex items-center gap-3 mt-1">
          <div className="h-2 w-10 bg-gray-100 rounded dark:bg-gray-800" />
          <div className="h-2 w-8 bg-gray-100 rounded dark:bg-gray-800" />
        </div>
      </div>

      {/* Right Side: Image Skeleton */}
      <div className="w-20 h-14 bg-gray-200 rounded-lg shrink-0 dark:bg-gray-700" />
    </div>
  );
}