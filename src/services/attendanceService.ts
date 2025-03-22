import Attendance, { IAttendance } from '../models/Attendance';
import Employee from '../models/Employee';

/**
 * Marks the attendance for an employee.
 * If no record exists for today, it creates one with the first check-in.
 * If a record exists:
 *  - If the last session has no check-out, it adds the check-out details.
 *  - Otherwise, it starts a new session with check-in details.
 */
export const markAttendance = async (empId: string, uniqueId: string, location: string): Promise<IAttendance> => {
  // Verify employee existence.
  const employee = await Employee.findOne({ empId, uniqueId });
  if (!employee) {
    throw { status: 404, message: 'Employee not found' };
  }

  // Define today's date boundaries.
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  // Look for an existing attendance record for today.
  let attendance = await Attendance.findOne({
    employee: employee._id,
    date: { $gte: startOfDay, $lte: endOfDay },
  });

  const now = new Date();

  if (!attendance) {
    // No attendance record for today, create one with the first session as check-in.
    attendance = new Attendance({
      employee: employee._id,
      date: new Date(),
      sessions: [
        {
          checkIn: now,
          checkInLocation: location,
        },
      ],
    });
  } else {
    // Attendance record exists: determine if this scan is a check-in or check-out.
    const sessions = attendance.sessions;
    if (
      sessions.length === 0 ||
      (sessions[sessions.length - 1].checkIn && sessions[sessions.length - 1].checkOut)
    ) {
      // Last session complete or no sessions at all: start a new session with check-in.
      attendance.sessions.push({
        checkIn: now,
        checkInLocation: location,
      });
    } else if (sessions[sessions.length - 1].checkIn && !sessions[sessions.length - 1].checkOut) {
      // Last session has check-in but no check-out: mark this scan as check-out.
      sessions[sessions.length - 1].checkOut = now;
      sessions[sessions.length - 1].checkOutLocation = location;
    }
  }

  await attendance.save();
  return attendance;
};

/**
 * Retrieves all attendance records, with employee details populated,
 * and sorts them by date.
 */
export const viewAttendance = async (): Promise<IAttendance[]> => {
  return Attendance.find()
    .populate('employee')
    .sort({ date: 1 })
    .exec();
};
