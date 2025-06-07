function PromotionsCarousel(props) {
    const {images} = props
    return <div className="carousel">
            <div className="carousel-wrapper">
                {images.map((image,index)=>{

                    return(
                        <div key={index} className={"carousel-card" + (index == 2 ? " carousel-card-active" : " ")}>
                            <img src={image.imageFile} className="card-image" alt=""/>
                            <div className="card-overlay">
                                <h2 className="card-title">
                                    {image.imageTitle}

                                </h2>
                            </div>
                            
                            
                        </div>


                    ) 


                })}
                        
            </div>


    </div>

}

export default PromotionsCarousel;