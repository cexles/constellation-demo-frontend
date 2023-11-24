import Image from 'next/image';
import Link from 'next/link';

import { ConnectWallet } from '@features/user/connectWallet';
import BackgroundImage from '@public/images/background.png';
import Logo from '@public/logo.svg';

import styles from './AuthPage.module.scss';

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <Image src={BackgroundImage} alt="Background" draggable="false" layout="fill" />

      <div className={styles.card}>
        <Image src={Logo} alt="Logo" draggable="false" />

        <ConnectWallet />

        <div className={styles.links}>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
