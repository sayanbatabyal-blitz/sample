
export enum statusEnum {
    Started = 'Started',
    Created= 'Created',
    Completed = 'Completed',
  }

export type Status = statusEnum.Started | statusEnum.Created | statusEnum.Completed;