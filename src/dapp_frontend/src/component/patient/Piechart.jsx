import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Piechart = ({ count }) => {
  const data = [
    { name: "Medications", value: count.completed },
    { name: "Prescriptions", value: count.pending },
    { name: "Appointments", value: count.processing },
  ];

  const COLORS = ["#60A5FA", "#34D399", "#FBBF24"];

  return (
    <div className="flex items-center h-full justify-center">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart className="w-3/5 sm:w-4/5 md:w-ful">
          <Pie
            data={data}
            cx="50%" // Center x-coordinate
            cy="50%" // Center y-coordinate
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            className=""
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Piechart;
