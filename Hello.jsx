
import { AudioRecorder } from 'react-audio-voice-recorder';

const Hello = () => {
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        document.body.appendChild(audio);
    };
    
    return (
        <>
        <div className="">
            this is hello
        </div>
            <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }}
                downloadOnSavePress={true}
                downloadFileExtension="webm"
            />

        </>
    )
}

export default Hello
