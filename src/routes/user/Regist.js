import React, { useState } from 'react';
import axios from 'axios';
import InterestModal from '../../components/modal/InterestModal';
import { useModal } from '../../components/modal/useModal';
import styles from './Regist.module.scss';

function Regist() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const {
    isModalOpen,
    selectedCategories,
    isSelectedButtonActive,
    handleSelectClick,
    handleCloseModal,
    handleSelectCategory,
    handleCompleteSelection,
  } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 비밀번호 변경 요청
      const passwordResponse = await axios.post('http://localhost:8080', {
        newPassword,
      }, { withCredentials: true });

      if (passwordResponse.status === 200) {
        setMessage('비밀번호가 변경되었습니다.');
      }

      // 해시태그 업데이트 요청
      const hashtagResponse = await axios.post('http://localhost:8080', {
        hashtags: selectedCategories,
      }, { withCredentials: true });

      if (hashtagResponse.status === 200) {
        setMessage((prev) => `${prev} 해시태그가 업데이트되었습니다.`);
        handleCompleteSelection();
      }
    } catch (error) {
      setMessage('업데이트 실패: ' + (error.response?.data?.message || error.message));
    }
  };
    return (
    <div className={styles.container}>
      <div>
        <span>logo</span>
      </div>
      <h1 className={styles.title}>정보 등록</h1>
      <form onSubmit={handleSubmit}>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label>비밀번호</label>
          <input
            id='password'
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>관심있는 해시태그</label>
          <input 
            id="hashtag" 
            type="text" 
            value={selectedCategories.join(', ')} 
            onClick={handleSelectClick}
            readOnly 
          />
        </div>
      </div>
      <button 
        type="submit" 
        className={isSelectedButtonActive ? styles.activeButton : styles.button}
      >설정 완료</button>
      {message && <p className={styles.message}>{message}</p>}
      </form>
      {isModalOpen && (
        <InterestModal
          onClose={handleCloseModal}
          selectedCategories={selectedCategories}
          onSelectCategory={handleSelectCategory}
          onCompleteSelection={handleCompleteSelection}
        />
      )}
    </div>
  );
}

export default Regist;
