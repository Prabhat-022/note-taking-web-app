import  { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      // Request access to the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Event handler for when data is available
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // Event handler for when recording stops
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];
      };

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Stop all tracks in the stream
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {isRecording && (
        <div style={{ margin: '10px 0' }}>
          <span style={{ color: 'red', fontSize: '24px' }}>●</span> Recording...
        </div>
      )}

      {audioUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>Recorded Audio</h2>
          <audio controls src={audioUrl} />
          <br />
          <a href={audioUrl} download="recording.wav">
            Download Recording
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;