import React, { useEffect } from 'react';
import '../Home/Home.scss'
import Aos from 'aos';
import 'aos/dist/aos.css';
const Home = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])



    return (
        <section className="home">
            <div className="secContainer contanier">
                <div className="homeText">

                    <h1 data-aos="fade-up" className="title">
                        모두가 함께 만들어 가고 알아가는 세상

                    </h1>
                    <p data-aos="fade-up" data-aos-duration="2500" className="subtitle">
                        장애인을 알고 싶어하는 당신에게
                    </p>

                    <button data-aos="fade-up" data-aos-duration="3000" className="btn">
                        <a href="#">want to find out?</a>
                    </button>
                </div>

            </div>
        </section>
    )
}

export default Home