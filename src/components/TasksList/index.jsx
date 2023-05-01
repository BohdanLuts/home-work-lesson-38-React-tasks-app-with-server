import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  getTasks,
  deleteTask,
  updateTask
} from './../../store/slices/tasksSlice'
import {
  BsFillTrashFill,
  BsFillCheckCircleFill,
  BsFillClockFill
} from 'react-icons/bs'
import styles from './TasksList.module.sass'

function TasksList ({ tasks, isFetching, error, get, remove, update }) {
  useEffect(() => {
    get()
  }, [])

  const isDoneChangeHandler = (id, checked) => {
    update(id, { isDone: checked })
  }
  return (
    <div className={styles.listWrapper}>
      <ul className={styles.taskList}>
        {isFetching && <div className={styles.tasksLoad}>Loading...</div>}
        {error && <div className={styles.tasksError}>ERROR!!!!</div>}
        {!error &&
          tasks.map(t => (
            <li className={styles.tasksListItem} key={t.id}>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={({ target: { checked } }) =>
                  isDoneChangeHandler(t.id, checked)
                }
              />

              <span className={styles.task}>{t.value}</span>
              <span>
                {t.isDone ? (
                  <BsFillCheckCircleFill className={styles.done} />
                ) : (
                  <BsFillClockFill className={styles.notDone} />
                )}
              </span>
              <button
                className={styles.remove}
                onClick={() => {
                  remove(t.id)
                }}
              >
                <BsFillTrashFill className={styles.removeIcon} />
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ tasksData }) => tasksData

const mapDispatchToProps = dispatch => ({
  get: () => dispatch(getTasks()),
  remove: id => dispatch(deleteTask(id)),
  update: (id, values) => dispatch(updateTask({ id, values }))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksList)
