'use client'
import React, { useEffect, useState } from 'react';
import QuestionCard from '../../_components/questionCard';
import NewBusinessQuestion from '../../_components/new-business-question';
import EditBusinessQuestion from '../../_components/edit-business-question';
import { useParams } from 'next/navigation';

const TestPage = () => {
  const params = useParams()
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/business/getQuestion/${params.Test}`);
      const data = await response.json();
      console.log('question : ', data)
      setQuestions(data);
    } catch (err) {
      console.error('Error fetching questions:', err);
      // console.log(err)
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/question/business/deleteQuestion/${id}`, { method: 'DELETE' });
      setQuestions(questions.filter(question => question._id !== id));
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  const handleEdit = (question) => {
    setCurrentQuestion(question);
    setIsEditModalOpen(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentQuestion(null);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="p-2 w-fit text-white rounded-[5px] transition-all my-4 bg-[#111256] hover:bg-[#111256]/90"
          onClick={openModal}
        >
          Add New Question
        </button>
      </div>
      <div>
        <h1 className='p-4 text-2xl'>Business Questions</h1>
        {questions.map(question => (
          <QuestionCard key={question._id} question={question} onDelete={handleDelete} onEdit ={handleEdit} />
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mt-8">
          <div className="bg-white rounded-xl shadow-2xl shadow-amber-200 w-1/2 h-[96%]  overflow-y-auto">
            <button onClick={closeModal} className="p-3 text-right text-xl">✖</button>
            <NewBusinessQuestion closeModal={closeModal} />
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mt-8">
          <div className="bg-white rounded-xl shadow-2xl shadow-amber-200 w-1/2 h-[96%] overflow-y-auto">
            <button onClick={closeEditModal} className="p-3 text-right text-xl">✖</button>
            <EditBusinessQuestion closeModal={closeEditModal} question={currentQuestion} fetchQuestions={fetchQuestions} />
          </div>
        </div>
      )}
      
    </>
  );
};

export default TestPage;
