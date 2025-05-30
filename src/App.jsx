import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout.jsx'
import WordsOfDay from './components/WordsOfDay.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import History from './components/History.jsx'
import { useAuth } from './context/AuthContext.jsx'
function App() {
  //check if user authenticated 
  const {globalUser, isLoading, globalData } = useAuth()

  //if there is a global user, we are authenticated and if no global userm not authenticated
  const isAuthenticated = globalUser
  //checking if data exists and there are entries (forcing Object.keys to global boolean)
  const isData = globalData && !!Object.keys(globalData || {}).length 
  

  //information specific to users that have signed up to page and logged in 
  const authenticatedContent = (
    <>
    <Stats />
    <History />
    

    </>


  )
    
  return (

    <Layout>
      <Hero />
      <WordsOfDay isAuthenticated={isAuthenticated}/>
      {(isLoading && isAuthenticated)&&(

        <p>Loading data...</p>
      ) }
      {/*If user is authenticated and there is data, display the authenticated content (Stats and history component) */}
      {(isAuthenticated && isData) && (authenticatedContent)}

    </Layout>
    
  )
}

export default App
