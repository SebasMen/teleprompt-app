import React, { useEffect, useRef, useState } from 'react'

const WebCamRecord = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const streamRecorderRef = useRef(null);
  const chunks = useRef([]); // guardara cada pedazo de video generado
  // const [chunks, setChunks] = useState([])

  // Estado de grabación
  const [isRecording, setIsRecording] = useState(false);
  // const [downloadLink, setDownloadLink] = useState("");
  const [videosLinks, setVideosLinks] = useState([]);

  // Capturar el error
  const [error, setError] = useState(null);

  const startRecording = () => {
    if(isRecording) return; // si esta grabando sale
    if(!streamRef.current) return; // si no tiene un dispositivo disponible para grabar

    streamRecorderRef.current = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=h264'
    });
    streamRecorderRef.current.start();
    streamRecorderRef.current.ondataavailable = (event) => {
      console.log(event.data)
      chunks.current.push(event.data);
      // if(chunks.current) {
      //   chunks.current.push(event.data);
      // }
    };
    setIsRecording(true);
  }

  const stopRecording = () => {
    if (!streamRecorderRef.current) return;

    streamRecorderRef.current.stop();
    setIsRecording(false);
    saveRecording();
  }

  const saveRecording = () => {
    const blob = new Blob(chunks.current, {
      type: "video/webm",
      // type: "video/x-matroska;codecs=avc1,opus",
    });

    let newVideo = URL.createObjectURL(blob);    
    setVideosLinks((videos) => [...videos, newVideo]);
    chunks.current = [];
  }

  useEffect(() => {
    const prepareStream = async() => {

      const gotStream = async(stream) => {
        streamRef.current = stream;
        if(videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }

      const getStream = async() => {
        if(streamRef.current) {
          // Detiene las fuentes de audio o video que este activas
          streamRef.current.getTracks().forEach(track => {
            track.stop();
          });
        }

        try {
          // Normalmente por defecto toma la que este disponible
          const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
          gotStream(stream);
        } catch (error) {
          setError(error);
        }
      };

      await getStream();
    };

    prepareStream();
  }, []);
  

  return (
    <div className='container my-5'>

      <div className='row mt-3'>
        <div className='col-8 w-100 d-flex justify-content-center'>
          <video ref={videoRef} autoPlay muted></video>
        </div>
      </div>

      <div className='row mt-2'>
        <div className='col-4 w-100 d-flex justify-content-center'>
          <button onClick={startRecording} disabled={isRecording}>Record</button>
          <button onClick={stopRecording} disabled={!isRecording}>Stop</button>
        </div>
      </div>

      <hr className='mt-2'/>

      <div className='row mt-2'>
        <div className='col-8 w-100 d-flex flex-column align-items-center'>
          {/* {downloadLink && <video src={downloadLink} controls></video>}
          {downloadLink && (
            <a href={downloadLink} download="file.mp4">Download</a>
          )} */}

          {videosLinks.length !== 0 && (
            videosLinks.map((video, index) => (
              <div key={index}>
                <video src={video} controls className='mb-2'></video>
                <a href={video} download="file.mp4">Download</a>
              </div>
            ))
          )}
        </div>
      </div>

      {error && <p>{error.message}</p>}
    </div>
  )
}

export default WebCamRecord