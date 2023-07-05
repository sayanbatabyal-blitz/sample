import { Task } from '@/typings/task';
import TaskDao from '@/dao/task.dao';

export class TaskService {
  private taskDao = new TaskDao();
  public async createTask(taskData: Task): Promise<Task> {
    const createTaskData: Task = await this.taskDao.createTask(taskData);
    return createTaskData;
  }
}
