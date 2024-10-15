"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RotateCw } from "lucide-react";
import { useSelector } from "react-redux"; 
import { useParams } from "next/navigation";

function QuestionForm({
  edit,
  question,
  // testId,
  closeModal,
  handleSelectFile,
  handleSubmit,
}) {
  const params = useParams()
  // console.log('params in question form: ', params)

  const { loading, success, error } = useSelector(
    (state) => state.addNewEngineeringQuestion
  );
  const [dataForm, setDataForm] = useState({
    test: params.Test || "",
    text: "",
    image:"",
    subject: params.course || "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const [file, setFile] = useState([]);

  useEffect(() => {
    setImagesPreview([]);
    setFile([]);
    setDataForm({
      test: params.Test,
      text: "" || question.text,
      image: question.image || '',
      subject: params.course || "",
      option1: "" || question.options[0],
      option2: "" || question.options[1],
      option3: "" || question.options[2],
      option4: "" || question.options[3],
    });
  }, [question]);

  const handeUpload = (e) => {
    e.preventDefault();
    const updatedQuestion = edit
      ? {
          text: dataForm.text,
          image:question.image,
          options: [
            dataForm.option1,
            dataForm.option2,
            dataForm.option3,
            dataForm.option4,
          ],
          subject: params.course,
        }
      : dataForm;
      // console.log('update question: ', updatedQuestion)
    handleSubmit(updatedQuestion);
    closeModal();
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  return (
    <>
      <form onSubmit={handeUpload} className="gap-6">
        <div>
          <h1 className="text-xl  text-center font-semibold">
            {edit ? "Edit Question" : "Add Question"}
          </h1>
          <div className="">
            <div className="border-y rounded-[4px]">
              
              <textarea
                onChange={onChangeHandler}
                required
                value={dataForm.text}
                name="text"
                rows={5}
                type="text"
                placeholder="Question Text"
                className="rounded-lg w-full border border-black p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="font-semibold underline">
                Add picture (if needed):
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                multiple
                onChange={handleSelectFile}
              />
              {imagesPreview?.length > 0 && (
                <div className="w-full flex gap-3 overflow-auto border border-b p-2">
                  {imagesPreview.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Question Preview"
                      width={100}
                      height={100}
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className="font-semibold underline text-center">Options</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="option1" className="font-semibold underline">
                    Option 1 (Correct Option):
                  </label>
                  <input
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option1}
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
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option2}
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
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option3}
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
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option4}
                    name="option4"
                    type="text"
                    placeholder="Option 4"
                    className="w-full border border-black p-1 rounded-[5px]"
                  />
                </div>
              </div>
            </div>
            {/* <div className="w-full">
              <label htmlFor="subject" className="font-semibold underline">
                Select Subject:
              </label>
              <select
                onChange={onChangeHandler}
                required
                value={dataForm.subject}
                name="subject"
                type="text"
                placeholder="Subject"
                className="w-full border border-black p-1 rounded-[5px]"
              >
                <option value=""></option>
                <option value="maths">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="iq">Intelligence Question</option>
                <option value="computer science">Computer Science</option>
                <option value="english">English</option>
              </select>
            </div> */}
            <div className="flex w-full justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`py-2 px-6 mt-4 rounded-[10px] bg-[#4483fb] text-white hover:bg-[#4463fb] ${
                  loading && "bg-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? <RotateCw className="animate-spin" /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default QuestionForm;
