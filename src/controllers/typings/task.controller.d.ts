import { z } from 'zod';
import * as taskControllerValidators from '../validators/task.controller.validation'

export type CreateTaskRequestBody =z.infer<typeof taskControllerValidators.createTaskRequestBodyParser>
export type GetTaskRequestParam= z.infer<typeof taskControllerValidators.getTaskRequestParamParser>
export type UpdateTaskRequestBody= z.infer<typeof taskControllerValidators.updateTaskRequestBodyParser>
export type UpdateTaskRequestParam= z.infer<typeof taskControllerValidators.updateTaskRequestParamParser>
export type UpdateTaskStatusRequestBody= z.infer<typeof taskControllerValidators.updateTaskStatusRequestBodyParser>
export type UpdateTaskStatusRequestParam= z.infer<typeof taskControllerValidators.updateTaskStatusRequestParamParser>
export type PageTasksRequestQuery= z.infer<typeof taskControllerValidators.pageTasksRequestQueryParser>

