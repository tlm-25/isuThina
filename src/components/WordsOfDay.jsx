
import { wordDictionary,languages } from "../utils"
import { useState } from 'react'
import Modal from "./Modal"
import Authentication from "./Authentication"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { db } from "../../firebase"
export default function WordsOfDay (props) {
    const {isAuthenticated} = props
    const [showModal, setShowModal] = useState(false)
    
    //manage state of selected coffee when user clicks the coffee
    const [wordsOfDayLanguage,setWordsOfDayLanguage] = useState("ChiShona")
    //Managing state for showing coffee types - false by default - for when user clicks 'other button'
    const [showCoffeeTypes,setshowCoffeeTypes] = useState(false)
    //Manging state of cost depending on what user inputs 
    const [coffeeCost,setCoffeeCost] = useState(0)

    //managing state of hours and minutes depending on what the use selects in  the coffee form
    const [hour,setHour] = useState(0)
    const [minute,setMinute] = useState(0)

    const {globalData, setGlobalData, globalUser} = useAuth()

    async function handleSubmitForm () {
        if(!isAuthenticated) {
            setShowModal(true)
            return
        }

        //define a guard clause that only submits form if completed
        //selected coffee cannot be empty
        if(!wordsOfDayLanguage){
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
                name: wordsOfDayLanguage,
                cost: coffeeCost

            }
            //timestamp when 
            const timestamp = nowTime - timeToSubtract
            console.log(timestamp, wordsOfDayLanguage, coffeeCost)
            newGlobalData[timestamp] = newData
            //update the global state 
            setGlobalData(newGlobalData)

            //persist data in firebase datastore
            const userRef = doc(db,'users',globalUser.uid)
            const res = await setDoc(userRef, {
                [timestamp]: {
                    name: wordsOfDayLanguage,
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
    }

    function checkWordLanguage (dictionary,lang) {
        const results = dictionary.filter(word => word["Language"] == lang )
        return results
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                        <Authentication handleCloseModal ={function handleCloseModal() {
        setShowModal(false)
    }}/>
                </Modal>)}

            <div className="section-header">
                <i className="fa-solid fa-pencil" />
                <h2>
                    Words of the day
                </h2>
            </div>
            <div className="section-header">
                <i className="fa-solid fa-pencil" />
                <h4><i>Select the language for words of the day </i></h4> 
            </div>
             <div className="section-header">
                <i className="fa-solid fa-pencil" />
                <p><i>
                    
                    The words are randomly selected for each language hence they may be different in meaning.                    
                    </i>  </p>
            </div>
            
            
            
            
            
                {
                //only show coffee selection if 'other' option selected
                (
                
                <select onChange={(e)=>{
                    //set state value to whichever option was selected
                    setWordsOfDayLanguage(e.target.value)
                    

                }}id="words-of-day-list" name="words-of-day-list">
                    
                    {languages.map((language,languageIndex)=>{
                        return (

                            <option value={language} key={languageIndex}>
                                {language}
                            </option>
                        )

                    })}
                </select>)

                             

            }
            
            
            
            
            <div className="word-grid">

                {/*get the state value of the selected languages */}


                {/*select language from languages list depending on selected language */}

                

                {checkWordLanguage(wordDictionary,wordsOfDayLanguage).slice(0,6).map((word,wordIndex) => {
                    return (
                        <button className={"button-card" + (word["Language"] === wordsOfDayLanguage ? 'coffee-button-selected' : ' ')} key={wordIndex} onClick={()=>{
                            
                            //if button clicked,  set coffee selection to 
                            setWordsOfDayLanguage(word[wordsOfDayLanguage])
                            setshowCoffeeTypes(false)
                        }}>
                            <h4>{word[wordsOfDayLanguage]}</h4>
                            <p>{word["English"]}</p>

                        </button>
                    )


                })}

            </div>


        </>
    )
}