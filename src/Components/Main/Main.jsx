import React, { useEffect } from 'react';
import './main.scss';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import img from '../img/main1.jpg';
import img2  from '../img/main2.jpg';
import img3 from '../img/main3.jpg';
import img4  from '../img/main4.jpg';

import Aos from 'aos';
import 'aos/dist/aos.css';

const Data = [
    {
        id : 1,
        imgSrc : img,
        picTitle : '외부기관의장애'
    },
    
    {
        id : 2,
        imgSrc : img2,
        picTitle : '내부기관의장애'
    },

    {
        id : 3,
        imgSrc : img3,
        picTitle : '발달장애'
    },

    {
        id : 4,
        imgSrc : img4,
        picTitle : '정신장애'
    }
]


const Main = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className="main2 section container">
            <div className="secContainer">

                <div className="secHeader flex">
                    <div data-aos="fade-rigth" data-aos-duration="3000" className="textDiv">
                        <h2 className="secTitle">
                        Photo Frame
                        </h2>
                        <p>
                            장애를 중분류로 나누어 보았습니다. 이미지를 눌러 이동해주세요
                        </p>
                    </div>
                </div>

                <div  className="mainContent grid">
                    {
                        Data.map(({id,imgSrc,picTitle,}) => {
                            return (
                                <div  data-aos="fade-up" className="singlePicture" key={id}>
                                    <div className="PicImage" >
                                        <img src={imgSrc} alt="Image title" />
                                        <div className="overlayInfo">
                                            <h3>{picTitle}</h3>
                                            <p>알아보기</p>
                                            <FontAwesomeIcon icon={faArrowRight} className="icon" />
                                        </div>
                                    </div>
                                    <div className="picFooter">
                                        <div className="number">
                                            01
                                        </div>
                                        <div className="picText flex">
                                            <h6>
                                                {picTitle}
                                            </h6>
                                            <span className="GK">GK</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </section>
    )
}

export default Main 