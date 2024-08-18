import React from 'react';
import Link from 'next/link';

const TestCard = ({field, test, onDelete, onEdit,setEdit }) => {
  
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this test?')) {
      onDelete(test._id);
    }
  };
  
  const handleEdit = (e)=>{
    setEdit(false);
    onEdit(test);
  }
  
  let url =  `/admin/engineering-test/${test._id}`;
  if(field!=='engineering'){
    url = `/admin/business-test/${test._id}`;
  }
  
  return (
    <div className="flex items-center justify-between p-4 h-16 w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <Link href={url}>
          {test.title}
        </Link>
        <p className="text-gray-600">{test.description}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TestCard;
