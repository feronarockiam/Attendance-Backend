// src/routes/employeeRoutes.ts
import { Router, Request, Response } from 'express';
import { createEmployee } from '../controllers/employeeController';  // Import the controller function

const router = Router();

// POST /api/employees - Route to create a new employee
router.post('/', async (req: Request, res: Response) => {
  await createEmployee(req, res);
});

export default router;
