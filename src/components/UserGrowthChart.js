import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const UserGrowthChart = () => {
    const [data, setData] = useState([
      { month: "Jan", users: 100 },
      { month: "Feb", users: 200 },
      { month: "Mar", users: 400 },
      { month: "Apr", users: 700 },
      { month: "May", users: 900 },
      { month: "Jun", users: 1245 },
    ]);
  return (
    <>
    <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
        <h5 className="mb-3 fw-bold">User Growth Over Time</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default UserGrowthChart