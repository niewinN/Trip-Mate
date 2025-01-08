import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PlanButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const PlanButton: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/plan');
    } else {
      navigate('/login');
    }
  };

  return (
    <button className={styles.planButton} onClick={handleNavigate} aria-label="Go to Plan">
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faPlane} />
      </div>
      <span className={styles.label}>PLAN</span>
    </button>
  );
};

export default PlanButton;
