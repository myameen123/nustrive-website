import React, { useEffect } from 'react'

const UserCard = ({user, onDelete, onEdit, openModal}) => {

    const handleDelete = ()=>{
        alert(`Are you sure you want to delete ${user.name}`)
        onDelete(user._id);
      }
      

      const handleEdit = () =>{
        onEdit(user._id)
        openModal()
        
    }
  return (
    <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete} >Delete</button>
        </td>
    </tr>
  )
}

export default UserCard