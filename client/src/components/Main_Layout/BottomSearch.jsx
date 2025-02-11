import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaRegFileImage } from "react-icons/fa6";
import TranscriptsPopup from '../TranscriptsPopup';

const BottomSearch = () => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    // const [interimTranscript, setInterimTranscript] = useState('');
    const [image, setImage] = useState('');
    console.log('image:', image)

    const recognitionRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const user = JSON.parse(localStorage.getItem("user"))
    const loginuser = useSelector((state) => state.user.user)

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error('Speech Recognition API not supported in this browser.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        var finalTranscripts = "";

        recognition.onresult = (event) => {
            let interimTranscripts = ""
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");

                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;
                } else {
                    interimTranscripts += transcript;
                    console.log(interimTranscripts);
                }
            }
            setTranscript(finalTranscripts + interimTranscripts);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current = recognition;
    }, []);

    const startRecording = async () => {

        if (recognitionRef.current) {
            recognitionRef.current.start();
            setListening(true);
        }

        try {

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.start();
            setRecording(true);

        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = async () => {
        if (!mediaRecorderRef.current) return;

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setListening(false);
        }

        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });

            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            setRecording(false);

            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');
            formData.append('text', transcript || 'Transcript is not working');
            formData.append('image', image);
            formData.append('user', loginuser?._id || user?._id);

            for (const pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            try {

                const response = await axios.post('http://localhost:3000/api/v1/note/create', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });


                if (response.status === 200) {
                    console.log('Audio uploaded successfully');

                } else {
                    console.error('Audio upload failed');
                }
            } catch (error) {
                console.error('Error uploading audio:', error);
            }
        };
    };

    return (
        <>
            <TranscriptsPopup transcripts={transcript} onClose={() => setTranscript('')} />

            <div className="bg-gray-100 p-4 rounded-3xl shadow-md w-full flex items-center justify-between">


                {/* <div className="h-[20px] overflow-x-auto text-black">
                    <strong>Transcript:</strong> {transcript}
                </div> */}
                <div className="w-[70%]">
                    {audioUrl && (
                        <div className="mt-2">
                            <audio controls src={audioUrl} className="w-full rounded-full" />
                        </div>
                    )}
                </div>
                <div className="flex justify-end items-center mx-4">

                    <div className='flex items-center cursor-pointer' onClick={() => document.getElementById('imageInput').click()}>
                        <input type="file" id='imageInput' onChange={(e) => setImage(e.target.files[0])} className='hidden' />
                        <FaRegFileImage className='cursor-pointer w-8 h-8 mx-2' />
                    </div>



                    <button type='submit'
                        onClick={recording ? stopRecording : startRecording}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center ${recording ? 'bg-red-500' : ''}`}
                    >
                        {
                            recording ? <div className='bg-red-600 rounded-full w-3 h-3'></div> : ""
                        }
                        {recording ? 'Stop Recording' : 'Start Recording'}

                    </button>
                </div>


            </div>
        </>

    );
};

export default BottomSearch;

