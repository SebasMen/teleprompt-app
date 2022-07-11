import React, { useEffect, useState, useRef, useContext } from 'react'
import TelepromptContext from '../context/TelepromptContext';
import '../styles/components/ScriptScroll.css';

const ScriptScroll = ({start}) => {
  const {script} = useContext(TelepromptContext);

  const textRef = useRef();
	const [positionTop, setPositionTop] = useState(0);
  const [positionBottom, setPositionBottom] = useState(0);
  const [startScroll, setStartScroll] = useState(false);

  useEffect(() => {
    if(positionBottom === 0) {
      setPositionTop(textRef.current.scrollTop);
      setPositionBottom(textRef.current.scrollHeight - textRef.current.clientHeight)
      console.log(positionTop, positionBottom)
    }

    if(start) {
      if(positionTop < positionBottom) {
        startScroll(true)
      }
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
            setStartScroll(false)
          }
        }, 1000);
    } else {
        clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [positionTop, positionBottom, start])

  return (
    <>      
      <textarea className='text__scroll' ref={textRef} defaultValue={script}>        
        {/* { script } */}
      </textarea>      
    </>
  )
}

export default ScriptScroll