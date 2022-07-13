import React, { useEffect, useState, useRef, useContext } from 'react'
import TelepromptContext from '../context/TelepromptContext';
import '../styles/components/ScriptScroll.css';

const ScriptScroll = ({start}) => {
  const {script} = useContext(TelepromptContext);

  const textRef = useRef();
	const [positionTop, setPositionTop] = useState(0);
  const [positionBottom, setPositionBottom] = useState(0);
  const [startScroll, setStartScroll] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    if(positionBottom === 0) {
      setPositionTop(textRef.current.scrollTop);
      setPositionBottom(textRef.current.scrollHeight - textRef.current.clientHeight)
    }

    if(start) {
      if(positionTop < positionBottom) {
        setStartScroll(true)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionBottom, start]);

  useEffect(() => {
    let interval = null;

    // Velocidades de scroll
    // rapido: scroll: 0.0015, intervalo: 40
    // medio: scroll: 0.0015, intervalo: 60

    // console.log(startScroll)
    if(startScroll) {
        console.log(positionTop, positionBottom)
        console.log(scrollPercentage)

        interval = setInterval(() => {
          setScrollPercentage(((positionTop / positionBottom)*100).toFixed(0))
          setPositionTop(positionTop => positionTop + Math.floor(positionBottom * 0.0015));
          textRef.current.scroll(0, positionTop);
          if(scrollPercentage > 99) {
            setStartScroll(false)
          }
        }, 60);
    } else {
        clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [positionTop, positionBottom, startScroll, scrollPercentage])

  return (
    <>      
      <textarea className='text__scroll' ref={textRef} readOnly="readonly" defaultValue={script}>        
        {/* { script } */}
      </textarea>      
    </>
  )
}

export default ScriptScroll