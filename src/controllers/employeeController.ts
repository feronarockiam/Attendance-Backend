// src/controllers/employeeController.ts
import { Request, Response } from "express";
import { createEmployee as createEmployeeService } from "../services/employeeService";  // Import the service function

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, designation, gender, doj, bloodGroup, contactNo, mailId, address, uniqueId } = req.body;

    // Call the service to create the employee and return the response
    const response = await createEmployeeService({
      name,
      designation,
      gender,
      doj,
      bloodGroup,
      contactNo,
      mailId,
      address,
      uniqueId,
    });

    return res.status(response.status).json({
      message: response.message,
      empId: response.empId,
    });
  } catch (error) {
    // Simplified error handling to focus on the error message
    return res.status(500).json({
      message: "Error creating employee",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
