  // Reusable decorative blobs component
  const DecorativeBlobs = () => (
    <>
      <div
        className="absolute top-[-20%] left-[-20%] w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-30 sm:opacity-50"
        style={{ backgroundColor: "var(--primary-500)" }}
      />
      <div
        className="absolute bottom-[-20%] right-[-20%] w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-30 sm:opacity-50"
        style={{ backgroundColor: "var(--primary-500)" }}
      />
    </>
  );
  
  export default DecorativeBlobs;