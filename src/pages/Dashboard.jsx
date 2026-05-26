import React, { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";

const Dashboard = () => {
  const [employeeData, setEmployeeData] = useState([
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
  ]);

  const [searchValue, setSearchValue] = useState("");

  const [addEmployeeModal, setAddEmployeeModal] = useState(false);

  const [employeeName, setEmployeeName] = useState("");

  const [employeeDepartment, setEmployeeDepartment] = useState("");

  const [employeeStatus, setEmployeeStatus] = useState("");

  const [employeeSalary, setEmployeeSalary] = useState("");

  const [nameError, setNameError] = useState(false);

  const [departmentError, setDepartmentError] = useState(false);

  const [statusError, setStatusError] = useState(false);

  const [salaryError, setSalaryError] = useState(false);

const onChangeInputSearch =
  (e) => {
    setSearchValue(
      e.target.value
    );
  };

  const addEmployee = () => {
    setAddEmployeeModal(true);
  };

  const validateEmployeeForm = () => {
    let isValid = true;

    if (!employeeName.trim()) {
      setNameError(true);
      isValid = false;
    }

    if (!employeeDepartment.trim()) {
      setDepartmentError(true);
      isValid = false;
    }

    if (!employeeStatus.trim()) {
      setStatusError(true);
      isValid = false;
    }

    if (!employeeSalary) {
      setSalaryError(true);
      isValid = false;
    }

    if (isValid) {

      setEmployeeData((prev)=>[...prev , {
        'department' : employeeDepartment , 'id' : prev.length+1 , 'name' : employeeName, 'salary' : employeeSalary , status : employeeStatus 
      }])


      setAddEmployeeModal(false);
      setEmployeeName("");
      setEmployeeDepartment("");
      setEmployeeStatus("");
      setEmployeeSalary("");
    }
  };

  return (
    <>
      <input type="search" value={searchValue} onChange={onChangeInputSearch} placeholder="search name / department" />

      <button onClick={addEmployee}>Add Employee</button>

      <div>
        {employeeData
        .filter((data) => {
          return (
            data.name
              .toLowerCase()
              .includes(
                searchValue.toLowerCase()
              ) ||
            data.department
              .toLowerCase()
              .includes(
                searchValue.toLowerCase()
              )
          );
        })
        .map((data) => {
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

      {addEmployeeModal && (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}>
          <div
            style={{
              backgroundColor: "#dfdfdf",
              borderRadius: "12px",
              padding: "20px",
              width: "400px",
              minHeight: "250px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}>
            <h1>Add Employee</h1>

            <input
              type="text"
              placeholder="name"
              value={employeeName}
              onChange={(e) => {
                setEmployeeName(e.target.value);
                setNameError(false);
              }}
            />

            {nameError && (
              <p
                style={{
                  color: "red",
                }}>
                Name is required
              </p>
            )}

            <input
              type="text"
              placeholder="department"
              value={employeeDepartment}
              onChange={(e) => {
                setEmployeeDepartment(e.target.value);
                setDepartmentError(false);
              }}
            />

            {departmentError && (
              <p
                style={{
                  color: "red",
                }}>
                Department is required
              </p>
            )}

            <input
              type="text"
              placeholder="status"
              value={employeeStatus}
              onChange={(e) => {
                setEmployeeStatus(e.target.value);
                setStatusError(false);
              }}
            />

            {statusError && (
              <p
                style={{
                  color: "red",
                }}>
                Status is required
              </p>
            )}

            <input
              type="number"
              placeholder="salary"
              value={employeeSalary}
              onChange={(e) => {
                setEmployeeSalary(e.target.value);
                setSalaryError(false);
              }}
            />

            {salaryError && (
              <p
                style={{
                  color: "red",
                }}>
                Salary is required
              </p>
            )}

            <button onClick={validateEmployeeForm}>Add Employee</button>

            <button onClick={() => setAddEmployeeModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
