
import { coffeeOptions } from "../utils"
import { useState } from 'react'
import Modal from "./Modal"
import Authentication from "./Authentication"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { db } from "../../firebase"
export default function CoffeeForm (props) {
    const {isAuthenticated} = props
    const [showModal, setShowModal] = useState(false)
    
    //manage state of selected coffee when user clicks the coffee
    const [selectedCoffee,setSelectedCoffee] = useState(null)
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
        if(!selectedCoffee){
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
                name: selectedCoffee,
                cost: coffeeCost

            }
            //timestamp when 
            const timestamp = nowTime - timeToSubtract
            console.log(timestamp, selectedCoffee, coffeeCost)
            newGlobalData[timestamp] = newData
            //update the global state 
            setGlobalData(newGlobalData)

            //persist data in firebase datastore
            const userRef = doc(db,'users',globalUser.uid)
            const res = await setDoc(userRef, {
                [timestamp]: {
                    name: selectedCoffee,
                    cost: coffeeCost
                }


            },{merge: true})

            //reset form
            setSelectedCoffee(null)
            setHour(0)
            setMinute(0)
            setCoffeeCost(0)

        }

        catch(err) {
            console.log(err.message)

        }


        
    }
    function handleCloseModal() {
        setShowModal(false)
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
                    Start tracking today
                </h2>

            </div>
            <h4>Select coffee type</h4>
            <div className="coffee-grid">
                {coffeeOptions.slice(0,5).map((option,optionIndex) => {
                    return (
                        <button className={"button-card" + (option.name === selectedCoffee ? 'coffee-button-selected' : ' ')} key={optionIndex} onClick={()=>{
                            
                            //if button clicked,  set coffee selection to 
                            setSelectedCoffee(option.name)
                            setshowCoffeeTypes(false)
                        }}>
                            <h4>{option.name}</h4>
                            <p>{option.caffeine}mg</p>




                        </button>
                    )


                })}
                <button className={"button-card" + (showCoffeeTypes ? 'coffee-button-selected' : ' ')} onClick={()=>{
                    //set 'showCoffeeTypess' equal to True (i.e. manage state) when 'other' button selected, otherwise do not show it
                    setshowCoffeeTypes(true)
                    //if 'other' option selected, deselect/unhighlight any options that were previously selected
                    setSelectedCoffee(null)

                }}>
                    <h4>Other</h4>
                    <p> n/a</p>
                </button>
            </div>
            {
                //only show coffee selection if 'other' option selected
                showCoffeeTypes&&(
                
                <select onChange={(e)=>{
                    //set state value to whichever option was selected
                    setSelectedCoffee(e.target.value)

                }}id="coffee-list" name="coffee-list">
                    <option value={null}>Select type</option>
                    {coffeeOptions.map((option,optionIndex)=>{
                        return (

                            <option value={option.name} key={optionIndex}>
                                {option.name} {option.caffeine}mg


                            </option>
                        )

                    })}
                </select>)

            }
                
            <h4>Add the cost (£)</h4>
            <input value={coffeeCost} onChange={(e)=>{
                //whatever cost of coffee the user inputs, set that to current state value
                setCoffeeCost(e.target.value)


            }}className="w-full" type="number" placeholder="e.g. 4.50"/>
            <h4>Time since consumption</h4>
            <div className="time-entry">
                <div>
                    <h6>Hours</h6>
                    <select onChange={(e)=>{
                        setHour(e.target.value)

                    }}id="hours-select">
                        <option value={null}>Select hour</option>
                        {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((hour,hourIndex)=>{

                            return <option key={hourIndex} value={hour}>{hour}</option>


                        })
                        
                        }
                    </select>
                    
                </div>
                <div>
                    <h6>Mins</h6>
                    <select onChange ={(e)=>{
                        setMinute(e.target.value)

                    }}id="mins-select">
                        <option value={null}>Select minute</option>
                        {[0,5,10,15,20,25,30,35,40,45,50,55].map((minute,minuteIndex)=>{

                            return <option key={minuteIndex} value={minute}>{minute}</option>


                        })
                        
                        }
                    </select>
                    
                </div>
                <button onClick={handleSubmitForm}>Add Entry</button>
                
            </div>
        </>
    )
}