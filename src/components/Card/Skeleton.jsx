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
    <section className="w-full flex items-center justify-between gap-6 py-4">
  {/* Left Content: Text Stack */}
  <div className="flex-1 space-y-4">
    {/* Category Tag (Orange 'SPACE' text) */}
    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    
    {/* Title (Jupiter: King of the Planets) */}
    <div className="h-8 w-11/12 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
    
    {/* Meta Data (Date and Author) */}
    <div className="flex items-center gap-3">
      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  </div>

  {/* Right Content: Thumbnail Image */}
  <div className="shrink-0">
    <div className="w-32 h-24 md:w-40 md:h-28 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
  </div>
</section>
  )
}

