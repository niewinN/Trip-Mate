// import React from 'react';
// import styles from './SignUpForm.module.css';
// import { registerUser } from '../../utils/api';

// interface SignUpFormProps {
//   onToggle: () => void;
// }

// const SignUpForm: React.FC<SignUpFormProps> = ({ onToggle }) => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Sign up!</h1>
//       <form className={styles.form}>
//         <label htmlFor="name">Name</label>
//         <input type="text"/>
//         <label htmlFor="email">E-mail</label>
//         <input type="email"/>
//         <label htmlFor="password">Password</label>
//         <input type="password"/>
//         <label htmlFor="confirmPassword">Confirm password</label>
//         <input type="password"/>
//         <button type="submit">Sign up</button>
//       </form>
//       <p className={styles.register}>
//         Already have an account?{' '}
//         <a href="#" onClick={onToggle} className={styles.link}>
//           Log in
//         </a>
//       </p>
//     </div>
//   );
// };

// export default SignUpForm;
import React, { useState } from 'react';
import styles from './SignUpForm.module.css';
import { registerUser } from '../../utils/api';

interface SignUpFormProps {
  onToggle: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onToggle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert('Name, email, and password are required');
    }
  
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }
  
    try {
      await registerUser(name, email, password, phone);
      alert('Registration successful!');
      onToggle();
    } catch (error: any) {
      console.error('❌ Registration error:', error);
      alert(error.response?.data?.error || 'Registration failed');
    }
  };
  

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Sign up!</h1>
    <form className={styles.form} onSubmit={handleRegister}>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Confirm Password</label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <label>Phone (optional)</label>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUpForm;
