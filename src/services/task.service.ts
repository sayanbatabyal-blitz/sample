import { ITaskOptions, PagedTask, Task } from '@/typings/task';
import TaskDao from '@/dao/task.dao';
import { Status } from '@/typings/common';


export class TaskService {
  public taskDao = new TaskDao();
  //for creating a task
  public async createTask(taskData: ITaskOptions): Promise<void> {
    await this.taskDao.createTask(taskData);
  }
  //for updating a task
  public async updateTask(id: number, taskData: ITaskOptions): Promise<void> {
    await this.taskDao.updateTask(id, taskData);
  }
  /**
   * for updating taskStatus
   * @param id taskId
   * @param status taskStatus
   */
  public async updateTaskStatus(id: number, status: Status): Promise<void> {
    await this.taskDao.updateTaskStatus(id, status);
  }

  /**
   * for geting all tasks
   * @returns all the tasks
   */
  public async getAllTasks(): Promise<Task[]> {
    const allTasks: Task[] = await this.taskDao.getAllTasks();
    return allTasks;
  }

  /**
   for getting a task by taskId
   * 
   * @param id: taskId 
   * @returns a single task by taskId
   */
  public async getTask(id: number): Promise<Task[]> {
    const task: Task[] = await this.taskDao.getTask(id);
    return task;
  }

  /**
   * for geting task
   * @param page_size:tasks/page 
   * @param page_no 
   * @returns 
   */
  public async pageTasks(page_size: number, page_no: number): Promise<PagedTask> {
    const res=await Promise.all([await this.taskDao.pageTask(page_size, page_no),await this.taskDao.count()])
    console.log(res);
    
    return {
      tasks:res[0], meta: {
        page_size: `${page_size}`,
        page_no: `${page_no}`,
        total: `${res[1]}`
      }
    }
  }

}
