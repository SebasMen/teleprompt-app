import React, { useState, useEffect } from "react";
import "../styles/pages/Content.css";

const INITIAL_SCRIPT = `Hi, my name is [MY NAME] and I am making my first video with BIGVU. I look at the camera while reading the script scrolling up the screen. If I go Premium, my videos will no longer have the BIGVU logo. It's one click to post my video on social media. It's that simple.`;

const Content = () => {
  const [words, setWords] = useState(0);
  const [duration, setDuration] = useState(0);
  const [script, setScript] = useState(INITIAL_SCRIPT);
  // TODO: Estado del video actual de reproduccion
  // TODO: Estado para video agregados

  useEffect(() => {
    handleChangeText(script);
  }, []); 

  const handleChangeText = (e) => {
    if(e) {
      const text = getReadingTime(e);
      setWords(text.words)
      setDuration(text.duration);
    } else {
      const text = getReadingTime(script)
      setWords(text.words)
      setDuration(text.duration);
    }
  }

  const getReadingTime = (text) => {
    let words = 0;

    if(text.target) {
      words = text.target.value.split(' ').length;
    } else {
      words = text.split(' ').length;
    }

    let minutes = Math.floor(words / 150);
    let seconds = Math.floor(words % 150 / (150 /60))
    let duration = (!minutes && seconds < 10) 
                      ? `0${minutes}:0${seconds}`
                      : (!minutes && seconds > 10)
                      ? `0${minutes}:${seconds}`
                      : `${minutes}:${seconds}`

    return {words, duration};
  }

  return (
    <div className="content">
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
                <p className="script__words">{ words } words</p>
                <p className="script__duration">
                  duration -<span className="script__time"> 
                  { (duration && duration !== 0) ? duration : '00:00' }
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

          <section className="video">
            <div className="video__content">
              <video controls></video>
            </div>

            <div className="video__library"></div>
          </section>
        </div>

        <div className="buttons">
          <button type="button"
            onClick={() => console.log('grabar')}>
              Read & Record
          </button>
        </div>
      </main>
    </div>
  );
};

export default Content;
