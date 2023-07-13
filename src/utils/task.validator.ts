import { ITaskOptions } from "@/typings/task";


export enum statusEnum {
    Started = 'Started',
    Created= 'Created',
    Completed = 'Completed',
  }

export type Status = statusEnum.Started | statusEnum.Created | statusEnum.Completed;

class  ValidateTask{
    public taskId:number;
    public name:string;
    public description:string;
    public startDate:string;
    public completionDate:string;
    public status:Status
    public errorMsg:string
    constructor(task:ITaskOptions){
        this.taskId=Number(task.taskId)
        this.name=task.name
        this.description=task.description
        this.startDate=task.startDate
        this.completionDate=task.completionDate
        this.status=task.status
        this.errorMsg=''
    }

    public verifyFields=(rowNo:number):void=>{
        if(isNaN(this.taskId)) this.errorMsg=`TaskId not a number at Row:${rowNo}`
        else if(this.name=='') this.errorMsg=`Name is missing at Row:${rowNo}`
        else if(this.description=='') this.errorMsg=`Description is missing at Row:${rowNo}`
        else if(this.startDate.length!==10 || isNaN(Date.parse(this.startDate)) ) this.errorMsg=`Start Date is Invalid at Row: ${rowNo}`
        else if(this.completionDate.length!==0 && this.completionDate.length!==10 || isNaN(Date.parse(this.startDate)) ) this.errorMsg=`Completion Date is Invalid at Row: ${rowNo}`
        else if(this.status.length!==0 && this.status!==statusEnum.Completed && this.status!==statusEnum.Started && this.status!==statusEnum.Created )  this.errorMsg=`Status is of Invalid Type at Row: ${rowNo}`
        else this.errorMsg=''
    }
}


export default ValidateTask