import React, { useState } from 'react';
import styles from './LoginBox.module.css';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import SocialIcons from '../SocialIcons/SocialIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Toast from '../Toast/Toast';
import registerImg from '../../assets/login/registerImg.png'

const LoginBox: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleRegistrationSuccess = () => {
    setShowToast(true);
    setIsSignUp(false); // Przełącza na formularz logowania
  };

  return (
    // <Wrapper>
    <div className={styles.container}>
      <div className={styles.arrow} onClick={toggleForm}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
      </div>
      {isSignUp ? (
        <SignUpForm onToggle={handleRegistrationSuccess} />
      ) : (
        <LoginForm onToggle={toggleForm} />
      )}
      <SocialIcons />
      {showToast && (
        <Toast
          message="Successfully registered! Start planning your dream trips now."
          imageSrc={registerImg}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
    // </Wrapper>
  );
};

export default LoginBox;
