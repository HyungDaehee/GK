import './footer.scss';
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHelicopterSymbol } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

import Aos from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className="footer">
            <div className="secContainer container grid">
                <div data-aos="fade-up" data-aos-duration="2000" className="logDiv">

                    <div data-aos="fade-up" data-aos-duration="2000" className="footerLogo">
                        <a href="#" className="logo flex">
                            <h1 className="flex"><FontAwesomeIcon icon={faHelicopterSymbol} className="icon" />GK</h1>
                        </a>

                    </div>

                    <div data-aos="fade-up" data-aos-duration="3000" className="socials flex">
                        <FontAwesomeIcon icon={faFacebook} className="icon" />
                        <FontAwesomeIcon icon={faInstagram} className="icon" />
                        <FontAwesomeIcon icon={faTwitter} className="icon" />
                    </div>

                </div>

                <div  data-aos="fade-up" data-aos-duration="3000" className="footerLinks">
                    <span className="linkTitle">
                        Information
                    </span>
                    <li>
                        <a href="#">Home</a>
                    </li>

                    <li>
                        <a href="#">About</a>
                    </li>

                    <li>
                        <a href="#">community</a>
                    </li>

                    <li>
                        <a href="#">search</a>
                    </li>
                </div>

                <div data-aos="fade-up" data-aos-duration="4000" className="footerLinks">
                    <span className="linkTitle">
                        Helpful Links
                    </span>
                    <li>
                        <a href="#">Pixels</a>
                    </li>

                    <li>
                        <a href="#">Unplash</a>
                    </li>

                    <li>
                        <a href="#">사회복지포털</a>
                    </li>

                    <li>
                        <a href="#">사회복지</a>
                    </li>
                </div>

                <div data-aos="fade-up" data-aos-duration="5000" className="footerLinks">
                    <span className="linkTitle">
                        Contact
                    </span>
                    <span className="phone">+132 456 798</span>
                    <span className="email">h9564289@naver.com</span>
                </div>

            </div>
        </div>
    )
}


export default Footer