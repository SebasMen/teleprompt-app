import React, { useEffect, useState } from 'react'
import Counter from '../components/Countertime';
import Countdown from '../components/Countdown';
import ScriptScroll from '../components/ScriptScroll';
import WebCamRecorder from '../components/WebCamRecord';
import '../styles/pages/Teleprompter.css';

const Teleprompter = () => {
  const time = new Date().getTime() + 6000;
  const [showCountdown, setShowCountdown] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [startCounter, setStartCounter] = useState(false);
  const [record, setRecord] = useState(false);
  
  useEffect(() => {
    if(isRecording) {
      setShowCountdown(true);
    }
  }, [isRecording])

  const removeCountdown = () => {
    setShowCountdown(false);
    setStartCounter(!startCounter);
    setRecord(!record);
  }

  const stopRecord = () => {
    setStartCounter(!startCounter);
    setRecord(!record);
  }

  return (
    <div className='content'>        
        <div className='teleprompter'>            
            <section className='content__text'>
                <div className='text'>
                    <ScriptScroll />
                </div>
            </section>

            {showCountdown && (
              <section className='contet__countdown'>
                <Countdown 
                  time={time}                 
                  hiddenCountdown={removeCountdown} />
              </section>              
            )}

            <section className='content__video'>
                <div className='video'>
                    <div className='video__inputs'>
                        <div className='video__button'>
                          {!record
                            ? <button className='btn__options'>
                                Set camera & Mic
                              </button>
                            : <span className='recording'>
                                <div
                                  style={{marginRight: '5px'}} 
                                  className='btn-record-red'>
                                </div>
                                Recording
                              </span>
                          }                            
                        </div>

                        <div className='video__camera'>
                            <div className='camera'>
                                <WebCamRecorder start={record} />
                            </div>
                        </div>
                    </div>                    
                </div>
                
                <div className='video__options'>
                    <div className='counter'>
                        <Counter start={startCounter}/>
                    </div>
                    <div className='record'>
                        {!record
                          ? <button 
                              className='btn-record' 
                              onClick={() => setIsRecording(true)}>
                                <div className='btn-record-red'></div>
                            </button>
                          : <button 
                              className='btn-stop'
                              onClick={() => stopRecord()}>
                                <div className='btn-record-white'></div>
                            </button>
                        }
                    </div>
                    <div className='options'></div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Teleprompter