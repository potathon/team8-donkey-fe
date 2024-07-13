import React, { useEffect } from 'react';
import styles from './Map.module.scss';

function Map() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 마커 생성 버튼 클릭 이벤트 핸들러
        document.getElementById('createMarkerBtn').addEventListener('click', () => {
          const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.9780);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
          marker.setMap(map);
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
