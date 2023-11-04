
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Components/Home/Home.jsx';
import Main from './Components/Main/Main.jsx';
import Service from './Components/Service/Service.jsx';
import Main2 from './Components/Main2/Main2.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Login from './Components/Login/Login.jsx';
import Singup from './Components/Login/Singup.jsx';
import KakaoCallback from './Components/Login/KakaoCallback.jsx'
import Map from './Components/Report/Map.jsx';





const App = ()=> {
  return (
    <>
    <Routes>
    <Route path='/' element={
    <>
     <Navbar/>
      <Home/>
      <Main/>
      <Service/>
      <Main2/>
      <Footer/>
      </>
    } />
      <Route path='/Login' element={<Login/>} />
      <Route path='/Signup' element={<Singup/>}/>
      <Route path='oauth/callback/kakao' element={<KakaoCallback/>} />
      <Route path='/Report' element={
     <>
     <Navbar/>
     <Map/>
     </>
      }/>
    
      </Routes> 
     
      </>
    
    
    
  );
}

export default App;


