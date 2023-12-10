import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {
  useContractRead,
  useContractWrite,
  useNetwork,
} from 'wagmi';
import moment from 'moment';
import {ethers, Wallet} from "ethers";

import {useNotificationsStore} from '@entities/user';
import {networks} from '@shared/config/networks';
import {ACCOUNTS_CONTRACT_ABI, ACCOUNTS_CONTRACT_ADDRESS} from "@shared/config/contracts/accountsContract.ts";
import {ACCOUNT_CONTRACT_ABI} from "@shared/config/contracts/accountContract.ts";
import {JsonRpcProvider} from "@ethersproject/providers";
import {AddressZero} from "@ethersproject/constants";

export function useTokenBridge(account: `0x${string}`) {
  const {chain} = useNetwork();
  const router = useRouter();
  const pushNotification = useNotificationsStore((state) => state.push);

  const {data, isLoading, isSuccess, write} = useContractWrite({
    address: ACCOUNTS_CONTRACT_ADDRESS,
    abi: ACCOUNTS_CONTRACT_ABI,
    functionName: 'bridgeTokens',
  })

  const isValid = (() => {
    return (
      !isLoading &&
      !!chain &&
      Object.keys(networks).includes(chain.id.toString()) &&
      !!write
    );
  })();

  const createTokenBridge = (receiver: string, amount: string, chainId: string, token: string) => {
    if (write && isValid) {
      const chainSelector = (() => {
        switch (chainId) {
          case "80001":
            return "12532609583862916517";
          case "11155111":
            return "16015286601757825753";
          case "97":
            return "13264668187771770619";
          default:
            return "0"
        }
      })();

      // const userNonce = useContractRead({
      //   address: ACCOUNTS_CONTRACT_ADDRESS,
      //   abi: ACCOUNT_CONTRACT_ABI,
      //   functionName: 'userNonce',
      //   args: [account]
      // })

      const bridgeParams = {
        userAddress: '0x27E5E6A78C25574a4442B2a8bc9bDf497cb7EfbC',
        userNonce: 0,
        srcTokenAddress: token,
        srcTokenAmount: ethers.utils.parseUnits(amount, 18),
        dstChainSelector: chainSelector,
        dstExecutor: '0x833674CAAf4A066B883C9C13E676631cf18b8F45',
        dstTokenAddress: '0x38C994c54A26B8C3FcDE220c043e636FB9DCd2D8',
        dstTokenAmount: ethers.utils.parseUnits(amount, 18),
        dstReceiver: receiver,
      };

      const srcDomain = {
        name: "Transshipment",
        version: "0.0.1",
        chainId: 80001,
        verifyingContract: ACCOUNTS_CONTRACT_ADDRESS,
      };

      const typesForBridge = {
        // types === typesForBridge
        BridgeParams: [
          {
            name: "userAddress",
            type: "address",
          },
          {
            name: "userNonce",
            type: "uint256",
          },
          {
            name: "srcTokenAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "srcTokenAmount",
            type: "uint256",
          },
          {
            name: "dstChainSelector",
            type: "uint64",
          },
          {
            name: "dstExecutor",
            type: "address",
          },
          {
            name: "dstTokenAddress",
            type: "address",
          },
          {
            name: "dstTokenAmount",
            type: "uint256",
          },
          {
            name: "dstReceiver",
            type: "address",
          },
        ],
      };

      sign(srcDomain, typesForBridge, bridgeParams).then((managerSignature) => {
        const fees = ethers.utils.parseUnits("0.5", 18);

        write({
          args: [managerSignature, '0x326C977E6efc84E512bB9C30f76E30c160eD06FB', 200000, fees, bridgeParams],
          //value: ethers.utils.parseUnits("0.2", 18).toBigInt()
        });
      });

    }
  };

  useEffect(() => {
    if (isSuccess) {
      pushNotification({
        id: (Math.random() + 1).toString(36).substring(7),
        timestamp: +moment(),
        type: 'success',
        text: 'Token bridge processed successfully',
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
    createTokenBridge,
  };
}

async function sign(domain: { name: string; version: string; chainId: number; verifyingContract: string; }, types: {
  BridgeParams: ({ name: string; type: string; internalType?: undefined; } | {
    internalType: string;
    name: string;
    type: string;
  })[];
}, message: { userAddress: string; userNonce: number; srcTokenAddress: string; srcTokenAmount: ethers.BigNumber; dstChainSelector: string; dstExecutor: string; dstTokenAddress: string; dstTokenAmount: ethers.BigNumber; dstReceiver: string; }): Promise<string> {
  const provider = new JsonRpcProvider('https://rpc.ankr.com/polygon_mumbai/6105df9afeb9b3103093f6cb684b5d61410bc962a1bb51202ea05a88bbdf8594');
  const wallet = new Wallet('1897cbedf7f07fe1635edc1e63adf88eaea19fbbf84e60344e77a92ebafaf149', provider);

  const typedData = {
    domain,
    types,
    primaryType: 'BridgeParams',
    message,
  };
  return await wallet._signTypedData(typedData.domain, typedData.types, typedData.message);
}