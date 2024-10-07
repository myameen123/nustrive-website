'use client'
import React from 'react'
// import WeekCard from '../../_components/weekCard'
import WeekList from '../../_components/weekList'
import { useParams } from 'next/navigation'

const CoursePage = () => {
  const params = useParams()
  console.log('params in :', params)
  const course = params.course

  return (
    <div>CoursePage
      <WeekList course ={course}   />
    </div>
  )
}

export default CoursePage