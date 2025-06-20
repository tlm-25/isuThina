import { useState } from 'react'

import WordsOfDay from '../src/components/wordsOfDay.jsx'
import Hero from '../src/components/Hero.jsx'
import Stats from '../src/components/Stats.jsx'
import History from '../src/components/History.jsx'
import  {promotionsCarouselImages} from '../src/utils/index.js'
import { useAuth } from '../src/context/AuthContext.jsx'
import PromotionsCarousel from '../src/components/PromotionsCarousel.jsx'
import Layout from '../src/components/Layout.jsx'

function Home() {
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
      <div>
        <Hero />
        <PromotionsCarousel slides={promotionsCarouselImages}/>

      
      
      <WordsOfDay isAuthenticated={isAuthenticated}/>
      {(isLoading && isAuthenticated)&&(

        <p>Loading data...</p>
      ) }
    </div>
      {/*If user is authenticated and there is data, display the authenticated content (Stats and history component) */}
      {(isAuthenticated && isData) && (authenticatedContent)}

    </Layout>
    
  )

}

export default Home;