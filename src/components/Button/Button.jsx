import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  link,
  title,
  backgroundColor = "",
  hoverColor = "",
  textColor = "text-white",
  borderColor = "",
  hoverTextColor = "",
  hoverBorderColor = "",
  className = "",
}) {
  return (
    <Link to={`/${link}`}>
      <button
        className={`font-bold rounded-lg transition-all shadow-lg shadow-orange-200 dark:shadow-orange-900/30 ${backgroundColor} ${hoverColor} ${textColor} ${borderColor} ${hoverTextColor} ${hoverBorderColor} ${className}`}
      >
        {title}
      </button>
    </Link>
  );
}
