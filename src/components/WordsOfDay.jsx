
import { wordDictionary,languages } from "../utils"
import { useState } from 'react'
import Modal from "./Modal"

import WordPopUp from "./WordPopUp.jsx"
import Authentication from "./Authentication"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { db } from "../../firebase"


export default function WordsOfDay (props) {
    const {isAuthenticated} = props
    const [showModal, setShowModal] = useState(false)
    const [showWordCardModal,setShowWordCardModal] = useState(false)


    const [selectedWordOfDay, setSelectedWordOfDay] = useState(null)
    
    //manage state of selected language for words of the day 
    const [targetLanguage,setTargetLanguage] = useState("ChiShona")

    // manage state of english word
    const [selectedEnglishWord, setSelectedEnglishWord] = useState(null)


    const [selectedTargetSentence, setSelectedTargetSentence] = useState(null);
    const [selectedEnglishSentence, setSelectedEnglishSentence] = useState(null);


  

    const {globalData, setGlobalData, globalUser} = useAuth()

    async function handleSubmitForm () {
        if(!isAuthenticated) {
            setShowModal(true)
            return
        }

        //define a guard clause that only submits form if completed
        //selected coffee cannot be empty
        if(!targetLanguage){
            return

        }
        try {
                    //if that is true, creeate a new data object 

       
            const newGlobalData = {
                //create a duplicate of existing gloabl data - modify and make changes before updating global state
                ...(globalData|| {})


            }

            //define key using timestamp
            const nowTime = Date.now()

            const timeToSubtract = (hour * 60 * 60 * 1000) + (minute * 60 * 1000)
            
            const newData = {
                name: targetLanguage,
                cost: coffeeCost

            }
            //timestamp when 
            const timestamp = nowTime - timeToSubtract
            console.log(timestamp, targetLanguage, coffeeCost)
            newGlobalData[timestamp] = newData
            //update the global state 
            setGlobalData(newGlobalData)

            //persist data in firebase datastore
            const userRef = doc(db,'users',globalUser.uid)
            const res = await setDoc(userRef, {
                [timestamp]: {
                    name: targetLanguage,
                    cost: coffeeCost
                }


            },{merge: true})

            //reset form
            
        }

        catch(err) {
            console.log(err.message)

        }


        
    }
    function handleCloseModal() {
        setShowModal(false)
        setShowWordCardModal(false)
    }

    function checkWordLanguage (dictionary,lang) {
        const results = dictionary.filter(word => word["Language"] == lang )
        return results
    }


    return (
        <>
         {(<Modal showModal={showWordCardModal} handleCloseModal={handleCloseModal}>
            <WordPopUp handleCloseModal ={handleCloseModal} selectedTargetWord={selectedWordOfDay} selectedEnglishWord = {selectedEnglishWord} selectedTargetSentence={selectedTargetSentence} selectedEnglishSentence={selectedEnglishSentence} />
        </Modal>)}
            
            <div className="word-of-day-container">

                <div className="section-header">
                    <i className="fa-solid fa-pencil" />
                    <h2>
                        Words of the day
                    </h2>
                </div>
                <div className="section-header">
                    <i className="fa-solid fa-pencil" />
                    <h4><i>Select a language for Words of the Day </i></h4> 
                </div>
                <div className="section-header">
                    <i className="fa-solid fa-pencil" />
                    <p><i>
                        
                        The words are randomly chosen for each language, so their meanings will likely differ.                    
                        </i>  </p>
                </div>
                
                
                
                
                
                    {   (<div className="selection-container">
                        
                        <select onChange={(e)=>{
                            //set state value to whichever option was selected
                            setTargetLanguage(e.target.value)
                            

                        }}id="words-of-day-list" name="words-of-day-list">
                            
                            {languages.map((language,languageIndex)=>{
                                return (

                                    <option value={language} key={languageIndex}>
                                        {language}
                                    </option>
                                )

                            })}
                        </select>

                    </div>)
                    


                                

                }
                
                        
                <div className="word-grid">

                    {checkWordLanguage(wordDictionary,targetLanguage).slice(0,6).map((word,wordIndex) => {
                        return (
                            <button className="button-card" key={wordIndex} onClick={()=>{
                                setShowWordCardModal(true)  
                                setSelectedWordOfDay(word[targetLanguage]) 
                                setSelectedEnglishWord(word["English"])    
                                setSelectedTargetSentence(word["TargetSentence"]) 
                                setSelectedEnglishSentence(word["EnglishSentence"])                 
                            }}>
                                <h4>{word[targetLanguage]}</h4>
                            </button>
                        )


                    })}

                </div>
            </div>


        </>
    )
}