import { Status } from '@/typings/common';
export interface Task {
  taskId: string;
  name: string;
  description: string;
  status: Status;
}
