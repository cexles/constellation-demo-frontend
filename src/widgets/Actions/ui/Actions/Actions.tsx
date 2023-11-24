'use client';

import Link from 'next/link';
import Image from 'next/image';

import { actions } from '@widgets/Actions/config/actions';
import { Scope } from '@shared/ui';
import ArrowLeftIcon from '@public/icons/arrow-left.svg';

import styles from './Actions.module.scss';

export default function Actions() {
  return (
    <Scope
      title="Actions"
      actions={
        <Link href="/all-actions">
          <div className={styles.all}>
            <div>All actions</div>

            <Image src={ArrowLeftIcon} alt="All actions" draggable="false" />
          </div>
        </Link>
      }
    >
      <div className={styles.container}>
        {actions.map((action) => (
          <Link key={action.label} href={action.href}>
            <div className={styles.card}>
              <div className={styles.image}>
                <Image src={action.icon} alt={action.label} draggable="false" />
              </div>

              <div className={styles.title}>{action.label}</div>

              <Image
                src={ArrowLeftIcon}
                className={styles.arrow}
                alt="Go to page"
                draggable="false"
              />
            </div>
          </Link>
        ))}
      </div>
    </Scope>
  );
}
