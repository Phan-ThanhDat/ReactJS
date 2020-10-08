import { Form, Formik, FormikHelpers, Field } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

import Button from '../Button/Button';
import styles from './Form.module.css';

interface IFormProps {
  'on-submit': (payload: { title: string; body: string }) => void;
}
interface IFormValues {
  title: string;
  body: string;
}

const FormPost: React.FC<IFormProps> = (props) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);

  const initialValues: IFormValues = {
    title: titleRef.current?.value.toString() || '',
    body: bodyRef.current?.value.toString() || '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Please provide title'),
    body: Yup.string().required('Please provide body'),
  });

  const onSubmit = (
    values: IFormValues,
    helpers: FormikHelpers<IFormValues>
  ) => {
    helpers.setSubmitting(false);

    props['on-submit'](values);

    helpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, isValid, isSubmitting }) => {
        return (
          <Form className={styles.form} ref={formRef}>
            <label className={styles.label}>Post title: *</label>
            <Field
              ref={titleRef}
              placeholder='Title...'
              defaultValue=''
              className={styles.input}
              name='title'
              id='title'
              type='text'
            />
            {touched.title && errors.title && (
              <p className={styles.message}>{errors.title}</p>
            )}
            <label className={styles.label}>Post content: *</label>
            <Field
              ref={bodyRef}
              placeholder='Start typing post content here...'
              defaultValue=''
              className={styles.textarea}
              name='body'
              id='body'
              as='textarea'
            />
            {touched.body && errors.body && (
              <p className={styles.message}>{errors.body}</p>
            )}
            <Button disabled={!isValid || isSubmitting} type='submit'>
              Create a post
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormPost;
