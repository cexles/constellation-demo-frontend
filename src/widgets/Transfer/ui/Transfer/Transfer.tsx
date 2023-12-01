'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { SwitchNetwork } from '@features/user/switchNetwork';
import { AccountSelector } from '@entities/account';
import {
  Button,
  Checkbox,
  CoinSelector,
  InfoCard,
  NetworkSelector,
  RadioButton,
  TextInput,
} from '@shared/ui';
import { useCollapse } from '@shared/lib/useCollapse';
import SwapIcon from '@public/icons/swap.svg';
import ArrowLeftIcon from '@public/icons/arrow-left.svg';
import CycleIcon from '@public/icons/cycle.svg';

import styles from './Transfer.module.scss';

export default function Transfer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [variant, setVariant] = useState('account');
  const [fromAccount, setFromAccount] = useState(searchParams.get('address') || '');
  const [fromCoin, setFromCoin] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [toCoin, setToCoin] = useState('');
  const [toNetwork, setToNetwork] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [toBank, setToBank] = useState('');
  const [amount, setAmount] = useState(0);
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [quotesRefetchInterval, setQuotesRefetchInterval] = useState(60);
  const { collapseRef, collapseHeight, collapse } = useCollapse();

  const setMaxAmount = () => {
    setAmount(1000);
  };

  useEffect(() => {
    if (quotesRefetchInterval > 0) {
      setTimeout(() => setQuotesRefetchInterval(quotesRefetchInterval - 1), 1000);
    } else {
      setQuotesRefetchInterval(60);
    }
  }, [quotesRefetchInterval]);

  return (
    <div className={styles.container}>
      <div className={styles.scope}>
        <div className={styles.scopeTitle}>From</div>

        <AccountSelector
          placeholder="Select account"
          value={fromAccount}
          onChange={setFromAccount}
        />

        <div className={styles.coin}>
          <CoinSelector value={fromCoin} onChange={setFromCoin} />

          <SwitchNetwork />
        </div>

        <Image src={SwapIcon} className={styles.trade} alt="Transfer" draggable="false" />

        <div className={styles.scopeTitle}>To</div>

        <div className={styles.variant}>
          <RadioButton
            value={variant}
            options={{ account: 'Account', wallet: 'Wallet', bank: 'ID Bank Account' }}
            onChange={setVariant}
          />
        </div>

        {variant === 'account' && (
          <>
            <AccountSelector
              placeholder="Select account"
              value={toAccount}
              onChange={setToAccount}
            />

            <div className={styles.coin}>
              <CoinSelector value={toCoin} onChange={setToCoin} />

              <NetworkSelector variant="extended" value={toNetwork} onChange={setToNetwork} />
            </div>
          </>
        )}

        {variant === 'wallet' && (
          <TextInput placeholder="Address" value={toAddress} onChange={setToAddress} />
        )}

        {variant === 'bank' && (
          <TextInput placeholder="Bank account" value={toBank} onChange={setToBank} />
        )}
      </div>

      <div className={styles.separator} />

      <div className={styles.scope}>
        <TextInput
          placeholder="Amount"
          value={amount}
          size="l"
          type="number"
          element={
            <div className={styles.max} onClick={setMaxAmount}>
              max
            </div>
          }
          onChange={(newValue: string) => setAmount(parseFloat(newValue))}
        />

        <div className={styles.quotes}>
          <Image src={CycleIcon} alt="Cycle" draggable="false" />

          <div>
            New quotes in{' '}
            <span>{`${Math.floor(quotesRefetchInterval / 60)}:${
              quotesRefetchInterval - Math.floor(quotesRefetchInterval / 60) * 60
            }`}</span>
          </div>
        </div>

        <div className={styles.commission}>
          <div
            className={clsx(styles.commissionTitle, collapseHeight && styles.commissionTitle_open)}
            onClick={collapse}
          >
            <div>Commission</div>
            <Image src={ArrowLeftIcon} alt="Expand" draggable="false" />
          </div>

          <div className={styles.collapse} style={{ height: collapseHeight }}>
            <div ref={collapseRef}>
              <InfoCard
                rows={[
                  ['Other information1', '345hjKkjghL34502Jh32kkj2j4j'],
                  ['Other information2', '345hjKkjghL34502Jh32kkj2j4j'],
                  ['Other information3', '345hjKkjghL34502Jh32kkj2j4j'],
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <Checkbox label="Save template" value={saveTemplate} onChange={setSaveTemplate} />

      <div className={styles.actions}>
        <Button variant="outlined" onClick={router.back}>
          Cancel
        </Button>

        <Button variant="contained" onClick={() => {}}>
          Transfer
        </Button>
      </div>
    </div>
  );
}
