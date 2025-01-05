// import React, { useState, useEffect } from 'react';
// import styles from './AccountData.module.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AccountData: React.FC = () => {
//   // 📝 Stany danych użytkownika
//   const [email, setEmail] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [phoneError, setPhoneError] = useState('')

//   // 🛠️ Stany edycji pól
//   const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
//   const [isPhoneEditable, setIsPhoneEditable] = useState(false);

//   const navigate = useNavigate();

//   // ✅ Pobierz dane użytkownika
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get('http://localhost:5000/api/auth/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const { email, name, phone } = response.data;
//         setEmail(email);
//         setFirstName(name);
//         setPhone(phone || '');
//       } catch (error) {
//         console.error('❌ Error fetching user profile:', error);
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     };

//     fetchUserProfile();
//   }, [navigate]);

//   // ✅ Aktualizowanie danych użytkownika
//   const updateUserProfile = async (field: 'name' | 'phone', value: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       await axios.put(
//         'http://localhost:5000/api/auth/profile',
//         { [field]: value },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log('✅ Profile updated successfully');
//     } catch (error) {
//       console.error('❌ Error updating user profile:', error);
//     }
//   };

//   // ✏️ Funkcje zmiany stanu edycji
//   const toggleFirstNameEditable = () => {
//     if (isFirstNameEditable) {
//       updateUserProfile('name', firstName);
//     }
//     setIsFirstNameEditable(!isFirstNameEditable);
//   };

//   const togglePhoneEditable = () => {
//     if (isPhoneEditable) {
//       if (!/^\d{9}$/.test(phone)) {
//         setPhoneError('Phone number must be exactly 9 digits.');
//         return;
//       }
//       setPhoneError('');
//       updateUserProfile('phone', phone);
//     }
//     setIsPhoneEditable(!isPhoneEditable);
//   };

//   // 🚪 Wylogowanie
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className={styles.accountCard}>
//       <h2 className={styles.title}>Data</h2>

//       {/* 📧 Email */}
//       <div className={styles.inputGroup}>
//         <input
//           type="email"
//           value={email}
//           disabled
//           onChange={(e) => setEmail(e.target.value)}
//           className={styles.inputField}
//         />
//       </div>

//       {/* 👤 Imię */}
//       <div className={styles.inputGroup}>
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           disabled={!isFirstNameEditable}
//           className={styles.inputField}
//         />
//         <span className={styles.icon} onClick={toggleFirstNameEditable}>✏️</span>
//       </div>

//       {/* 📱 Numer telefonu */}
//       <div className={styles.inputGroup}>
//         <input
//           type="text"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           disabled={!isPhoneEditable}
//           className={`${styles.inputField} ${phoneError ? styles.inputError : ''}`}
//         />
//         <span className={styles.icon} onClick={togglePhoneEditable}>✏️</span>
//       </div>
//       {phoneError && <p className={styles.errorText}>{phoneError}</p>}

//       {/* 🚪 Wylogowanie */}
//       <button className={styles.logoutButton} onClick={handleLogout}>
//         Log out
//       </button>
//     </div>
//   );
// };

// export default AccountData;
import React, { useState, useEffect } from 'react';
import styles from './AccountData.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountData: React.FC = () => {
  // 📝 Stany danych użytkownika
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(''); // Błąd walidacji telefonu
  const [firstNameError, setFirstNameError] = useState(''); // Błąd walidacji imienia

  // 🛠️ Stany edycji pól
  const [isFirstNameEditable, setIsFirstNameEditable] = useState(false);
  const [isPhoneEditable, setIsPhoneEditable] = useState(false);

  const navigate = useNavigate();

  // ✅ Pobierz dane użytkownika
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { email, name, phone } = response.data;
        setEmail(email);
        setFirstName(name);
        setPhone(phone || '');
      } catch (error) {
        console.error('❌ Error fetching user profile:', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // ✅ Aktualizowanie danych użytkownika
  const updateUserProfile = async (field: 'name' | 'phone', value: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.put(
        'http://localhost:5000/api/auth/profile',
        { [field]: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('✅ Profile updated successfully');
    } catch (error) {
      console.error('❌ Error updating user profile:', error);
    }
  };

  // ✏️ Funkcje zmiany stanu edycji
  const toggleFirstNameEditable = () => {
    if (isFirstNameEditable) {
      if (firstName.trim() === '') {
        setFirstNameError('First name cannot be empty.');
        return;
      }
      setFirstNameError('');
      updateUserProfile('name', firstName);
    }
    setIsFirstNameEditable(!isFirstNameEditable);
  };

  const togglePhoneEditable = () => {
    if (isPhoneEditable) {
      if (!/^\d{9}$/.test(phone)) {
        setPhoneError('Phone number must be exactly 9 digits.');
        return;
      }
      setPhoneError('');
      updateUserProfile('phone', phone);
    }
    setIsPhoneEditable(!isPhoneEditable);
  };

  // ✅ Obsługa klawisza Enter do zatwierdzania edycji
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: 'name' | 'phone') => {
    if (e.key === 'Enter') {
      if (field === 'name') toggleFirstNameEditable();
      if (field === 'phone') togglePhoneEditable();
    }
  };

  // 🚪 Wylogowanie
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.accountCard}>
      <h2 className={styles.title}>Data</h2>

      {/* 📧 Email */}
      <div className={styles.inputGroup}>
        <input
          type="email"
          value={email}
          disabled
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
      </div>

      {/* 👤 Imię */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={!isFirstNameEditable}
          onKeyDown={(e) => handleKeyDown(e, 'name')}
          className={`${styles.inputField} ${firstNameError ? styles.inputError : ''}`}
        />
        <span className={styles.icon} onClick={toggleFirstNameEditable}>✏️</span>
        
      </div>
      {firstNameError && <p className={styles.errorText}>{firstNameError}</p>}
      

      {/* 📱 Numer telefonu */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={!isPhoneEditable}
          onKeyDown={(e) => handleKeyDown(e, 'phone')}
          className={`${styles.inputField} ${phoneError ? styles.inputError : ''}`}
        />
        <span className={styles.icon} onClick={togglePhoneEditable}>✏️</span>
      </div>
      {phoneError && <p className={styles.errorText}>{phoneError}</p>}

      {/* 🚪 Wylogowanie */}
      <button className={styles.logoutButton} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default AccountData;
