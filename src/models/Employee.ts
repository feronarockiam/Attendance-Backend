import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  empId: string;
  name: string;
  designation: string;
  gender: string;
  doj: Date;
  bloodGroup: string;
  contactNo: string;
  mailId: string;
  address: string;
  uniqueId: string;
}

const EmployeeSchema: Schema = new Schema({
  empId: { type: String, required: true },  // `empId` still required but generated later
  name: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  doj: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  contactNo: { type: String, required: true },
  mailId: { type: String, required: true },
  address: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
});

export default mongoose.model<IEmployee>("Employee", EmployeeSchema);
