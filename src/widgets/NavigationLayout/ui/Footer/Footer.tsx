'use client';

import Image from 'next/image';
import Link from 'next/link';

import TelegramIcon from '@public/icons/telegram.svg';
import DiscrodIcon from '@public/icons/discord.svg';
import DesignIcon from '@public/icons/design.svg';

import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.links}>
          <Link href={process.env.NEXT_PUBLIC_TELEGRAM_URL || ''} target="_blank">
            <div className={styles.link}>
              <Image src={TelegramIcon} alt="Telegram" draggable="false" />
            </div>
          </Link>

          <Link href={process.env.NEXT_PUBLIC_DISCORD_URL || ''} target="_blank">
            <div className={styles.link}>
              <Image src={DiscrodIcon} alt="Discrod" draggable="false" />
            </div>
          </Link>

          <Link href={process.env.NEXT_PUBLIC_SMART_DESIGN_URL || ''} target="_blank">
            <div className={styles.link}>
              <Image src={DesignIcon} alt="Design" draggable="false" />
            </div>
          </Link>
        </div>

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
