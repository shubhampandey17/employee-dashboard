import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ name, department, salary, status, id, editEmployee, deleteEmployee }) => {
  const navigate = useNavigate();

  const viewDetails = () => {
    navigate(`/employeeDetails/${id}`, { state: { name, department, salary, status, id } });
  };
  const editDetails = () => {};

  return (
    <div>
      <h3>Name: {name}</h3>
      <p>Department: {department}</p>
      <p>Salary: {salary}</p>
      <p>Status: {status}</p>

      <button onClick={viewDetails}>View Details</button>
      <button
        onClick={() =>
          editEmployee({
            id,
            name,
            department,
            salary,
            status,
          })
        }>
        Edit
      </button>
      <button onClick={() => deleteEmployee(id)}>Delete</button>
    </div>
  );
};

export default EmployeeCard;
