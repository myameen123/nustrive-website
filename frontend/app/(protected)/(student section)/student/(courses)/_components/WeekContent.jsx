import React from 'react'

const WeekContent = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Week Content</h2>
      {/* <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add Test
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Add Link
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Add File
        </button>
      </div> */}
      <div className="p-4 bg-white border border-gray-300 rounded-lg">
        <p className="text-gray-700">File</p>
      </div>
    </div>
  )
}

export default WeekContent
