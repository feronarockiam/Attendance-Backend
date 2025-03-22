// src/services/employeeService.ts
import EmployeeModel from "../models/Employee";  // Employee schema import

interface EmployeeData {
  name: string;
  designation: string;
  gender: string;
  doj: string;
  bloodGroup: string;
  contactNo: string;
  mailId: string;
  address: string;
  uniqueId: string;
}

// Service function to create a new employee and generate `empId`
export const createEmployee = async (employeeData: EmployeeData) => {
  try {
    // Count the current number of employees in the database
    const count = await EmployeeModel.countDocuments();

    // Generate a new `empId` using the format YMC001, YMC002, ...
    const newEmpId = `YMC${(count + 1).toString().padStart(3, "0")}`;

    // Attach the generated empId to the employeeData and create a new document
    const employee = new EmployeeModel({ ...employeeData, empId: newEmpId });

    // Save the new employee to the database
    await employee.save();

    return { status: 200, message: "Employee created successfully", empId: newEmpId };
  } catch (error) {
    // Simplified error handling
    throw new Error(`Error creating employee: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};
