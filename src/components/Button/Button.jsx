import React from "react";

export default function Button({title, backgroundColor, hoverColor, textColor = "text-white"}) {
  return (
    <button className={`px-8 py-3 ${backgroundColor} ${textColor} font-bold rounded-lg hover:${hoverColor} transition-all shadow-lg shadow-orange-200 dark:shadow-orange-900/30`}>
      {title}
    </button>
  );
}
