import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import styles from './MultimediaCard.module.css';

interface MultimediaCardProps {
  onUpload?: (file: File | Blob) => void;
}

const MultimediaCard: React.FC<MultimediaCardProps> = ({ onUpload }) => {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isLargePreview, setIsLargePreview] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  /** 📁 Dodawanie pliku z komputera */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setMediaPreview(previewURL);
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
      if (onUpload) onUpload(file);
    }
    resetCameraState();
  };

  /** 🎥 Aktywacja kamery */
  const startCamera = () => {
    resetCameraState();
    setIsCameraActive(true);
  };

  /** 📸 Zrobienie zdjęcia */
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setMediaPreview(imageSrc);
        setMediaType('image');
        stopCamera();
      }
    }
  };

  /** 🎥 Rozpoczęcie nagrywania */
  const startRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      recordedChunks.current = [];
      const mediaRecorder = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm',
      });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      setIsRecording(true);
    }
  };

  /** 🛑 Zatrzymanie nagrywania */
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        setMediaPreview(videoURL);
        setMediaType('video');
        if (onUpload) onUpload(blob);
        stopCamera();
        setIsRecording(false);
      };
    }
  };

  /** 🛑 Zatrzymanie kamery */
  const stopCamera = () => {
    setIsCameraActive(false);
    resetCameraState();
  };

  /** 🗑️ Usunięcie materiału */
 /** 🗑️ Usunięcie materiału */
  const deleteMedia = (event: React.MouseEvent) => {
    event.stopPropagation(); // Zatrzymuje propagację eventu na wyższe elementy
    setMediaPreview(null);
    setMediaType(null);
    resetCameraState();
  };
  

  /** 🔍 Powiększanie podglądu */
  const toggleFullscreenPreview = () => {
    setIsLargePreview(!isLargePreview);
  };

  /** 🔄 Resetowanie stanu kamery */
  const resetCameraState = () => {
    setIsCameraActive(false);
    setIsRecording(false);
    recordedChunks.current = [];
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /** 📲 Toast z wyborem dodawania */
  const handleAddClick = () => {
    setShowToast(true);
  };

  const handleToastOption = (option: 'upload' | 'camera') => {
    setShowToast(false);
    if (option === 'upload') {
      fileInputRef.current?.click();
    } else if (option === 'camera') {
      startCamera();
    }
  };

  return (
    <div className={styles.card}>
      {/* Pełnoekranowy podgląd materiału */}
      {isLargePreview && (
        <div className={styles.largePreviewOverlay} onClick={toggleFullscreenPreview}>
          {mediaType === 'video' ? (
            <video controls className={styles.largePreviewMedia}>
              <source src={mediaPreview || ''} type="video/mp4" />
            </video>
          ) : (
            <img src={mediaPreview || ''} alt="Preview" className={styles.largePreviewMedia} />
          )}
        </div>
      )}

      {/* Duże okno kamery */}
      {isCameraActive && (
        <div className={styles.cameraOverlay}>
          <Webcam
            audio={isRecording}
            ref={webcamRef}
            screenshotFormat="image/png"
            className={styles.cameraLargePreview}
          />
          <div className={styles.cameraControls}>
            {!isRecording ? (
              <>
                <button onClick={capturePhoto}>📸 Zrób zdjęcie</button>
                <button onClick={startRecording}>🎥 Nagrywaj</button>
              </>
            ) : (
              <button onClick={stopRecording}>🛑 Zatrzymaj nagrywanie</button>
            )}
            <button onClick={stopCamera}>🛑 Zamknij kamerę</button>
          </div>
        </div>
      )}

      {/* Podgląd multimediów */}
      {mediaPreview ? (
        <div className={styles.mediaContainer} onClick={toggleFullscreenPreview}>
          {mediaType === 'video' ? (
            <video controls className={styles.mediaPreview}>
              <source src={mediaPreview} type="video/mp4" />
            </video>
          ) : (
            <img src={mediaPreview} alt="Uploaded Media" className={styles.mediaPreview} />
          )}
          <button className={styles.deleteButton} onClick={deleteMedia}>🗑️</button>
        </div>
      ) : (
        <div className={styles.placeholder} onClick={handleAddClick}>
          <div className={styles.placeholderIcon}>📷</div>
          <div className={styles.placeholderPlus}>➕</div>
          <span className={styles.addText}>Dodaj materiał</span>
        </div>
      )}

      {/* Toast z opcjami */}
      {showToast && (
        <div className={styles.toast}>
          <button onClick={() => handleToastOption('upload')}>📁 Dodaj plik</button>
          <button onClick={() => handleToastOption('camera')}>📸 Użyj kamery</button>
        </div>
      )}

      {/* Ukryty input do plików */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default MultimediaCard;
