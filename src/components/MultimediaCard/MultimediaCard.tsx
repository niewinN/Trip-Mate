import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import styles from './MultimediaCard.module.css';
import axios from 'axios';

interface MultimediaCardProps {
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  onUpload?: (file: File | Blob) => void;
  onDelete?: () => void;
  travelId?: string;
  multimediaId?: string;
}

const MultimediaCard: React.FC<MultimediaCardProps> = ({ mediaUrl, mediaType: initialMediaType, onUpload, onDelete, travelId, multimediaId}) => {
  // const { travelId } = useParams<{ travelId: string }>();
  const [mediaPreview, setMediaPreview] = useState<string | null>(mediaUrl || null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(initialMediaType || null);
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
  // const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const previewURL = URL.createObjectURL(file);
  //     setMediaPreview(previewURL);
  //     setMediaType(file.type.startsWith('video') ? 'video' : 'image');

  //     // Wysyłanie na serwer
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       const response = await axios.post('http://localhost:5000/api/upload', formData, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });
  //       console.log('✅ File uploaded successfully:', response.data);
  //       const file = event.target.files?.[0];
  //       if (file && onUpload) {
  //         await onUpload(file);
  //       }
  //     } catch (error) {
  //       console.error('❌ Error uploading file:', error);
  //     }
  //   }
  //   resetCameraState();
  // };
  /** 📁 Dodawanie pliku z komputera */
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && onUpload) {
    try {
      // Przekaż plik do nadrzędnej funkcji `onUpload`
      await onUpload(file);
    } catch (error) {
      console.error('❌ Error handling file upload in parent:', error);
    }
  }
  resetCameraState();
};

  /** 🎥 Aktywacja kamery */
  const startCamera = () => {
    resetCameraState();
    setIsCameraActive(true);
  };

  /** 📸 Zrobienie zdjęcia */
  // const capturePhoto = () => {
  //   if (webcamRef.current) {
  //     const imageSrc = webcamRef.current.getScreenshot();
  //     if (imageSrc) {
  //       setMediaPreview(imageSrc);
  //       setMediaType('image');
  //       stopCamera();
  //     }
  //   }
  // };
  /** 📸 Zrobienie zdjęcia */
// const capturePhoto = async () => {
//   if (webcamRef.current) {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (imageSrc) {
//       setMediaPreview(imageSrc);
//       setMediaType('image');

//       try {
//         // Przekształć dane base64 na Blob
//         const response = await fetch(imageSrc);
//         const blob = await response.blob();
//         const file = new File([blob], 'photo.png', { type: 'image/png' });

//         const formData = new FormData();
//         formData.append('file', file);

//         // Wysyłanie zdjęcia na serwer
//         const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });

//         console.log('✅ Photo uploaded successfully:', uploadResponse.data);
//         if (onUpload) onUpload(file);
//       } catch (error) {
//         console.error('❌ Error uploading photo:', error);
//       }

//       stopCamera();
//     }
//   }
// };
const capturePhoto = async () => {
  if (webcamRef.current) {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setMediaPreview(imageSrc);
      setMediaType('image');

      try {
        // Przekształć dane base64 na Blob
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        const file = new File([blob], `photo-${Date.now()}.png`, { type: 'image/png' });

        console.log('✅ Photo captured successfully');

        // Przekazanie pliku bezpośrednio do funkcji onUpload
        if (onUpload) {
          await onUpload(file);
        }
      } catch (error) {
        console.error('❌ Error capturing photo:', error);
      }

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
  // const stopRecording = async () => {
  //   if (mediaRecorderRef.current) {
  //     mediaRecorderRef.current.stop();
  //     mediaRecorderRef.current.onstop = async () => {
  //       const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
  //       const videoURL = URL.createObjectURL(blob);
  //       setMediaPreview(videoURL);
  //       setMediaType('video');

  //       // Wysyłanie na serwer
  //       const formData = new FormData();
  //       formData.append('file', blob, 'video.webm');

  //       try {
  //         const response = await axios.post('http://localhost:5000/api/upload', formData, {
  //           headers: { 'Content-Type': 'multipart/form-data' },
  //         });
  //         console.log('✅ Video uploaded successfully:', response.data);
  //         if (onUpload) onUpload(blob);
  //       } catch (error) {
  //         console.error('❌ Error uploading video:', error);
  //       }

  //       stopCamera();
  //       setIsRecording(false);
  //     };
  //   }
  // };
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
            await onUpload(file); // Przekazanie pliku do głównego handlera przesyłania
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
  
      // ✅ Wywołaj funkcję `onDelete` zamiast samodzielnie wysyłać żądanie DELETE
      if (onDelete) {
        onDelete();
      }
  
      setMediaPreview(null);
      setMediaType(null);
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
              <source src={mediaPreview || ''} type="video/mp4" />
            </video>
          ) : (
            <img src={mediaPreview || ''} alt="Preview" className={styles.largePreviewMedia} />
          )}
        </div>
      )}

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
        <div className={styles.placeholder} onClick={handleAddClick}>➕ Dodaj materiał</div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*,video/*" style={{ display: 'none' }} onChange={handleFileUpload} />
    </div>
  );
};

export default MultimediaCard;
