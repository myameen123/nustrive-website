import React from "react";
import MainHeading from "./main-heading";
import FieldsCard from "./fieldsCard";

const Disciplines = [
  {
    id: 1,
    title: "Engineering NET",
    desc: "Build engineering expertise with our thorough test preparation. Covering fundamental concepts and language skills, prepare yourself for success in entrance exams.",
    courses: ["Maths", "Physics", "Chemistry", "English", "Intelligence"],
  },

  {
    id: 2,
    title: "Computer Science NET",
    desc: "Navigate computer science exams confidently. We blend math prowess, digital insights, language finesse, and logical skills for your success.",
    courses: [
      "Maths",
      "Physics",
      "Computer Science",
      "English",
      "Intelligence",
    ],
  },
  {
    id: 3,
    title: "Business & Social Sciences",
    desc: "Excel in social sciences exams by enhancing your mathematical abilities, refining communication skills, fostering analytical thinking, and participating thoughtfully for outstanding performance.",
    courses: ["Basic Math", "English", "Intelligence"],
  },
];

function CustomizeTest() {
  return (
    <div className=" mb-4">
      <div className=" xl:w-[80%] lg:w-[90%] mx-auto w-[95%]">
        <div>
          <MainHeading heading="Customized Test Preparation to Navigate Your Path to Success" />
          <p className=" text-center font-bold text-[#111256]">
            Unleash Your Capabilities Across Diverse Fields
          </p>
        </div>
        <div className=" flex md:flex-row flex-col gap-4 justify-between mt-8">
          {Disciplines.map((d) => (
            <FieldsCard
              key={d.id}
              title={d.title}
              desc={d.desc}
              courses={d.courses}
              id={d.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomizeTest;
