import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../app/firebase/firebaseConfig";

const GoogleButton = ({
  text,
  isLoading = false,
  onSuccess,
  onError,
  onClick,
}) => {
  const handleGoogleSignIn = async () => {
    if (typeof onClick === "function") {
      onClick();
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      onSuccess?.(result);
    } catch (error) {
      onError?.(error);
      // Keep a visible trace while integration is in progress.
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all text-sm sm:text-base mt-2"
      style={{
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
        opacity: isLoading ? 0.7 : 1,
        cursor: isLoading ? "not-allowed" : "pointer",
      }}
      onMouseEnter={(e) => {
        if (isLoading) return;
        e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--bg-primary)";
      }}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-4 h-4 sm:w-5 sm:h-5"
      />
      <span className="text-xs sm:text-sm font-semibold">
        {isLoading ? "Connecting..." : `Continue with ${text}`}
      </span>
    </button>
  );
};

export default GoogleButton;
