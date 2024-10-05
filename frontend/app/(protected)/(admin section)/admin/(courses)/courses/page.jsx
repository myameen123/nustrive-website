'use client'
import React, {useState, useEffect} from 'react'
import ModalLayout from '../../../../../../components/modals/ModalLayout/modal-layout'
import NewCourse from '../_components/newCourse'
import EditCourse from '../_components/editCourse'
import CourseCard from '../_components/courseCard';
import axios from 'axios'

const CoursesList = () => {
    const [courses, setCourses] = useState([]);
    const [modal, setModal] = useState(false);
    const [edit, setEdit] = useState(false);
    const [currentCourse, setCurrentCourse] = useState({name:'', description:'',category:'',teacher:''});
  
    useEffect(() => {
      fetchCourses();
    }, []);
  
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/get`
        );
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        // setCourse(courses.filter((course) => course._id !== id));
        fetchCourses()
      } catch (err) {
        console.error("Error deleting course:", err);
      }
    };
  
    const handleAdd = async (course) => {
      try {
        setEdit(false)
        console.log('course in handleAdd',course)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/add`,course);
        console.log('response: ', response)
        const newCourse = await response.data;
        console.log('newCourse : ', newCourse)
        fetchCourses();
      } catch (err) {
        console.error("Error adding course:", err);
      }
    };
  
   
    const handleEdit =  (course) => {
      try {
        setEdit(true);
        setCurrentCourse(course)
        openModal()
      } catch (err) {
        console.error("Error updating course:", err);
      }
    };
  
    const openModal = () => {
        console.log('clicked')
      setModal(true);
    };
  
    const closeModal = () => {
      setModal(false);
      setEdit(false)
    };
  return (
    <>
    <div className="flex justify-end">
        <button
          className="p-2 w-fit text-white rounded-[5px] transition-all my-4 bg-[#4463FB] hover:bg-[#4463FB]/90"
          onClick={openModal}
        >
          Add Course
        </button>
      </div>
      <div>
        {courses &&
        courses.map((course) => (
          <CourseCard
            setEdit={setEdit}
            key={course._id}
            // field="business"
            course={course}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {modal && (
        <ModalLayout open={true} onClose={closeModal}>
          {edit ? (
            <EditCourse
              edit={edit}
              closeModal={closeModal}
              course={currentCourse}
              setCurrentCourse={setCurrentCourse}
              handleEdit={handleEdit}
              setCourses={setCourses}
              fetchCourses={fetchCourses}
            //   field={'business'}
            />
          ) : (
            <NewCourse
              edit={edit}
              closeModal={closeModal}
              fetchCourses={fetchCourses}
              handleAdd={handleAdd}
              course={currentCourse}
            />
          )}
        </ModalLayout>
      )}
          </>
  )
}

export default CoursesList