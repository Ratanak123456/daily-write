import React, { useState, useEffect, useRef } from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export function Card({
  title,
  description,
  image,
  view,
  user,
  userImage,
  uuid,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer for scroll in/out animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the card is visible
        rootMargin: "0px",
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={cardRef}
      className={`transition-all duration-800 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 rotate-0"
          : "opacity-0 translate-y-16 scale-95 rotate-1"
      }`}
    >
      <Link to={`/blogs/${uuid}`}>
        {/* Image with zoom effect */}
        <div className="rounded-3xl overflow-hidden mb-8 group">
          <img
            src={image}
            alt={title}
            className={`w-full h-auto object-cover transition-all duration-700 ${
              isVisible ? "scale-100" : "scale-110"
            } group-hover:scale-105`}
          />
        </div>

        {/* Title with slide-up effect */}
        <h1
          className={`text-5xl font-extrabold leading-tight mb-4 text-text-main transition-all duration-700 delay-200 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {title}
        </h1>

        {/* Description with fade effect */}
        <p
          className={`text-xl mb-8 text-text-sub line-clamp-1 transition-all duration-700 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {parse(description)}
        </p>
      </Link>

      {/* Footer with slide-up and staggered children animations */}
      <div
        className={`flex items-center justify-between transition-all duration-700 delay-400 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Bookmark icon with bounce effect */}
          <div
            className={`p-2 bg-bg-side rounded-lg text-text-sub transition-all duration-500 delay-500 transform ${
              isVisible
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-50 -rotate-12"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              ></path>
            </svg>
          </div>

          {/* View count with scale effect */}
          <div
            className={`flex items-center gap-2 text-text-sub transition-all duration-500 delay-600 transform ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
            <span className="font-medium text-primary-orange">{view} K</span>
          </div>
        </div>

        {/* User info with slide from right effect */}
        <div
          className={`flex items-center gap-3 transition-all duration-500 delay-700 transform ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          }`}
        >
          <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center overflow-hidden border-2 border-primary-orange bg-orange-50">
            {userImage ? (
              <img
                src={userImage}
                alt={user}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="text-white" size={20} />
            )}
          </div>
          <span className="font-bold text-text-sub">{user}</span>
        </div>
      </div>
    </section>
  );
}

export function CardSidBar({
  title,
  image,
  blogCategory,
  createdAt,
  user,
  userImage,
  uuid,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // Intersection Observer for scroll in/out animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div
      ref={cardRef}
      className={`space-y-8 transition-all duration-700 ease-out transform ${
        isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 -translate-x-12 scale-95"
      }`}
    >
      {" "}
      <Link to={`/blogs/${uuid}`}>
        <div className="flex gap-4 items-start group">
          <div className="flex-1">
            {/* Category with slide-down effect */}
            <h4
              className={`text-primary-orange font-bold mb-1 transition-all duration-500 delay-100 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              {blogCategory}
            </h4>

            {/* Title with slide-up and hover effect */}
            <p
              className={`font-bold text-text-main leading-snug mb-2 line-clamp-2 transition-all duration-500 delay-200 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              } group-hover:underline`}
            >
              {title}
            </p>

            {/* Meta info with staggered children */}
            <div
              className={`flex items-center gap-4 text-xs text-text-sub uppercase tracking-widest font-bold transition-all duration-500 delay-300 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span
                className={`transition-all duration-500 delay-400 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {createdAt}
              </span>
              <span
                className={`flex items-center gap-1 capitalize transition-all duration-500 delay-500 transform ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
              >
                <div className="w-4 h-4 bg-primary-orange rounded-full flex items-center justify-center overflow-hidden bg-orange-50">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={user}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-white" size={10} />
                  )}
                </div>{" "}
                {user}
              </span>
            </div>
          </div>

          {/* Image with scale and rotate effect */}
          <img
            src={image}
            className={`w-28 h-20 rounded-xl object-cover transition-all duration-700 delay-200 transform ${
              isVisible
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-75 rotate-3"
            }`}
            alt={title}
          />
        </div>{" "}
      </Link>
    </div>
  );
}
