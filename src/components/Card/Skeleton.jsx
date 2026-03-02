export default function SkeletonCard() {
  return (
    <section className="w-full">
      <div className="rounded-3xl overflow-hidden mb-8">
        <div className="w-full h-100 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
      </div>

      <div className="space-y-3">
        <div className="h-12 md:h-14 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
        <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700 rounded-md opacity-90" />
      </div>
    </section>
  );
}

export function Skeleton() {
  return (
    <div className="flex gap-4 items-start animate-pulse">
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
  );
}
