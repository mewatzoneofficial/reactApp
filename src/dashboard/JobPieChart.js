import React, { useEffect, useState } from "react";
import {
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import API_URL from "../utils/config";

const JobPieChart = () => {
  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9"];
  const [jobs, setJobs] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}dashboard/job-chart`);
      if (!res.ok) throw new Error("Failed to fetch job stats");

      const result = await res.json();
      setJobs(result.data || {});
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setData([
      { name: "Total Jobs", value: jobs.total_jobs || 0 },
      { name: "Applied Jobs", value: jobs.total_applied_jobs || 0 },
      { name: "Drafted Jobs", value: jobs.total_drafted_jobs || 0 },
      { name: "Rejected Jobs", value: jobs.total_rejected_jobs || 0 },
      { name: "Approved Jobs", value: jobs.total_approval_jobs || 0 },
    ]);
  }, [jobs]);

  if (loading) return <div>Loading chart...</div>;

  return (
    <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
      <h5 className="mb-3 fw-bold">Job Management</h5>
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
            label={({ name, percent }) =>`${name} ${(percent * 100).toFixed(0)}%`
            }
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

export default JobPieChart;
