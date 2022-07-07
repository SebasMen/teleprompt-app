import React, { useEffect, useRef, useState } from 'react'
// import Ffmpeg from 'fluent-ffmpeg';

function WebCamRecord({ start }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const streamRecorderRef = useRef(null);

  const [chunks, setChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  // const [videosLinks, setVideosLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(start) {
      startRecording();
    }

    if(!start) {
      stopRecording();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  // useEffect(() => {
  //   if(stop) {
  //     stopRecording();
  //   }
  // }, [stop])

  useEffect(function() {
    if (isRecording) {
      return;
    }
    if (chunks.length === 0) {
      return;
    }

    const blob = new Blob(chunks, {
      type: "video/x-matroska;codecs=avc1,opus",
    });

    setDownloadLink(URL.createObjectURL(blob))

    // let newVideo = URL.createObjectURL(blob);
    // setVideosLinks((videos) => [...videos, newVideo])

    setChunks([])
  }, [chunks, isRecording]);  

  useEffect(function() {
    async function prepareStream() {

      function gotStream(stream){
        streamRef.current = stream;
        if(videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }

      async function getStream() {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
          });
        }

        const constraints = {
          audio: true,
          video: true
        }

        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          gotStream(stream);
        } catch (error) {
          setError(error);
        }
      }

      await getStream();
    }

    prepareStream();
  }, []);
  
  function startRecording() {
    if (isRecording) {
      return;
    }
    if (!streamRef.current) {
      return;
    }

    streamRecorderRef.current = new MediaRecorder(streamRef.current);
    streamRecorderRef.current.start();
    streamRecorderRef.current.ondataavailable = function(event) {
      if (chunks) {
        let newChunks = [];
        newChunks.push(event.data);
        setChunks(newChunks);
      }
    };
    setIsRecording(true);
  }

  function stopRecording() {
    if (!streamRecorderRef.current) {
      return;
    }
    streamRecorderRef.current.stop();
    setIsRecording(false);
  }

  return (
    <>
      <video 
        muted 
        autoPlay 
        playsInline
        ref={videoRef}         
        width="320"
        height="180">
      </video>

      {downloadLink && 
        <video 
          style={{backgroundColor: "black"}}
          src={downloadLink} 
          controls width="320"
          height="180">
        </video>
      }

      {/* <div className='row mt-3'>
        <div className='col-8 w-100 d-flex justify-content-center'>
          <video ref={videoRef} autoPlay muted playsInline></video>
        </div>
      </div> */}

      {/* <div className='row mt-2'>
        <div className='col-4 w-100 d-flex justify-content-center'>
          <button onClick={startRecording} disabled={isRecording}>Record</button>
          <button onClick={stopRecording} disabled={!isRecording}>Stop</button>
        </div>
      </div> */}

      {/* <hr className='mt-2'/> */}

      {/* <div className='row mt-2'>
        <div className='col-8 w-100 d-flex flex-column align-items-center'>
          {downloadLink && <video src={downloadLink} controls></video>}
          {downloadLink && (
            <a href={downloadLink} 
            download="file.mp4" 
            className='btn btn-primary d-block'>
              Download
            </a>
          )}

          {videosLinks.length !== 0 && (
            videosLinks.map((video, index) => (
              <div key={index} className='mb-2'>
                <video src={video} controls></video>
                <a href={video} 
                  download="file.mp4"
                  style={{width:'120px'}}
                  className='btn btn-primary d-block'>
                    Download
                </a>
              </div>
            ))
          )}
        </div>
      </div> */}

      {error && <p>{error.message}</p>}
    </>
  )
}

export default WebCamRecord