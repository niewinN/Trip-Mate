import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import styles from './MultimediaCard.module.css';

interface MultimediaCardProps {
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  onUpload?: (file: File | Blob) => void;
  onDelete?: () => void;
  travelId?: string;
  multimediaId?: string;
  isUploading?: boolean;
}

const MultimediaCard: React.FC<MultimediaCardProps> = ({ mediaUrl, mediaType: initialMediaType, onUpload, onDelete, travelId, isUploading, multimediaId}) => {
  // const { travelId } = useParams<{ travelId: string }>();
  const [mediaPreview, setMediaPreview] = useState<string | null>(mediaUrl || null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(initialMediaType || null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isLargePreview, setIsLargePreview] = useState<boolean>(false);
  const [isUploaded, setIsUploaded] = useState<boolean>(false)
  

  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const handleUpload = async (file: File | Blob) => {
    if (onUpload) {
      await onUpload(file);
      setIsUploaded(true); // Dezaktywuj kartę po przesłaniu
    }
  };

  /** 🎥 Aktywacja kamery */
  const startCamera = () => {
    resetCameraState();
    setIsCameraActive(true);
  };

const capturePhoto = async () => {
  if (webcamRef.current) {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setMediaPreview(imageSrc);
      setMediaType('image');

      try {
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], `photo-${Date.now()}.png`, { type: 'image/png' });

        console.log('✅ Photo captured successfully');

        if (onUpload && !isUploading) {
          await onUpload(file);
          setIsUploaded(true); // Oznacz jako przesłane
          setMediaPreview(null); // Wyczyść podgląd
          setMediaType(null); // Wyczyść typ multimediów
        }
      } catch (error) {
        console.error('❌ Error capturing photo:', error);
      } finally {
        stopCamera();
      }
    }
  }
};

/** 📁 Dodawanie pliku z komputera */
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && onUpload) {
    try {
      await onUpload(file);
      setIsUploaded(true);
      setMediaPreview(null); // Wyczyść podgląd
      setMediaType(null); // Wyczyść typ multimediów
    } catch (error) {
      console.error('❌ Error handling file upload in parent:', error);
    }
  }
  resetCameraState();
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

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
  
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(blob);
        setMediaPreview(videoURL);
        setMediaType('video');
  
        try {
          console.log('✅ Video recording stopped successfully');
  
          // Przekazanie pliku do funkcji `onUpload`
          const file = new File([blob], `video-${Date.now()}.webm`, { type: 'video/webm' });
  
          if (onUpload) {
            await onUpload(file);
      setIsUploaded(true);
      setMediaPreview(null); // Wyczyść podgląd
      setMediaType(null); // Wyczyść typ multimediów
          }
        } catch (error) {
          console.error('❌ Error processing video:', error);
        } finally {
          stopCamera();
          setIsRecording(false);
        }
      };
    }
  };
  

  /** 🛑 Zatrzymanie kamery */
  const stopCamera = () => {
    setIsCameraActive(false);
    resetCameraState();
  };

  const deleteMedia = async (event: React.MouseEvent) => {
    event.stopPropagation();
  
    if (!multimediaId || !travelId) {
      console.error('❌ Missing multimediaId or travelId');
      return;
    }
  
    try {
      console.log(`🔄 Requesting deletion of multimedia with travelId: ${travelId}, multimediaId: ${multimediaId}`);
  
      if (onDelete) {
        await onDelete();
      }
  
      setMediaPreview(null);
      setMediaType(null);
      setIsUploaded(false); // Resetuj stan przesłania
      resetCameraState();
    } catch (error: any) {
      console.error('❌ Error triggering delete callback:', error.response?.data || error.message);
    }
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
              <source src={mediaPreview || mediaUrl || ''} type="video/mp4" />
            </video>
          ) : (
            <img src={mediaPreview || mediaUrl || ''} alt="Preview" className={styles.largePreviewMedia} />
          )}
        </div>
      )}
  
      {/* Kamera */}
      {isCameraActive && (
        <div className={styles.cameraOverlay}>
          <Webcam ref={webcamRef} screenshotFormat="image/png" className={styles.cameraLargePreview} />
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
  
      {/* Toast z opcjami */}
      {showToast && (
        <div className={styles.toast}>
          <button onClick={() => handleToastOption('upload')}>📁 Dodaj plik</button>
          <button onClick={() => handleToastOption('camera')}>📸 Użyj kamery</button>
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
        <p className={styles.addText}>Dodaj materiał</p>
        <div className={styles.placeholderPlus}>+</div>
      </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleFileUpload} />
    </div>
  );
};
  

export default MultimediaCard;
