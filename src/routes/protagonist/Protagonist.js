import React from 'react';
import styles from './Protagonist.module.scss';

const comments = [
  { id: 1, text: '첫 번째 댓글입니다.' },
  { id: 2, text: '두 번째 댓글입니다.' },
  { id: 3, text: '세 번째 댓글입니다.' }
];

function Protagonist() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <section className={styles.featuredSection}>
          <h1>오늘의 주인공은 <span className={styles.nickname}>닉네임</span>입니다!</h1>
          <img src="https://via.placeholder.com/200" alt="주인공" className={styles.featuredImage} />
          <p>주인공: noah.jo (조태현)</p>
        </section>
        <section className={styles.commentsSection}>
          <div className={styles.commentsHeader}>
            <h2>댓글 보기</h2>
            <button className={styles.commentButton}>댓글 작성</button>
          </div>
          {comments.map(comment => (
            <div key={comment.id} className={styles.comment}>{comment.text}</div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Protagonist;
