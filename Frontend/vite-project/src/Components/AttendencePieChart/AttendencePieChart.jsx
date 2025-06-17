import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./AttendencePieChart.css";

const COLORS = ["#339ca2", "#c94c43"];

const AttendancePieChart = ({ selfdata }) => {
  const attendanceData = selfdata?.attendance || [];
  const presentCount = attendanceData.filter((a) => a.status === "Present").length;
  const absentCount = attendanceData.filter((a) => a.status === "Absent").length;
  const totalLectures = attendanceData.length;
  const percentage = totalLectures ? Math.round((presentCount / totalLectures) * 100) : 0;

  const data = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];

  return (
    <div className="attendance-container">
      <h2 className="heading">Cumulative Attendance</h2>
      <div className="chart-info-wrapper">
        <div className="chart-wrapper">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx={150}
              cy={150}
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={3}
              dataKey="value"
              label={({ name, value }) => `${name} (${value})`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" />
          </PieChart>
        </div>
        <div className="details">
          <table>
            <tbody>
              <tr>
                <td><strong>Subject</strong></td>
                <td>Cumulative Attendance</td>
              </tr>
              <tr>
                <td><strong>Month</strong></td>
                <td>All</td>
              </tr>
              <tr>
                <td><strong>Total Present</strong></td>
                <td>{presentCount}</td>
              </tr>
              <tr>
                <td><strong>Total Absent</strong></td>
                <td>{absentCount}</td>
              </tr>
              <tr>
                <td><strong>Total Lectures</strong></td>
                <td>{totalLectures}</td>
              </tr>
              <tr>
                <td><strong>Percentage</strong></td>
                <td>{percentage}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePieChart;
