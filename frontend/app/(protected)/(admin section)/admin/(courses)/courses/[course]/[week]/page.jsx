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
      // Fetch course content
      const responseContent = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/get`
      );
      const dataContent = await responseContent.json();
  
      // Fetch tests
      const responseTest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/get`);
      const dataTest = await responseTest.json();
  
      // Combine the data arrays using concat
      const data = dataContent.concat(dataTest);
      console.log('Combined data:', data);
  
      // Filter the data based on params
      const filteredData = data.filter(
        (item) => item.week === params.week && item.course === params.course
      );
      setContent(filteredData);
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };
  

  console.log('content:   ',content)

  return (
    <div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Week Content</h2>
        {content &&
        content.map((content) => (
          <WeekContent
            key={content._id}
            content={content}
          />
        )) 
        }
      </div>
    </div>
  );
};

export default WeekPage;
