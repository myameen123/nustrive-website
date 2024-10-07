"use client";
// import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const ContentForm = ({ edit, closeModal, handleSubmit, content, isFile }) => {
    const [state, setState] = useState({
      title: '', course: content.course, week: content.week, test: '', file: '', link: ''
    });
  
    const [file, setFile] = useState(null); // Store the file
  
    useEffect(() => {
      setState({
        title: content.title || "",
        course: content.course,
        week: content.week,
        test: content.test || "",
        link: content.link || ""
      });
      setFile(null); // Reset file state on content change
    }, [content]);
  
    const onSubmit = async (e) => {
      e.preventDefault();

      console.log('state in contentForm', state)
      
      handleSubmit(state);  // Pass FormData to handleSubmit function
      closeModal();
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setState((prevState) => ({ ...prevState, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);  // Store the selected file in state
    };
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">
          {edit ? "Edit Content" : "Add New Content"}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              name="title"
              id="title"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              type="text"
              placeholder="Enter Content title"
              value={state.title}
              onChange={handleChange}
              required
            />
          </div>
            {isFile &&
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700">
              Select File:
            </label>
            <input
              name="file"
              id="file"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              type="file"
              placeholder="Select Content file"
              onChange={handleFileChange}  // Handle file change
              />
          </div>
            }
  
          {/* <div className="mb-4">
            <label htmlFor="test" className="block text-gray-700">
              Test
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              name="test"
              id="test"
              placeholder="Enter Test Name"
              value={state.test}
              onChange={handleChange}
            />
          </div> */}
            {!isFile &&
          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700">
              Link
            </label>
            <input
              name="link"
              id="link"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              type="text"
              placeholder="Enter Content Link"
              value={state.link}
              onChange={handleChange}
              />
          </div>
            }
  
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 p-2 bg-gray-400 text-white rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className="p-2 bg-blue-600 text-white rounded">
              {edit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    );
  };
  

// const ContentForm = ({ edit, closeModal, handleSubmit, content }) => {
//     // const params = useParams()
//     // console.log('params: ',params)
//   const [state, setState] = useState({
//     title:'',course:content.course,week:content.week, test:'',file:'',link:''
//   });

//   useEffect(() => {
//     setState({
//       title: content.title || "",
//       course:content.course,
//       week:content.week,
//       test: content.test || "",
//       file:content.file || "",
//       link:content.link || ""
//     });
//   }, [content]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     handleSubmit(state);
//     closeModal();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({ ...prevState, [name]: value }));
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">
//         {edit ? "Edit Content" : "Add New Content"}
//       </h2>
//       <form onSubmit={onSubmit}>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-gray-700">
//             Title
//           </label>
//           <input
//             name="title"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             type="text"
//             placeholder="Enter Content title"
//             value={state.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="file" className="block text-gray-700">
//             Select File: 
//           </label>
//           <input
//             name="file"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             type="file"
//             placeholder="Select Content file"
//             value={state.file}
//             onChange={handleChange}
//             // required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="test" className="block text-gray-700">
//             {" "}
//             Test
//           </label>
//           <input
//             type="text"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             name="test"
//             placeholder="Enter Test Name"
//             value={state.test}
//             onChange={handleChange}
//             // required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="link" className="block text-gray-700">
//             Link
//           </label>
//           <input
//             name="link"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             type="text"
//             placeholder="Enter Content Link"
//             value={state.link}
//             onChange={handleChange}
//             // required
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             className="mr-2 p-2 bg-gray-400 text-white rounded"
//             onClick={closeModal}
//           >
//             Cancel
//           </button>
//           <button type="submit" className="p-2 bg-blue-600 text-white rounded">
//             {edit ? "Update" : "Add"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default ContentForm;
