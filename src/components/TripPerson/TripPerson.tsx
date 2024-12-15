// import React, { useState } from 'react';
// import styles from './TripPerson.module.css';
// import PhotoToast from '../PhotoToast/PhotoToast';

// interface TripPersonProps {
//   initialName?: string; // Opcjonalna początkowa nazwa
//   onNameChange: (name: string) => void;
//   onImageChange: (image: string) => void;
// }

// const TripPerson: React.FC<TripPersonProps> = ({ initialName = 'Name...', onNameChange, onImageChange }) => {
//   const [name, setName] = useState(initialName);
//   const [image, setImage] = useState<string | null>(null);
//   const [showToast, setShowToast] = useState(false);

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value);
//     onNameChange(e.target.value);
//   };
// //   const handleTakePhoto = async () => {
// //     // Zrób zdjęcie z kamerki
// //     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //     const video = document.createElement('video');
// //     video.srcObject = stream;
// //     video.play();

// //     const canvas = document.createElement('canvas');
// //     canvas.width = 640;
// //     canvas.height = 480;
// //     const ctx = canvas.getContext('2d');

// //     video.addEventListener('loadeddata', () => {
// //       ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
// //       setImage(canvas.toDataURL());
// //       stream.getTracks().forEach((track) => track.stop());
// //       setShowToast(false); // Zamknij toast
// //     });
// //   };
// const handleTakePhoto = async () => {
//     try {
//       // Sprawdzenie dostępności getUserMedia
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         alert("Camera is not supported on this device or browser.");
//         return;
//       }
  
//       // Konfiguracja kamery
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user" }, // Przednia kamera na telefonach
//       });
  
//       // Tworzenie elementu video
//       const video = document.createElement("video");
//       video.srcObject = stream;
//       await video.play();
  
//       // Ustawienie canvas do zrobienia zdjęcia
//       const canvas = document.createElement("canvas");
//       canvas.width = video.videoWidth || 640;
//       canvas.height = video.videoHeight || 480;
  
//       const ctx = canvas.getContext("2d");
//       if (ctx) {
//         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//         setImage(canvas.toDataURL("image/png")); // Zapisanie obrazu
//       }
  
//       // Zatrzymanie strumienia
//       stream.getTracks().forEach((track) => track.stop());
//       setShowToast(false);
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       alert(
//         "Could not access the camera. Please make sure you allowed camera permissions."
//       );
//     }
//   };
  

//   const handleUploadPhoto = () => {
//     // Załaduj zdjęcie z komputera
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.onchange = (e) => {
//       const file = (e.target as HTMLInputElement)?.files?.[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setImage(reader.result as string);
//           setShowToast(false); // Zamknij toast
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   return (
//     <div className={styles.card}>
//       <div className={styles.header}>
//         <input
//           type="text"
//           value={name}
//           onChange={handleNameChange}
//           className={styles.input}
//         />
//       </div>
//       <div className={styles.body}>
//         {image ? (
//           <img src={image} alt="Person" className={styles.image} />
//         ) : (
//           <div className={styles.cameraIcon} />
//         )}
//         <div className={styles.addButton} onClick={() => setShowToast(true)}>
//           +
//         </div>
//       </div>

//       {showToast && (
//         <PhotoToast
//           onTakePhoto={handleTakePhoto}
//           onUploadPhoto={handleUploadPhoto}
//           onClose={() => setShowToast(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default TripPerson;
import React, { useState } from 'react';
import styles from './TripPerson.module.css';
import PhotoToast from '../PhotoToast/PhotoToast';

interface TripPersonProps {
  initialName?: string; // Opcjonalna początkowa nazwa
  onNameChange: (name: string) => void; // Funkcja do przekazania zmienionego imienia
  onImageChange: (image: string) => void; // Funkcja do przekazania zmienionego zdjęcia
}

const TripPerson: React.FC<TripPersonProps> = ({ initialName = 'Name...', onNameChange, onImageChange }) => {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Obsługa zmiany imienia
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onNameChange(e.target.value); // Przekazanie zmienionego imienia do głównego komponentu
  };

  // Obsługa robienia zdjęcia
  const handleTakePhoto = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Camera is not supported on this device or browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }, // Przednia kamera na telefonach
      });

      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setImage(imageData); // Aktualizacja lokalnego stanu
        onImageChange(imageData); // Przekazanie zdjęcia do głównego komponentu
      }

      stream.getTracks().forEach((track) => track.stop());
      setShowToast(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera. Please make sure you allowed camera permissions.");
    }
  };

  // Obsługa przesyłania zdjęcia
  const handleUploadPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageData = reader.result as string;
          setImage(imageData); // Aktualizacja lokalnego stanu
          onImageChange(imageData); // Przekazanie zdjęcia do głównego komponentu
          setShowToast(false);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className={styles.input}
        />
      </div>
      <div className={styles.body}>
        {image ? (
          <img src={image} alt="Person" className={styles.image} />
        ) : (
          <div className={styles.cameraIcon} />
        )}
        <div className={styles.addButton} onClick={() => setShowToast(true)}>
          +
        </div>
      </div>

      {showToast && (
        <PhotoToast
          onTakePhoto={handleTakePhoto}
          onUploadPhoto={handleUploadPhoto}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default TripPerson;
