"use client";
import React, { useState, useEffect } from "react";
import WeekContent from "../../../_components/WeekContent";
import ModalLayout from "../../../../../../../../components/modals/ModalLayout/modal-layout";
import EditContent from "../../../_components/editContent";
import NewContent from "../../../_components/newContent";
import axios from "axios";
import { useParams } from "next/navigation";

const WeekPage = () => {
  const params = useParams()
  console.log('params in weekPage: ', params)
  const [content, setContent] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/get`
      );
      const data = await response.json();
      console.log('data :', data)

      const filteredData = data.filter(item => (item.week === params.week) && (item.course === params.course));
      setContent(filteredData);
      // setContent(data);
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
  

  // const handleAdd = async (content) => {
  //   try {
  //     setEdit(false);
  //     console.log("content in handleAdd", content);
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/courseContent/add`,
  //       content
  //     );
  //     console.log("response: ", response);
  //     const newContent = await response.data;
  //     console.log("newCourse : ", newContent);
  //     fetchContent();
  //   } catch (err) {
  //     console.error("Error adding content:", err);
  //   }
  // };

  const handleEdit = (content) => {
    try {
      setEdit(true);
      setCurrentContent(content);
      openModal();
    } catch (err) {
      console.error("Error updating content:", err);
    }
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEdit(false);
  };

  console.log('content:   ',content)

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={openModal}
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
          onClick={openModal}
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
              //   field={'business'}
            />
          ) : (
            <NewContent
              edit={edit}
              closeModal={closeModal}
              fetchContent={fetchContent}
              handleAdd={handleAdd}
              content={currentContent}
            />
          )}
        </ModalLayout>
      )}
    </div>
  );
};

export default WeekPage;
