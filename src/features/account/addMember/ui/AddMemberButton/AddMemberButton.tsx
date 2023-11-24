'use client';

import Link from 'next/link';
import Image from 'next/image';

import PlusIcon from '@public/icons/plus.svg';

import styles from './AddMemberButton.module.scss';

export default function AddMemberButton() {
  return (
    <Link href="/new-member">
      <div className={styles.container}>
        <Image src={PlusIcon} alt="Plus" draggable="false" />
        <div>Add member</div>
      </div>
    </Link>
  );
}
