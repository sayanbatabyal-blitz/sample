import { NextFunction, Request, Response } from 'express';
import { Task } from '@/typings/task';
import { TaskService } from '@/services/task.service';

export class TaskController {
  public task = new TaskService();

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData = req.body;
      const createTaskData: Task = await this.task.createTask({ ...taskData, status: 'created' });
      res.status(201).json({ data: createTaskData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
