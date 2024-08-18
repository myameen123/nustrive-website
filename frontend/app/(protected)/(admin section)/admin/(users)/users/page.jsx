"use client";

import React, { useEffect, useState } from "react";
import UserCard from "../_components/UserCard";
import axios from 'axios';
import RegisterUser from "../_components/registerUser";
import EditUser from "../_components/editUser";
import ModalLayout from "@/components/modals/ModalLayout/modal-layout";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null)
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false)

  useEffect(() => {
    console.log("in effect before");
    fetchUsers();
    console.log("in effect after");
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("1. in fetchUsers");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/get-all`);
      // console.log("response", response.json());
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("2. in fetch before parsing JSON");
      const users = await response.json();
      console.log("parsed users:", users); // Log the parsed users
      setUsers(users);
    } catch (err) {
      console.log("Error:", err.message);
    }
    console.log("3. in fetchUsers after");
  };

  // console.log("users", users);

  const handleDelete = async (id) => {
    console.log("handle delete");
    try{
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/delete-user/${id}`);
        if(!response.ok){
          console.log('response is not ok of delete.');
        }
        console.log('delete successfully.');
        setUsers(users.filter(user=> user._id !== id))
    }catch(err){
      console.log('Error while deleting : ', err.message);
    }
  };

  const handleEdit = async(id) => {
    console.log("handle edit");
    try{
        setEdit(true);
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${id}`)
        console.log('userResponse.data: ',userResponse.data)
        setUser(userResponse.data);
        // setUsers(users.map(user => user._id === id ? updatedUser : user))
    }catch(err){
      console.log('err.message: ', err.message)
      setEdit(false)
    }
    fetchUsers();
  };

  const openModal = ()=>{
    setModal(true);
    
  }

  const closeModal = () =>{
    setModal(false);
    setEdit(false)
  }

  return (
    <div className="p-6">
  <button
    onClick={openModal}
    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Register User
  </button>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <caption className="text-lg font-bold py-4">Users</caption>
      <thead>
        <tr className="bg-gray-100 border-b">
          <th className="text-left p-4 font-medium">Name</th>
          <th className="text-left p-4 font-medium">Email</th>
          <th className="text-left p-4 font-medium">Role</th>
          <th className="text-left p-4 font-medium">Action</th>
        </tr>
      </thead>
      {users.length > 0 ? (
        <tbody>
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
              openModal={openModal}
            />
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td className="p-4 text-center" colSpan="4">
              No users Found
            </td>
          </tr>
        </tbody>
      )}
    </table>
  </div>

  {modal && (
    <ModalLayout
      open={true}
      onClose={closeModal}
    >
      {edit ? (
        <EditUser
          edit={edit}
          user={user}
          handleEdit={handleEdit}
          fetchUsers={fetchUsers}
          closeModal={closeModal}
        />
      ) : (
        <RegisterUser
          edit={edit}
          fetchUsers={fetchUsers}
          closeModal={closeModal}
        />
      )}
    </ModalLayout>
  )}
</div>

  );
};

export default UsersPage;
