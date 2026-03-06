import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useUserLoginMutation } from "../app/features/auth/auth";
import {
  storeAccessToken,
  storeRefreshToken,
  getDecryptedAccessToken,
} from "../util/tokenUtil";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import logo from "../assets/DaliyWriteLogo.svg";
import logIn from "../assets/Auth/login.svg";
import signUp from "../assets/Auth/sign-up-animate.svg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "../components/Button/Google";
import DecorativeBlobs from "../components/DecorativeBlobs";
import BackToHome from "../components/Button/BackHome";
import { firebaseAuth, googleProvider } from "../app/firebase";
import { useI18n } from "../i18n/useI18n";

// Reusable error message - moved outside component
const ErrorMessage = ({ error }) =>
  error && (
    <div
      className="mb-4 p-3 text-xs sm:text-sm rounded-lg sm:rounded-xl text-center"
      style={{
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        border: "1px solid rgba(239, 68, 68, 0.2)",
        color: "rgb(239, 68, 68)",
      }}
    >
      {error}
    </div>
  );

// Reusable divider - moved outside component
const Divider = ({ text }) => (
  <div
    className="py-2 sm:py-4 flex items-center before:flex-1 before:border-t after:flex-1 after:border-t"
    style={{
      before: { borderColor: "var(--border-color)" },
      after: { borderColor: "var(--border-color)" },
    }}
  >
    <p
      className="mx-3 sm:mx-4 text-xs font-medium uppercase"
      style={{ color: "var(--text-secondary)" }}
    >
      {text}
    </p>
  </div>
);

/* ---------------------- Validation Schemas ---------------------- */
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string(),
});

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one digit" })
      .regex(/[^a-zA-Z0-9]/, { message: "Must contain at least one symbol" }),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const LoginPage = () => {
  const { t } = useI18n();
  const [view, setView] = useState("login");
  const [error, setError] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [
    loginUser,
    { data: userResponse, isLoading, isError, error: loginError },
  ] = useUserLoginMutation();

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Register form
  const {
    register: regRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: regErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (userResponse?.data?.accessToken) {
      storeAccessToken(userResponse.data.accessToken);
      if (userResponse.data.refreshToken) {
        storeRefreshToken(userResponse.data.refreshToken);
      }
      const realAccessToken = getDecryptedAccessToken();
      console.log("Real Access Token: ", realAccessToken);
      setIsGoogleLoading(false);
      navigate("/");
    }
  }, [userResponse, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const accessToken =
      searchParams.get("accessToken") || searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const oauthError = searchParams.get("error") || searchParams.get("message");

    if (accessToken) {
      storeAccessToken(accessToken);
      if (refreshToken) {
        storeRefreshToken(refreshToken);
      }
      setIsGoogleLoading(false);
      navigate("/", { replace: true });
      return;
    }

    if (oauthError) {
      setError(decodeURIComponent(oauthError));
      setIsGoogleLoading(false);
      navigate("/auth", { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (isError) {
      setIsGoogleLoading(false);
      setError(
        loginError?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  }, [isError, loginError]);

  /* ---------------------- Submit Handlers ---------------------- */
  const onLogin = async (data) => {
    setError("");
    setIsGoogleLoading(false);
    try {
      await loginUser({ email: data.email, password: data.password }).unwrap();
    } catch (err) {
      console.error("Failed to login: ", err);
      setError(err?.data?.message || "Login failed. Try again.");
    }
  };

  const onRegister = async (data) => {
    setError("");
    setIsGoogleLoading(false);
    try {
      console.log("Register payload:", {
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err?.data?.message || "Registration failed. Try again.");
    }
  };

  const handleSwitch = () => {
    setView(view === "login" ? "register" : "login");
    setError("");
    setIsGoogleLoading(false);
  };

  const handleGoogleLogin = () => {
    setError("");
    setIsGoogleLoading(true);

    const requiredFirebaseEnv = [
      "VITE_FIREBASE_API_KEY",
      "VITE_FIREBASE_AUTH_DOMAIN",
      "VITE_FIREBASE_PROJECT_ID",
      "VITE_FIREBASE_APP_ID",
    ];

    const missingFirebaseEnv = requiredFirebaseEnv.filter(
      (envKey) => !import.meta.env[envKey],
    );

    if (missingFirebaseEnv.length > 0) {
      setError(`Missing Firebase env: ${missingFirebaseEnv.join(", ")}`);
      setIsGoogleLoading(false);
      return;
    }

    signInWithPopup(firebaseAuth, googleProvider)
      .then(async (result) => {
        const firebaseIdToken = await result.user.getIdToken();
        const firebaseRefreshToken = result.user.refreshToken;

        const exchangeUrl = import.meta.env.VITE_FIREBASE_AUTH_EXCHANGE_URL;

        if (exchangeUrl) {
          const response = await fetch(exchangeUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: firebaseIdToken,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to exchange Firebase token with backend.");
          }

          const responseData = await response.json();
          const tokenPayload = responseData?.data || responseData;

          if (!tokenPayload?.accessToken) {
            throw new Error(
              "Backend token exchange did not return accessToken.",
            );
          }

          storeAccessToken(tokenPayload.accessToken);
          storeRefreshToken(tokenPayload.refreshToken || firebaseIdToken);
        } else {
          storeAccessToken(firebaseIdToken);
          storeRefreshToken(firebaseRefreshToken || firebaseIdToken);
        }

        setIsGoogleLoading(false);
        navigate("/");
      })
      .catch((firebaseError) => {
        console.error("Firebase Google login failed:", firebaseError);
        setError(
          firebaseError?.message ||
            "Google login failed. Please check Firebase config and try again.",
        );
        setIsGoogleLoading(false);
      });
  };

  const getInputClassName = (isSelect = false) => {
    return `w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all text-sm sm:text-base ${
      isSelect ? "appearance-none" : ""
    }`;
  };

  // Reusable input focus handlers
  const handleInputFocus = (e) => {
    e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`;
    e.target.style.borderColor = "var(--primary-500)";
  };

  const handleInputBlur = (e) => {
    e.target.style.boxShadow = "none";
    e.target.style.borderColor = "";
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <DecorativeBlobs />
      <BackToHome />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center z-10">
        {/* Illustration - changes based on view */}
        <div
          className={`${view === "login" ? "lg:block" : "lg:block"} hidden lg:block ${view === "register" ? "order-last" : ""}`}
        >
          <div className="relative">
            <img
              src={view === "login" ? logIn : signUp}
              alt={
                view === "login"
                  ? "Login Illustration"
                  : "Register Illustration"
              }
              className={
                view === "login"
                  ? "max-w-lg drop-shadow-2xl"
                  : "max-w-xl drop-shadow-2xl"
              }
            />
          </div>
        </div>

        {/* Form Card */}
        <div
          className={`flex ${view === "login" ? "lg:justify-end" : "lg:justify-start"} justify-center col-span-1`}
        >
          <div
            className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-sm w-full max-w-lg"
            style={{
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-12 h-12 sm:w-16 sm:h-16"
                  />
                </div>
              </div>
              <h1
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--primary-500)" }}
              >
                {view === "login" ? t("auth.login") : t("auth.register")}
              </h1>
              <p
                className="mt-1 sm:mt-2 text-center text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {view === "login"
                  ? t("auth.loginSubtitle")
                  : t("auth.registerSubtitle")}
              </p>
            </div>

            <ErrorMessage error={error} />

            {/* Login Form */}
            {view === "login" && (
              <form
                className="space-y-3 sm:space-y-4"
                onSubmit={handleLoginSubmit(onLogin)}
              >
                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    {...loginRegister("email")}
                    placeholder={t("auth.email")}
                    className={`${getInputClassName()} input-field`}
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  {loginErrors.email && (
                    <p className="text-xs mt-1 text-red-600">
                      {loginErrors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("auth.password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      {...loginRegister("password")}
                      placeholder={t("auth.password")}
                      className={`${getInputClassName()} input-field pr-10`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label={
                        showLoginPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <p className="text-xs mt-1 text-red-600">
                      {loginErrors.password.message}
                    </p>
                  )}
                  <div className="text-right mt-1 sm:mt-2">
                    <a
                      href="#"
                      className="text-xs transition-colors hover:underline"
                      style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = "var(--primary-500)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.color = "var(--text-secondary)")
                      }
                    >
                      {t("auth.forgotPassword")}
                    </a>
                  </div>
                </div>

                <Divider text={t("auth.orLoginWith")} />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-bold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base"
                  style={{ backgroundColor: "var(--primary-500)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "var(--primary-700)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "var(--primary-500)")
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                      {t("auth.loggingIn")}
                    </>
                  ) : (
                    t("auth.login")
                  )}
                </button>

                <GoogleButton
                  text={t("auth.google")}
                  onClick={handleGoogleLogin}
                  isLoading={isGoogleLoading}
                />
              </form>
            )}

            {/* Register Form */}
            {view === "register" && (
              <form
                className="space-y-3 sm:space-y-4"
                onSubmit={handleRegisterSubmit(onRegister)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t("auth.firstName")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("auth.firstName")}
                      {...regRegister("firstName")}
                      className={`${getInputClassName()} input-field`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    {regErrors.firstName && (
                      <p className="text-xs mt-1 text-red-600">
                        {regErrors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-xs sm:text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t("auth.lastName")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("auth.lastName")}
                      {...regRegister("lastName")}
                      className={`${getInputClassName()} input-field`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    {regErrors.lastName && (
                      <p className="text-xs mt-1 text-red-600">
                        {regErrors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("auth.email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("auth.email")}
                    {...regRegister("email")}
                    className={`${getInputClassName()} input-field`}
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  {regErrors.email && (
                    <p className="text-xs mt-1 text-red-600">
                      {regErrors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("auth.password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder={t("auth.password")}
                      {...regRegister("password")}
                      className={`${getInputClassName()} input-field pr-10`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label={
                        showRegisterPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {regErrors.password && (
                    <p className="text-xs mt-1 text-red-600">
                      {regErrors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs sm:text-sm font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("auth.confirmPassword")}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("auth.confirmPassword")}
                      {...regRegister("confirmPassword")}
                      className={`${getInputClassName()} input-field pr-10`}
                      style={{
                        backgroundColor: "var(--bg-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-secondary)" }}
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {regErrors.confirmPassword && (
                    <p className="text-xs mt-1 text-red-600">
                      {regErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Divider text={t("auth.orRegisterWith")} />

                <button
                  type="submit"
                  className="w-full text-white font-bold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all active:scale-[0.98] text-sm sm:text-base"
                  style={{ backgroundColor: "var(--primary-500)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "var(--primary-700)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "var(--primary-500)")
                  }
                >
                  {t("auth.register")}
                </button>

                <GoogleButton
                  text={t("auth.google")}
                  onClick={handleGoogleLogin}
                  isLoading={isGoogleLoading}
                />
              </form>
            )}

            {/* Switch between login and register */}
            <div className="mt-4 sm:mt-6 text-center">
              <p
                className="text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {view === "login" ? t("auth.noAccount") : t("auth.haveAccount")}
                <span
                  className="font-bold hover:underline cursor-pointer"
                  style={{ color: "var(--primary-500)" }}
                  onMouseEnter={(e) =>
                    (e.target.style.color = "var(--primary-700)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.color = "var(--primary-500)")
                  }
                  onClick={handleSwitch}
                >
                  {view === "login" ? t("auth.register") : t("auth.login")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
