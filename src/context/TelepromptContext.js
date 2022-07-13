import { createContext, useState, useEffect } from "react";

const TelepromptContext = createContext();

const INITIAL_SCRIPT = `¡Ay! dicen que cometí un delito
Y de pronto hasta me condenan
Porque le dañe el cofrecito
A una complaciente morena

¡Ay! porque le dañe el cofrecito a una complaciente morena
¡Ay! dicen que soy el sinvergüenza
Más grande que tiene la tierra

Y con ese pocon de mujeres cualquiera se mete en problemas
Con ese pocon de mujeres cualquiera se mete en problemas
Porque a veces salgo a trabajar
Muy despreocupado sin saber
Que me esta esperando una mujer
Que me invita con su coquetear

Y con ese pocon de mujeres cualquiera se mete en problemas
Con ese pocon de mujeres cualquiera se mete en problemas
Porque a veces salgo a trabajar
Muy despreocupado sin saber
Que me esta esperando una mujer
Que me invita con su coquetear`;

// const videosArray = [
//   {
//     id: 0,
//     src: "",
//   },
//   {
//     id: 1,
//     src: "",
//   },
//   {
//     id: 2,
//     src: "",
//   },
//   {
//     id: 3,
//     src: "",
//   },
// ]

const TelepromptProvider = ({ children }) => {
  const [words, setWords] = useState(null);
  const [duration, setDuration] = useState(null);
  const [script, setScript] = useState(INITIAL_SCRIPT);
  const [video, setVideo] = useState("");
  const [videos, setVideos] = useState([{id:1, blob: "blob:http://localhost:3000/595ba1ae-1ca2-423c-99a9-d621c33422e4"}]);

  useEffect(() => {
    handleChangeText(script);    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script, video, videos]);

  useEffect(() => {
    // console.log(videos)

    if(video) {
      console.log(video)
      handleChangeVideo(video);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video, videos])

  const handleChangeVideo = (video) => {
    console.log(video);
    if(video) {
      const newVideo = {
        id: Date.now(),
        blob: video
      }

      setVideos([...videos, newVideo]);
      setVideo("");
    }
  }

  const handleChangeText = (e) => {
    // console.log(e.target)
    if (e) {
      const text = getReadingTime(e);
      setWords(text.totalWords);
      setDuration(text.duration);
    } else {
      const text = getReadingTime(script);
      setWords(text.totalWords);
      setDuration(text.duration);
    }
  };

  const getReadingTime = (text) => {
    let cleanText = "";
    let totalWords = 0;

    if (text.target) {
      cleanText = text.target.value;
      cleanText = cleanText.replace(/\r?\n/g, " ");
      cleanText = cleanText.replace(/[ ]+/g, " ");
      cleanText = cleanText.replace(/^ /, " ");
      cleanText = cleanText.replace(/ $/, "");

      setScript(text.target.value);
      let chunksText = cleanText.split(" ");
      totalWords = chunksText.length;
    } else {
      cleanText = text;
      cleanText = cleanText.replace(/\r?\n/g, " ");
      cleanText = cleanText.replace(/[ ]+/g, " ");
      cleanText = cleanText.replace(/^ /, " ");
      cleanText = cleanText.replace(/ $/, "");

      setScript(text);
      let chunksText = cleanText.split(" ");
      totalWords = chunksText.length;
    }

    let minutes = Math.floor(totalWords / 150);
    let seconds = Math.floor((totalWords % 150) / (150 / 60));
    let duration =
      !minutes && seconds < 10
        ? `0${minutes}:0${seconds}`
        : !minutes && seconds > 10
        ? `0${minutes}:${seconds}`
        : `${minutes}:${seconds}`;

    return { totalWords, duration };
  };

  const data = {
    words,
    setWords,
    duration,
    setDuration,
    script,
    setScript,
    video,
    setVideo,
    videos,
    setVideos,
    handleChangeText,
    getReadingTime,
  };

  return (
    <TelepromptContext.Provider value={data}>
      {children}
    </TelepromptContext.Provider>
  );
};

export { TelepromptProvider };
export default TelepromptContext;
