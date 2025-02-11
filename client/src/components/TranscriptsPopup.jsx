import React from 'react'
import { IoClose } from "react-icons/io5";

const TranscriptsPopup = ({ transcripts, onClose }) => {
    return (
        <>
            {
                transcripts ? <div>
                    <h2>Transcripts</h2>
                    <p>{transcripts}</p>
                    <button onClick={onClose}><IoClose /></button>
                </div> : null
            }
        </>
    )
}

export default TranscriptsPopup
