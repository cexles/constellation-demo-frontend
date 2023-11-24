'use client';

import Image from 'next/image';
import { useDisconnect } from 'wagmi';

import RunnerIcon from '@public/icons/runner.svg';

import styles from './Logout.module.scss';

export default function Logout() {
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
  };

  return (
    <div className={styles.container} onClick={handleLogout}>
      <Image src={RunnerIcon} alt="Open" draggable="false" />

      <div>Log out</div>
    </div>
  );
}
