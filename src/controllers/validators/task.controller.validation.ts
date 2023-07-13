export enum statusEnum {
    Started = 'Started',
    Created= 'Created',
    Completed = 'Completed',
  }

import { z } from 'zod';
export const getTaskRequestParamParser = z.object({
    id: z.string({
      required_error: 'TaskId is required',
      invalid_type_error: 'id must be a number'
    })
  })

export const createTaskRequestBodyParser = z.object({
    taskId:z.string({
        required_error: 'TaskId is required',
        invalid_type_error: 'id must be a valid string'
    }),
    name:z.string({
        required_error: 'Task Name is required',
        invalid_type_error: 'Task Name must be a valid string '
    }),
    description:z.string({
        required_error: 'Task Description is required',
        invalid_type_error: 'Task Description must be a valid string '
    }),
    startDate:z.string({
        required_error: 'StartDate is required',
        invalid_type_error: 'Start Date is not a valid Date'
    }),
}) 

export const updateTaskRequestParamParser = z.object({
    id: z.string({
        required_error: 'TaskId is required',
        invalid_type_error: 'id must be a number'
      })
})

export const updateTaskStatusRequestParamParser = z.object({
    id: z.string({
        required_error: 'TaskId is required',
        invalid_type_error: 'id must be a number'
      })
})

export const pageTasksRequestQueryParser = z.object({
    page_size: z.string({
        required_error: 'PageSize is required',
        invalid_type_error: 'PageSize must be a number'
      }),
    page_no: z.string({
        required_error: 'Page No is required',
        invalid_type_error: 'Page no must be a number'
      })
      
})


export const updateTaskStatusRequestBodyParser = z.object({
    status:z.enum([statusEnum.Started,statusEnum.Created,statusEnum.Completed],{
        required_error: 'Changes to be mentioned',
        invalid_type_error: 'Status Value is not valid '
    })
}).strict()

export const updateTaskRequestBodyParser = z.object({
    description:z.optional(z.string({
        required_error: 'Task Description is required',
        invalid_type_error: 'Task Description must be a valid string '
    })),
    startDate:z.optional(z.string({
        required_error: 'StartDate is required',
        invalid_type_error: 'Start Date is not a valid Date'
    })),
    completionDate:z.optional(z.string({
        required_error: 'Completion Date is required',
        invalid_type_error: 'Completion Date is not a valid Date'
    }))
}).strict() 
