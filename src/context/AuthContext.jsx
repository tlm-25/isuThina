import {createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth, db} from '../../firebase'
import {useState, useEffect, useContext, createContext} from 'react'
import { doc, getDoc } from 'firebase/firestore'

//initialise context - create context object - allow to share data globally across components without passing props manually
const AuthContext = createContext()

//create custom react hook from which we can destructure any of these values
//returns context's value - don't need to import useContext and AuthContext everywhere  
export function useAuth() {
    return useContext(AuthContext)
}


//warppe component to place at top level of react app (in index.js or App.js) - holds state of logged in user
export function AuthProvider (props){
    //destructure chidren from the props - wrapper for everythin in app, supplies auth state
    const {children} = props

    //state for user 
    const [globalUser, setGlobalUser] = useState(null)
    //if user is not authenticated we do not have a global state
    const [globalData, setGlobalData] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    

    //create new user in firebase auth with email and password
    function signUp(email,password) {

        return createUserWithEmailAndPassword(auth,email,password)


    }
    //login to app
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)

    }


    function resetPassword(email) {
        return sendPasswordResetEmail(auth,email)
    }



    //logout of app
    function logout(email,password){
    //clear all states if logged out 
    setGlobalUser(null)
    setGlobalData(null)
    return signOut(auth)

    }

    
    


    //anything contained here becomes part of the gloabl state - accessible anywhere in application
    //anything in here is shared vis context
    const value = {globalUser, globalData, setGlobalData, isLoading, signUp,login,logout}
    //takes two arguments - first is a callback function (function that runs when the event we are looking or is triggered)
    //second is a dependency array that contains (or doesn't contain) when this logic gets run
    //we leave dependency array empty, want this logic to run when the page loads for the first time
    useEffect(()=>{
        //define event listener that attaches to application- listens for authentication events 
        
        //cleanup - ensures there are no data leakages  - if we close app, clean it up
        //listens to when user signs in/out
        //the function runs every time authentication state changes (log in or out)
        const unsubscribe = onAuthStateChanged(auth, async (user) =>{ 
            //if there is no user, empty the user state and return from this listener - exit this function
            console.log("Current user: ", user)
            //update global state to whatever the firebase authentication handler receives
            setGlobalUser(user)
            if(!user) {

                console.log('no active user')
                
                return
            }

            //if there is a user (ie. uid valid), then check if user has data in database, then fetch the relevant data and update global state 

            try {
                //set the isLoading state to true - loading data
                setIsLoading(true)

                //firstly, create a reference for the document (labelled JSON object) and then get the doc, and snapshot to see if anything is there 
                //check if user id exists, then check if there is any data for corresponding user 
                const docRef = doc(db, 'users',user.uid)
                const docSnap = await  getDoc(docRef)

                let firebaseData = {}
                if(docSnap.exists()){
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                    console.log('Found user data',firebaseData)
                }

                setGlobalData(firebaseData)

            } catch (err) {
                console.log(err.message)

            } finally {
                //set back to false 
                setIsLoading(false)

            }



        })
        
        

        
        return unsubscribe 
    },[])
    
    return (
        //provide value to all components in provider - available to all children
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
        

    )
}