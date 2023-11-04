import React, { useState} from 'react';
import '../Navbar/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHelicopterSymbol, faCircleXmark, faEllipsis} from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    const [user, setUser] = useState(null);
    const [active, setactive] = useState('navBar');
    const showNav = () => {
        setactive('navBar activeNavbar')
    }

    const removeNav = () => {
        setactive('navBar')
    }

    const [transparent, setTransparent] = useState('header');
    const addBg = () => {
        if (window.scrollY >= 10) {
            setTransparent('header activeHeader')
        } else {
            setTransparent('header')
        }
    }

    window.addEventListener('scroll', addBg);

  

    return (
        <section className="navbarSection">
            <header className={transparent}>
                <div className="logoDiv">
                    <a href="/" className="logo">
                        <h1 className="flex">   <FontAwesomeIcon icon={faHelicopterSymbol} className="icon" />GK
                            
                        </h1>

                    </a>
                    </div>

                <div className={active}>
                    <ul className="navList flex">
                        <li className="navItem">
                            <a href="/" className="navLink">Home</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">About</a>
                        </li>

                        {/* <li className="navItem">
                            <a href="#" className="navLink">community</a>
                        </li> */}

                        <li className="navItem">
                            <a href='/Report' className="navLink">Report</a>
                        </li>

                        <div className="headerBtns flex">
                            <button className='btn loginBtn'>
                                <a href='/Login'>Login</a>
                            </button>

                            <button className='btn'>
                                <a href='/Signup'>Sign Up</a>
                            </button>
                        </div>
                    </ul>
                    <div onClick={removeNav} className="closeNavbar">
                        <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                    </div>
                </div>
                <div onClick={showNav} className="toggleNavbar" >
                                <FontAwesomeIcon icon={faEllipsis} className="icon" />
                            </div>
            </header>
            
          
        </section>
    )
}

export default Navbar