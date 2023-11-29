'use client';

import Link from 'next/link';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.links} />

        <div className={styles.links}>
          <Link href="/terms">
            <div className={styles.link}>Terms</div>
          </Link>

          <Link href="/privacy-policy">
            <div className={styles.link}>Privacy Policy</div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
