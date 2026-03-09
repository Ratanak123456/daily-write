import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useUserLoginMutation, useUserRegisterMutation } from "../app/features/auth/auth";
import {
  storeAccessToken,
  storeRefreshToken,
} from "../util/tokenUtil";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/DaliyWriteLogo.svg";
import logIn from "../assets/Auth/login.svg";
import signUp from "../assets/Auth/sign-up-animate.svg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DecorativeBlobs from "../components/DecorativeBlobs";
import BackToHome from "../components/Button/BackHome";
import { useI18n } from "../i18n/useI18n";
import GoogleButton from "../components/Button/Google";

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
  const [successMessage, setSuccessMessage] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [
    loginUser,
    { data: userResponse, isLoading, isError, error: loginError },
  ] = useUserLoginMutation();

  const [registerUser, { isLoading: isRegisterLoading }] = useUserRegisterMutation();

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

  useEffect(() => {
    if (userResponse?.data?.accessToken) {
      storeAccessToken(userResponse.data.accessToken);
      if (userResponse.data.refreshToken) {
        storeRefreshToken(userResponse.data.refreshToken);
      }
      navigate("/");
    }
  }, [userResponse, navigate]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get("accessToken") || searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const oauthError = searchParams.get("error") || searchParams.get("message");

    if (accessToken) {
      storeAccessToken(accessToken);
      if (refreshToken) storeRefreshToken(refreshToken);
      navigate("/", { replace: true });
    } else if (oauthError) {
      setError(decodeURIComponent(oauthError));
      navigate("/auth", { replace: true });
    }
  }, [location.search, navigate]);

  useEffect(() => {
    if (isError) {
      setError(loginError?.data?.message || "Login failed. Please check your credentials.");
    }
  }, [isError, loginError]);

  const onLogin = async (data) => {
    setError("");
    setSuccessMessage("");
    try {
      await loginUser({ email: data.email, password: data.password }).unwrap();
    } catch (err) {
      setError(err?.data?.message || "Login failed. Try again.");
    }
  };

  const onRegister = async (data) => {
    setError("");
    setSuccessMessage("");
    try {
      const payload = {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      };
      await registerUser(payload).unwrap();
      setSuccessMessage("Register success! Please check your email to verify your account.");
      resetRegisterForm();
      setView("login");
    } catch (err) {
      setError(err?.data?.message || "Registration failed. Try again.");
    }
  };

  const handleSwitch = () => {
    setView(view === "login" ? "register" : "login");
    setError("");
    setSuccessMessage("");
  };

  const getInputClassName = () => "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all text-sm sm:text-base";
  const handleInputFocus = (e) => { e.target.style.boxShadow = `0 0 0 2px var(--primary-500)`; e.target.style.borderColor = "var(--primary-500)"; };
  const handleInputBlur = (e) => { e.target.style.boxShadow = "none"; e.target.style.borderColor = ""; };

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
            <ErrorMessage error={error} />
            {successMessage && <div className="mb-4 p-3 text-xs sm:text-sm rounded-lg sm:rounded-xl text-center" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", color: "rgb(34, 197, 94)" }}>{successMessage}</div>}
            <form className="space-y-3 sm:space-y-4" onSubmit={view === "login" ? handleLoginSubmit(onLogin) : handleRegisterSubmit(onRegister)}>
              {view === "register" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.firstName")}</label>
                    <input type="text" {...regRegister("firstName")} className={getInputClassName()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.lastName")}</label>
                    <input type="text" {...regRegister("lastName")} className={getInputClassName()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.email")}</label>
                <input type="email" {...(view === "login" ? loginRegister("email") : regRegister("email"))} className={getInputClassName()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.password")}</label>
                <div className="relative">
                  <input type={showLoginPassword || showRegisterPassword ? "text" : "password"} {...(view === "login" ? loginRegister("password") : regRegister("password"))} className={getInputClassName()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                  <button type="button" onClick={() => view === "login" ? setShowLoginPassword(!showLoginPassword) : setShowRegisterPassword(!showRegisterPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                    {showLoginPassword || showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {view === "register" && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-1">{t("auth.confirmPassword")}</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} {...regRegister("confirmPassword")} className={getInputClassName()} onFocus={handleInputFocus} onBlur={handleInputBlur} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-secondary)" }}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}
              <Divider text={view === "login" ? t("auth.orLoginWith") : t("auth.orRegisterWith")} />
              <button type="submit" disabled={isLoading || isRegisterLoading} className="w-full text-white font-bold py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center text-sm sm:text-base" style={{ backgroundColor: "var(--primary-500)" }}>
                {(isLoading || isRegisterLoading) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (view === "login" ? t("auth.login") : t("auth.register"))}
              </button>
              <GoogleButton text={t("auth.google")} onClick={() => console.log("Google login clicked")} />
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
