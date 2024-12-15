import React from 'react';
import styles from './PhotoToast.module.css';

interface PhotoToastProps {
  onTakePhoto: () => void;
  onUploadPhoto: () => void;
  onClose: () => void; // Funkcja zamknięcia toastu
}

const PhotoToast: React.FC<PhotoToastProps> = ({ onTakePhoto, onUploadPhoto, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.toast}>
        <h2 className={styles.title}>Add Photo</h2>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={onTakePhoto}>
            Take Photo
          </button>
          <button className={styles.button} onClick={onUploadPhoto}>
            Upload Photo
          </button>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default PhotoToast;
