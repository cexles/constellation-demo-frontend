import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import moment from 'moment';

import { AccountType, useInternalAccounts } from '@entities/account';
import { useNotificationsStore } from '@entities/user';
import { networks } from '@shared/config/networks';
import {
  ACCOUNTS_CONTRACT_ABI,
  ACCOUNTS_CONTRACT_ADDRESS,
} from '@shared/config/contracts/accountsContract';

export function useCreateAccount(mainAccountId: string | null) {
  const { chain } = useNetwork();
  const router = useRouter();
  const [variant, setVariant] = useState(mainAccountId ? 'subaccount' : 'new');
  const [main, setMain] = useState(mainAccountId || '');
  const [name, setName] = useState('');
  const [type, setType] = useState<Omit<AccountType, 'external'>>('personal');
  const pushNotification = useNotificationsStore((state) => state.push);
  const { refetch } = useInternalAccounts();

  const { config } = usePrepareContractWrite({
    address: ACCOUNTS_CONTRACT_ADDRESS,
    abi: ACCOUNTS_CONTRACT_ABI,
    functionName: 'createAccount',
    args: [name, type === 'personal' ? 0 : 1],
  });

  const { data, isLoading: isContractLoading, write } = useContractWrite(config);

  const { isLoading, isSuccess, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isValid = (() => {
    if (variant === 'subaccount' && !main) {
      return false;
    }

    return (
      !isLoading &&
      !isContractLoading &&
      !!name &&
      !!chain &&
      Object.keys(networks).includes(chain.id.toString()) &&
      !!write
    );
  })();

  const create = () => {
    if (write && isValid) {
      write();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();

      pushNotification({
        id: (Math.random() + 1).toString(36).substring(7),
        timestamp: +moment(),
        type: 'success',
        text: 'Account was created',
        isNew: true,
        shown: false,
        withActions: false,
      });

      router.back();
    }

    if (error) {
      pushNotification({
        id: (Math.random() + 1).toString(36).substring(7),
        timestamp: +moment(),
        type: 'error',
        text: error.message,
        isNew: true,
        shown: false,
        withActions: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess]);

  return {
    isLoading: isLoading || isContractLoading,
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
  };
}
