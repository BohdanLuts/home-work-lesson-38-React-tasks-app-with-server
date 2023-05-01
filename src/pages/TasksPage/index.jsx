import React from 'react'
import TasksList from '../../components/TasksList'
import TaskForm from '../../components/forms/TaskForm'
import styles from './TasksPage.module.sass'

function TasksPage () {
  return (
    <section className={styles.list}>
      <h1>Tasks List</h1>
      <TaskForm />
      <TasksList />
    </section>
  )
}

export default TasksPage
