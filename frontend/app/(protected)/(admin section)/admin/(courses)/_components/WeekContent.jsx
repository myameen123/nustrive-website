import React from "react";
import Link from "next/link";

const WeekContent = ({ content, onEdit, onDelete }) => {
  // Function to determine if the file is a PDF, DOC, PPT, etc.
  const renderFile = (fileUrl) => {
    const fileExtension = fileUrl.split(".").pop().toLowerCase();

    switch (fileExtension) {
      case "pdf":
        return (
          <embed
            src={fileUrl}
            type="application/pdf"
            width="100%"
            height="500px"
          />
        );
      case "doc":
      case "docx":
      case "ppt":
      case "pptx":
        return (
          <Link href={fileUrl} target="_blank" rel="noopener noreferrer">
            Download Document
          </Link>
        );
      default:
        return (
          <Link href={fileUrl} target="_blank" rel="noopener noreferrer">
            View File
          </Link>
        );
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg mb-4">
      {/* Display title and description for questions */}
      {content.questions && (
        <div>
          <Link href={`${content.week}/${content._id}`} className="text-gray-700 font-semibold">
            {content.title}
          </Link>
          <p>{content.description}</p>
        </div>
      )}

      {/* Display files if available */}
      {content.file && content.file.length > 0 && (
        <div>
          <p className="text-gray-700 font-semibold">{content.title}</p>
          {content.file.map((fileItem, index) => (
            <div key={index} className="mb-4">
              <p className="text-gray-600">File {index + 1}:</p>
              {renderFile(fileItem.url)}
            </div>
          ))}
        </div>
      )}

      {/* Display link (e.g., YouTube video) */}
      {content.link && (
        <>
          <p className="text-gray-700 font-semibold">{content.title}</p>
          <iframe
            width="560"
            height="315"
            src={content.link}
            title="External Content"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </>
      )}
    </div>
  );
};

export default WeekContent;
