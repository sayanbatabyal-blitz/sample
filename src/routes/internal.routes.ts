import { TaskController } from '@/controllers/task.controller';
import ValidatorMiddleware from '@/middlewares/validator.middleware';
import * as taskControllerValidators from '@controllers/validators/task.controller.validation'
import { Router } from 'express';
export class InternalRoute {
  public path = '/api/internal';
  public router = Router();
  public taskController=new TaskController()
  public validate=new ValidatorMiddleware()
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/create`,this.validate.validateRequestBody(taskControllerValidators.createTaskRequestBodyParser),this.taskController.createTask);
  }
}
