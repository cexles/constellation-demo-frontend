'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import clsx from 'clsx';

import { Logout } from '@features/user/logout';
import { SwitchNetwork } from '@features/user/switchNetwork';
import { ChangeCurrency } from '@features/user/changeCurrency';
import { PushNotifications } from '@features/user/pushNotifications';
import { CopyToClipboard, Popup } from '@shared/ui';
import { networks } from '@shared/config/networks';
import { truncateAddressWithSeparator } from '@shared/lib/formatters';
import ArrowLeftIcon from '@public/icons/arrow-left.svg';
import NetworkIcon from '@public/icons/network.svg';

import styles from './Profile.module.scss';

export default function Profile() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isOpen, setOpen] = useState(false);

  return (
    <Popup
      show={isOpen}
      position="right"
      anchor={
        <div
          className={clsx(styles.anchor, isOpen && styles.anchor_open)}
          onClick={() => setOpen(!isOpen)}
        >
          {chain && (
            <Image src={networks[chain.id]?.icon || NetworkIcon} alt="Network" draggable="false" />
          )}

          <div className={styles.vertical} />

          <Image src={ArrowLeftIcon} alt="Open" draggable="false" />
        </div>
      }
      close={() => setOpen(false)}
    >
      <div className={styles.container}>
        <div className={styles.address}>
          <div>Your address</div>

          {address && (
            <div>
              <div>{truncateAddressWithSeparator(address, ' ... ')}</div>

              <CopyToClipboard toCopy={address!} />
            </div>
          )}
        </div>

        <div className={styles.horizontal} />

        <div className={styles.form}>
          <div className={styles.row}>
            <div>Network</div>

            <SwitchNetwork />
          </div>

          <div className={styles.row}>
            <div>Currency</div>

            <ChangeCurrency />
          </div>

          <div className={styles.row}>
            <div>Push notifications</div>

            <PushNotifications />
          </div>
        </div>

        <div className={styles.horizontal} />

        <div className={styles.actions}>
          <Logout />
        </div>
      </div>
    </Popup>
  );
}
