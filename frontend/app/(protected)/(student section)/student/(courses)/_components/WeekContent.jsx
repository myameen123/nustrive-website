import React from "react";

const WeekContent = ({ content }) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg">
      <p className="text-gray-700">{content.title}</p>
      {content.file && <p>{content.file}</p>}
      {content.link && (
        <iframe
          width="560"
          height="315"
          src={content.link} //"https://www.youtube.com/embed/gK0Wyodpk8c?si=iKrIzn6iGPe2KYuX"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default WeekContent;
