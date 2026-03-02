  // Reusable Google button
  const GoogleButton = ({ text }) => (
    <button
      type="button"
      className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base"
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "var(--bg-secondary)")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--bg-primary)")}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-4 h-4 sm:w-5 sm:h-5"
      />
      <span className="text-xs sm:text-sm font-semibold">Continue with {text}</span>
    </button>
  );

  export default GoogleButton;