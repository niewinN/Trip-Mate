// import React, { useState, useRef } from 'react';
// import Webcam from 'react-webcam';
// import styles from './MultimediaCard.module.css';

// interface MultimediaCardProps {
//   onUpload?: (file: File | Blob) => void; // Obsługa przesyłania pliku
// }

// const MultimediaCard: React.FC<MultimediaCardProps> = ({ onUpload }) => {
//   const [mediaPreview, setMediaPreview] = useState<string | null>(null);
//   const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
//   const [showToast, setShowToast] = useState<boolean>(false);
//   const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
//   const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
//   const [isRecording, setIsRecording] = useState<boolean>(false);

//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const webcamRef = useRef<Webcam>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const recordedChunks = useRef<Blob[]>([]);

//   // 📁 Obsługa przesyłania plików
//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const previewURL = URL.createObjectURL(file);
//       setMediaPreview(previewURL);
//       setMediaType(file.type.startsWith('video') ? 'video' : 'image');
//       if (onUpload) onUpload(file);
//     }
//     setShowToast(false);
//   };

//   // 🎥 Start kamery
//   const startCamera = () => {
//     setIsCameraActive(true);
//     setShowToast(false);
//   };

//   // 🛑 Zatrzymanie kamery
//   const stopCamera = () => {
//     setIsCameraActive(false);
//   };

//   // 📸 Zrobienie zdjęcia
//   const capturePhoto = () => {
//     if (webcamRef.current) {
//       const imageSrc = webcamRef.current.getScreenshot();
//       if (imageSrc) {
//         setMediaPreview(imageSrc);
//         setMediaType('image');
//         stopCamera();
//       }
//     }
//   };

//   // 🎥 Rozpoczęcie nagrywania
//   const startRecording = () => {
//     setIsRecording(true);
//     recordedChunks.current = [];
//     const stream = webcamRef.current?.video?.srcObject as MediaStream;
//     const mediaRecorder = new MediaRecorder(stream);

//     mediaRecorderRef.current = mediaRecorder;
//     mediaRecorder.start();

//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         recordedChunks.current.push(event.data);
//       }
//     };
//   };

//   // 🛑 Zatrzymanie nagrywania
//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);

//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(recordedChunks.current, { type: 'video/mp4' });
//         const videoURL = URL.createObjectURL(blob);
//         setMediaPreview(videoURL);
//         setMediaType('video');
//         if (onUpload) onUpload(blob);
//         stopCamera();
//       };
//     }
//   };

//   // 🖼️ Pełnoekranowy podgląd
//   const handleMediaClick = () => {
//     setIsFullscreen(true);
//   };

//   const handleCloseFullscreen = () => {
//     setIsFullscreen(false);
//   };

//   // 🔄 Toast
//   const handleAddClick = () => {
//     setShowToast(true);
//   };

//   const handleToastOption = (option: 'upload' | 'capture' | 'record') => {
//     if (option === 'upload') {
//       fileInputRef.current?.click();
//     } else if (option === 'capture') {
//       startCamera();
//     } else if (option === 'record') {
//       startCamera();
//       setTimeout(startRecording, 500); // Rozpocznij nagrywanie po uruchomieniu kamery
//     }
//     setShowToast(false);
//   };

//   return (
//     <div className={styles.card}>
//       {/* Kamera */}
//       {isCameraActive ? (
//         <div className={styles.cameraContainer}>
//           <Webcam
//             audio={isRecording}
//             ref={webcamRef}
//             screenshotFormat="image/png"
//             className={styles.cameraPreview}
//           />
//           {!isRecording ? (
//             <>
//               <button className={styles.captureButton} onClick={capturePhoto}>📸 Zrób zdjęcie</button>
//               <button className={styles.recordButton} onClick={startRecording}>🎥 Nagrywaj</button>
//             </>
//           ) : (
//             <button className={styles.stopButton} onClick={stopRecording}>🛑 Zatrzymaj nagrywanie</button>
//           )}
//           <button className={styles.closeButton} onClick={stopCamera}>🛑 Zamknij kamerę</button>
//         </div>
//       ) : mediaPreview ? (
//         mediaType === 'video' ? (
//           <video controls className={styles.mediaPreview} onClick={handleMediaClick}>
//             <source src={mediaPreview} type="video/mp4" />
//           </video>
//         ) : (
//           <img
//             src={mediaPreview}
//             alt="Uploaded Media"
//             className={styles.mediaPreview}
//             onClick={handleMediaClick}
//           />
//         )
//       ) : (
//         <div className={styles.placeholder}>
//           <span className={styles.icon}>📷</span>
//         </div>
//       )}

//       {/* Przycisk dodawania */}
//       <button className={styles.addButton} onClick={handleAddClick}>+</button>

//       {/* Toast z opcjami */}
//       {showToast && (
//         <div className={styles.toast}>
//           <button onClick={() => handleToastOption('upload')}>📁 Dodaj zdjęcie/nagranie</button>
//           <button onClick={() => handleToastOption('capture')}>📸 Zrób zdjęcie</button>
//           <button onClick={() => handleToastOption('record')}>🎥 Nagraj wideo</button>
//         </div>
//       )}

//       {/* Ukryty input */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*,video/*"
//         style={{ display: 'none' }}
//         onChange={handleFileUpload}
//       />

//       {/* Pełnoekranowy podgląd */}
//       {isFullscreen && (
//         <div className={styles.fullscreenOverlay} onClick={handleCloseFullscreen}>
//           {mediaType === 'video' ? (
//             <video controls autoPlay className={styles.fullscreenMedia}>
//               <source src={mediaPreview!} type="video/mp4" />
//             </video>
//           ) : (
//             <img src={mediaPreview!} alt="Fullscreen Media" className={styles.fullscreenMedia} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultimediaCard;
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
    setIsFullscreen(true);
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
    setIsFullscreen(false);
    resetCameraState();
  };

  /** 🗑️ Usunięcie materiału */
  const deleteMedia = () => {
    setMediaPreview(null);
    setMediaType(null);
    resetCameraState();
  };

  /** 🖼️ Pełnoekranowy podgląd */
  const handleMediaClick = () => {
    setIsFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreen(false);
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
      {/* Pełnoekranowa kamera */}
      {isFullscreen && isCameraActive && (
        <div className={styles.fullscreenOverlay}>
          <Webcam
            audio={isRecording}
            ref={webcamRef}
            screenshotFormat="image/png"
            className={styles.fullscreenCamera}
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
        <div className={styles.mediaContainer} onClick={handleMediaClick}>
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
          <span>+</span>
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
