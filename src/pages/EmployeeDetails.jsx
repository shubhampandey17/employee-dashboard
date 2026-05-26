import React from "react";
import { useLocation, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();

  const location = useLocation();

  const employeeData = location.state;

  return (
    <div>
      <h2>Employee Details {id}</h2>

      <p>Name: {employeeData?.name}</p>

      <p>Department: {employeeData?.department}</p>

      <p>Salary: {employeeData?.salary}</p>

      <p>Status: {employeeData?.status}</p>
    </div>
  );
};

export default EmployeeDetails;
