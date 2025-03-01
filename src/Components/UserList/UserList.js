import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setCurrentUser, deleteUser } from "../../Store/Reducer/UserSlice"; 
import { openPopup } from "../../Store/Reducer/PopUpSlice";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

function UserList() {
  // const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const { users, loading, } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    dispatch(setCurrentUser(user));
    dispatch(openPopup());
  };

  const avatar = (user) => {
    const initials = user.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("")
      .slice(0,2);
  
    return initials;
  };
  

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(userId));
      dispatch(fetchUsers());
    }
  };

  return (
    <div className="!my-6 container">
      <div className="flex justify-center items-center mb-4 ">
        <h2 className="text-xl font-bold">User List</h2>

      </div>

      {loading ? (
      <CircularProgress className="absolute right-1/2 left-1/2 bottom-1/2 h-screen"/> 
    ) : users.length === 0 ? (
      <p className="text-gray-500">No users added yet.</p>
    ) :(
        <div className="space-y-2 shadow-md px-8 py-10 rounded-3xl bg-white overflow-auto">
          <table className="text-left w-full">
            <thead>
              <tr className="border-b border-[#e3e3e3]">
                <th className="pb-6 min-w-64">User</th>
                <th className="pb-6 min-w-72">Email</th>
                <th className="pb-6 min-w-32">Gender</th>
                <th className="pb-6 min-w-40">Status</th>
                <th className="pb-6 min-w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#e3e3e3]">
                  <td className="py-6 flex items-center">
                    <span
                      className={`mr-3 w-12 h-12 rounded-full flex justify-center items-center text-white font-bold text-lg ${
                        user.gender === "male" ? "bg-blue-500" : "bg-orange-500"
                      }`}
                    >
                      {avatar(user)}
                    </span>
                    {user.name}
                  </td>
                  <td className="py-6">{user.email}</td>
                  <td className="py-6">{user.gender}</td>
                  <td className="py-6 capitalize">
                    <span
                      className={`py-2 px-4 rounded-md ${
                        user.status === "active"
                          ? "bg-green-200 text-green-800 border border-green-500"
                          : "bg-rose-200 text-rose-800 border border-rose-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-6">
                    <button onClick={() => handleEdit(user)} className="mr-3 text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserList;
