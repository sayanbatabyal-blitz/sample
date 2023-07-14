import { ITaskOptions, PagedTask, Task } from '@/typings/task';
import TaskDao from '@/dao/task.dao';
import { IFilter, Status } from '@/typings/common';
import RedisClient from '@/redis/redis.client';
import Queue from 'bull'
import ValidateTask from '@/utils/task.validator';
import { HandledError } from '@/exceptions/HandledExceptions';
import { createFilter } from '@/utils/filters';
import { createCsvFile } from '@/utils/createCsv';
export class TaskService {
  public taskDao = new TaskDao();
  public redis = new RedisClient()
  constructor() {
    this.redis.connectClient()
  }
  /**
   * for creating a task
   * @param taskData 
   */

  public bulkDownload = async (filter: IFilter) => {
    const dbFilter = createFilter(filter)
    const filteredTasks: Task[] = await this.taskDao.getByFilters(dbFilter)
    const csv = await createCsvFile(filteredTasks, [{ label: 'Task Id', value: 'taskId' },
    { label: 'Task Description', value: 'description' }, { label: 'Task Name', value: 'name' }, { label: 'Start Date', value: 'startDate' }, { label: 'Completion Date', value: 'completionDate' }, { label: 'Status', value: 'status' },
    ])
    return csv
  }


  public bulkUpload = (tasks: ITaskOptions[]): void => {
    try {
      tasks.map((task: ITaskOptions, rowNo: number) => {
        const taskValidator = new ValidateTask(task)
        taskValidator.verifyFields(rowNo)
        if (taskValidator.errorMsg.length != 0)
          throw new HandledError('CSV-VErificationError', taskValidator.errorMsg)
      })
      const taskQueue = new Queue('taskCreate', { redis: { host: "localhost", port: 6379 } })
      tasks.map((task) => {
        if (task.completionDate.length === 0) delete task.completionDate
        if (task.status.length === 0) delete task.status
        taskQueue.add('create', task)
      })
    }
    catch (err) {
      throw err
    }
  }




  public createTask = async (taskData: ITaskOptions): Promise<void> => {
    try {
      await this.taskDao.createTask(taskData);
    }
    catch (err) {
      throw err
    }
  }

  /**
   * for updating a task
   * @param id 
   * @param taskData 
   */
  public updateTask = async (id: number, taskData: ITaskOptions): Promise<void> => {
    try {
      await this.taskDao.updateTask(id, taskData),
        await this.redis.delete(`task:${id}`)
    }
    catch (err) {
      throw err
    }

  }
  /**
   * for updating taskStatus
   * @param id taskId
   * @param status taskStatus
   */
  public updateTaskStatus = async (id: number, status: Status): Promise<void> => {
    try {
      await this.taskDao.updateTaskStatus(id, status);
      await this.redis.delete(`task:${id}`)
    }
    catch (err) {
      throw err
    }
  }

  /**
   * for geting all tasks
   * @returns all the tasks
   */
  public getAllTasks = async (): Promise<Task[]> => {
    try {
      const allTasks: Task[] = await this.taskDao.getAllTasks();
      return allTasks;
    }
    catch (err) {
      throw err
    }
  }

  /**
   for getting a task by taskId
   * 
   * @param id: taskId 
   * @returns a single task by taskId
   */
  public getTask = async (id: number): Promise<Task[]> => {
    try {
      const task: Task[] = await this.taskDao.getTask(id);
      if (task.length !== 0)
        await this.redis.set(`task:${id}`, JSON.stringify(task))
      return task;
    }
    catch (err) {
      throw err
    }
  }

  /**
   * for geting task
   * @param page_size:tasks/page 
   * @param page_no 
   * @returns 
   */
  public pageTasks = async (page_size: number, page_no: number): Promise<PagedTask> => {
    try {
      const res = await Promise.all([await this.taskDao.pageTask(page_size, page_no), await this.taskDao.count()])
      return {
        tasks: res[0], meta: {
          page_size: `${page_size}`,
          page_no: `${page_no}`,
          total: `${res[1]}`
        }
      }
    }
    catch (err) {
      throw err
    }
  }

}
