
export enum statusEnum {
    Started = 'Started',
    Created= 'Created',
    Completed = 'Completed',
  }

export type Status = statusEnum.Started | statusEnum.Created | statusEnum.Completed;

export interface Filter{
 status:Status[],
 startDate:Daterange
 completionDate:Daterange
}

export interface Daterange{
 to:string,
 from:string
}

type CreateOptions<T> = {
  [Property in keyof T]+?: T[Property];
};
export type IFilter = CreateOptions<Filter>;