import BusinessCommunity from "../pages/BusinessCommunity.jsx"
import Home from "../pages/Home.jsx"
import Events from "../pages/Events.jsx"
import About from "../pages/About.jsx"
import BlogsPodcasts from "../pages/BlogsPodcasts.jsx"

import { Route, Routes } from "react-router-dom"
import LanguageLearning from "../pages/LanguageLearning.jsx"

function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/business-community" element={<BusinessCommunity />}/>
      <Route path="/events" element={<Events />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/blogs-podcasts" element={<BlogsPodcasts />}/>
      <Route path="/languages" element={<LanguageLearning />}/>
    </Routes>


  )
  
}

export default App
