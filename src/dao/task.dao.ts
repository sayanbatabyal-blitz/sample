import { TaskModel } from '@/models/task.model';
import { Task } from '@/typings/task';
class TaskDao {
  public createTask = async (taskData: Task) => {
    return await TaskModel.create(taskData);
  };
  public UpdateTask = async (id: string, taskData: Task | string) => {
    console.log(typeof taskData);
    if (typeof taskData === 'string') {
      console.log('done');
      return await TaskModel.findByIdAndUpdate(id, { $set: { status: taskData } }, { new: true });
    }
    return await TaskModel.findByIdAndUpdate(id, { $set: taskData }, { new: true });
  };
  public getTaskbyId = async (id: string) => {
    return await TaskModel.findById(id);
  };
}
export default TaskDao;
