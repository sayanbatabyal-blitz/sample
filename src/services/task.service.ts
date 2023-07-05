import { Task } from '@/typings/task';
import TaskDao from '@/dao/task.dao';
import { Status } from '@/typings/common';
import { Document } from 'mongoose';

export class TaskService {
  public taskDao = new TaskDao();
  public async createTask(taskData: Task): Promise<Task> {
    const createTaskData: Task = await this.taskDao.createTask(taskData);
    return createTaskData;
  }
  public async updateTask(id: string, taskData: Task): Promise<Task> {
    const updatedTaskData: Task = await this.taskDao.UpdateTask(id, taskData);
    return updatedTaskData;
  }
  public async updateTaskStatus(id: string, status: Status): Promise<Task> {
    const updatedTaskData: Task = await this.taskDao.UpdateTask(id, status);
    return updatedTaskData;
  }
}
