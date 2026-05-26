import React, { useState } from "react";
import EmployeeCard from "../components/EmployeeCard";

const Dashboard = () => {
  const employeeData = [
    {
      id: 1,
      name: "Shubham",
      department: "Frontend",
      salary: 50000,
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul",
      department: "Backend",
      salary: 70000,
      status: "Inactive",
    },
  ];

  const [searchValue, setSearchValue] = useState("");
  const [filteredEmployeeData, setFilteredEmployeeData] = useState(employeeData);

  const onChangeInputSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const filteredData = employeeData.filter((data) => {
      return (
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.department.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredEmployeeData(filteredData);
  };

  return (
    <>
      <input type="search" value={searchValue} onChange={onChangeInputSearch} placeholder="search name / department" />
      Employee Dashboard
      <div>
        {filteredEmployeeData.map((data) => {
          return (
            <EmployeeCard
              key={data.id}
              id={data.id}
              name={data.name}
              department={data.department}
              salary={data.salary}
              status={data.status}
            />
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
