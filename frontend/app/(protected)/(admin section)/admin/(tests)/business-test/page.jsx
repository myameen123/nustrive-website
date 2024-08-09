'use client'
import React, { useEffect, useState } from 'react';
import TestCard from '../_components/businessTestCard';
import AddTestModal from '../_components/addTestModal';

const TestList = () => {
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/business/getTests`);
      const data = await response.json();
      setTests(data);
    } catch (err) {
      console.error('Error fetching tests:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/business/deleteTest/${id}`, {
        method: 'DELETE',
      });
      setTests(tests.filter(test => test._id !== id));
    } catch (err) {
      console.error('Error deleting test:', err);
    }
  };

  const handleAddTest = async (test) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/business/addTest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test),
      });
      const newTest = await response.json();
      setTests([...tests, newTest]);
    } catch (err) {
      console.error('Error adding test:', err);
    }
  };

  const handleEditTest = async (test) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/business/updateTest/${test._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(test),
      });
      const updatedTest = await response.json();
      setTests(tests.map(t => t._id === updatedTest._id ? updatedTest : t));
    } catch (err) {
      console.error('Error updating test:', err);
    }
  };

  const openAddModal = () => {
    setCurrentTest(null);
    setIsModalOpen(true);
  };

  const openEditModal = (test) => {
    setCurrentTest(test);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="p-2 w-fit text-white rounded-[5px] transition-all my-4 bg-[#111256] hover:bg-[#111256]/90"
          onClick={openAddModal}
        >
          Add Test
        </button>
      </div>
      <div>business tests page
        {/* <li>Test 1</li> */}
        {tests.map(test => (
          <TestCard key={test._id} test={test} onDelete={handleDelete} onEdit={openEditModal} />
        ))}
      </div>
      <AddTestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTest={handleAddTest}
        onEditTest={handleEditTest}
        currentTest={currentTest}
      />
    </>
  );
};

export default TestList;
