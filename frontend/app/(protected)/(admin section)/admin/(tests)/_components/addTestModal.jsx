import React, { useState, useEffect } from 'react';

const AddTestModal = ({ isOpen, onClose, onAddTest, onEditTest, currentTest }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentTest) {
      setTitle(currentTest.title);
      setDescription(currentTest.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [currentTest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTest) {
      onEditTest({ ...currentTest, title, description });
    } else {
      onAddTest({ title, description });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{currentTest ? 'Edit Test' : 'Add New Test'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button type="button" className="mr-2 p-2 bg-gray-400 text-white rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="p-2 bg-blue-600 text-white rounded">{currentTest ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestModal;
