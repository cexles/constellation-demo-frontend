'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@shared/ui';
import PlusIcon from '@public/icons/plus.svg';

import styles from './NewAccountButton.module.scss';

export default function NewAccountButton({ subaccountOf }: { subaccountOf?: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(subaccountOf ? `/new-account?main=${subaccountOf}` : '/new-account');
  };

  return (
    <div className={styles.container}>
      <Button size="xs" onClick={handleClick}>
        <Image src={PlusIcon} className={styles.image} alt="Plus" draggable="false" />

        <div className={styles.text}>{subaccountOf ? 'New subaccount' : 'New account'}</div>
      </Button>
    </div>
  );
}
