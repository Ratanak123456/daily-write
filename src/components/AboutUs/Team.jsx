import React from "react";
import { useI18n } from "../../i18n/useI18n";
import student1 from "../../../public/Team/Saren Ratanak.jpg";
import student2 from "../../../public/Team/rosa.JPG";
import student3 from "../../../public/Team/photo_2026-02-17_21-02-08.jpg";
import student4 from "../../../public/Team/photo_2026-02-19_00-24-53.jpg";
import student5 from "../../../public/Team/image_2024-01-22_14-24-14.png";
import student6 from "../../../public/Team/_MG_8835.jpg";
import student7 from "../../../public/Team/IMG_4905.JPG";

import mentor1 from "../../../public/Mentor/teacher.jpg"
import mentor2 from "../../../public/Mentor/Chhaya.jpg"

// Reusable social icons component - moved outside to avoid recreation during render
const SocialIcons = ({ variant = "default" }) => (
  <div className="flex gap-4 justify-center">
    <a
      href="#"
      className={`flex items-center justify-center border rounded-lg transition-opacity duration-200 hover:opacity-80 ${
        variant === "default" ? "w-10 h-10" : "p-2"
      }`}
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <svg
        className="w-5 h-5"
        style={{ color: "var(--text-secondary)" }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    </a>
    <a
      href="#"
      className={`flex items-center justify-center border rounded-lg transition-opacity duration-200 hover:opacity-80 ${
        variant === "default" ? "w-10 h-10" : "p-2"
      }`}
      style={{
        borderColor: "var(--border-color)",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <svg
        className="w-5 h-5"
        style={{ color: "var(--text-secondary)" }}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    </a>
  </div>
);

// Reusable card components - moved outside
const MentorCard = ({ mentor }) => (
  <div
    className="border rounded-3xl p-8 shadow-sm text-center w-full max-w-[362.66px]"
    style={{
      backgroundColor: "var(--bg-primary)",
      borderColor: "var(--border-color)",
    }}
  >
    <div className="mb-6">
      <img
        src={mentor.image}
        alt={mentor.name}
        className="w-32 h-32 rounded-full mx-auto object-cover"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      />
    </div>
    <h3
      className="text-xl font-bold mb-1"
      style={{ color: "var(--primary-500)" }}
    >
      {mentor.name}
    </h3>
    <p
      className="text-sm mb-6 pb-6 border-b"
      style={{
        color: "var(--text-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      {mentor.role}
    </p>
    <SocialIcons variant="default" />
  </div>
);

const TeamCard = ({ member }) => (
  <div
    className="border rounded-3xl p-8 shadow-sm text-center w-full max-w-[362.66px]"
    style={{
      backgroundColor: "var(--bg-primary)",
      borderColor: "var(--border-color)",
    }}
  >
    <div className="mb-6">
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto object-cover"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      />
    </div>
    <h3
      className="text-xl font-bold mb-1"
      style={{ color: "var(--primary-500)" }}
    >
      {member.name}
    </h3>
    <p
      className="text-sm mb-6 pb-6 border-b"
      style={{
        color: "var(--text-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      {member.role}
    </p>
    <SocialIcons variant="default" />
  </div>
);

const AdditionalMemberCard = ({ member }) => (
  <div
    className="border rounded-3xl p-8 shadow-sm text-center w-full max-w-[362.66px]"
    style={{
      backgroundColor: "var(--bg-primary)",
      borderColor: "var(--border-color)",
    }}
  >
    <div className="mb-6">
      <img
        src={member.image}
        alt={member.name}
        className="w-32 h-32 rounded-full mx-auto object-cover"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      />
    </div>
    <h3
      className="text-xl font-bold mb-1"
      style={{ color: "var(--primary-500)" }}
    >
      {member.name}
    </h3>
    <p
      className="text-sm mb-6 pb-6 border-b"
      style={{
        color: "var(--text-secondary)",
        borderColor: "var(--border-color)",
      }}
    >
      {member.role}
    </p>
    <SocialIcons variant="default" />
  </div>
);

// Reusable section header - moved outside
const SectionHeader = ({ title }) => (
  <div className="text-center mb-12">
    <h2
      className="text-3xl font-bold inline-block border-b-4 pb-2"
      style={{
        color: "var(--primary-500)",
        borderColor: "var(--primary-500)",
      }}
    >
      {title}
    </h2>
  </div>
);

const PeopleSection = () => {
  const { t } = useI18n();

  // Define all team members data
  const mentors = [
    {
      name: "Kim Chansokpheng",
      role: t("about.people.instructor"),
      image: mentor1,
      borderColor: "border-gray-100",
    },
    {
      name: "Chan Chhaya",
      role: t("about.people.instructor"),
      image: mentor2,
      borderColor: "border-gray-100",
    },
  ];

  const teamMembers = [
    {
      name: "Saren Ratanak",
      role: t("about.people.frontEnd"),
      image: student1,
      borderColor: "border-blue-500",
    },
    {
      name: "Ny Rosa",
      role: t("about.people.frontEnd"),
      image: student2,
      borderColor: "border-blue-500",
    },
    {
      name: "Khut Theara",
      role: t("about.people.frontEnd"),
      image: student3,
      borderColor: "border-transparent",
    },
  ];

  const additionalMembers = [
    {
      name: "Thoun Chamroeun",
      role: t("about.people.frontEnd"),
      image: student4,
    },
    {
      name: "Sambath Ousa",
      role: t("about.people.frontEnd"),
      image: student5,
    },
    {
      name: "Bun chansovan",
      role: t("about.people.frontEnd"),
      image: student6,
    },
    {
      name: "Vok Visak",
      role: t("about.people.frontEnd"),
      image: student7,
    },
  ];

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Mentors Section */}
      <section className="max-w-3xl mx-auto">
        <SectionHeader title={t("about.people.mentors")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {mentors.map((mentor, index) => (
            <MentorCard key={`mentor-${index}`} mentor={mentor} />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="pt-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title={t("about.people.team")} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {teamMembers.map((member, index) => (
              <TeamCard key={`team-${index}`} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Team Members Section */}
      <section className=" pt-8 px-1">
        <div className="w-[80%] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {additionalMembers.map((member, index) => (
              <AdditionalMemberCard
                key={`additional-${index}`}
                member={member}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default PeopleSection;
