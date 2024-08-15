import React from 'react'
import Image from 'next/image'

const Teacher = ({teacher}) => {
  return (
    <div className="pt-1 mx-auto bg-[#f5f5f5] rounded-[12px] flex flex-col items-start ">
      <div>
        <Image src={teacher.photo} alt="exam img" className=" w-[950px]" />
      </div>
      <div className="pt-4 pl-2 flex flex-col items-start  gap-2">
        <h2 className=" text-3xl font-bold text-[#282828] ">{teacher.name}</h2>
        <p className=" text-[#3E3E59] text-xl ">{teacher.title}</p>
        <ul className=" grid grid-cols-1  gap-2 text-[#5F6980]  "> {/*list-disc*/}
          {
          (teacher.subjects).map((subject, id) => (
            <li key={id}>{subject}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Teacher