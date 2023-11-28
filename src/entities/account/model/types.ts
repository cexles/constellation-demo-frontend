export type AccountType = 'personal' | 'business' | 'external';

export interface Account {
  id: string;
  name: string;
  networks: number[];
  type: AccountType;
  balance: number;
  delta: number;
  subaccounts: Account[];
  members: Member[];
}

export interface Member {
  id: string;
  account: string;
  shareAccount: string;
  availableFunds?: number;
  spentFunds: number;
  periodOfValidity?: [number, number];
}

export interface AccountsStore {
  internalAccounts: Account[];
  setInternalAccounts: (internalAccounts: Account[]) => void;
}
