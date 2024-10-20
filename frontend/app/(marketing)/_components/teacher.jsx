import React from 'react'
import Image from 'next/image'

const Teacher = ({teacher}) => {
  return (
    <div className="bg-[#ffffff] rounded-[12px] flex flex-col items-start border border-2-[#E6E4FF] transition-shadow "> {/*h-[490px] */}
      <div className='w-full'>
        <Image src={teacher.photo} alt="exam img" className="h-[16rem] w-full object-cover rounded-t-[12px] " />
      </div>
      <div className="p-4 pl-3 pt-3  flex flex-col items-start  gap-2">
        <h2 className="text-xl font-semibold text-[#282828] ">{teacher.name}</h2>
        <p className=" text-[#3E3E59] ">{teacher.title}</p>
        <ul className=" flex flex-wrap text-sm text-[#5F6980] gap-2 "> {/*list-disc*/}
          {
          (teacher.subjects).map((subject, id) => (
            <li className='py-0.5 px-3 bg-gray-100 rounded-full' key={id}>{subject}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Teacher