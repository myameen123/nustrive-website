import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';
import axios from 'axios';

const EditEngineeringQuestion = ({ question, closeModal, fetchQuestions }) => {
  const [text, setText] = useState(question.text);
  const [option1, setOption1] = useState(question.options[0]);
  const [option2, setOption2] = useState(question.options[1]);
  const [option3, setOption3] = useState(question.options[2]);
  const [option4, setOption4] = useState(question.options[3]);
  const [subject, setSubject] = useState(question.subject);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedQuestion = {
      text,
      options: [option1, option2, option3, option4],
      subject,
    };
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/engineering/updateQuestion/${question._id}`,
        updatedQuestion,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      fetchQuestions();
      closeModal();
    } catch (err) {
      console.error('Error updating question:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="md:w-2/3 w-full m-auto">
        <div>
          <h1 className="text-xl my-4 text-center font-semibold">Edit Question</h1>
          <div className="w-full grid grid-cols-1 gap-6">
            <div className="border-y rounded-[4px]">
              <textarea
                onChange={(e) => setText(e.target.value)}
                required
                value={text}
                name="text"
                rows={5}
                type="text"
                placeholder="Question Text"
                className="rounded-lg w-full border border-black p-2"
              />
            </div>
            <div>
              <p className="font-semibold underline text-center">Options</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="option1" className="font-semibold underline">
                    Option 1 (Correct Option):
                  </label>
                  <input
                    onChange={(e) => setOption1(e.target.value)}
                    required
                    value={option1}
                    name="option1"
                    type="text"
                    placeholder="Option 1"
                    className="w-full border border-black p-1 rounded-[5px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="option2" className="font-semibold underline">
                    Option 2:
                  </label>
                  <input
                    onChange={(e) => setOption2(e.target.value)}
                    required
                    value={option2}
                    name="option2"
                    type="text"
                    placeholder="Option 2"
                    className="w-full border border-black p-1 rounded-[5px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="option3" className="font-semibold underline">
                    Option 3:
                  </label>
                  <input
                    onChange={(e) => setOption3(e.target.value)}
                    required
                    value={option3}
                    name="option3"
                    type="text"
                    placeholder="Option 3"
                    className="w-full border border-black p-1 rounded-[5px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="option4" className="font-semibold underline">
                    Option 4:
                  </label>
                  <input
                    onChange={(e) => setOption4(e.target.value)}
                    required
                    value={option4}
                    name="option4"
                    type="text"
                    placeholder="Option 4"
                    className="w-full border border-black p-1 rounded-[5px]"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="subject" className="font-semibold underline">
                Subject:
              </label>
              <input
                onChange={(e) => setSubject(e.target.value)}
                required
                value={subject}
                name="subject"
                type="text"
                placeholder="Subject"
                className="w-full border border-black p-1 rounded-[5px]"
              />
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`py-2 px-6 rounded-lg bg-green-500 text-white hover:bg-green-400 ${
                  loading && "bg-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? <RotateCw className="animate-spin" /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditEngineeringQuestion;
