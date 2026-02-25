import { Link } from 'react-router-dom';
import  istad  from "../../assets/ISTAD.png";
import logo from "../../assets/DailyWrite.svg";

const footerLinks = {
  explore: [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
    { name: "About Us", path: "/about" }
  ],
  categories: [
    { name: "Front-End", path: "/about" },
    { name: "Cyber Security", path: "/about" },
    { name: "UXUI Design", path: "/about" },
    { name: "Back-End", path: "/about" }
  ],
  information: [
    { name: "Feedback", path: "/" },
    { name: "FAQ", path: "/" },
    { name: "Support", path: "/about" }
  ]
};

export default function FooterComponents() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 text-center md:text-left items-start pb-10">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-6">Organize By</h3>
            <img
              src= {istad}
              alt="Institute Logo"
              className="w-20 h-20 mb-4 object-contain"
            />
            <p className="text-sm text-gray-300 leading-snug font-medium max-w-45 text-center md:text-left">
              Institute of Science and Technology Advanced Development
            </p>
          </div>

          {/* Explore Links */}
          <nav>
            <h3 className="text-xl font-semibold mb-6">Explore</h3>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Category Links */}
          <nav>
            <h3 className="text-xl font-semibold mb-6">Category</h3>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.categories.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Information Links */}
          <nav>
            <h3 className="text-xl font-semibold mb-6">Information</h3>
            <ul className="space-y-4 text-gray-400">
              {footerLinks.information.map((info) => (
                <li key={info.name}>
                  <Link to={info.path} className="hover:text-white transition-colors">
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
              Providing a platform for sharing ideas and knowledge with everyone.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} DailyWrite | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}