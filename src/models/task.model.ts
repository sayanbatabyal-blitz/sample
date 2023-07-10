import { model, Schema, Document } from 'mongoose';
import { Task } from '@/typings/task';

const TaskSchema: Schema = new Schema({
  taskId: {
    type: Number,
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
  startDate: {
    type: Date,
    required: true,
  },
  completionDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum : ['Created','Started','Completed'],
    default: 'Created',
    required: true,
  },
}
, { timestamps: true }
);


export const TaskModel = model<Task & Document>('Task', TaskSchema);
