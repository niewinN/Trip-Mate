import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './SignUpForm.module.css';
import { registerUser } from '../../utils/api';

interface SignUpFormProps {
  onToggle: () => void;
}

// ✅ Schema walidacyjna z Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  phone: Yup.string().matches(/^\d{9}$/, 'Phone number must be 9 digits').required('Phone is required'),
});

const SignUpForm: React.FC<SignUpFormProps> = ({ onToggle }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>Sign up!</h1>
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const { name, email, password, phone } = values;
        try {
          await registerUser(name, email, password, phone);
          onToggle();
        } catch (error: any) {
          console.error('❌ Registration error:', error);
          alert(error.response?.data?.error || 'Registration failed');
        }
      }}
      validateOnBlur={false} // Wyłącz walidację przy opuszczeniu pola
      validateOnChange={false} // Wyłącz walidację przy zmianie pola
    >
      {({ isSubmitting, errors }) => (
        <Form className={styles.form}>
          <label>Name</label>
          <Field
            name="name"
            className={`${styles.input} ${
              errors.name ? styles.errorInput : ''
            }`}
          />
          <ErrorMessage name="name" component="div" className={styles.errorMessage} />

          <label>Email</label>
          <Field
            name="email"
            type="email"
            className={`${styles.input} ${
              errors.email ? styles.errorInput : ''
            }`}
          />
          <ErrorMessage name="email" component="div" className={styles.errorMessage} />

          <label>Password</label>
          <Field
            name="password"
            type="password"
            className={`${styles.input} ${
              errors.password ? styles.errorInput : ''
            }`}
          />
          <ErrorMessage name="password" component="div" className={styles.errorMessage} />

          <label>Confirm Password</label>
          <Field
            name="confirmPassword"
            type="password"
            className={`${styles.input} ${
              errors.confirmPassword ? styles.errorInput : ''
            }`}
          />
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className={styles.errorMessage}
          />

          <label>Phone</label>
          <Field
            name="phone"
            className={`${styles.input} ${
              errors.phone ? styles.errorInput : ''
            }`}
          />
          <ErrorMessage name="phone" component="div" className={styles.errorMessage} />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignUpForm;
