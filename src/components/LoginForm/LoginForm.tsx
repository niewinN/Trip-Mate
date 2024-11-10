import React from 'react';
import styles from './LoginForm.module.css';

interface LoginFormProps {
  onToggle: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log in!</h1>
      <p className={styles.subtitle}>And plan your trip</p>
      <form className={styles.form}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
        />
        <button type="submit">
          Log in
        </button>
      </form>
      <p className={styles.register}>
        Don’t have an account? <a href="#" className={styles.link} onClick={onToggle}>Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;
