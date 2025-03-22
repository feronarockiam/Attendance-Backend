// src/routes/attendanceRoutes.ts
import { Router } from 'express';
import { markAttendance, viewAttendance } from '../controllers/attendanceController';

const router = Router();

// POST /api/attendance - Mark employee attendance
router.post('/', markAttendance);

// GET /api/attendance - View attendance records
router.get('/', viewAttendance);

export default router;
