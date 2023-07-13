import { Router } from 'express';
import { TaskController } from '@controllers/task.controller';
import * as taskControllerValidators from '@controllers/validators/task.controller.validation'
import ValidatorMiddleware from '@/middlewares/validator.middleware';
import RedisMiddleware from '@/middlewares/redis.middleware';
import MulterClient from '@/multer/multer.config';

export class TaskRoute {
  public path = '/task';
  public router = Router();
  public taskController = new TaskController();
  public validate=new ValidatorMiddleware()
  public redis=new RedisMiddleware()
  public multer=new MulterClient()
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,this.taskController.getAllTasks)
    this.router.get(`${this.path}/page/`,this.validate.validateRequestQuery(taskControllerValidators.pageTasksRequestQueryParser),this.taskController.pageTasks)
    this.router.get(`${this.path}/:id`,this.validate.validateRequestParams(taskControllerValidators.getTaskRequestParamParser),this.redis.getData, this.taskController.getTask)
    this.router.post(`${this.path}`,this.validate.validateRequestBody(taskControllerValidators.createTaskRequestBodyParser), this.taskController.createTask);
    this.router.post(`${this.path}/bulkUpload`,this.multer.upload.single('csv'),this.taskController.bulkUpload);
    this.router.put(`${this.path}/status/:id`,this.validate.validateRequestParams(taskControllerValidators.updateTaskStatusRequestParamParser),this.validate.validateRequestBody(taskControllerValidators.updateTaskStatusRequestBodyParser), this.taskController.updateTaskStatus);
    this.router.put(`${this.path}/:id`,this.validate.validateRequestParams(taskControllerValidators.updateTaskRequestParamParser),this.validate.validateRequestBody(taskControllerValidators.updateTaskRequestBodyParser), this.taskController.updateTask);
  }
}
