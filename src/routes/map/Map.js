import React, { useEffect } from 'react';
import styles from './Map.module.scss';

function Map() {
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

        // 사용자의 현재 위치를 가져와서 지도에 표시
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locPosition = new window.kakao.maps.LatLng(lat, lng);
            const message = '<div style="padding:5px;">현재 위치</div>';

            // 마커와 인포윈도우를 생성합니다
            displayMarker(locPosition, message, map);
          });
        } else {
          const locPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
          const message = 'Geolocation을 사용할 수 없어요..';
          displayMarker(locPosition, message, map);
        }

        // 마커를 생성하고 지도에 표시하는 함수
        function displayMarker(locPosition, message, map) {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: locPosition
          });

          const iwContent = message;
          const iwRemoveable = true;

          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
          });

          infowindow.open(map, marker);
          map.setCenter(locPosition);
        }
        // 마커 생성 버튼 클릭 이벤트 핸들러
        document.getElementById('createMarkerBtn').addEventListener('click', () => {
          const markerPosition = map.getCenter(); // 지도 중심 좌표를 가져옴
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            draggable: true // 마커를 드래그 가능하도록 설정
          });
          marker.setMap(map);

          // 마커 드래그 이벤트 핸들러
          window.kakao.maps.event.addListener(marker, 'dragend', () => {
            const position = marker.getPosition();
            console.log(`마커가 이동한 위치: ${position.getLat()}, ${position.getLng()}`);
          });
        });
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <div className={styles.markerButtonContainer}>
            <button id="createMarkerBtn" className={styles.markerButton}>마커 생성</button>
        </div>
        <div id="map" className={styles.map}></div>
      </main>
    </div>
  );
}

export default Map;
