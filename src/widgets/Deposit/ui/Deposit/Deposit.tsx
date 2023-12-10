'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import QRCode from 'qrcode.react';

import { AccountSelector } from '@entities/account';
import { SwitchNetwork } from '@features/user/switchNetwork';
import { networks } from '@shared/config/networks';
import { CopyToClipboard, FormProgress, CoinSelector } from '@shared/ui';

import styles from './Deposit.module.scss';

export default function Deposit() {
  const searchParams = useSearchParams();
  const { chain } = useNetwork();
  const [account, setAccount] = useState(searchParams.get('address') || '');
  const [coin, setCoin] = useState('');
  const [address, setAddress] = useState('');

  const showAddress = (() => {
    return !!account && !!coin && !!chain && !!networks[chain.id];
  })();

  useEffect(() => {
    setAddress(account);
  }, [account]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <FormProgress step={1}>
          <div className={styles.account}>
            <AccountSelector value={account} onChange={setAccount} />

            <SwitchNetwork/>
          </div>
        </FormProgress>

        <FormProgress step={2} last={!showAddress}>
          <CoinSelector value={coin} onChange={setCoin} />
        </FormProgress>

        {showAddress && (
          <FormProgress step={3} last>
            <div className={styles.deposit}>
              <div className={styles.qr}>
                <QRCode value={address} size={110} includeMargin />
              </div>

              <div className={styles.wallet}>
                <div className={styles.addressContainer}>
                  <div className={styles.title}>Address</div>
                  <div className={styles.address}>{address}</div>
                </div>

                <CopyToClipboard toCopy={address} />
              </div>
            </div>
          </FormProgress>
        )}
      </div>

      <div className={styles.info}>
        Get the deposit address for crypto and deposit via the blockchain.{' '}
      </div>
    </div>
  );
}
