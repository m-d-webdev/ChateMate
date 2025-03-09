import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { _onClickOutElem } from '@/utilityfunctions';


let audioChunks = [];

let scriptProcessor, analyser, microphone, audioContext, recognition;
const RecorderContainer = ({ onCLose, onWordsReayd }) => {

    const containerSercRef = useRef()
    const [volumeSpeaking, setvolumeSpeaking] = useState(0)
    const [isRecording, setRecording] = useState(false);
    const [foundWords, setWordRecoed] = useState('')
    const [isError, setError] = useState('')
    const [chunksWords, steChanksWord] = useState('')
    const btnStopRecordingBtn = useRef();


    useEffect(() => {
        if (containerSercRef.current) {
            _onClickOutElem(containerSercRef.current, () => {
                recognition?.stop();
                onCLose();
            })
        }
        if(!isRecording){
            StartRecording();
        }

        return () => {
            if (isRecording) {
                stopRecording()
                audioChunks = [];
            }
        }
    }, [])

    

    const handelDone = () => {
        onWordsReayd(foundWords)
        onCLose()
    }


    const StartRecording = async () => {
        // if (isRecording) return;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            return;
        }

        setRecording(true)

        navigator.mediaDevices.getUserMedia({ audio: true }).then(strem => {
            Setstream(strem);
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

            recognition.onresult = e => {

                let trans = Array.from(e.results)
                    .map(re => re[0])
                    .map(re => re.transcript)
                    .join("");

                steChanksWord(` -> ${trans}`)

                if (e.results[0].isFinal) {
                    setWordRecoed(cur => `${cur} ${trans}`)
                    steChanksWord("")

                }
            }

            recognition.interimResults = true

            recognition.onend = () => {
                if (btnStopRecordingBtn.current) {
                    recognition?.start();
                }
            }

            recognition.onStart = () => {
                setRecording(true)
            };
            recognition.start();

        }).catch(er => {
            setError(true)
        })


    }

    const Setstream = (e) => {

        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(e);
        scriptProcessor = audioContext.createScriptProcessor(256, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 512;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = () => {
            let dataArray = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(dataArray);

            let volume = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;

            setvolumeSpeaking(volume)

        };

        // stop all thnks 

    }

    const stopRecording = () => {

        if (recognition) { recognition.stop() }

        if (scriptProcessor) {
            scriptProcessor.disconnect();
        }
        if (analyser) {
            analyser.disconnect();
        }
        if (microphone) {
            microphone.disconnect();
        }
        if (audioContext) {
            audioContext.close()
        }
        setRecording(false);

    }


    return (
        <motion.div
            style={{
                position: "absolute",
                bottom: '1px',
                right: "0",
                zIndex: 5,
                filter: "drop-shadow(0 -5px 8px var(--filter-color))"
            }}

            ref={containerSercRef}
            className="bg-white p-2 rounded-2xl c-s-s w-96  "
            initial={{
                scale: 0,
                opacity: 0,
                transformOrigin: "bottom right"
            }}
            exit={{
                scale: 0,
                opacity: 0,
                transformOrigin: "bottom right"
            }}
            animate={{
                scale: 1,
                opacity: 1,
                transformOrigin: "bottom right"
            }}
        >
            {
                isError ?
                    <div className='wmia c-c-c h-48'>
                        <svg className='f-no w-12 h-12 stroke-red-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M3 3l18 18"></path> <path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1"></path> <path d="M5 10a7 7 0 0 0 10.846 5.85m2 -2a6.967 6.967 0 0 0 1.152 -3.85"></path> <path d="M8 21l8 0"></path> <path d="M12 17l0 4"></path> </svg>
                        <p className='text-center mt-5 opacity-8 '>
                            We can't access your microphone. Please check your permissions to start transcribing your voice.
                        </p>
                    </div>
                    :
                    <>
                        <h1 className='opacity-80'>
                            speech-to-text
                        </h1>
                        <div className="w-full h-28 mt-4 r-c-c">
                            <span className="bg-black  mr-2 rounded-3xl" style={{
                                width: "15px",
                                minHeight: "20px",
                                maxHeight: "80px",
                                transition: "height .4s",
                                height: `${volumeSpeaking * Math.random() * 1}px `

                            }}></span>
                            <span className="bg-black  mr-2 rounded-3xl" style={{
                                width: "15px",
                                minHeight: "20px",
                                maxHeight: "80px",
                                transition: "height .4s",
                                height: `${volumeSpeaking * Math.random() * 2.5}px `

                            }}></span>
                            <span className="bg-black  mr-2 rounded-3xl" style={{
                                width: "15px",
                                minHeight: "20px",
                                maxHeight: "80px",
                                transition: "height .4s",
                                height: `${volumeSpeaking * Math.random() * 5}px `

                            }}></span>
                            <span className="bg-black  mr-2 rounded-3xl" style={{
                                width: "15px",
                                minHeight: "20px",
                                maxHeight: "90px",
                                transition: "height .4s",
                                height: `${volumeSpeaking * Math.random() * 7.5}px `

                            }}>
                            </span>
                            <span className="bg-black  mr-2 rounded-3xl" style={{
                                width: "15px",
                                minHeight: "20px",
                                maxHeight: "80px",
                                transition: "height .4s",
                                height: `${volumeSpeaking * Math.random() * 5}px `

                            }}></span>
                            <span className="bg-black  mr-2 rounded-3xl " style={{
                                width: "15px",
                                minHeight: "20px",
                                maxHeight: "80px",
                                transition: "height .4s",
                                height: `${volumeSpeaking * Math.random() * 2.5}px `

                            }}></span>
                            <span className="bg-black   rounded-3xl " style={{
                                width: "15px",
                                minHeight: "20px",
                                maxHeight: "80px",
                                transition: "height .4s",
                                height: `${volumeSpeaking * Math.random() * 1}px `

                            }}></span>
                        </div>

                        <textarea onChange={e => setWordRecoed(e.target.value)} style={{ border: "none" }} className={" w-full resize-none p-2 h-36 mt-3"} placeholder={"Start speaking ..."} value={`${foundWords}${chunksWords}`}></textarea>
                        <div className="w-full mt-5 r-b-c">

                            {
                                isRecording ?
                                    <button className='bg-red-700 text-white r-s-c p-1 px-3 rounded-md' ref={btnStopRecordingBtn} type='button' onClick={stopRecording}>
                                        Stop
                                        <svg className='ml10' style={{ fill: "#fff", stroke: "#fff" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path> <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path> </svg>
                                    </button>
                                    :
                                    <button type='button' className='bg-green-400 text-white r-c-c p-1 px-3 rounded-md' onClick={StartRecording}>
                                        continu
                                        <svg xmlns="http://www.w3.org/2000/svg" className='ml10' style={{ fill: "#fff", stroke: "#fff" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M7 4v16l13 -8z"></path> </svg>
                                    </button>
                            }

                            {
                                foundWords != "" &&
                                <button onClick={handelDone} type='button' className='p-1 px-3 r-s-c bg-blue-500 text-white rounded-2xl' >
                                    Proceed
                                    <svg className='fill-white ml-2' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m700-300-57-56 84-84H120v-80h607l-83-84 57-56 179 180-180 180Z" /></svg>
                                </button>
                            }

                        </div>

                    </>
            }

        </motion.div >
    )
}

const BtnRecordAudio = ({ onWordsReayd }) => {

    const [isWantToRecord, setWantToRecord] = useState(false)




    return (
        <div className='r-s-c relative'>
            <span

                onClick={() => setWantToRecord(true)} className="p-2 relative img ml-3 bg-black c-c-c mr-2 opacity-70 hover:opacity-100">
                <svg className='stroke-white stroke-2 w-5 h-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={32} height={32} strokeWidth={1}> <path d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"></path> <path d="M5 10a7 7 0 0 0 14 0"></path> <path d="M8 21l8 0"></path> <path d="M12 17l0 4"></path> </svg>
            </span>
            <AnimatePresence>
                {
                    isWantToRecord &&
                    <RecorderContainer onWordsReayd={onWordsReayd} onCLose={() => setWantToRecord(false)} />

                }
            </AnimatePresence>
        </div>
    )
}

export default BtnRecordAudio
