'use client'

import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux"; //useDispatch,
import {  useParams } from "next/navigation"; //redirect,
import toast from "react-hot-toast";
import { RotateCw } from "lucide-react";
import axios from "axios";

function NewEngineeringQuestion({ closeModal }) {
  const params = useParams();
  // const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.addNewEngineeringQuestion
  );

  const [file, setFile] = useState([]);

  const [dataForm, setDataForm] = useState({
    test:params.Test,
    text: "",
    subject: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (success) {
      toast.success("Question added Successfully", { duration: 5000 });
      setImagesPreview([]);
      setFile([]);
      setDataForm({
        text: "",
        subject: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      });
      closeModal();
    }
  }, [error, success, closeModal]);//dispatch, 

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSelectFile = (e) => {
    const files = Array.from(e.target.files);
    setFile(files);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e) => {
  try {
    e.preventDefault();
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/engineering/addEngineeringQuestion`,
      dataForm,
      {
        headers:{'Content-Type':'application/json'},
        withCredentials:true
      }
    )
    if(data){
      // redirect(`test/engineering-test/${param.Test}`)
      closeModal()
    }
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
};

  

  return (
    <>
      <form onSubmit={handleUpload} className="md:w-2/3 w-full m-auto">
        <div>
          <h1 className="text-xl my-4 text-center font-semibold">Add Question</h1>
          <div className="w-full grid grid-cols-1 gap-6">
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
              <label htmlFor="picture" className="font-semibold underline">
                Add picture (if needed):
              </label>
              <input
                type="file"
                id="picture"
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
            <div className="w-full">
              <label htmlFor="subject" className="font-semibold underline">
                Subject:
              </label>
              <input
                onChange={onChangeHandler}
                required
                value={dataForm.subject}
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
                {loading ? <RotateCw className="animate-spin" /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewEngineeringQuestion;
