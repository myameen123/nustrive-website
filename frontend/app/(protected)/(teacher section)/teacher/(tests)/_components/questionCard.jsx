// 'use client'
// import React,{useRef, useEffect} from "react";
// import renderMathInElement from 'katex/dist/contrib/auto-render';
// import 'katex/dist/katex.min.css';



// const QuestionCard = ({ setEdit, question, onDelete, onEdit }) => {
//   const katexTextRef = useRef();

//   useEffect(() => {
//     if (katexTextRef.current) {
//       renderMathInElement(katexTextRef.current, {
//         delimiters: [
//           { left: '$$', right: '$$', display: true },
//           { left: '$', right: '$', display: false },
//         ],
//       });
//     }
//   }, [question]);

//   const handleDelete = () => {
//     if (confirm("Are you sure you want to delete this question?")) {
//       onDelete(question._id);
//     }
//   };

//   const handleEdit = () => {
//     setEdit(false);
//     onEdit(question);
//   };

//   return (
//     <div className="border border-gray-300 p-4 mb-2 rounded-lg shadow-sm">
//       <h3 className="text-lg font-semibold mb-2" ref={katexTextRef}>
//           {question.text}
//       </h3>
//       <ul className="list-disc list-inside mb-4">
//         {question.options.map((option, index) => (
//           <li key={index} className="text-gray-700" ref={katexTextRef}>
//             {option}
//           </li>
//         ))}
//       </ul>
//       <div className="flex space-x-2">
//         <button
//           onClick={handleDelete}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//         >
//           Delete
//         </button>
//         <button
//           onClick={handleEdit}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuestionCard;


'use client'
import React, { useRef, useEffect } from "react";
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';

const QuestionCard = ({ setEdit, question, onDelete, onEdit }) => {
  const questionTextRef = useRef();
  const optionsRef = useRef([]);

  useEffect(() => {
    if (questionTextRef.current) {
      renderMathInElement(questionTextRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }

    // Render LaTeX for each option
    optionsRef.current.forEach(optionRef => {
      if (optionRef) {
        renderMathInElement(optionRef, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
        });
      }
    });
  }, [question]);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this question?")) {
      onDelete(question._id);
    }
  };

  const handleEdit = () => {
    setEdit(false);
    onEdit(question);
  };

  return (
    <div className="border border-gray-300 p-4 mb-2 rounded-lg shadow-sm">
      {/* Question Text */}
      <h3 className="text-lg font-semibold mb-2" ref={questionTextRef}>
        {question.text}
      </h3>

      {/* Options List */}
      <ul className="list-disc list-inside mb-4">
        {question.options.map((option, index) => (
          <li
            key={index}
            className="text-gray-700"
            ref={el => (optionsRef.current[index] = el)} // Store ref for each option
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
