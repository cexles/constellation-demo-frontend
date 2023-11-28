import DepositIcon from '@public/icons/deposit.svg';
import SwapCycleIcon from '@public/icons/swap-cycle.svg';
import SwapIcon from '@public/icons/swap.svg';
import { Action } from '../model/types';

export const actions: Action[] = [
  { label: 'Deposit', href: '/deposit', icon: DepositIcon },
  { label: 'Swap', href: '/swap', icon: SwapCycleIcon },
  { label: 'Transfer', href: '/transfer', icon: SwapIcon },
];
