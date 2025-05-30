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
    function handleCloseModal() {
        setShowModal(false)
    }

    const {globalUser,logout} = useAuth()

    const header = (
        
        <nav >
            <div>
                <img className="isuThina-logo" src="../IsuThina_logo.png" alt="isuThina logo"></img>
                <p className="subheading"> Zim to the world and back 🌎</p>
                
                
            </div>
            
            {globalUser ? (
                
                <button onClick={logout}>
                    <p>Logout</p>

                </button>) :
            
                <button onClick={()=>{setShowModal(true)}}>
                    <p>Sign up / Login</p>
                    
                </button> }
        
        </nav>
    )

    const subHeader = (
        <div className="mission-statement">
                <p className="subheading"> Connecting Zimbabweans worldwide through culture, community and commerce</p>
            </div>
    )


    const footer = (
        <footer>
            <p><span className="text-gradient">IsuThina Ltd</span> was made by <a target="_blank" href="https://www.smoljames.com">Arnold Gorah and Takudzwa Mutsago</a> <br />using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br />Check out the project on <a target="_black" href="https://www.github.com/jamezmca/reactjs-full-course">GitHub</a>!</p>

        </footer>
    )
    return (
        <>
        {showModal && (<Modal handleCloseModal={handleCloseModal}>
            <Authentication handleCloseModal ={handleCloseModal}/>
        </Modal>)}
        {header}
        
        {subHeader}
        <main>
            {children}
        </main>
        
        {footer}
        
        </>
    )
}