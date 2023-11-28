import { create } from 'zustand';

import { Account, AccountsStore } from './types';

export const useAccountsStore = create<AccountsStore>((set) => ({
  internalAccounts: [],
  setInternalAccounts: (internalAccounts: Account[]) => set({ internalAccounts }),
}));
