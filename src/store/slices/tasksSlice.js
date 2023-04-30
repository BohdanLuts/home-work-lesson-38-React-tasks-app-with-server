import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as API from '../../api'

const TASKS_SLICE_NAME = 'tasks'

export const createTask = createAsyncThunk(
  `tasks/create`,
  async (values, thunkAPI) => {
    try {
      const response = await API.createNewTask(values)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)

export const getTasks = createAsyncThunk(
  `${TASKS_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const response = await API.getTasks()
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)

export const deleteTask = createAsyncThunk(
  `${TASKS_SLICE_NAME}/delete`,
  async (payload, thunkAPI) => {
    try {
      await API.deleteTask(payload)
      return payload
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)

export const updateTask = createAsyncThunk(
  `${TASKS_SLICE_NAME}/update`,
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await API.updateTask(id, values)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue({ message: e.message })
    }
  }
)

const tasksSlice = createSlice({
  name: TASKS_SLICE_NAME,
  initialState: {
    tasks: [],
    isFetching: false,
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    //CREATE
    builder.addCase(createTask.pending, state => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload)
      state.isFetching = false
    })
    builder.addCase(createTask.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })

    //GET
    builder.addCase(getTasks.pending, (state, action) => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks.push(...action.payload)
      state.isFetching = false
    })
    builder.addCase(getTasks.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })

    // DELETE
    builder.addCase(deleteTask.pending, state => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
      state.isFetching = false
    })
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })

    //UPDATE
    builder.addCase(updateTask.pending, state => {
      state.isFetching = true
      state.error = null
    })
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const foundIndex = state.tasks.findIndex(t => t.id === action.payload.id)
      state.tasks[foundIndex] = action.payload
      state.isFetching = false
    })
    builder.addCase(updateTask.rejected, (state, action) => {
      state.error = action.payload
      state.isFetching = false
    })
  }
})
const { reducer, actions } = tasksSlice
export const {} = actions

export default reducer
