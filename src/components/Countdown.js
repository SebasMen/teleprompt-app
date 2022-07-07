import React, { useState, useEffect } from 'react'
// import { motion } from "framer-motion";
import '../styles/components/Countdown.css'

const calcTimeLeft = (time) => {
  if(!time) return 0;
  const left = time - new Date().getTime();

  if(left < 0) return 0;
  return left;
}

const Countdown = ({ time, hiddenCountdown }) => {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(time))

  const seconds = Math.floor(timeLeft / 1000) % 60;

  useEffect(() => {
    setTimeLeft(calcTimeLeft(time));

    const timer = setInterval(() => {
      const targetLeft = calcTimeLeft(time);
      setTimeLeft(targetLeft);

      const seconds = Math.floor(targetLeft / 1000) % 60;
      if(seconds < 1) {
        clearInterval(timer);
        hiddenCountdown();
      }
    });

    return () => clearInterval(timer);
  }, [hiddenCountdown, time]);

  return (
    <>
        <div className='countdown-timer'>
          <span className='numbers'>{ `${seconds}` }</span>
          {/* <motion.span 
            intial={{ scale: 0 }}
            animate={{ scale: 2 }}
            transition={{
              duration: 1,
              ease: 'easeInOut'
            }}>
              {seconds}
          </motion.span> */}
          {/* style={{width: '100vw', height: '100vh'}} */}
          {/* className='d-flex justify-content-center align-items-center' */}
        </div>
    </>
  )
}

export default Countdown