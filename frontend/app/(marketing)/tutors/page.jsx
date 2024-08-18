'use client'
import React, {useState, useEffect} from 'react'
import Teachers from '../_components/teachers'
import axios from 'axios'

const TutorPage = () => {
  const [teachers, setTeachers] = useState();

  useEffect(()=>{
    fetchTeachers();
  },[])

  const fetchTeachers = async () =>{
    try{
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-all`)
      if(!response.ok){
        console.log('error fetching Teachers')
      }
      const users = response.data
      console.log('users',users)
      const tutors = users.filter(user=>user.role==='teacher'? user : '')
      setTeachers(tutors)
    }catch(err){
      console.log('err.message',err.message)  
    }
  }
  console.log('teachers: ',teachers);

  return (
    <div>

      <Teachers teachers={teachers} />
    </div>
  )
}

export default TutorPage