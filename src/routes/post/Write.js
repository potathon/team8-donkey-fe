import React, { useState } from 'react'
import axios from 'axios';
import styles from './Write.module.scss';

function Write () {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const id = Date.now(); // id를 현재 시간의 타임스탬프로 설정
        const newPost = {
        id,
        title,
        content,
        image: image ? URL.createObjectURL(image) : null,
        };

        try {
        // 서버로 게시글 데이터 전송
        const formData = new FormData();
        formData.append('id', newPost.id);
        formData.append('title', newPost.title);
        formData.append('content', newPost.content);
        formData.append('image', image);

        const response = await axios.post('http://localhost:8080/posts', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            setMessage('게시글이 작성되었습니다.');
        }
        } catch (error) {
        console.error('게시글 작성 실패:', error);
        setMessage('게시글 작성 실패: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <h1>게시글 작성</h1>
            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            <button type="submit">작성하기</button>
            {message && <p className={styles.message}>{message}</p>}
        </form>
        </div>
    );
}

export default Write