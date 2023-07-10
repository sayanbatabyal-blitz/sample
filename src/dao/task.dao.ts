import { TaskModel } from '@/models/task.model';
import { Status } from '@/typings/common';
import { ITaskOptions, Task} from '@/typings/task';
class TaskDao {
  public createTask = async (taskData: ITaskOptions) => {
     await TaskModel.create(taskData);
  };
  public updateTask = async (id: number, taskData: ITaskOptions) => {
     await TaskModel.findOneAndUpdate({taskId:id},{$set: taskData }, { runValidators: true });
  };
  public updateTaskStatus = async (id: number, status: Status) => {
     await TaskModel.findOneAndUpdate({taskId:id},{$set: {status} }, { runValidators: true });
  };
  public pageTask = async (page_size:number,page_no:number) => {
     return  await TaskModel.find().skip(page_no*page_size).limit(page_size);
  }
  public getTask = async (id: number) => {
    return await TaskModel.find({taskId:id});
  };
  public getAllTasks = async () => {
    return await TaskModel.find();
  };
  public count = async () => {
    return await TaskModel.count();
  }
}
export default TaskDao;
