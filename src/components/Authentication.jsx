import {useState} from 'react'
import { useAuth } from '../context/AuthContext'



export default function Authentication (props) {
    const {handleCloseModal,className} = props
    const [isRegistration,setIsRegistration] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const [error,setError] = useState(null)
    
    //accessing signup and login actions from authcontext 
    const {signUp, login} = useAuth()

    async function handleAuthenticate () {
        //if email empty/invalid, password empty/invalid or less than 6 characters, block it 
        if(!email || !email.includes("@") || !password ||password.length < 6 || isAuthenticating) {
            return }
        
            try{
            //isAuthenticating is set to try while we are authenticating 
            setIsAuthenticating(true)
            setError(null)
            if(isRegistration) {
                //register user
                console.log("registering user")
                await signUp(email,password)


            }
            else{
                //login user
                await login(email,password)

            }
            handleCloseModal()

        }

        catch (err){
            console.log(err.message)
            setError(err.message)


        }

        finally{
            setIsAuthenticating(false)
        }

        

    }
    return (
        <>
        
            <div className='top-of-popup'> <h2 className="popup-title-text">{ isRegistration ? 'Sign up' : 'Login'} </h2><h3><button onClick={handleCloseModal}>&times;</button></h3></div>
                <p>{ isRegistration ? 'Create your account' : 'Sign into your account'}</p>
                {error && (<p>❌ {(error.includes("invalid-credential") ? "Incorrect username or password. Try again":"failed to login")}</p>)}
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" />
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="******" type="password" />
                <button onClick={handleAuthenticate}><p>{ isAuthenticating ? 'Authenticating...': isRegistration ? 'Sign up' : 'Login'}</p></button>
                <hr />
            <div className="register-content">
                <p>{ isRegistration ? 'Already have an account?' : 'Don\'t have an account?' }</p>
                <button onClick={()=> {setIsRegistration(!isRegistration)}}><p>{ isRegistration ? 'Login' : 'Sign up'}</p></button>

            </div>       
        </>
    )
}