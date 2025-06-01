import {useState} from 'react'
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from '../context/AuthContext'
export default function Layout (props) {
    //children refers to everything inside the opening and closing tags of layout in app.jsx
    //children components rendered in between curly brackets 
    //children constant which refers to the propls - props referenced with curly brackets 
    const {children} = props
    const [showModal, setShowModal] = useState(false)
    //when the screen is small, managing state of displaying options
    const [showSmallScreenNavOptions, setShowSmallScreenNavOptions] = useState(false)
    function handleCloseModal() {
        setShowModal(true)
    }

    //

    function handleSmallScreenMenu(){
        //toggle showSmallScreenNavOptions - i.e. display or hide the menu depending on current state
        setShowSmallScreenNavOptions(!showSmallScreenNavOptions)

    }

    const {globalUser,logout} = useAuth()

    const header = (
        
        <nav className='navbar'>
                <div className='logo-section'>  
                    <img className="isuThina-logo" src="../IsuThina_logo.png" alt="isuThina logo"></img>
                    <p className="subheading"> Zim to the world and back 🌎</p>      
                </div>
                <a href='#' className='toggle-button' onClick={handleSmallScreenMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                {(<div className={'navbar-links'+ (showSmallScreenNavOptions ? " active" : " ")}>
                    <ul>
                        <li><a href='#'>Home</a></li>
                        <li><a href='#'>About</a></li>
                        <li><a href='#'>Business Community 🤝🏾 📈</a></li>
                        <li><a href='#'>Blogs and Podcasts 🎙️📝 </a></li>
                        <li><a href='#'>Language Learning 💬 📘 🗣️</a></li>
                        {globalUser ? (
                    
                        <li onClick={logout}><a href="#">Logout</a></li>):(

                    
                    
                        <li onClick={()=>{setShowModal(true)}}><a href="#" >Sign Up / Sign In</a></li>)}
                        </ul>
                    

                </div>)}


                
        
        </nav>
    )



    const footer = (
        <footer>
            <p><span className="text-gradient">IsuThina Ltd Arnold Gorah and Takudzwa Mutsago FantaCSS design library.</span></p>

        </footer>
    )
    return (
        <>
        {showModal && (<Modal handleCloseModal={handleCloseModal}>
            <Authentication handleCloseModal ={handleCloseModal}/>
        </Modal>)}
        {header}

        

        <main>
            {children}
        </main>
        
        {footer}
        
        </>
    )
}