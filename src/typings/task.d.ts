import { Status } from '@/typings/common';
import { ObjectId } from 'mongoose';
export interface Task {
  _id: ObjectId;
  taskId: string;
  name: string;
  description: string;
  startDate: string;
  completionDate: string;
  status: Status;
}
