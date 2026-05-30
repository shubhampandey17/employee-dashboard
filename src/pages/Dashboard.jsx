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
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");

  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);

  useEffect(()=>{
    let item = localStorage.getItem("employeeData");
    item && setEmployeeData(JSON.parse(item))
  },[])

  useEffect(()=>{
    localStorage.setItem("employeeData", JSON.stringify(employeeData));
  },[employeeData])

  const onChangeInputSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const resetForm = () => {
    setEmployeeName("");
    setEmployeeDepartment("");
    setEmployeeStatus("");
    setEmployeeSalary("");

    setNameError(false);
    setDepartmentError(false);
    setStatusError(false);
    setSalaryError(false);
  };

  const closeModal = () => {
    setAddEmployeeModal(false);
    setSelectedEmployee(null);
    resetForm();
  };

  const addEmployee = () => {
    setSelectedEmployee(null);
    resetForm();
    setAddEmployeeModal(true);
  };

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);

    setEmployeeName(employee.name);
    setEmployeeDepartment(employee.department);
    setEmployeeStatus(employee.status);
    setEmployeeSalary(employee.salary);

    setAddEmployeeModal(true);
  };

  const deleteEmployee = (id) => {
    setEmployeeData((prev) => prev.filter((employee) => employee.id !== id));
  };

  const handleSubmit = () => {
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

    if (!isValid) return;

    if (selectedEmployee) {
      setEmployeeData((prev) =>
        prev.map((employee) =>
          employee.id === selectedEmployee.id
            ? {
                ...employee,
                name: employeeName,
                department: employeeDepartment,
                salary: employeeSalary,
                status: employeeStatus,
              }
            : employee,
        ),
      );
    } else {
      setEmployeeData((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: employeeName,
          department: employeeDepartment,
          salary: employeeSalary,
          status: employeeStatus,
        },
      ]);
    }

    closeModal();
  };

  return (
    <>
      <input type="search" value={searchValue} onChange={onChangeInputSearch} placeholder="search name / department" />

      <button onClick={addEmployee}>Add Employee</button>

      <div>
        {employeeData
          .filter((data) => {
            return (
              data.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              data.department.toLowerCase().includes(searchValue.toLowerCase())
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
                editEmployee={editEmployee}
                deleteEmployee={deleteEmployee}
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
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
            <h1>{selectedEmployee ? "Edit Employee" : "Add Employee"}</h1>

            <input
              type="text"
              placeholder="Name"
              value={employeeName}
              onChange={(e) => {
                setEmployeeName(e.target.value);
                setNameError(false);
              }}
            />

            {nameError && <p style={{ color: "red", margin: 0 }}>Name is required</p>}

            <input
              type="text"
              placeholder="Department"
              value={employeeDepartment}
              onChange={(e) => {
                setEmployeeDepartment(e.target.value);
                setDepartmentError(false);
              }}
            />

            {departmentError && <p style={{ color: "red", margin: 0 }}>Department is required</p>}

            <input
              type="text"
              placeholder="Status"
              value={employeeStatus}
              onChange={(e) => {
                setEmployeeStatus(e.target.value);
                setStatusError(false);
              }}
            />

            {statusError && <p style={{ color: "red", margin: 0 }}>Status is required</p>}

            <input
              type="number"
              placeholder="Salary"
              value={employeeSalary}
              onChange={(e) => {
                setEmployeeSalary(e.target.value);
                setSalaryError(false);
              }}
            />

            {salaryError && <p style={{ color: "red", margin: 0 }}>Salary is required</p>}

            <button onClick={handleSubmit}>{selectedEmployee ? "Update Employee" : "Add Employee"}</button>

            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
