import './App.css'
import TasksForm from './components/forms/TaskForm'
import TasksList from './components/TasksList'

function App () {
  return (
    <>
      <header>
        <h1>Tasks List</h1>
      </header>
      <main>
        <TasksForm />
        <TasksList />
      </main>
    </>
  )
}

export default App
