import { useEffect, useState } from "react";

function PromotionsCarousel(props) {
    const {slides} = props

    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    let timeOut = null
    //automatically move to next slide every 5 seconds
    useEffect(()=>{
        timeOut = autoPlay && setTimeout(()=>{
            getNextImage();

        },3500)
        
        
    })
    

    function getPreviousImage(){
        //check if it is the first slide
        const isFirstImage = currentIndex === 0;
        //if first image and click the "back£ arrow, go back to last image otherwise just get previous image
        const newIndex = isFirstImage ? slides.length - 1 : currentIndex -1;
        setCurrentIndex(newIndex)
        clearTimeout(timeOut)
        
    }

    function getNextImage(){
        //check if it is the first slide
        const isLastImage = currentIndex === slides.length - 1;
        //if last image and click the "next£ arrow, go back to first image otherwise just get previous image
        const newIndex = isLastImage ? 0: currentIndex + 1;
        setCurrentIndex(newIndex)
        clearTimeout(timeOut)
        
    }

    function goToSlide(slideIndex){
        setCurrentIndex(slideIndex)
        clearTimeout(timeOut)

    }



    return (
        <div className="promotions-carousel-container">
            
            <div className="slider-styles">
                <div className="left-arrow" onClick={getPreviousImage}> &lt;</div>
                <div className="right-arrow" onClick={getNextImage}> &gt;</div>
                
                <div className="slide-styles" style={{ '--bg-url': `url(${slides[currentIndex].imageFile})` }}> </div>
                <div className="dots-container">
                    {slides.map((slide,slideIndex)=>(
                        <div key={slideIndex} className="dot-styles" onClick={()=>{goToSlide(slideIndex)}}>{currentIndex === slideIndex ?  '⚫'  :'⚪'}</div>
                    ))}

                </div>
            
            </div>
            
        </div>


    
    )

}

export default PromotionsCarousel;