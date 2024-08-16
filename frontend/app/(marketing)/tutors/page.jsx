'use Client'
import React, { useEffect, useState } from 'react'
import Teachers from '../_components/teachers'

const TutorPage = () => {
  const [teachers, setTeachers] = useState();

  useEffect(()=>{
    fetchTeachers();
  },[])

  const fetchTeachers = async () =>{
    try{
      const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/getAll/${role}`)
    }catch(err){
      console.log('err.message',err.message)
    }
  }

  return (
    <div>TutorPage

      <Teachers/>
    </div>
  )
}

export default TutorPage