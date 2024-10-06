"use client";
import React, { useState, useEffect } from "react";
import WeekContent from "../../../_components/WeekContent";
import { useParams } from "next/navigation";

const WeekPage = () => {
  const params = useParams()
  console.log('params in weekPage: ', params)
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/get`
      );
      const data = await response.json();
      console.log('data :', data)

      const filteredData = data.filter(item => item.week === params.week);
      setContent(filteredData);
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };


  return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Week Content</h2>
        {content &&
        content.map((content) => (
          <WeekContent
            key={content._id}
            // field="business"
            content={content}
          />
        )) 
        }
      </div>
  );
};

export default WeekPage;
