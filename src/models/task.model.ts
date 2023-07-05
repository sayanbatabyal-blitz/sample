import { model, Schema, Document } from 'mongoose';
import { Task } from '@/typings/task';

const TaskSchema: Schema = new Schema({
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const TaskModel = model<Task & Document>('Task', TaskSchema);
