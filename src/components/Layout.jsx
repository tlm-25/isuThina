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
        
        <header>
            <div>
                <h1 className="text-gradient">CAFFIEND</h1>
                <p> For Coffee Insatiates</p>
            </div>
            {globalUser ? (
                
                <button onClick={logout}>
                    <p>Logout</p>
                    <i className="fa-solid fa-mug-hot"></i>

                </button>) :
            
                <button onClick={()=>{setShowModal(true)}}>
                    <p>Sign up free</p>
                    <i className="fa-solid fa-mug-hot"></i>

                </button> }
        
        </header>
    )

    const footer = (
        <footer>
            <p><span className="text-gradient">Caffiend</span> was made by <a target="_blank" href="https://www.smoljames.com">Smoljames</a> <br />using the <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a> design library.<br />Check out the project on <a target="_black" href="https://www.github.com/jamezmca/reactjs-full-course">GitHub</a>!</p>

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