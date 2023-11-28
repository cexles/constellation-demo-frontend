import { useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import moment from 'moment';

import { useAccountsStore } from '@entities/account';
import { useNotificationsStore } from '@entities/user';
import { truncateAddressWithSeparator } from '@shared/lib/formatters';
import {
  ACCOUNTS_CONTRACT_ADDRESS,
  ACCOUNTS_CONTRACT_ABI,
} from '@shared/config/contracts/accountsContract';

export function useInternalAccounts() {
  const { address } = useAccount();
  const accountsStore = useAccountsStore();
  const pushNotification = useNotificationsStore((state) => state.push);

  const { data, isError, refetch } = useContractRead<any, any, string>({
    address: ACCOUNTS_CONTRACT_ADDRESS,
    abi: ACCOUNTS_CONTRACT_ABI,
    functionName: 'getCreatedAccountAddress',
    args: [address],
  });

  useEffect(() => {
    if (address && isError) {
      pushNotification({
        id: (Math.random() + 1).toString(36).substring(7),
        timestamp: +moment(),
        type: 'error',
        text: 'Error while fetching accounts data',
        isNew: true,
        shown: false,
        withActions: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (data && Number(data)) {
      accountsStore.setInternalAccounts([
        {
          id: data,
          name: truncateAddressWithSeparator(data),
          networks: [polygonMumbai.id],
          type: 'personal',
          balance: 0,
          delta: 0,
          subaccounts: [],
          members: [],
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { internalAccounts: accountsStore.internalAccounts, refetch };
}
