import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BackToHome = () => (
  <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-20">
    <Link
      to="/"
      className="flex items-center font-medium text-sm sm:text-base hover:underline"
      style={{ color: "var(--primary-700)" }}
    >
      <ArrowLeft size={16} className="mr-1 sm:mr-2" />
      <span className="hidden xs:inline">Back to home</span>
      <span className="xs:hidden">Back</span>
    </Link>
  </div>
);

export default BackToHome;
