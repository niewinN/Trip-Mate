import React, { useState } from 'react';
import styles from './TripPerson.module.css';
import PhotoToast from '../PhotoToast/PhotoToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface TripPersonProps {
  initialName?: string;
  onNameChange: (name: string) => void;
  onImageChange: (image: string) => void;
  travelId?: string;
}

const TripPerson: React.FC<TripPersonProps> = ({ initialName = 'Name...', onNameChange, onImageChange, travelId }) => {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onNameChange(e.target.value);
  };

  // Obsługa robienia zdjęcia
  const handleTakePhoto = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Camera is not supported on this device or browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
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
        onImageChange(imageData);
      }

      stream.getTracks().forEach((track) => track.stop());
      setShowToast(false);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access the camera. Please make sure you allowed camera permissions.");
    }
  };

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
          placeholder='Name...'
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
          <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
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
