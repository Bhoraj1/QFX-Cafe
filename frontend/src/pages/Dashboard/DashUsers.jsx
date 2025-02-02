import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminLevel, setAdminLevel] = useState("");

  const handleChangeRole = (e) => {
    setAdminLevel(e.target.value);
  };
  console.log(adminLevel);
  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/auth/update-role/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminLevel }),
      });

      if (!res.ok) {
        console.log("Failed to update role");
      } else {
        setIsOpen(false);
        console.log("Role Change successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setRole("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/get-users`);
        const data = await res.json();
        // console.log(data);
        if (!res.ok) {
          console.error(data.message || "Failed to fetch posts.");
        } else {
          setUsers(data);
          if (data.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.isAdmin]);

  const handleDeleteUser = async () => {};

  return (
    <div className="w-full min-h-screen table-auto p-2 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 ">
      {currentUser?.isAdmin && users.length > 0 ? (
        <div className="font-sans overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 whitespace-nowrap">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  created at
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
              {users.map((user) => (
                <tr>
                  <td class="px-4 py-4 text-sm text-gray-800">
                    {new Date(user.createdAt).toDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {user.username}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="flex gap-3 px-4 py-4 text-sm text-gray-800">
                    {user.isAdmin ? (
                      <>
                        <FaCheck className="text-green-600" />
                        {user.isAdmin && user.role === "super_admin" && (
                          <FaCheck className="text-green-600" />
                        )}
                      </>
                    ) : (
                      <FaTimes className="text-red-600" />
                    )}
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-800">
                    <button
                      className="text-blue-600 mr-4"
                      onClick={() => openModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                    >
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className=" flex justify-center items-center text-3xl mt-7">
          There are no users yet!
        </p>
      )}

      {/* {showMore && (
        <button
          onClick={handleShowMore}
          className="w-full text-teal-500 self-center text-sm py-7"
        >
          Show More
        </button>
      )} */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
        className="bg-transparent m-48 "
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-black">
              Are you sure you want to delete this user ?{" "}
            </h3>
            <div className="flex justify-center gap-7">
              <Button className="text-red-600" onClick={handleDeleteUser}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {isOpen && selectedUser && (
        <div className="fixed inset-0 px-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto ">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative mx-auto text-center">
            {/* Cross Icon */}
            <FaTimes
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 cursor-pointer"
              size={24}
            />

            {/* Modal Content */}
            <form onSubmit={handleRoleSubmit} className="mt-4">
              <h3 className="text-gray-800 text-2xl font-semibold">
                Change Role for {selectedUser.username} ({selectedUser.role})
              </h3>
              <p className="text-sm text-gray-600 mt-3">
                Select a new role for the user from the dropdown below.
              </p>

              {/* User Role Selection */}
              <div className="mt-8">
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Select User Role:
                </label>
                <select
                  name="role"
                  id="role"
                  onChange={handleChangeRole}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </select>
              </div>

              {/* Update Role Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="px-6 py-2.5 w-full rounded-md text-white font-semibold bg-green-500 hover:bg-green-600"
                >
                  Update Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
