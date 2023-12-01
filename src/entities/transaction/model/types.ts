export type TransactionType = 'send' | 'receive' | 'trade';

export interface Transaction {
  id: string;
  type: TransactionType;
  timestamp: number;
  sender: TransactionParticipant;
  recipient: TransactionParticipant;
}

export interface TransactionParticipant {
  address: string;
  asset: string;
  price: number;
  amount: number;
}
