import { IoClose } from "react-icons/io5";

const popStyle= {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.5)'
}

const TranscriptsPopup = ({ transcripts, onClose }) => {
    return (
        <>
            {
                transcripts ? <div style={popStyle}>
                    <h2>Transcripts</h2>
                    <p>{transcripts}</p>
                    <button onClick={onClose}><IoClose /></button>
                </div> : null
            }
        </>
    )
}

export default TranscriptsPopup
