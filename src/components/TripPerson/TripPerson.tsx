import React, { useState } from 'react';
import styles from './TripPerson.module.css';
import PhotoToast from '../PhotoToast/PhotoToast';

interface TripPersonProps {
  initialName?: string; // Opcjonalna początkowa nazwa
}

const TripPerson: React.FC<TripPersonProps> = ({ initialName = 'Name...' }) => {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleTakePhoto = async () => {
    // Zrób zdjęcie z kamerki
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    video.addEventListener('loadeddata', () => {
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL());
      stream.getTracks().forEach((track) => track.stop());
      setShowToast(false); // Zamknij toast
    });
  };

  const handleUploadPhoto = () => {
    // Załaduj zdjęcie z komputera
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
          setShowToast(false); // Zamknij toast
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
          onChange={(e) => setName(e.target.value)}
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
