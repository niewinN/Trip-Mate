import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './LoginForm.module.css';
import { loginUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onToggle: () => void;
}

// ✅ Schema walidacyjna z Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log in!</h1>
      <p className={styles.subtitle}>And plan your trip</p>
      
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { email, password } = values;
          try {
            const data = await loginUser(email, password);
            localStorage.setItem('token', data.token);
            localStorage.setItem('loginSuccess', 'true'); // ✅ Zapisanie flagi sukcesu logowania
            navigate('/'); // Przekierowanie na stronę główną
          } catch (error: any) {
            setToast({
              message: error.response?.data?.error || 'Login failed',
              type: 'error',
            });
          }
        }}
        
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting, errors }) => (
          <Form className={styles.form}>
            <label htmlFor="email">E-mail</label>
            <Field
              name="email"
              type="email"
              className={`${styles.input} ${
                errors.email ? styles.errorInput : ''
              }`}
            />
            <ErrorMessage name="email" component="div" className={styles.errorMessage} />

            <label htmlFor="password">Password</label>
            <Field
              name="password"
              type="password"
              className={`${styles.input} ${
                errors.password ? styles.errorInput : ''
              }`}
            />
            <ErrorMessage name="password" component="div" className={styles.errorMessage} />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </Form>
        )}
      </Formik>

      <p className={styles.register}>
        Don’t have an account?{' '}
        <a href="#" className={styles.link} onClick={onToggle}>
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
