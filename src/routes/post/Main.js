import React, { useEffect, useRef } from 'react';
import styles from './Main.module.scss';

const posts = [
  {
    id: 1,
    content: '창천이 있는 곳에 내가 있고',
    views: 123,
    likes: 5,
    comments: 10,
    image: 'https://s1.1zoom.me/prev/524/Fantastic_world_Planets_523836_600x200.jpg'
  },
  {
    id: 2,
    content: '황천의 문 열리는 곳에 그대 있으리',
    views: 123,
    likes: 5,
    comments: 10,
    image: 'https://s1.1zoom.me/prev/522/Moon_Night_Clouds_521333_600x200.jpg'
  },
  {
    id: 3,
    content: '나와라 신의 번개여!',
    views: 123,
    likes: 5,
    comments: 10,
    image: 'https://s1.1zoom.me/prev/490/489302.jpg'
  },
  {
    id: 4,
    content: '인디그네이션!!',
    views: 123,
    likes: 5,
    comments: 10,
    image: 'https://s1.1zoom.me/prev/441/440047.jpg'
  },
];

function Main() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      let currentIndex = 0;
      const scrollInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % posts.length;
        const scrollAmount = currentIndex * 600;
        scrollContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }, 3000); // 3초마다 스크롤

      return () => clearInterval(scrollInterval);
    }
  }, []);

    return (
        <div className={styles.container}>
            <button className={styles.writeButton}>글 쓰러 가기</button>
            <section className={styles.heroSection}>
                <div className={styles.heroImage}></div>
                <div className={styles.postContent} ref={scrollRef}>
                  {posts.map(post => (
                    <img key={post.id} src={post.image} alt="postImages" className={styles.heroImageItem} />
                  ))}
                </div>
            </section>
            <section className={styles.postList}>
                {posts.map(post => (
                <div key={post.id} className={styles.post}>
                    <div className={styles.postContent}>
                        <p>{post.content}</p>
                    </div>
                    <div className={styles.postDetails}>
                        <span>조회 {post.views}</span>
                        <span>좋아요 {post.likes}</span>
                        <span>댓글 {post.comments}</span>
                    </div>
                </div>
                ))}
            </section>
            <div className={styles.pagination}>
                <button disabled>&lt;</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>&gt;</button>
            </div>
        </div>
      );
    }

export default Main;
