import React from 'react';
import styles from './InterestModal.module.scss';

const categories = [
  '커머스', '소셜네트워크', '여행', '음식', '뷰티',
  '패션', '엔터테인먼트', '게임', '의료/건강', '금융/부동산',
  '정보', '종교', 'IT', '판매', '교육', '문화/예술',
  '디자인', '기타'
];

function InterestModal({ onClose, selectedCategories, onSelectCategory, onCompleteSelection }) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.modal}>
        <p className={styles.subtitle}>1~2개까지 꼭 골라주세요!</p>
        <h2 className={styles.title}>어떤 분야에 관심있으세요?</h2>
        <p className={styles.description}>관심 분야에 맞는 좋은 프로젝트 추천해드릴게요!</p>
        <div className={styles.grid}>
          {categories.map(category => (
            <button 
              key={category} 
              className={`${styles.button} ${selectedCategories.includes(category) ? styles.selected : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className={styles.completeButton} onClick={onCompleteSelection}>선택 완료!</button>
      </div>
    </>
  );
}

export default InterestModal;
