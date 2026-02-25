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
