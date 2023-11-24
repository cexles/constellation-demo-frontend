import DepositIcon from '@public/icons/deposit.svg';
import SwapIcon from '@public/icons/swap.svg';
import { Action } from '../model/types';

export const actions: Action[] = [
  { label: 'Deposit', href: '/deposit', icon: DepositIcon },
  { label: 'Transfer', href: '/transfer', icon: SwapIcon },
];
