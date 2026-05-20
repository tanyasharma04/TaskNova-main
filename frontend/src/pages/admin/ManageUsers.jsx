








import React, { useEffect, useState } from "react"
import axiosInstance from "../../utils/axioInstance"
import DashboardLayout from "../../components/DashboardLayout"

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/get-users")

      if (response.data?.length > 0) {
        setAllUsers(response.data)
      } else {
        setAllUsers([])
      }
    } catch (error) {
      console.log("Error fetching users: ", error)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className="mt-5 mb-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Team Members</h2>
        </div>

        {/* Users List (NO PROFILE CIRCLE, SIMPLE UI) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {allUsers?.map((user) => (
            <div
              key={user._id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              {/* Name */}
              <h3 className="text-lg font-semibold">
                {user.name || user.username}
              </h3>

              {/* Email */}
              <p className="text-sm text-gray-600">
                {user.email}
              </p>

              {/* Status (if available) */}
              <div className="mt-3 flex gap-2 text-xs">
                <span className="px-2 py-1 bg-yellow-100 rounded">
                  Pending: {user.pending || 0}
                </span>
                <span className="px-2 py-1 bg-blue-100 rounded">
                  In Progress: {user.inProgress || 0}
                </span>
                <span className="px-2 py-1 bg-green-100 rounded">
                  Completed: {user.completed || 0}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {allUsers.length === 0 && (
          <p className="text-gray-500 mt-4">No users found</p>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers

