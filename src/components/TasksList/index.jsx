import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getTasks,
  deleteTask,
  updateTask
} from './../../store/slices/tasksSlice'

function TasksList ({ tasks, isFetching, error, get, remove, update }) {
  useEffect(() => {
    get()
  }, [])

  const isDoneChangeHandler = (id, checked) => {
    update(id, { isDone: checked })
  }
  return (
    <ul>
      {isFetching && <div>Loading...</div>}
      {error && <div>ERROR!!!!</div>}
      {!error &&
        tasks.map(t => (
          <li key={t.id}>
            <input
              type='checkbox'
              checked={t.isDone}
              onChange={({ target: { checked } }) =>
                isDoneChangeHandler(t.id, checked)
              }
            />
            <button
              onClick={() => {
                remove(t.id)
              }}
            >
              X
            </button>
            {t.value}
          </li>
        ))}
    </ul>
  )
}

const mapStateToProps = ({ tasksData }) => tasksData

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(getTasks()),
  remove: id => dispatch(deleteTask(id)),
  update: (id, values) => dispatch(updateTask({ id, values }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksList)
