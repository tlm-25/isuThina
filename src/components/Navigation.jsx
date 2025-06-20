import {useState} from 'react'
import Authentication from "./Authentication"
import Modal from "./Modal"
import { useAuth } from '../context/AuthContext'
import WordPopUp from './WordPopUp'
import { Link } from 'react-router-dom'
function Navigation(props){
        //children refers to everything inside the opening and closing tags of layout in app.jsx
        //children components rendered in between curly brackets 
        //children constant which refers to the propls - props referenced with curly brackets 
        const {children} = props
        const [showModal, setShowModal] = useState(false)
    
        //when the screen is small, managing state of displaying options
        const [showSmallScreenNavOptions, setShowSmallScreenNavOptions] = useState(false)
        
        function handleCloseModal() {
            setShowModal(false)
        }
    
        //
    
        
        function handleSmallScreenMenu(){
            //toggle showSmallScreenNavOptions - i.e. display or hide the menu depending on current state
            setShowSmallScreenNavOptions(!showSmallScreenNavOptions)
    
        }
    
        const {globalUser,logout} = useAuth()
            return (<>
                        <Modal showModal={showModal} handleCloseModal={handleCloseModal}>
                            <Authentication  handleCloseModal ={handleCloseModal}/>
                        </Modal>
                
            
                        <nav className='navbar'>

                            <div className='logo-section'>  
                                <img className="isuThina-logo" src="../images/IsuThina_logo.png" alt="isuThina logo"></img>
                                <p className="subheading"> Zim to the world and back 🌎</p>      
                            </div>
                            <a href='#' className={'hamburger-menu-button'+ (showSmallScreenNavOptions ? " clicked" : " ")} onClick={handleSmallScreenMenu}>
                                <span className="bar"></span>
                                <span className="bar"></span>
                                <span className="bar"></span>
                            </a>
                            {
                            
                            (<div className={'navbar-links'+ (showSmallScreenNavOptions ? " active" : " ")}>
                                <ul>
                                    <li><Link to="/" className="nav-link">Home</Link></li>
                                    <li><Link to="/about" className="nav-link">About ℹ</Link></li>
                                    <li><Link to="/events" className="nav-link">Events 🗓️</Link></li>
                                    <li><Link to="/business-community" className="nav-link">Business Community</Link></li>
                                    <li><Link to="/blogs-podcasts" className="nav-link">Blogs and Podcasts</Link></li>
                                    <li><Link to="/languages" className="nav-link">Language Learning</Link></li>
                                    {globalUser ? (
                                
                                    <li onClick={logout}><a href="#" className='nav=link'>Logout 👋</a></li>):(

                                
                                
                                    <li onClick={()=>{setShowModal(true)}}><a href="#" className='nav-link'>Sign Up / Sign In 👤</a></li>)}
                                    </ul>
                                

                            </div>)}


                            
                    
                    </nav>
                </>)


}

export default Navigation;