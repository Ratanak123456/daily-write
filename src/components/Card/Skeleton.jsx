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

export function BlogDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-3 sm:px-6 lg:px-10">
      {/* Hero Image Skeleton */}
      <div className="h-55 w-full rounded-sm bg-gray-200 dark:bg-gray-700 sm:h-80 md:h-105" />

      <div className="mx-auto mt-6 max-w-5xl">
        {/* Title Skeleton */}
        <div className="h-10 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700 sm:h-12" />

        {/* Metadata Skeleton */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-1">
              <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-2 w-16 rounded bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
          <div className="h-4 w-20 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-4 w-20 rounded bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Content Skeleton */}
        <div className="mt-8 space-y-4">
          <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-4 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-4 w-full rounded bg-gray-100 dark:bg-gray-800" />
          <div className="h-4 w-4/5 rounded bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Related Posts Skeleton */}
        <div className="mt-10">
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex min-h-32 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="h-full w-32 bg-gray-200 dark:bg-gray-700 sm:w-40" />
                <div className="flex-1 p-3 space-y-2">
                  <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex min-h-screen animate-pulse flex-col lg:flex-row bg-(--bg-primary)">
      {/* Sidebar Skeleton */}
      <aside className="hidden lg:block w-64 border-r border-(--border-color) p-6 space-y-8">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 w-full bg-gray-100 dark:bg-gray-800 rounded-xl" />
          ))}
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-4 lg:p-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row justify-center items-center my-8 gap-4">
            <div className="h-12 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div>

          {/* Grid Skeleton */}
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
