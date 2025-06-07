import ReactDom from 'react-dom'
import { wordDictionary,languages } from "../utils"

export default function WordPopUp (props) {
    const {children,handleCloseModal} = props
    return (
        <>
        <h2 className="sign-up-text">{ isRegistration ? 'Sign up' : 'Login'}</h2>
        <p>{ isRegistration ? 'Create your account' : 'Sign into your account'}</p>
        {error && (<p>❌ {error}</p>)}
        <button onClick={handleAuthenticate}><p>{ isAuthenticating ? 'Authenticating...': isRegistration ? 'Sign up' : 'Login'}</p></button>
        <hr />
        <div className="register-content">
            <p>{ isRegistration ? 'Already have an account?' : 'Don\'t have an account?' }</p>
            <button onClick={()=> {setIsRegistration(!isRegistration)}}><p>{ isRegistration ? 'Login' : 'Sign up'}</p></button>



        </div>
        </>
    )
}