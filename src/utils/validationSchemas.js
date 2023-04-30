import * as yup from 'yup'

export const TASK_VALIDATION_SCHEMA = yup.object({
  value: yup.string().trim().min(8).max(100).required()
})
