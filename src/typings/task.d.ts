import { Status } from '@/typings/common';
import { ObjectId } from 'mongoose';
export interface Task {
  _id: ObjectId;
  taskId: number | string;
  name: string;
  description: string;
  startDate: string;
  completionDate: string;
  status: Status;
}

export interface PagedTask{
  tasks:Task[],
  meta:MetaTask
}

export interface MetaTask{
   page_no:string,
   page_size:string,
   total:string
}


//To make a type paramerters optional
type CreateOptions<T> = {
  [Property in keyof T]+?: T[Property];
};
export type ITaskOptions = CreateOptions<Task>;