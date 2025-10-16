import React, { useState } from "react";
import {
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const OrdersPieChart = () => {
  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#0ea5e9"];
  const [data, setData] =  useState([
      { name: "Electronics", value: 400 },
      { name: "Fashion", value: 300 },
      { name: "Home & Kitchen", value: 200 },
      { name: "Beauty", value: 150 },
      { name: "Other", value: 100 },
    ]);
  return (
    <>
      <div className="card shadow-sm border-0 rounded-4 p-3 mb-4">
        <h5 className="mb-3 fw-bold">Order Distribution by Category</h5>
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
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
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
    </>
  );
};

export default OrdersPieChart;
