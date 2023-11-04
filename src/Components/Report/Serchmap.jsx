import React, { useState } from 'react';
import './search.scss'

const SearchMap = ({ map }) => {
  const [searchedAddress, setSearchedAddress] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(searchedAddress, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 기존 지도에 마커와 InfoWindow를 추가
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        const infoWindow = new window.kakao.maps.InfoWindow({
          position: coords,
          content: `<div style="padding:5px;">${searchedAddress}</div>`,
        });

        infoWindow.open(map, marker);

        // 마커 클릭 시 InfoWindow를 열도록 설정
        window.kakao.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
        });

        // 검색 결과 주소를 중심으로 지도 이동
        map.panTo(coords);
      }
    });

    setSearchedAddress('');
  };

  return (
    <div className='box'>
      <h1 className='title'>Search</h1>
      <input className='input'
        type="text"
        placeholder="주소를 입력하세요"
        value={searchedAddress}
        onChange={(e) => setSearchedAddress(e.target.value)}
      />
      <input className='input' type='submit' value="Search" onClick={handleSearch}></input>
    </div>
  );
};

export default SearchMap;
