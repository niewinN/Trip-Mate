import React, { useState } from 'react';
import styles from './AccountData.module.css';
import { useNavigate } from 'react-router-dom';

const AccountData: React.FC = () => {
  const [email, setEmail] = useState('peter.charles@gmail.com');
  const [firstName, setFirstName] = useState('Peter');
  const [lastName, setLastName] = useState('Charles');
  const [phone, setPhone] = useState('743983293');
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate()

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.removeItem('token'); // Usuń token z localStorage
    navigate('/login'); // Przekierowanie na stronę logowania
    // Tutaj możesz dodać logikę wylogowania
  };

  return (
    <div className={styles.accountCard}>
      <h2 className={styles.title}>Data</h2>
      <div className={styles.inputGroup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!isEditable}
          className={styles.inputField}
        />
        <span className={styles.icon} onClick={toggleEditable}>✏️</span>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={!isEditable}
          className={styles.inputField}
        />
        <span className={styles.icon} onClick={toggleEditable}>✏️</span>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={!isEditable}
          className={styles.inputField}
        />
        <span className={styles.icon} onClick={toggleEditable}>✏️</span>
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!isEditable}
          className={styles.inputField}
        />
        <span className={styles.icon} onClick={toggleEditable}>✏️</span>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default AccountData;
