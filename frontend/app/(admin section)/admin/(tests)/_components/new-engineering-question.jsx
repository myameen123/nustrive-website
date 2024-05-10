"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/navigation";
// import { createNewEngineeringQuestions } from "@/redux/NewEngineeringQuestionsSlice";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast from "react-hot-toast";
import { addEngineeringQuestion } from "@/redux/test/add-engineering-questions";
// import input from "@/components/inputs/TextField";
// import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
function NewEngineeringQuestions() {
  const dispatch = useDispatch();
  // const [myProduct, setMyProduct] = useState({});

  const { loading, success, error } = useSelector(
    (state) => state.addNewEngineeringQuestion
  );
  // setMyProduct(product);
  const router = useRouter();
  const [file, setFile] = useState([]);
  // const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [dataForm, setDataForm] = useState({
    text: "",
    questionSubject: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const [res, setRes] = useState({});

  // console.log("success:", success.toString());
  useEffect(() => {
    // console.log("success:", success.toString());
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
      // toast.success("Question added Successfully", {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });

      setImagesPreview([]);
      setFile([]);
      setDataForm({
        text: "",
        questionSubject: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
      });
      window.location.reload();
      // router.push("/admin/dashboard");
      // setMyProduct({});
    }
  }, [dispatch, error, success]);

  let name = "";
  let value = "";
  const onChangeHandler = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;
    setDataForm({ ...dataForm, [name]: value });
  };
  const handleSelectFile = (e) => {
    // console.log(e.target.files[0]);
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
      const formData = new FormData();
      console.log("File:", file);
      // console.log("Data Form:", dataForm);
      file.forEach((imageFile) => {
        formData.append("images", imageFile);
      });
      formData.append("text", dataForm.text);
      formData.append("questionSubject", dataForm.questionSubject);
      formData.append("option1", dataForm.option1);
      formData.append("option2", dataForm.option2);
      formData.append("option3", dataForm.option3);
      formData.append("option4", dataForm.option4);
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + " - " + pair[1]);
      // }

      dispatch(addEngineeringQuestion(formData));
    } catch (error) {
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
      // alert(error.message);
    }
  };
  return (
    <div>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleUpload}
        className=" md:w-2/3 w-full  m-auto"
      >
        <div>
          <h1 className=" text-xl my-4 text-center font-semibold">
            Add Question
          </h1>
          <div className=" w-full grid grid-cols-1 gap-6">
            <div className=" border-y rounded-[4px]">
              <textarea
                onChange={onChangeHandler}
                required
                value={dataForm.text}
                name="text"
                rows={5}
                type="text"
                placeholder="Question Text"
                className=" rounded-lg w-full border border-black p-2"
              />
              {/* <p className=" text-sm text-red-500">
              {errors.description?.message}
            </p> */}
            </div>
            <div className=" flex flex-col gap-2">
              <label htmlFor="pricture" className=" font-semibold underline">
                Add picture (if needed):
              </label>
              <input
                type="file"
                id="picture"
                accept="image/*"
                multiple
                // multiple={false}
                onChange={handleSelectFile}
              />

              {imagesPreview?.length > 0 && (
                <div className=" w-full flex gap-3 overflow-auto border border-b p-2">
                  {imagesPreview.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt="Question Preview"
                      width={500}
                      height={500}
                    />
                  ))}
                </div>
              )}
            </div>
            <div>
              <p className=" font-semibold underline text-center">Options</p>
              <div className=" grid grid-cols-1 gap-2">
                <div className=" flex flex-col gap-2">
                  <label htmlFor="option1" className=" font-semibold underline">
                    Option 1 (Correct Option):
                  </label>
                  <input
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option1}
                    name="option1"
                    type="text"
                    placeholder="Option 1"
                    className=" w-full border border-black p-1 rounderd-[5px]"
                    size="small"
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label htmlFor="option2" className=" font-semibold underline">
                    Option 2:
                  </label>
                  <input
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option2}
                    name="option2"
                    type="text"
                    placeholder="Option 2"
                    className=" w-full border border-black p-1 rounderd-[5px]"
                    size="small"
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label htmlFor="option3" className=" font-semibold underline">
                    Option 3:
                  </label>
                  <input
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option3}
                    name="option3"
                    type="text"
                    placeholder="Option 3"
                    className=" w-full border border-black p-1 rounderd-[5px]"
                    size="small"
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label htmlFor="option4" className=" font-semibold underline">
                    Option 4:
                  </label>
                  <input
                    onChange={onChangeHandler}
                    required
                    value={dataForm.option4}
                    name="option4"
                    type="text"
                    placeholder="Option 3"
                    className=" w-full border border-black p-1 rounderd-[5px]"
                    size="small"
                  />
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              <label htmlFor="subject" className=" font-semibold underline">
                Subject to Which Question blongs:
              </label>
              <input
                onChange={onChangeHandler}
                required
                value={dataForm.questionSubject}
                name="questionSubject"
                type="text"
                placeholder="Subject"
                className=" w-full border border-black p-1 rounderd-[5px]"
                size="small"
              />
              {/* <p className=" text-sm text-red-500">{errors.price?.message}</p> */}
            </div>
          </div>
        </div>
        {/* <button
          className=" bg-[#111256] p-2 text-white rounded-[5px] my-4 hover:bg-[#111256]/90"
          onClick={handleUpload}
        >
          Add Question
        </button> */}

        <button
          disable={loading}
          className={`p-2 text-white rounded-[5px] transition-all my-4 bg-[#111256] hover:bg-[#111256]/90 ${
            loading ? "bg-slate-500 flex justify-center items-center" : ""
          }`}
        >
          {loading ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <span> Add Question</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default NewEngineeringQuestions;
