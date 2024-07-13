import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Map.module.scss';

function Map() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [markerName, setMarkerName] = useState('');
  const [isMarkerCreated, setIsMarkerCreated] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=50bdd914e2740904d16d3981b6f03fbc&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(map);

        // 사용자의 현재 위치를 가져와서 지도에 표시
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locPosition = new window.kakao.maps.LatLng(lat, lng);
            const message = '<div style="padding:5px;">현재 위치</div>';

            // 현재 위치 마커와 인포윈도우를 생성합니다
            const currentMarker = new window.kakao.maps.Marker({
              map: map,
              position: locPosition
            });

            const infowindow = new window.kakao.maps.InfoWindow({
              content: message,
              removable: true
            });
            infowindow.open(map, currentMarker);

            map.setCenter(locPosition);
          });
        } else {
          const locPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
          const message = 'Geolocation을 사용할 수 없어요..';

          const currentMarker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: message,
            removable: true
          });
          infowindow.open(map, currentMarker);

          map.setCenter(locPosition);
        }
      });
    };
  }, []);

  const handleMarkerNameSubmit = async (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      const id = Date.now(); // id를 현재 시간의 타임스탬프로 설정

      const markerData = {
        id,
        name: e.target.value,
        position: markerPosition,
      };
      try {
        const response = await axios.post('http://localhost:8080/marker', markerData, { withCredentials: true });
        if (response.status === 200) {
          alert('마커가 등록되었습니다.');
          setMarkerName('');
          setIsMarkerCreated(false);
          document.getElementById('createMarkerBtn').innerText = '마커 생성';
          if (infowindow) infowindow.close();
        }
      } catch (error) {
        console.error('마커 등록 실패:', error);
        alert('마커 등록 실패');
      }
    }
  };

  const handleCreateMarker = () => {
    if (!isMarkerCreated) {
      const markerPosition = map.getCenter(); // 지도 중심 좌표를 가져옴
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        draggable: true // 마커를 드래그 가능하도록 설정
      });
      marker.setMap(map);
      setMarker(marker);

      const infowindow = new window.kakao.maps.InfoWindow({
        content: '<input type="text" id="markerNameInput" placeholder="마커 이름을 입력하세요" style="width:150px;"/>',
        removable: true
      });
      infowindow.open(map, marker);
      setInfowindow(infowindow);

      document.getElementById('markerNameInput').addEventListener('keydown', handleMarkerNameSubmit);

      // 마커 드래그 이벤트 핸들러
      window.kakao.maps.event.addListener(marker, 'dragend', () => {
        const position = marker.getPosition();
        setMarkerPosition({ lat: position.getLat(), lng: position.getLng() });
        infowindow.setPosition(position); // 인포윈도우 위치 업데이트
        console.log(`마커가 이동한 위치: ${position.getLat()}, ${position.getLng()}`);
      });

      setIsMarkerCreated(true);
      document.getElementById('createMarkerBtn').innerText = '마커 등록';
    }
  };
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.markerButtonContainer}>
            <button id="createMarkerBtn" className={styles.markerButton} onClick={handleCreateMarker}>마커 생성</button>
        </div>
        <div id="map" className={styles.map}></div>
      </main>
    </div>
  );
}

export default Map;
