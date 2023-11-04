import { useEffect } from 'react';
import './main2.scss';

import img from '../img/icon1.png';
import img2 from '../img/icon2.png';
import img3 from '../img/icon3.png';
import img4 from '../img/icon4.png';

import video from '../video/video.mp4';

import Aos from 'aos';
import 'aos/dist/aos.css';

const data = [
    {
        id:0,
        imgSrc: img,
        name: '지체장애',
        cnt: '44.3%'
    },

    {
        id:1,
        imgSrc: img2,
        name: '청각장애',
        cnt: '16.0%'
    },

    {
        id:2,
        imgSrc: img3,
        name: '시각장애',
        cnt: "9.5%"
    },

    {
        id:3,
        imgSrc: img4,
        name: '뇌병변장애',
        cnt: '9.3%'
    }

    // {
    //     id: 0,
    //     img:  img,
    //     name: '지적장애',
    //     cnt: '8.5%'
    // },
];



const Main2 = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <section className="main2 section">
            <div className="secContainer">
                <h3 className="title">
                    2023년 장애인 비율
                </h3>

                <div className="mainContent container grid">
                    {
                        data.map((data,index) => {
                            return (
                                <div data-aos="fade-up" data-aos-duration="2000" className="singleItem" key={index}>
                                    <img src={data.imgSrc} alt="Image Name" />
                                    <h3>{data.cnt}</h3>
                                    <p>{data.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="videoCard container">
                    <div className="cardContent grid">
                        <div data-aos="fade-up" data-aos-duration="2500" className="cardText">
                            <h2>-헬렌켈러-</h2>
                            <p>
                                혼자서 할 수 있는 일은 작습니다.
                            </p>
                            <p>
                            함께 할 떄 우리는 큰 일을 할 수 있습니다.
                            </p>
                        </div>
                        <div data-aos="fade-left" data-aos-duration="2000" className="cardVideo">
                          <video src={video}autoPlay loop muted 
                          type="video/mp4"></video>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Main2