// import React, { useEffect, useRef } from 'react';
// import styles from './ErrorToast.module.css';

// interface ErrorToastProps {
//   message: string;
//   imageSrc?: string;
//   onClose: () => void;
// }

// const ErrorToast: React.FC<ErrorToastProps> = ({ message, imageSrc, onClose }) => {
//   const toastRef = useRef<HTMLDivElement>(null);

//   // Automatyczne zamknięcie po 10 sekundach
//   useEffect(() => {
//     const timer = setTimeout(onClose, 10000);
//     return () => clearTimeout(timer); // Wyczyszczenie timera po odmontowaniu
//   }, [onClose]);

//   // Zamknięcie po kliknięciu poza obszarem toastu
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (toastRef.current && !toastRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [onClose]);

//   return (
//     <div className={styles.toastWrapper}>
//         <div ref={toastRef} className={styles.toast}>
//             <button className={styles.closeButton} onClick={onClose}>×</button>
//             <p className={styles.message}>{message}</p>
//             {imageSrc && <img src={imageSrc} alt="Error Icon" className={styles.image} />}
//         </div>
//     </div>
//   );
// };

// export default ErrorToast;
import React, { useEffect, useRef } from 'react';
import styles from './ErrorToast.module.css';

interface ErrorToastProps {
  message: string;
  imageSrc?: string;
  onClose: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ message, imageSrc, onClose }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  // Automatyczne zamknięcie po 10 sekundach
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer); // Wyczyszczenie timera po odmontowaniu
  }, [onClose]);

  // Zamknięcie po kliknięciu poza obszarem toastu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toastRef.current && !toastRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div ref={toastRef} className={styles.toast}>
        <div className={styles.closeButton} onClick={onClose}>×</div>
        <p className={styles.message}>{message}</p>
        {imageSrc && <img src={imageSrc} alt="Error Icon" className={styles.image} />}
      </div>
    </div>
  );
};

export default ErrorToast;
