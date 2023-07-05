import { TaskModel } from '@/models/task.model';
import { Task } from '@/typings/task';
class TaskDao {
  public createTask = async (taskData: Task) => {
    return await TaskModel.create(taskData);
  };
}
export default TaskDao;