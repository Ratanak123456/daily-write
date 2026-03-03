import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import { useUserLoginMutation } from "../app/features/auth/auth";
import {
  storeAccessToken,
  storeRefreshToken,
  getDecryptedAccessToken,
} from "../util/tokenUtil";
import { useNavigate } from "react-router-dom";
import logo from "../assets/DaliyWriteLogo.svg";
import logIn from "../assets/Auth/login.svg";
import signUp from "../assets/Auth/sign-up-animate.svg";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleButton from "../components/Button/Google";
import DecorativeBlobs from "../components/DecorativeBlobs";
import BackToHome from "../components/Button/BackHome";

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
  password: z
    .string(),
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
  const [view, setView] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate("/");
    }
  }, [userResponse, navigate]);

  useEffect(() => {
    if (isError) {
      setError(
        loginError?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    }
  }, [isError, loginError]);

  /* ---------------------- Submit Handlers ---------------------- */
  const onLogin = async (data) => {
    setError("");
    try {
      await loginUser({ email: data.email, password: data.password }).unwrap();
    } catch (err) {
      console.error("Failed to login: ", err);
      setError(err?.data?.message || "Login failed. Try again.");
    }
  };

  const onRegister = async (data) => {
    setError("");
    try {
      console.log("Register payload:", {
        fullName: data.firstName + " " +data.lastName,
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
                {view === "login" ? "Login" : "Register"}
              </h1>
              <p
                className="mt-1 sm:mt-2 text-center text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {view === "login"
                  ? "If you already a member, easily log in now."
                  : "Write what in you mind with DailyWrite"}
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
                    Email
                  </label>
                  <input
                    type="email"
                    {...loginRegister("email")}
                    placeholder="Email"
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
                    Password
                  </label>
                  <input
                    type="password"
                    {...loginRegister("password")}
                    placeholder="Password"
                    className={`${getInputClassName()} input-field`}
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
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
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <Divider text="Or login with" />

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
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                <GoogleButton text="Google" />
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
                      Fist Name
                    </label>
                    <input
                      type="text"
                      placeholder="firstName"
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
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="lastName"
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
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
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
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...regRegister("password")}
                    className={`${getInputClassName()} input-field`}
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
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
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...regRegister("confirmPassword")}
                    className={`${getInputClassName()} input-field`}
                    style={{
                      backgroundColor: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  {regErrors.confirmPassword && (
                    <p className="text-xs mt-1 text-red-600">
                      {regErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Divider text="Or register with" />

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
                  Register
                </button>

                <GoogleButton text="Google" />
              </form>
            )}

            {/* Switch between login and register */}
            <div className="mt-4 sm:mt-6 text-center">
              <p
                className="text-xs sm:text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {view === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
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
                  {view === "login" ? "Register" : "Login"}
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
