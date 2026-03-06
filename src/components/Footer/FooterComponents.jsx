import { Link } from "react-router-dom";
import istad from "../../assets/ISTAD.png";
import logo from "../../assets/DailyWrite.svg";
import { useI18n } from "../../i18n/useI18n";

export default function FooterComponents() {
  const { t } = useI18n();

  const footerLinks = {
    explore: [
      { name: t("footer.home"), path: "/" },
      { name: t("footer.blog"), path: "/blogs" },
      { name: t("footer.aboutUs"), path: "/about" },
    ],
    categories: [
      { name: t("footer.frontEnd"), path: "/about" },
      { name: t("footer.cyberSecurity"), path: "/about" },
      { name: t("footer.uxuiDesign"), path: "/about" },
      { name: t("footer.backEnd"), path: "/about" },
    ],
    information: [
      { name: t("footer.feedback"), path: "/" },
      { name: t("footer.faq"), path: "/" },
      { name: t("footer.support"), path: "/about" },
    ],
  };

  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-center md:text-left items-start pb-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-6">
              {t("footer.organizedBy")}
            </h3>
            <img
              src={istad}
              alt="Institute Logo"
              className="w-20 h-20 mb-4 object-contain"
            />
            <p className="text-sm text-gray-300 leading-snug font-medium max-w-45 text-center md:text-left">
              {t("footer.organizationName")}
            </p>
          </div>

          {/* Explore Links */}
          <nav>
            <h3 className="text-xl font-semibold mb-6">
              {t("footer.explore")}
            </h3>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Category Links */}
          <nav>
            <h3 className="text-xl font-semibold mb-6">
              {t("footer.category")}
            </h3>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.categories.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Information Links */}
          <nav>
            <h3 className="text-xl font-semibold mb-6">
              {t("footer.information")}
            </h3>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.information.map((info) => (
                <li key={info.name}>
                  <Link
                    to={info.path}
                    className="hover:text-white transition-colors"
                  >
                    {info.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Brand/Slogan Section */}
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <img src={logo} alt="DailyWrite" className="h-24" />
            </div>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              {t("footer.slogan")}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} DailyWrite | {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
