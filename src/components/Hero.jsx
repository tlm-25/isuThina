

export default function Hero () {
    return (
        <>
        <div>
            <div className="welcome-div">
            <h1>Siyalamukela! | Mauya! | Welcome! </h1>
            <img className="zim-flag" src="../images/zim-flag.png"/>
            <p className="mission-statement"><i>Connecting Zimbabweans globally through culture, community and commerce</i></p>
        </div>
        {/* <div className="intro-div">
            <div className="intro-slider-wrapper">
                <div className="intro-card-list">
                    <div className="intro-card">
                        <img src="" alt="" className="intro-image" />

                    </div>

                </div>
            </div>



        </div> */}

        <div className="intro-card-grid">
            <button className="button-card">
                <h4>Grow your business 📈 </h4>
                <p> Hustling. It's in our blood! Get eyes on your business. Build your dream team for your projects back home. </p>
            </button>

            <button className="button-card">
                <h4>Join the global community for FREE 🌍 </h4>
                <p> Networking and community building</p>
            </button>

            <button className="button-card">
                <h4>Vision and Vibes 🔥 </h4>
                <p>From business coaching to festivals - gather with like-minded people at community events. Gather, grow and vibe.</p>
            </button>

            <button className="button-card">
                <h4>Taurai! Khulumani! 🗣️</h4>
                <p>FREE self-study resources to learn or brush up on ChiShona, isiNdebele, isiXhosa, or any of Zimbabwe’s 16 beautiful languages — perfect for you or your children!👩🏾‍🏫 <b>Tutors welcome too</b> — join as a tutor and pay <b>ZERO FEES</b> for your first 5 lessons!</p>
            </button>

            <button className="button-card">
                <h4>Health and wellbeing 😌</h4>
                <p>Join the conversation on mental and physical wellbeing in the Zim community </p>
            </button>

            <button className="button-card">
                <h4>Contact us 📞🌐  </h4>
                <p>Get eyes on your business, support zim-owned ventures build your team for your projects back home</p>
            </button>
        </div>
            
        </div>
        <hr />
        

        </>
    )
}