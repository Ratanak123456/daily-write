import { useEffect, useRef, useState } from "react";
import {
  Moon,
  Sun,
  SquarePen,
  Menu,
  X,
  LogOut,
  User,
  Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/DaliyWriteLogo.svg";
import { useGetCurrentUserQuery } from "../../app/features/auth/auth";
import { clearTokens, getDecryptedRefreshToken } from "../../util/tokenUtil";
import { useI18n } from "../../i18n/useI18n";

export default function NavbarComponent() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const { t, language, setLanguage } = useI18n();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const languageMenuRef = useRef(null);

  const token = getDecryptedRefreshToken();
  const { data: userData, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  const user = userData?.data;

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target)
      ) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileMenu]);

  const handleLogout = () => {
    clearTokens();
    window.location.reload(); // Refresh to clear state
  };

  const navItems = [
    { path: "/", name: t("navbar.home") },
    { path: "/blogs", name: t("navbar.blogs") },
    { path: "/about", name: t("navbar.about") },
  ];

  const languageOptions = [
    { code: "en", label: "English", flagPath: "/flags/en.jpg", fallback: "EN" },
    { code: "km", label: "ខ្មែរ", flagPath: "/flags/km.png", fallback: "ខ" },
  ];

  const activeLanguage =
    languageOptions.find((item) => item.code === language) ||
    languageOptions[0];

  return (
    <header className="w-full bg-bg-main border-b border-border-main py-2 transition-colors duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-bold text-primary-orange hover:opacity-70 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/blog-post"
            className="flex items-center gap-2 text-primary-orange font-bold hover:opacity-80"
          >
            <button className="flex items-center gap-2 text-primary-orange font-bold hover:opacity-80">
              <SquarePen size={24} />
              <span className="text-md hidden lg:inline">
                {t("navbar.write")}
              </span>
            </button>
          </Link>

          <div className="h-6 w-px bg-border-main mx-1 hidden md:block" />

          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => setShowLanguageMenu((prev) => !prev)}
              className="w-9 h-9 rounded-full border border-border-main overflow-hidden bg-bg-main flex items-center justify-center hover:brightness-95 transition-all"
              aria-label="Language"
            >
              <img
                src={activeLanguage.flagPath}
                alt={activeLanguage.label}
                className="w-full h-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  const sibling = event.currentTarget.nextElementSibling;
                  if (sibling) sibling.style.display = "flex";
                }}
              />
              <span className="w-full h-full items-center justify-center text-[11px] font-bold text-primary-orange hidden">
                {activeLanguage.fallback}
              </span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-1.5 z-50">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => {
                      setLanguage(option.code);
                      setShowLanguageMenu(false);
                      setMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 flex items-center justify-between hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-200">
                      <span className="w-6 h-6 rounded-full overflow-hidden bg-bg-main border border-border-main flex items-center justify-center">
                        <img
                          src={option.flagPath}
                          alt={option.label}
                          className="w-full h-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                            const sibling =
                              event.currentTarget.nextElementSibling;
                            if (sibling) sibling.style.display = "flex";
                          }}
                        />
                        <span className="w-full h-full items-center justify-center text-[10px] font-bold text-primary-orange hidden">
                          {option.fallback}
                        </span>
                      </span>
                      {option.label}
                    </span>
                    {language === option.code ? (
                      <Check
                        size={16}
                        className="text-gray-500 dark:text-gray-300"
                      />
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 bg-primary-orange text-white rounded-lg hover:brightness-110 transition-all"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isLoading && token ? (
            <div className="w-10 h-10 rounded-full border-2 border-orange-100 animate-pulse bg-orange-50" />
          ) : user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full border-2 border-primary-orange overflow-hidden bg-orange-50 flex items-center justify-center">
                  {user.profileUrl ? (
                    <img
                      src={user.profileUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-primary-orange" size={20} />
                  )}
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User size={16} />
                    {t("navbar.profile")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={16} />
                    {t("navbar.logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="hidden md:block bg-primary-orange px-6 py-2 rounded-lg text-white text-sm font-bold uppercase hover:brightness-110 transition-all"
            >
              {t("navbar.login")}
            </button>
          )}

          <button
            className="md:hidden p-2 text-primary-orange"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-bg-main border-t border-border-main p-4 space-y-4 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-bold text-primary-orange"
            >
              {item.name}
            </Link>
          ))}
          <hr className="border-border-main" />
          {token && user ? (
            <div className="space-y-4">
              <div className="space-y-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setLanguage(option.code)}
                    className="w-full border border-border-main py-2.5 rounded-lg px-3 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2.5 text-primary-orange font-semibold">
                      <span className="w-6 h-6 rounded-full overflow-hidden border border-border-main flex items-center justify-center">
                        <img
                          src={option.flagPath}
                          alt={option.label}
                          className="w-full h-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                            const sibling =
                              event.currentTarget.nextElementSibling;
                            if (sibling) sibling.style.display = "flex";
                          }}
                        />
                        <span className="w-full h-full items-center justify-center text-[10px] font-bold text-primary-orange hidden">
                          {option.fallback}
                        </span>
                      </span>
                      {option.label}
                    </span>
                    {language === option.code ? (
                      <Check size={16} className="text-primary-orange" />
                    ) : null}
                  </button>
                ))}
              </div>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-lg font-bold text-primary-orange"
              >
                <User size={20} />
                {user.fullName}
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 py-3 rounded-lg text-white font-bold uppercase"
              >
                {t("navbar.logout")}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => setLanguage(option.code)}
                    className="w-full border border-border-main py-2.5 rounded-lg px-3 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2.5 text-primary-orange font-semibold">
                      <span className="w-6 h-6 rounded-full overflow-hidden border border-border-main flex items-center justify-center">
                        <img
                          src={option.flagPath}
                          alt={option.label}
                          className="w-full h-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                            const sibling =
                              event.currentTarget.nextElementSibling;
                            if (sibling) sibling.style.display = "flex";
                          }}
                        />
                        <span className="w-full h-full items-center justify-center text-[10px] font-bold text-primary-orange hidden">
                          {option.fallback}
                        </span>
                      </span>
                      {option.label}
                    </span>
                    {language === option.code ? (
                      <Check size={16} className="text-primary-orange" />
                    ) : null}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  navigate("/auth");
                  setMenuOpen(false);
                }}
                className="w-full bg-primary-orange py-3 rounded-lg text-white font-bold uppercase"
              >
                {t("navbar.login")}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
