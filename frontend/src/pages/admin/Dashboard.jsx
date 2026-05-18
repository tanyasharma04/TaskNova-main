

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "../../components/DashboardLayout"
import axiosInstance from "../../utils/axioInstance"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import RecentTasks from "../../components/RecentTasks"
import CustomPieChart from "../../components/CustomPieChart"
import CustomBarChart from "../../components/CustomBarChart"

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"]

const Dashboard = () => {
  const navigate = useNavigate()

  const { currentUser } = useSelector((state) => state.user)

  const [dashboardData, setDashboardData] = useState({})
  const [pieChartData, setPieChartData] = useState([])
  const [barChartData, setBarChartData] = useState([])

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || {}
    const taskPriorityLevels = data?.taskPriorityLevel || {}

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]

    setPieChartData(taskDistributionData)

    const priorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ]

    setBarChartData(priorityLevelData)
  }

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get("/tasks/dashboard-data")

      if (response.data) {
        setDashboardData(response.data)
        prepareChartData(response.data?.charts || {})
      }
    } catch (error) {
      console.log("Error fetching dashboard data:", error)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <div className="p-8 space-y-8 bg-slate-100 min-h-screen">

        {/* Top Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 shadow-2xl text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
                Welcome! {currentUser?.name}
              </h2>

              {/*<p className="text-orange-100 mt-2 text-sm">
                {moment().format("dddd Do MMMM YYYY")}
              </p>*/}
            </div>

            {/*<div className="mt-4 md:mt-0">
              <button
                className="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-xl"
                onClick={() => navigate("/admin/create-task")}
              >
                Create New Task
              </button>
            </div>*/}

          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-gray-50 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-medium">
              Total Tasks
            </h3>

            <p className="text-3xl font-bold text-gray-800 mt-2">
              {dashboardData?.charts?.taskDistribution?.All || 0}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-medium">
              Pending Tasks
            </h3>

            <p className="text-3xl font-bold text-gray-800 mt-2">
              {dashboardData?.charts?.taskDistribution?.Pending || 0}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">
              In Progress Tasks
            </h3>

            <p className="text-3xl font-bold text-gray-800 mt-2">
              {dashboardData?.charts?.taskDistribution?.InProgress || 0}
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-medium">
              Completed Tasks
            </h3>

            <p className="text-3xl font-bold text-gray-800 mt-2">
              {dashboardData?.charts?.taskDistribution?.Completed || 0}
            </p>
          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Distribution
            </h3>

            <div className="h-64">
              <CustomPieChart
                data={pieChartData}
                label="Tasks"
                colors={COLORS}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Priority Levels
            </h3>

            <div className="h-64">
              <CustomBarChart data={barChartData} />
            </div>
          </div>

        </div>

        {/* Recent Tasks */}
        {/*<div className="bg-white p-6 rounded-3xl shadow-xl">
          <RecentTasks tasks={dashboardData?.recentTasks || []} />
        </div>*/}

      </div>
    </DashboardLayout>
  )
}

export default Dashboard
