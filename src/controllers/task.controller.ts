import { NextFunction, Request, Response } from 'express';
import { Task } from '@/typings/task';
import { TaskService } from '@/services/task.service';
import { Status } from '@/typings/common';

export class TaskController {
  public taskService = new TaskService();

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData = req.body;
      const createTaskData: Task = await this.taskService.createTask({ ...taskData, status: 'created' });
      res.status(201).json({ data: createTaskData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.id;
      const taskChanges = req.body;
      const updatedTaskData: Task = await this.taskService.updateTask(taskId, taskChanges);
      res.status(201).json({ data: updatedTaskData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.id;
      const status: Status = req.body.status;
      const updatedTaskData: Task = await this.taskService.updateTaskStatus(taskId, status);
      res.status(201).json({ data: updatedTaskData, message: 'Task Status updated' });
    } catch (error) {
      next(error);
    }
  };
}
