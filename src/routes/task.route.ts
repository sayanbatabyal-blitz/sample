import { Router } from 'express';
import { TaskController } from '@controllers/task.controller';

export class TaskRoute {
  public path = '/task';
  public router = Router();
  public taskController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.taskController.createTask);
    this.router.put(`${this.path}/status/:id`, this.taskController.updateTaskStatus);
    this.router.put(`${this.path}/:id`, this.taskController.updateTask);
  }
}
