import ReactDom from 'react-dom'
import { wordDictionary,languages } from "../utils"
import { useState } from 'react';
export default function WordPopUp (props) {
    const {children,handleCloseModal, selectedTargetWord,selectedEnglishWord, selectedTargetSentence, selectedEnglishSentence} = props
    return (
        <>
        <div className='top-of-popup'> <h2 className="popup-title-text">{selectedTargetWord} </h2><h3><button onClick={handleCloseModal}>&times;</button></h3></div>
        <h3><i>Translation: {selectedEnglishWord}</i></h3>
        <hr />
        <div className="register-content">
            <h4>{selectedTargetSentence}</h4>
            <p>{selectedEnglishSentence}</p>
        </div>
        </>
    )
}