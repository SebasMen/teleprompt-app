import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TelepromptContext from "../context/TelepromptContext";

import "../styles/pages/Content.css";


const Content = () => {
  const {words, duration, script, videos, handleChangeText } = useContext(TelepromptContext);

  // const openTeleprompter = () => {
  //   window.open("/teleprompter", "_blank")
  // }

  // useEffect(() => {
  //   console.log(videos)
  // }, [])

  // const [words, setWords] = useState(0);
  // const [duration, setDuration] = useState(0);
  // // eslint-disable-next-line no-unused-vars
  // const [script, setScript] = useState('Hola');
  // const [videos, setVideos] = useState(['video 1', 'video 2', 'video 3']);

  // useEffect(() => {
  //   handleChangeText(script);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [script]); 

  // const handleChangeText = (e) => {
  //   if(e) {
  //     const text = getReadingTime(e);
  //     setWords(text.words)
  //     setDuration(text.duration);
  //   } else {
  //     const text = getReadingTime(script)
  //     setWords(text.words)
  //     setDuration(text.duration);
  //   }
  // }

  // const getReadingTime = (text) => {
  //   let words = 0;

  //   if(text.target) {
  //     words = text.target.value.split(' ').length;
  //   } else {
  //     words = text.split(' ').length;
  //   }

  //   let minutes = Math.floor(words / 150);
  //   let seconds = Math.floor(words % 150 / (150 /60))
  //   let duration = (!minutes && seconds < 10) 
  //                     ? `0${minutes}:0${seconds}`
  //                     : (!minutes && seconds > 10)
  //                     ? `0${minutes}:${seconds}`
  //                     : `${minutes}:${seconds}`

  //   return {words, duration};
  // }

  return (
    <div className="content__home">
      <header className="header">
        <h1 className="header__title">VIDEO PLATFORM</h1>
        <hr />
      </header>

      <main>
        <div className="content__media">
          <section className="script">
            <h3 className="script__title">Title video</h3>

            <div className="script__content">
              <div className="script__headers">
                <p className="script__words">{ (words && words !== null) ? words : '0'  } words</p>
                <p className="script__duration">
                  duration - <span className="script__time"> 
                  { (duration && duration !== null) ? duration : '00:00' }
                  </span>
                </p>
              </div>

              <div className="script__body">
                <textarea
                  className="script-text"
                  defaultValue={script}
                  placeholder="Write script..."
                  onChange={(text) => handleChangeText(text)}>
                </textarea>
              </div>
            </div>
          </section>

          <section className="videos">
            <div className="video__content">
              <video controls></video>
            </div>

            <div className="video__library">
              {(videos.length > 0)
                ? videos.map((e) => (
                <div key={e.id} className="library__video">
                  <video  src={e.blob} controls></video>
                  <div className="description"></div>
                </div>
                ))
                : <div  className="library__video">
                  <p>no videos</p>  
                </div>
              }
            </div>
          </section>
        </div>

        <div className="buttons">          
          <Link to="/teleprompter" target="_blank" className="btn btn-primary">
            Read & Record
          </Link>
          {/* <button onClick={() => openTeleprompter()} className="btn btn-primary">
            Read & Record
          </button> */}
        </div>
      </main>
    </div>
  );
};

export default Content;
