import React, { useState } from 'react';
import styles from './LoginBox.module.css';
import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import SocialIcons from '../SocialIcons/SocialIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import Wrapper from '../Wrapper/Wrapper';

const LoginBox: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  return (
    // <Wrapper>
    <div className={styles.container}>
      <div className={styles.arrow} onClick={toggleForm}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
      </div>
      {isSignUp ? (
        <SignUpForm onToggle={toggleForm} />
      ) : (
        <LoginForm onToggle={toggleForm} />
      )}
      <SocialIcons />
    </div>
    // </Wrapper>
  );
};

export default LoginBox;
