import { Schema, model, Document, Types } from 'mongoose';

interface IAttendanceSession {
  checkIn?: Date;
  checkInLocation?: string;
  checkOut?: Date;
  checkOutLocation?: string;
}

export interface IAttendance extends Document {
  employee: Types.ObjectId;
  date: Date;
  sessions: IAttendanceSession[];
}

const attendanceSessionSchema = new Schema<IAttendanceSession>({
  checkIn: { type: Date },
  checkInLocation: { type: String },
  checkOut: { type: Date },
  checkOutLocation: { type: String },
});

const attendanceSchema = new Schema<IAttendance>({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  sessions: [attendanceSessionSchema],
});

export default model<IAttendance>('Attendance', attendanceSchema);
