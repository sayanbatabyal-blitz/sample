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
  }
}
