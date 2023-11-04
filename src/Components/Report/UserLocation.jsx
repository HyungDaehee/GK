import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { app } from '../../firebase.js';

const UserLocation = ({ map }) => {
  const [markers, setMarkers] = useState([]);
  const { kakao } = window;

  useEffect(() => {
    const db = getDatabase(app);
    const locationRef = ref(db, 'userLocations');

    // 데이터베이스에서 데이터를 한 번만 가져오기 위한 플래그
    let initialDataFetched = false;

    const handleDataUpdate = (snapshot) => {
      const locations = snapshot.val();
      if (locations) {
        const newMarkers = [];

        // 초기 데이터를 이미 가져온 경우, 중복으로 마커가 생성되지 않도록 방지
        if (initialDataFetched) {
          return;
        }

        for (const uid in locations) {
          const location = locations[uid];
          const { latitude, longitude, address, username } = location;

          const coords = new kakao.maps.LatLng(latitude, longitude);
          const marker = new kakao.maps.Marker({
            position: coords,
            map: map,
          });

          const content = `<div>사용자: ${username}<br>주소: ${address}</div>`;
          const infoWindow = new kakao.maps.InfoWindow({
            content,
          });

          kakao.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
          });

          newMarkers.push(marker);
        }

        // 데이터를 가져왔으므로 이제 중복 실행 방지 플래그 설정
        initialDataFetched = true;

        setMarkers(newMarkers);

        // 콘솔에 로그를 출력합니다.
        console.log('새로운 마커들:', newMarkers);
        console.log('새로운 위치 데이터:', locations);
      }
    };

    // 한 번만 데이터를 불러오기 위해 한 번만 이벤트 리스너를 등록합니다.
    onValue(locationRef, handleDataUpdate);

    // 컴포넌트가 마운트 해제될 때 이벤트 리스너를 제거합니다.
    return () => {
      off(locationRef, 'value', handleDataUpdate);
    };
  }, [map]);

  return null;
};

export default UserLocation;
