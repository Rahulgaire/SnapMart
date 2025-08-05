import React from 'react'

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <p className="text-center text-2xl font-bold mt-10">Welcome to the Admin Dashboard</p>
      <p className="text-center text-gray-600 mt-4">Here you can manage users, view statistics, and perform administrative tasks.</p>
      <div className="flex justify-center mt-10">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">View Users</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">View Statistics</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4">Settings</button>
        </div>
      </div>
  )
}

export default Dashboard
