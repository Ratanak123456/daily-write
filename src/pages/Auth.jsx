import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  storeAccessToken,
  storeRefreshToken,
  storeAuthProvider,
} from "../utils/tokenUtil";
import { useNavigate } from "react-router-dom";
import logo from "../assets/DailyWriteLogo.svg";
import logIn from "../assets/auth/login.svg";
import signUp from "../assets/auth/sign-up-animate.svg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DecorativeBlobs from "../components/DecorativeBlobs";
import BackToHome from "../components/Button/BackHome";
import { useI18n } from "../i18n/useI18n";
import GoogleButton from "../components/Button/Google";
import {
  useUserLoginMutation,
  useUserRegisterMutation,
} from "../app/features/auth/auth";
import { usePatchUserMutation } from "../app/features/services/productApi";

// Reusable error message
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

// Reusable divider
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
const emailSchema = z.string().trim().toLowerCase().email("Please enter a valid email");

const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name required"),
    lastName: z.string().min(2, "Last name required"),
    email: emailSchema,
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
  const [successMessage, setSuccessMessage] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();
  const [userLogin] = useUserLoginMutation();
  const [userRegister] = useUserRegisterMutation();
  const [patchUser] = usePatchUserMutation();

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
    reset: resetRegisterForm,
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

  const persistAuth = (accessToken, refreshToken, provider = "backend") => {
    storeAccessToken(accessToken);
    if (refreshToken) {
      storeRefreshToken(refreshToken);
    }
    storeAuthProvider(provider);
  };

  const extractTokens = (response) => {
    const payload = response?.data || response || {};
    const accessToken =
      payload.accessToken || payload.token || payload.idToken || null;
    const refreshToken = payload.refreshToken || payload.refresh_token || null;

    return { accessToken, refreshToken };
  };

  const displayError = error;

  const onLogin = async (data) => {
    setError("");
    setSuccessMessage("");
    setAuthLoading(true);
    try {
      const loginResponse = await userLogin({
        email: data.email,
        password: data.password,
      }).unwrap();
      const { accessToken, refreshToken } = extractTokens(loginResponse);

      if (!accessToken) {
        throw new Error("No access token returned from login API.");
      }

      persistAuth(accessToken, refreshToken, "backend");
      navigate("/", { replace: true });
    } catch (err) {
      setError(
        err?.data?.message ||
          err?.data?.error ||
          err?.message ||
          "Login failed. Try again.",
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const onRegister = async (data) => {
    setError("");
    setSuccessMessage("");
    setAuthLoading(true);
    try {
      await userRegister({
        fullName: `${data.firstName} ${data.lastName}`.trim(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }).unwrap();

      setSuccessMessage("Registration successful! Please check your email to verify your account then log in.");
      resetRegisterForm();
      
      setTimeout(() => {
        setView("login");
      }, 3000);

    } catch (err) {
      setError(
        err?.data?.message ||
          err?.data?.error ||
          err?.message ||
          "Registration failed. Try again.",
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSwitch = () => {
    setView(view === "login" ? "register" : "login");
    setError("");
    setSuccessMessage("");
  };

  const handleGoogleSuccess = async (result) => {
    const googleUser = result?.user ?? null;
    if (!googleUser) {
      setError("Google sign-in succeeded, but no user data was returned.");
      return;
    }

    const email = googleUser.email;
    const fullName = googleUser.displayName || email.split("@")[0];
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "Google";
    const lastName = nameParts.slice(1).join(" ") || "User";
    const GOOGLE_DUMMY_PASSWORD = googleUser.uid;

    setAuthLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (view === "register") {
        // --- GOOGLE REGISTER FLOW ---
        try {
          await userRegister({
            uuid: googleUser.uid,
            fullName: fullName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: GOOGLE_DUMMY_PASSWORD,
            profileUrl: googleUser.photoURL || "",
          }).unwrap();
          
          setSuccessMessage("Account created via Google! Please check your email to verify your account before logging in.");
          resetRegisterForm();
          
          // Redirect to login view after successful registration
          setTimeout(() => {
            setView("login");
          }, 3000);
        } catch (regErr) {
          const regStatus = regErr.status === "PARSING_ERROR" ? regErr.originalStatus : regErr.status;
          const regData = regErr.data || "";
          const regMsg = typeof regData === "string" ? regData : regData?.message || "";

          if (regStatus === 400 || regMsg.includes("existed") || regMsg.includes("already")) {
            setError("This email is already registered. Please switch to Login.");
          } else {
            throw regErr;
          }
        }
      } else {
        // --- GOOGLE LOGIN FLOW ---
        try {
          const loginResponse = await userLogin({
            email: email,
            password: GOOGLE_DUMMY_PASSWORD,
          }).unwrap();

          const { accessToken, refreshToken } = extractTokens(loginResponse);
          if (accessToken) {
            persistAuth(accessToken, refreshToken, "backend");
            
            // Sync Google profile data with backend after successful login
            try {
              await patchUser({
                uuid: googleUser.uid,
                payload: {
                  fullName: fullName,
                  firstName: firstName,
                  lastName: lastName,
                  profileUrl: googleUser.photoURL || "",
                }
              }).unwrap();
            } catch (patchErr) {
              // We don't block login if the patch fails
            }

            setSuccessMessage("Google login successful.");
            navigate("/", { replace: true });
          }
        } catch (loginErr) {
          const logStatus = loginErr.status === "PARSING_ERROR" ? loginErr.originalStatus : loginErr.status;
          const logData = loginErr.data || "";
          
          if (typeof logData === "string" && (logData.includes("verify") || logData.includes("verification"))) {
            setError("Your account is not verified. Please check your email for the verification link.");
          } else if (logStatus === 401 || logStatus === 404 || (typeof logData === "string" && logData.includes("credentials"))) {
            setError("No account found for this Google user. Please register first.");
          } else {
            throw loginErr;
          }
        }
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || "Failed to complete Google sign-in.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleError = (googleError) => {
    setSuccessMessage("");
    setError("Google login failed. Please try again.");
  };

  const getInputClassName = () =>
    "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)]";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      <DecorativeBlobs />
      <BackToHome />
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center z-10">
        <div className={`hidden lg:block ${view === "register" ? "order-last" : ""}`}>
          <img src={view === "login" ? logIn : signUp} alt="Illustration" className="max-w-lg drop-shadow-2xl" />
        </div>
        <div className={`flex ${view === "login" ? "lg:justify-end" : "lg:justify-start"} justify-center col-span-1`}>
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] shadow-sm w-full max-w-lg" style={{ backgroundColor: "var(--bg-primary)", border: "1px solid var(--border-color)" }}>
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4"><div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center"><img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16" /></div></div>
              <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--primary-500)" }}>{view === "login" ? t("auth.login") : t("auth.register")}</h1>
              <p className="mt-1 sm:mt-2 text-center text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>{view === "login" ? t("auth.loginSubtitle") : t("auth.registerSubtitle")}</p>
            </div>
            <ErrorMessage error={displayError} />
            {successMessage && <div className="mb-4 p-3 text-xs sm:text-sm rounded-lg sm:rounded-xl text-center" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", color: "rgb(34, 197, 94)" }}>{successMessage}</div>}
            <form className="space-y-3 sm:space-y-4" onSubmit={view === "login" ? handleLoginSubmit(onLogin) : handleRegisterSubmit(onRegister)}>
              {view === "register" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.firstName")}</label>
                    <input type="text" {...regRegister("firstName")} className={getInputClassName()} autoComplete="given-name" />
                    {regErrors.firstName && <p className="mt-1 text-xs text-red-500">{regErrors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.lastName")}</label>
                    <input type="text" {...regRegister("lastName")} className={getInputClassName()} autoComplete="family-name" />
                    {regErrors.lastName && <p className="mt-1 text-xs text-red-500">{regErrors.lastName.message}</p>}
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.email")}</label>
                <input
                  type="email"
                  {...(view === "login" ? loginRegister("email") : regRegister("email"))}
                  className={getInputClassName()}
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                />
                {(view === "login" ? loginErrors.email : regErrors.email) && <p className="mt-1 text-xs text-red-500">{(view === "login" ? loginErrors.email : regErrors.email).message}</p>}
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.password")}</label>
                <div className="relative">
                  <input
                    type={showLoginPassword || showRegisterPassword ? "text" : "password"}
                    {...(view === "login" ? loginRegister("password") : regRegister("password"))}
                    className={getInputClassName()}
                    autoComplete={view === "login" ? "current-password" : "new-password"}
                  />
                  <button type="button" onClick={() => view === "login" ? setShowLoginPassword(!showLoginPassword) : setShowRegisterPassword(!showRegisterPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                    {showLoginPassword || showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {(view === "login" ? loginErrors.password : regErrors.password) && <p className="mt-1 text-xs text-red-500">{(view === "login" ? loginErrors.password : regErrors.password).message}</p>}
              </div>
              {view === "register" && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.confirmPassword")}</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...regRegister("confirmPassword")}
                      className={getInputClassName()}
                      autoComplete="new-password"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {regErrors.confirmPassword && <p className="mt-1 text-xs text-red-500">{regErrors.confirmPassword.message}</p>}
                </div>
              )}
              <Divider text={view === "login" ? t("auth.orLoginWith") : t("auth.orRegisterWith")} />
              <button type="submit" disabled={authLoading} className="w-full text-white font-bold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center text-sm sm:text-base" style={{ backgroundColor: "var(--primary-500)" }}>
                {authLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (view === "login" ? t("auth.login") : t("auth.register"))}
              </button>
              <GoogleButton
                text={t("auth.google")}
                onClick={() => {}}
                isLoading={authLoading}
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </form>
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
                {view === "login" ? t("auth.noAccount") : t("auth.haveAccount")}
                <span className="font-bold hover:underline cursor-pointer ml-1" style={{ color: "var(--primary-500)" }} onClick={handleSwitch}>
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
