import React, { useState, useEffect } from "react";

const TestForm = ({ edit, closeModal, handleSubmit, test }) => {
  const [state, setState] = useState({ title: "", description: "" });

  useEffect(() => {
    setState({
      title: test.title || "",
      description: test.description || "",
    });
  }, [test]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // setUpdated((prevState) => ({
    //   ...prevState,
    //   state,
    // }));
    handleSubmit(state);
    // fetchTests()
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

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
