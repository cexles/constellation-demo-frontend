'use client';

import Header from '@widgets/NavigationLayout/ui/Header/Header';
import Navigation from '@widgets/NavigationLayout/ui/Navigation/Navigation';
import Footer from '@widgets/NavigationLayout/ui/Footer/Footer';

import styles from './NavigationLayout.module.scss';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Navigation />

      <div className={styles.mainScope}>
        <main className={styles.main}>
          <div className={styles.wrapper}>{children}</div>
        </main>

        <Footer />
      </div>
    </>
  );
}
