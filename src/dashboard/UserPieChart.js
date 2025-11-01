import React, { useEffect, useState, useMemo } from "react";
import {
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import API_URL from "../utils/config";

const UserPieChart = () => {
  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9"];
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}dashboard/user-chart`);
      if (!res.ok) throw new Error("Failed to fetch user stats");

      const result = await res.json();
      console.log("API result:", result.data); // Debug API response
      setUserStats(result.data || {});
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

const data = useMemo(() => [
  { name: "Total Users", value: userStats.total_faculity_users || 0 },
  { name: "Today Users", value: userStats.total_today_faculty_users || 0 },
  { name: "Incomplete Users", value: userStats.total_incomplete_faculty_users || 0 },
  { name: "Today Block Request", value: userStats.total_blocked_faculty_users || 0 },
], [userStats]);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
      <h5 className="mb-3 fw-bold">User Management</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserPieChart;
