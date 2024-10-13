"use client";
import React, { useState, useEffect } from "react";
import WeekContent from "../../../_components/WeekContent";
import ModalLayout from "../../../../../../../../components/modals/ModalLayout/modal-layout";
import EditContent from "../../../_components/editContent";
import NewContent from "../../../_components/newContent";
import EditTest from '../../../_components/editTest'
import NewTest from '../../../_components/newTest'
import axios from "axios";
import { useParams } from "next/navigation";

const WeekPage = () => {
  const params = useParams()
  console.log('params in weekPage: ', params)
  const [isFile, setIsFile] = useState(false)
  const [content, setContent] = useState([]);
  const [testModal, setTestModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState({});
  // const [currentTest, setCurrentTest] = useState({})

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // Fetch course content
      const responseContent = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/get`
      );
      const dataContent = await responseContent.json();
  
      // Fetch tests
      const responseTest = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/get`);
      const dataTest = await responseTest.json();
  
      // Combine the data arrays using concat
      const data = dataContent.concat(dataTest);
      console.log('Combined data:', data);
  
      // Filter the data based on params
      const filteredData = data.filter(
        (item) => item.week === params.week && item.course === params.course
      );
      setContent(filteredData);
    } catch (err) {
      console.error("Error fetching content:", err);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/test/delete/${id}`,{method:"DELETE"})
      // setCourse(courses.filter((course) => course._id !== id));
      fetchContent();
    } catch (err) {
      console.error("Error deleting content:", err);
    }
  };


  const handleAdd = async (content) => {
    try {
      setEdit(false);
      console.log("content in handleAdd", content);
  
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/add`,
        content,  // Send FormData containing text and file data
        {
          headers: {
            "Content-Type": "multipart/form-data",  // Important for file upload
          },
        }
      );
      console.log("response: ", response);
      const newContent = await response.data;
      console.log("newCourse : ", newContent);
      fetchContent();  // Refresh the content list after successful addition
    } catch (err) {
      console.error("Error adding content:", err);
    }
  };
  

  const handleTestAdd = async (test) => {
    try {
      setEdit(false);
      console.log("content in handleAdd", test);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/add`,
        test
      );
      console.log("response: ", response);
      const newTest = await response.data;
      console.log("newTest : ", newTest);
      fetchContent();
    } catch (err) {
      console.error("Error adding Test:", err);
    }
  };

  const handleEdit = (content) => {
    
    try {
      {content.questions ? openTestModal(): openModal() }
      setEdit(true);
      setCurrentContent(content);
    } catch (err) {
      console.error("Error updating content:", err);
    }
  };

  // const handleTestEdit = (content) => {
  //   try {
  //     setEdit(true);
  //     setCurrentContent(content);
  //     openTestModal();
  //   } catch (err) {
  //     console.error("Error updating test:", err);
  //   }
  // };

  const openModal = () => {
    setModal(true);
  };
  const openFileModal = () => {
    setModal(true);
    setIsFile(true)
  };

  const openTestModal = () => {
    setTestModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEdit(false);
    setIsFile(false);
  };

  const closeTestModal = () => {
    setTestModal(false);
    setEdit(false);
  };

  console.log('content:   ',content)

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={openTestModal}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Test
        </button>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Link
        </button>
        <button
          onClick={openFileModal}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Add File
        </button>
      </div>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Week Content</h2>
        {content &&
        content.map((content) => (
          <WeekContent
            setEdit={setEdit} 
            key={content._id}
            // field="business"
            content={content}
            onDelete={handleDelete}
            onEdit={handleEdit}
            // onEditTest = {handleTestEdit}
            // handleTestDelete = {handleTestDelete}
          />
        )) 
        }
      </div>
      {modal && (
        <ModalLayout open={true} onClose={closeModal}>
          {edit ? (
            <EditContent
              edit={edit}
              closeModal={closeModal}
              content={currentContent}
              setCurrentContent={setCurrentContent}
              handleEdit={handleEdit}
              setContent={setContent}
              fetchContent={fetchContent}
              isFile={isFile}
              //   field={'business'}
            />
          ) : (
            <NewContent
              edit={edit}
              closeModal={closeModal}
              fetchContent={fetchContent}
              handleAdd={handleAdd}
              content={currentContent}
              isFile={isFile}
            />
          )}
        </ModalLayout>
      )}
      {testModal && (
        <ModalLayout open={true} onClose={closeTestModal}>
          {edit ? (
            <EditTest
              edit={edit}
              closeModal={closeTestModal}
              content={currentContent}
              setCurrentTest={setCurrentContent}
              setContent={setContent}
              fetchContent={fetchContent}
              // setCurrentContent={setCurrentContent}
              handleEdit={handleEdit}
            />
          ) : (
            <NewTest
              edit={edit}
              closeModal={closeTestModal}
              fetchContent={fetchContent}
              handleAdd={handleTestAdd}
              test={currentContent}
            />
          )}
        </ModalLayout>
      )}
    </div>
  );
};

export default WeekPage;
