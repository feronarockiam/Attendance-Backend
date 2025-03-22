import { Request, Response, NextFunction } from 'express';
import * as attendanceService from '../services/attendanceService';

export const markAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { empId, uniqueId, location } = req.body;
    const updatedAttendance = await attendanceService.markAttendance(empId, uniqueId, location);
    res.status(200).json({
      success: true,
      data: updatedAttendance,
    });
  } catch (error) {
    next(error);
  }
};

export const viewAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendanceRecords = await attendanceService.viewAttendance();
    res.status(200).json({
      success: true,
      data: attendanceRecords,
    });
  } catch (error) {
    next(error);
  }
};

