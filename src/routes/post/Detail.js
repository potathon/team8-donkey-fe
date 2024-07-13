import React from 'react';
import styles from './Detail.module.scss';

const comments = [
  { id: 1, text: '첫 번째 댓글입니다.' },
  { id: 2, text: '두 번째 댓글입니다.' },
  { id: 3, text: '세 번째 댓글입니다.' }
];

const post = {
  id: 1,
  content: '나 누군데~~~~~~~ 누가 코딩 소리를 내었어..... 리나인이 랄이랄이...',
  image: 'https://via.placeholder.com/400',
  views: 123,
  likes: 5,
  comments: 10,
  author: '닉네임'
};

function Detail() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <section className={styles.postSection}>
          <div className={styles.postContent}>
            <p>{post.content}</p>
            <img src={post.image} alt="게시글 이미지" className={styles.postImage} />
            <div className={styles.postDetails}>
              <span>조회 {post.views}</span>
              <span>좋아요 {post.likes}</span>
              <span>댓글 {post.comments}</span>
            </div>
          </div>
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

export default Detail;
