import React, { useState, useEffect } from "react";

const TestForm = ({ edit, closeModal, handleSubmit, test }) => {
  const subjectsList = ['maths', 'physics', 'english', 'biology', 'iq', 'chemistry'];
  const [state, setState] = useState({
    title: '',
    subjects: [],
    category: '',
    duration: '',
    description: '',
  });

  useEffect(() => {
    setState({
      title: test.title || "",
      subjects: test.subjects || [],
      category: test.category || "",
      duration: test.duration || "",
      description: test.description || "",
    });
  }, [test]);

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(state);
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setState((prevState) => {
      const updatedSubjects = checked
        ? [...prevState.subjects, value]
        : prevState.subjects.filter((subject) => subject !== value);

      return { ...prevState, subjects: updatedSubjects };
    });
  };

  console.log('test in testForm:', state)

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">
        {edit ? "Edit Test" : "Add New Test"}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.title}
            onChange={handleChange}
            placeholder="Test Title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subjects" className="block text-gray-700">
            Subjects
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {subjectsList.map((subject) => (
              <label key={subject} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="subjects"
                  value={subject}
                  checked={state.subjects.includes(subject)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Select Test Category
          </label>
          <select
            name="category"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.category}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="medical">Medical</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700">
            Test Duration
          </label>
          <input
            type="text"
            name="duration"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.duration}
            onChange={handleChange}
            placeholder="Time duration in minute i.e 60 or 75"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={state.description}
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
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

export default TestForm;


// import React, { useState, useEffect } from "react";

// const TestForm = ({ edit, closeModal, handleSubmit, test }) => {
//   const [state, setState] = useState({title:'', subjects:'', category:'', duration:'', description:''});

//   useEffect(() => {
//     setState({
//       title: test.title || "",
//       subjects:test.subjects ||'',
//       category:test.category || "",
//       duration:test.duration || "",
//       description: test.description || "",
//     });
//   }, [test]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // setUpdated((prevState) => ({
//     //   ...prevState,
//     //   state,
//     // }));
//     handleSubmit(state);
//     // fetchTests()
//     closeModal();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setState((prevState) => ({ ...prevState, [name]: value }));
//   };

//   return (
//     <div className="">
//       <h2 className="text-xl font-bold mb-4">
//         {edit ? "Edit Test" : "Add New Test"}
//       </h2>
//       <form onSubmit={onSubmit}>
//         <div className="mb-4">
//           <label htmlFor="title" className="block text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             value={state.title}
//             onChange={handleChange}
//             placeholder="Test Title"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="subjects" className="block text-gray-700">
//             Subjects
//           </label>
//           <input
//             type="text"
//             name="subjects"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             value={state.subjects}
//             onChange={handleChange}
//             placeholder="Test Subject"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="category" className="block text-gray-700">
//             Select Test Category
//           </label>
//           <select
//             type="text"
//             name="category"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             value={state.category}
//             onChange={handleChange}
//             placeholder="Test Category"
//             required
//           >
//             <option value=""></option>
//             <option value="engineering">Engineering</option>
//             <option value="business">Business</option>
//             <option value="medical">Medical</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label htmlFor="duration" className="block text-gray-700">
//             Test Duration
//           </label>
//           <input
//             type="text"
//             name="duration"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             value={state.duration}
//             onChange={handleChange}
//             placeholder="Time duration in minute i.e 60 or 75"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="description" className="block text-gray-700">
//             Description
//           </label>
//           <textarea
//             name="description"
//             className="w-full p-2 border border-gray-300 rounded mt-2"
//             value={state.description}
//             placeholder="Description"
//             onChange={handleChange}
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

// export default TestForm;
