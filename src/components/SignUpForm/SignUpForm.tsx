import React from 'react';
import styles from './SignUpForm.module.css';

interface SignUpFormProps {
  onToggle: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onToggle }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign up!</h1>
      <form className={styles.form}>
        <label htmlFor="name">Name</label>
        <input type="text"/>
        <label htmlFor="email">E-mail</label>
        <input type="email"/>
        <label htmlFor="password">Password</label>
        <input type="password"/>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password"/>
        <button type="submit">Sign up</button>
      </form>
      <p className={styles.register}>
        Already have an account?{' '}
        <a href="#" onClick={onToggle} className={styles.link}>
          Log in
        </a>
      </p>
    </div>
  );
};

export default SignUpForm;
