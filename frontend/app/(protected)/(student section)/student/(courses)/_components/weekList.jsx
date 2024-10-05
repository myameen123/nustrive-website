import Link from "next/link";
import React from "react";

const weeks = [
  { id: "1", name: "Week 1" },
  { id: "2", name: "Week 2" },
  { id: "3", name: "Week 3" },
  { id: "4", name: "Week 4" },
  { id: "5", name: "Week 5" },
  { id: "6", name: "Week 6" },
  { id: "7", name: "Week 7" },
  { id: "8", name: "Week 8" },
  { id: "9", name: "Week 9" },
  { id: "10", name: "Week 10" },
  { id: "11", name: "Week 11" },
  { id: "12", name: "Week 12" },
  { id: "13", name: "Week 13" },
  { id: "14", name: "Week 14" },
  { id: "15", name: "Week 15" },
  { id: "16", name: "Week 16" },
  { id: "17", name: "Week 17" },
  { id: "18", name: "Week 18" },
  { id: "19", name: "Week 19" },
  { id: "20", name: "Week 20" },
];

const WeekList = ({course}) => {
  console.log('course: ', course)
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Week List</h2>
      <div className="grid grid-cols-2 gap-4">
        {weeks.map((week) => (
          <Link
            key={week.id}
            href={`${course}/${week.id}`}
            className="block text-lg font-medium text-blue-500 hover:text-blue-700 hover:underline p-4 bg-white rounded-lg shadow transition duration-300"
          >
            {week.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WeekList;
