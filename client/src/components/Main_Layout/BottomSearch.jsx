import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
            formData.append('text', transcript || 'Transcript is not working' );
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
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Record Audio</h2>

            {audioUrl && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Playback:</h3>
                    <audio controls src={audioUrl} className="w-full" />
                </div>
            )}
            <div className="h-[200px] overflow-y-auto text-black">
                <strong>Transcript:</strong> {transcript }
            </div>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

            <button  type='submit'
                onClick={recording ? stopRecording : startRecording}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${recording ? 'bg-red-500' : ''}`}
            >
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>

        </div>
    );
};

export default BottomSearch;

