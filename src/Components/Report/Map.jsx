import React, { useEffect, useState } from 'react';
import './map.scss';
import Chat from './Chat.jsx';
import { getDatabase } from 'firebase/database';
import { ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app  from '../../firebase.js';
import Serchmap from './Serchmap.jsx';
import UserLocation from './UserLocation.jsx';
import Logout from '../Login/Logout.jsx';

const Map = () => {
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState('');
  const { kakao } = window;
  const [map, setMap] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [watchId, setWatchId] = useState(null); // 추가: 위치 추적 식별자

  //지도 표시
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.655522, 127.061442),
      level: 5
    };

    const newMap = new kakao.maps.Map(container, options);
    setMap(newMap);

    return () => {
      // 컴포넌트가 언마운트될 때 위치 추적을 중지
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);
  // db 변수를 밖에서 정의
  const db = getDatabase(app);

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      const auth = getAuth(app);
      const user = auth.currentUser;
      setUserLoggedIn(!!user);

      if (user) {
        // 중지된 위치 추적 재시작
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }

        // 위치 변경을 실시간으로 추적
        const newWatchId = navigator.geolocation.watchPosition(async (position) => {
          const userLatLng = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          console.log('Latitude: ' + position.coords.latitude);
          console.log('Longitude: ' + position.coords.longitude);

          const geocoder = new kakao.maps.services.Geocoder();
          await geocoder.coord2Address(userLatLng.getLng(), userLatLng.getLat(), (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setAddress(result[0].address.address_name);
              console.log('Address: ' + result[0].address.address_name);
              saveAddress(user.uid, userLatLng, result[0].address.address_name);
            }
          });

          let marker = new kakao.maps.Marker({
            position: userLatLng
          });
          marker.setMap(map);

          map.setCenter(userLatLng);
        });

      
      } else if(!user){
        alert('사용자가 로그인하지 않았습니다.');
      }
    } else {
      alert('Geolocation은 브라우저에서 지원되지 않습니다.');
    }
  };

  const saveAddress = async (uid, userLatLng, userAddress) => {
    if (userLoggedIn) {
      const locationRef = ref(db, `userLocations/${uid}`);
      const locationData = {
        latitude: userLatLng.getLat(),
        longitude: userLatLng.getLng(),
        address: userAddress,
      };

      set(locationRef, locationData)
        .then(() => {
          console.log('위치 정보가 저장되었습니다.');
        })
        .catch((error) => {
          console.error('위치 정보 저장 중 오류 발생:', error);
        });
    }
  };

 

  const CopyClipBoard = async text => {
    try {
      await navigator.clipboard.writeText(text);
      alert('주소가 복사되었습니다.');
    } catch (error) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <>
      <div className="MapContainer">
        <div className='Search'><Serchmap map={map} />   </div>
        <button onClick={getCurrentLocation}>현재 위치 찾기</button>
        <div className="map" id="map" style={{ width: '500px', height: '400px' }}></div>
       
        <div>
          <span>Latitude: {location.latitude}</span><br />
          <span>Longitude: {location.longitude}</span><br />
          <span>Address: {address}</span><button onClick={() => CopyClipBoard(`이곳에 도움을 요청합니다 : ${address}`)}>복사하기</button>
        </div>
        {userLoggedIn && <button><Chat /></button>}
        <UserLocation map={map}/>
        <Logout/> 
      </div> 
    </>
  );
};

export default Map;
