
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const BottomSearch = () => {
    const [recording, setRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    console.log('audioUrl:', audioUrl)

    const [transcript, setTranscript] = useState('');
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const dispatch = useDispatch()

    useEffect(() => {
        // Check for browser compatibility
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error('Speech Recognition API not supported in this browser.');
            return;
        }

        // Create a new instance of SpeechRecognition
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; // set the language
        recognition.interimResults = true;
        recognition.continuous = true;

        // When results are received, update the transcript
        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                const result = event.results[i];
                if (result.isFinal) {
                    setTranscript((prev) => prev + result[0].transcript + ' ');
                } else {
                    interimTranscript += result[0].transcript;
                }
            }
            // Optionally, you can show interim transcript feedback:
            // setTranscript(prev => prev + interimTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current = recognition;
    }, []);

    // Start recording: request microphone access and initialize MediaRecorder
    const startRecording = async () => {

        if (recognitionRef.current) {
            recognitionRef.current.start();
            setListening(true);
        }

        try {
            // Request access to the microphone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Initialize MediaRecorder
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = []; // clear previous chunks

            // Event handler for when data is available
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

    // Stop recording, create a Blob, and upload it to the server
    const stopRecording = () => {
        if (!mediaRecorderRef.current) return;

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setListening(false);
        }

        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            console.log('audioBlob:', audioBlob)
            // Optionally create an object URL to preview the audio
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl(url);
            setRecording(false);

            // Prepare form data for uploading
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');

            // Replace '/upload' with your server endpoint URL
            try {
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    console.log('Audio uploaded successfully');
                } else {
                    console.error('Audio upload failed');
                }
            } catch (error) {
                console.error('Error uploading audio:', error);
            }
        };
    };


    if (audioUrl) {

        let newNote = {
            Audio: 'hello',
            text: 'Sample note text',
            image: 'image-file-url',
            user: 'username',
        };

        dispatch(setAudioUrl(newNote))

    }
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Record Audio</h2>

            {audioUrl && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Playback:</h3>
                    <audio controls src={audioUrl} className="w-full" />
                </div>
            )}
            <p>
                <strong>Transcript:</strong> {transcript}
            </p>

            <button
                onClick={recording ? stopRecording : startRecording}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ${recording ? 'bg-red-500' : ''}`}
            >
                {recording ? 'Stop Recording' : 'Start Recording'}
            </button>

        </div>
    );
};

export default BottomSearch;
