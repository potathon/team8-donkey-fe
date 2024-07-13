import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/Header'
import Footer from '../footer/Footer';
import styles from './Layout.module.scss';

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = ['/', '/regist'].includes(location.pathname);

  return (
    <div className={styles.container}>
      {!hideHeaderFooter && <Header />}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default Layout;