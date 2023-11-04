import React, { useState, useEffect } from 'react';
import './service.scss';

import img from '../img/icon1.png';
import img2 from '../img/icon2.png';
import img3 from '../img/icon3.png';
import img4 from '../img/icon4.png';

import Aos from 'aos';
import 'aos/dist/aos.css';



const Service = () => {
        

    const data = [
        {
            imgSrc:  img,
            title: "정보를 얻고 싶은 사람을 위해",
            text: "장애에 대한 정보를 필요로 하는 사람들에게 한 눈에 볼 수 있는 웹"
        },

        {
            imgSrc:  img2,
            title: "장애인 인식이 개선되었으면 하는 바람",
            text: "발달장애인 같은 경우는 일상생활이 가능하여 평상시에도 많이 찾아 볼 수 있는데요 장애 증상을 알고 보는것과 모르고 보는것은 비 장애인에게 있어서 시선이 많이 다르다고 생각합니다"
        },

        {
            imgSrc:  img3,
            title: "비 장애인도 쉽게 접근 할 수 있게",
            text: "장애 시설등을 통하여 정보를 알아가는 것은 선 뜻 발길이 안 갈 수 있기에 저희 웹에서 배경지식을 먼저 쌓아보는건 어떨까요?"
        },

        {
            imgSrc:  img4,
            title: "인터넷 시대에 맞게",
            text: "온라인 시대에 맞게 종이 책자가 아닌 언제 어디서나 쉽게 접근 할 수 있는 온라인 책자"
        },
    ]

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

  return( 
    <section className="service section ">
        <div className="container">
            <div className="serviceContent">
                <div data-aos="fade-up" data-aos-duration="2000" className="secTitle">
                    <h3>Get To
                        <span className="orange"> Know</span>
                    </h3>
                    <p className="text">장애를 적극적으로 알아가다</p>
                </div>

                <div className="servicegrid  grid">
                {
                    data.map((data,index)=>{
                        return(
                            <div data-aos="fade-up" data-aos-duration="3000" className="serviceItem" key={index}>
                                <div className="serviceimg">
                                    <img src={data.imgSrc} className='img' alt=""/>
                                </div>
                                <div className="serviceTitle">
                                    <h4 className='Title'>{data.title}</h4>
                                </div>
                                <div className="serviceText">
                                    <p className="text">{data.text}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Service