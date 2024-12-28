// import React from 'react';
// import styles from './LoginForm.module.css';

// interface LoginFormProps {
//   onToggle: () => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Log in!</h1>
//       <p className={styles.subtitle}>And plan your trip</p>
//       <form className={styles.form}>
//         <label htmlFor="email">E-mail</label>
//         <input
//           type="email"
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//         />
//         <button type="submit">
//           Log in
//         </button>
//       </form>
//       <p className={styles.register}>
//         Don’t have an account? <a href="#" className={styles.link} onClick={onToggle}>Register here</a>
//       </p>
//     </div>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { loginUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onToggle: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Wyczyść poprzednie błędy

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token); // Zapisanie tokena w localStorage
      alert('Login successful!');
      navigate('/') // Opcjonalnie: odśwież stronę lub przekieruj użytkownika
    } catch (error: any) {
      console.error('❌ Login error:', error);
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log in!</h1>
      <p className={styles.subtitle}>And plan your trip</p>
      <form className={styles.form} onSubmit={handleLogin}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Log in</button>
      </form>
      <p className={styles.register}>
        Don’t have an account? <a href="#" className={styles.link} onClick={onToggle}>Register here</a>
      </p>
    </div>
  );
};

export default LoginForm;
