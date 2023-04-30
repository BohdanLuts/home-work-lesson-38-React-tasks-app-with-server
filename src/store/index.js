import { configureStore } from '@reduxjs/toolkit'
import tasksReduces from './slices/tasksSlice'

const store = configureStore({
  reducer: {
    tasksData: tasksReduces
  }
})

export default store
