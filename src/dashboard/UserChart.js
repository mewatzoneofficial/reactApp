import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import API_URL from "../utils/config";

const Employer_Job_Chart = () => {
  const [filter, setFilter] = useState("month");
  const [data, setData] = useState([]);

  const fetchData = async (selectedFilter) => {
    try {
      const res = await fetch(`${API_URL}dashboard/employer-job-chart?filter=${selectedFilter}`);
      const result = await res.json();

      if (!result.data || !result.data.length) {
        setData([]);
        return;
      }

      // Map backend data to chart data
      const formatted = result.data.map((item) => ({
        time: item.time,
        employers: item.employers,
        jobs: item.jobs,
      }));

      setData(formatted);
    } catch (err) {
      console.error("Error fetching chart data:", err);
    }
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-bold">Employers & Jobs Line Chart</h5>
        <div>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="form-select w-auto"
          >
            <option value="day">Days</option>
            <option value="week">Weeks</option>
            <option value="month">Months</option>
            <option value="year">Years</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="employers" stroke="#6366f1" strokeWidth={3} />
          <Line type="monotone" dataKey="jobs" stroke="#10b981" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Employer_Job_Chart;
