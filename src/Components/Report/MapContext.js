import React, { createContext, useContext, useState } from 'react';
import Map from './Map.jsx';
import Serchmap from './Serchmap.jsx';

// Context 생성
const MapContext = createContext();

export function MapProvider({ children }) {
  // 공유할 상태와 함수를 정의
  const [map, setMap] = useState(null);

  // 다른 컴포넌트에서 사용할 값을 value에 포함
  const value = { map, setMap };

  return <MapContext.Provider value={value}>
    <Map/>
    <Serchmap/>
  </MapContext.Provider>;
}

// MapContext의 값을 반환하는 커스텀 훅
export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
}
