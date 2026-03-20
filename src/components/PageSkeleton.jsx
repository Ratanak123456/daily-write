const Box = ({ className = "" }) => (
  <div className={`animate-pulse rounded-xl bg-gray-200/80 ${className}`} />
);

function HomeSkeleton() {
  return (
    <main className="bg-bg-main px-4 py-8 sm:px-6 lg:px-10">
      <section className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <Box className="h-5 w-28" />
          <Box className="h-12 w-5/6" />
          <Box className="h-5 w-full" />
          <Box className="h-5 w-4/5" />
          <Box className="h-10 w-40" />
        </div>
        <Box className="h-72 w-full" />
      </section>
      <section className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Box key={i} className="h-56 w-full" />
        ))}
      </section>
    </main>
  );
}

function AboutSkeleton() {
  return (
    <main className="bg-bg-main px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {[...Array(5)].map((_, i) => (
          <Box key={i} className="h-60 w-full" />
        ))}
      </div>
    </main>
  );
}

function BlogListSkeleton() {
  return (
    <main className="bg-bg-main px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Box className="h-10 w-2/5" />
        <Box className="mt-4 h-12 w-full" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(12)].map((_, i) => (
            <Box key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}

function BlogPostSkeleton() {
  return (
    <main className="bg-bg-main px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <Box className="h-10 w-40" />
          <Box className="h-10 w-48" />
        </div>
        <Box className="h-16 w-full" />
        <Box className="h-64 w-full" />
        <Box className="h-12 w-full" />
        <Box className="h-72 w-full" />
      </div>
    </main>
  );
}

function AuthSkeleton() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-main px-4 py-8 sm:px-6">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-2">
        <Box className="hidden h-[540px] w-full lg:block" />
        <Box className="h-[540px] w-full" />
      </div>
    </main>
  );
}

function ProfileSkeleton() {
  return (
    <main className="bg-bg-main px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl gap-6">
        <Box className="hidden h-[620px] w-64 lg:block" />
        <div className="flex-1">
          <Box className="h-14 w-56" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Box key={i} className="h-56 w-full" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function BlogDetailSkeleton() {
  return (
    <main className="bg-bg-main px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <Box className="h-72 w-full" />
        <Box className="h-10 w-4/5" />
        <Box className="h-4 w-40" />
        <div className="space-y-3">
          {[...Array(7)].map((_, i) => (
            <Box key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}

function BloggerSkeleton() {
  return (
    <main className="bg-bg-main px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <Box className="h-72 w-full lg:w-80" />
        <div className="flex-1">
          <Box className="h-10 w-64" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Box key={i} className="h-56 w-full" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function NotFoundSkeleton() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-main px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        <Box className="mx-auto h-28 w-48" />
        <Box className="mx-auto h-8 w-64" />
        <Box className="mx-auto h-4 w-96 max-w-full" />
        <div className="flex justify-center gap-4">
          <Box className="h-12 w-40" />
          <Box className="h-12 w-40" />
        </div>
      </div>
    </main>
  );
}

export default function PageSkeleton({ variant = "default" }) {
  switch (variant) {
    case "home":
      return <HomeSkeleton />;
    case "about":
      return <AboutSkeleton />;
    case "blogList":
      return <BlogListSkeleton />;
    case "blogPost":
      return <BlogPostSkeleton />;
    case "profile":
      return <ProfileSkeleton />;
    case "blogDetail":
      return <BlogDetailSkeleton />;
    case "auth":
      return <AuthSkeleton />;
    case "blogger":
      return <BloggerSkeleton />;
    case "notFound":
      return <NotFoundSkeleton />;
    default:
      return <BlogListSkeleton />;
  }
}
