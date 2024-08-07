import React from 'react';

const QuestionCard = ({ question, onDelete, onEdit }) => {
  return (
    <div className="border border-gray-300 p-4 mb-2 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
      <ul className="list-disc list-inside mb-4">
        {question.options.map((option, index) => (
          <li key={index} className="text-gray-700">{option}</li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <button
          onClick={() => onDelete(question._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={() => onEdit(question)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
