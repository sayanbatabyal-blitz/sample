import { NextFunction, Request, Response } from 'express';
import { ITaskOptions, PagedTask, Task } from '@/typings/task';
import { TaskService } from '@/services/task.service';
import { CreateTaskRequestBody, GetTaskRequestParam, PageTasksRequestQuery, UpdateTaskRequestBody, UpdateTaskRequestParam, UpdateTaskStatusRequestBody, UpdateTaskStatusRequestParam } from './typings/task.controller';
import CSVJsonClient from '@/csvtojson/csvtojson.config';
import csv from "csvtojson"
export class TaskController {
  public taskService = new TaskService();
  
  public bulkUpload = async (req: Request, res: Response, next: NextFunction) => {
     try{
         const path=req.file.path
         const csvtojson=new CSVJsonClient()
         const tasks:ITaskOptions[]=await csvtojson.getJson(path)
         this.taskService.bulkUpload(tasks)
         return res.status(201).json({status:'success'})
     }
     catch(err){
      return res.status(500).json({status:'failure',error:err.problem})
     }
     
  }


  public getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestParam: GetTaskRequestParam = req.params
      const taskId: number = Number(requestParam.id)
      if (isNaN(taskId)) throw new Error("Invalid TaskID")
      const task: Task[] = await this.taskService.getTask(taskId)
      res.status(201).json(task);
    }
    catch (error) {
      next(error);
    }
  };

  /***
   * get all tasks
   */
  public getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks: Task[] = await this.taskService.getAllTasks()
      res.status(201).json(tasks);
    }
    catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestBody: CreateTaskRequestBody = req.body;
      const taskData = requestBody;
      const taskExist = await this.taskService.getTask(parseInt(taskData.taskId))
      if (taskExist.length!==0)
        return res.status(500).json({ status: 'failure', error: 'taskId exists' })
      await this.taskService.createTask(taskData);
      res.status(201).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  };
  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestBody: UpdateTaskRequestBody = req.body;
      const requestParam: UpdateTaskRequestParam = req.params;
      const taskId: number = Number(requestParam.id);
      if (isNaN(taskId)) throw new Error("Invalid TaskID")
      const taskData = requestBody
      const isValid = await this.taskService.getTask(taskId);
      if (isValid.length === 0) res.status(404).json({ status: "error", messsage: "Task Not Found" })
      await this.taskService.updateTask(taskId, taskData);
      res.status(201).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  };
  public updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestParam: UpdateTaskStatusRequestParam = req.params
      const requestBody: UpdateTaskStatusRequestBody = req.body
      const taskId = parseInt(requestParam.id)
      if (isNaN(taskId)) throw new Error("Invalid TaskID")
      const isValid = await this.taskService.getTask(taskId);
      if (isValid.length === 0) res.status(404).json({ status: "error", messsage: "Task Not Found" })
      await this.taskService.updateTaskStatus(taskId, requestBody.status);
      res.status(201).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  };

  public pageTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestQuery: PageTasksRequestQuery = req.query
      const page_no = parseInt(requestQuery.page_no)
      const page_size = parseInt(requestQuery.page_size)
      if (isNaN(page_no)) throw new Error("Invalid pageNo")
      if (isNaN(page_size)) throw new Error("Invalid pageSize")
      const data: PagedTask = await this.taskService.pageTasks(page_size, page_no);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };



}
