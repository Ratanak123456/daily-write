import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  link,
  title,
  backgroundColor,
  hoverColor,
  textColor = "text-white",
}) {
  return (
    <Link to={`/${link}`}>
      <button
        className={`px-8 py-3 ${backgroundColor} ${textColor} font-bold rounded-lg hover:${hoverColor} transition-all shadow-lg shadow-orange-200 dark:shadow-orange-900/30`}
      >
        {title}
      </button>
    </Link>
  );
}
