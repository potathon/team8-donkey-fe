import React, { useState } from 'react';
import styles from './Poke.module.scss';

const rankings = [
  {
    id: 1,
    name: 'James',
    message: 'Thank you! That was very helpful',
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 2,
    name: 'Will Kenny',
    message: 'I know... I\'m trying to get the funds.',
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 3,
    name: 'Beth Williams',
    message: 'I\'m looking for tips around capturing the milky way.',
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 4,
    name: 'Rev Shawn',
    message: 'Wanted to ask if you\'re available for a portrait shoot next week.',
    image: 'https://via.placeholder.com/100'
  }
];

function Poke() {
    const [sentPoke, setSentPoke] = useState({});

    const handleSendPoke = (id) => {
      setSentPoke(prevState => ({ ...prevState, [id]: true }));
    };

    return (
        <div className={styles.container}>
        <main className={styles.mainContent}>
            <section className={styles.rankingList}>
            {rankings.map(rank => (
                <div key={rank.id} className={styles.rankingItem}>
                <img src={rank.image} alt={rank.name} className={styles.rankingImage} />
                <div className={styles.rankingDetails}>
                    <h3 className={styles.rankingName}>{rank.name}</h3>
                    <p className={styles.rankingMessage}>{rank.message}</p>
                </div>
                <button 
                    className={styles.followButton}
                    onClick={() => handleSendPoke(rank.id)}
                    disabled={sentPoke[rank.id]}
                >
                    {sentPoke[rank.id] ? '콕 찔렸습니다!' : '콕 찌르기'}
                </button>
                </div>
            ))}
            </section>
        </main>
        </div>
    );
}

export default Poke;
