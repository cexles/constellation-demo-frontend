import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {
  useContractWrite,
  useNetwork,
} from 'wagmi';
import moment from 'moment';

import {useNotificationsStore} from '@entities/user';
import {networks} from '@shared/config/networks';
import {ACCOUNT_CONTRACT_ABI} from "@shared/config/contracts/accountContract.ts";
import {ethers} from "ethers";

export function useNativeTransfer(account: `0x${string}`) {
  const {chain} = useNetwork();
  const router = useRouter();
  const pushNotification = useNotificationsStore((state) => state.push);

  const {data, isLoading, isSuccess, write} = useContractWrite({
    address: account,
    abi: ACCOUNT_CONTRACT_ABI,
    functionName: 'execute',
  })

  const isValid = (() => {
    return (
      !isLoading &&
      !!chain &&
      Object.keys(networks).includes(chain.id.toString()) &&
      !!write
    );
  })();

  const createNativeTransfer = (receiverAddress: string, receiveAmount: string) => {
    if (write && isValid) {
      write({
        args: [receiverAddress, ethers.utils.parseUnits(receiveAmount, 18), '0x'],
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      pushNotification({
        id: (Math.random() + 1).toString(36).substring(7),
        timestamp: +moment(),
        type: 'success',
        text: 'Transfer processed successfully',
        isNew: true,
        shown: false,
        withActions: false,
      });

      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return {
    data,
    isLoading: isLoading,
    isValid,
    isSuccess,
    createNativeTransfer,
  };
}
