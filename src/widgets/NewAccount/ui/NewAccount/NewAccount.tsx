'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAccountsStore, useCreateAccount } from '@entities/account';
import { SwitchNetwork } from '@features/user/switchNetwork';
import { Button, NavigationTabs, RadioButton, Selector, TextInput } from '@shared/ui';
import InfoIcon from '@public/icons/info.svg';

import styles from './NewAccount.module.scss';

export default function NewAccount() {
  const params = useSearchParams();
  const router = useRouter();
  const internalAccounts = useAccountsStore((state) => state.internalAccounts);
  const {
    isLoading,
    isValid,
    isSuccess,
    variant,
    main,
    name,
    type,
    setVariant,
    setMain,
    setName,
    setType,
    create,
  } = useCreateAccount(params.get('main'));

  return (
    <div className={styles.container}>
      <div className={styles.variant}>
        <NavigationTabs
          value={variant}
          options={{
            new: 'New',
            subaccount: 'Subaccount',
          }}
          disabled
          onChange={setVariant}
        />
      </div>

      <div className={styles.form}>
        <div className={styles.fields}>
          {variant === 'subaccount' && (
            <Selector
              placeholder="Select main account"
              value={main}
              options={Object.fromEntries(
                internalAccounts.map((account) => [account.id, account.name]),
              )}
              onChange={setMain}
            />
          )}

          <TextInput
            placeholder="Account name"
            value={name}
            onChange={setName}
            onEnterPress={create}
          />

          <SwitchNetwork />

          <div className={styles.type}>
            <div className={styles.radio}>
              <RadioButton
                value={type as string}
                options={{ personal: 'Personal', business: 'Business' }}
                disabled
                onChange={setType}
              />
            </div>

            {type === 'personal' ? (
              <div className={styles.about}>
                <div className={styles.aboutTitle}>
                  <Image src={InfoIcon} alt="Info" draggable="false" />

                  <div>About personal account</div>
                </div>

                <div className={styles.aboutText}>
                  Secure, convenient, transparent: Your personal account for financial management.
                </div>
              </div>
            ) : (
              <div className={styles.about}>
                <div className={styles.aboutTitle}>
                  <Image src={InfoIcon} alt="Info" draggable="false" />

                  <div>About business account</div>
                </div>

                <div className={styles.aboutText}>
                  Lorem ipsum dolor sit amet consectetur. Et consequat gravida aliquet nisl sed
                  mattis scelerisque in. Platea id dui eget bibendum
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="contained"
            loading={isLoading}
            disabled={!isValid || isSuccess}
            onClick={create}
          >
            Create
          </Button>

          <Button variant="outlined" disabled={isLoading} onClick={router.back}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
