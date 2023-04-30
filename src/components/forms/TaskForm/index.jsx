import { ErrorMessage, Field, Form, Formik } from 'formik'
import { TASK_VALIDATION_SCHEMA } from '../../../utils/validationSchemas'
import { connect } from 'react-redux'
import { createTask } from '../../../store/slices/tasksSlice'

function TaskForm ({ create }) {
  const initialValues = { value: '' }

  const handleSubmit = (values, formikBag) => {
    create({ ...values, isBought: false })
    formikBag.resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={TASK_VALIDATION_SCHEMA}
    >
      <Form>
        <Field
          name='value'
          type='text'
          placeholder='Write a new task here'
          autoFocus
        />
        <ErrorMessage name='value' component='span' />
        <button type='submit'>Add</button>
      </Form>
    </Formik>
  )
}

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(createTask(values))
})
export default connect(null, mapDispatchToProps)(TaskForm)
