import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>photo</div>
      <nav className={styles.nav}>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Community</a>
        <a href="#">Support</a>
      </nav>
    </header>
  );
}

export default Header;
