import React, { useEffect, useState, useRef } from 'react'
import '../styles/components/ScriptScroll.css';

const ScriptScroll = () => {
  const textRef = useRef();
	const [positionTop, setPositionTop] = useState(0);
  const [positionBottom, setPositionBottom] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if(positionBottom === 0) {
      setPositionTop(textRef.current.scrollTop);
      setPositionBottom(textRef.current.scrollHeight - textRef.current.clientHeight)
      console.log(positionTop, positionBottom)
    }

    if(positionTop < positionBottom) {
      setStart(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionBottom]);

  useEffect(() => {
    let interval = null;

    console.log(start)
    if(start) {
        interval = setInterval(() => {
          setPositionTop(positionTop => positionTop + Math.floor(positionBottom * 0.05));
          // textRef.current.scroll(0, positionTop);
          textRef.current.scrollTo({
            top: positionTop,
            behavior: 'smooth'
          });
          if(positionTop >= positionBottom - 3) {
            setStart(false)
          }
        }, 1000);
    } else {
        clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [positionTop, positionBottom, start])

  return (
    <>      
      <p className='text__scroll' ref={textRef}>        
        Hi, my name is [MY NAME] and I am making my first video with BIGVU. I look at the camera while reading the script scrolling up the screen. If I go Premium, my videos will no longer have the BIGVU logo. It's one click to post my video on social media. It's that simple. no longer have the BIGVU logo. It's one click to post my video on social media. It's that simple.
      </p>      
    </>
  )
}

export default ScriptScroll