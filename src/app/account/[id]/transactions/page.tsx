import { Transactions } from '@widgets/Transactions';

export default function AccountTransactionsPage({ params: { id } }: { params: { id: string } }) {
  return <Transactions id={id} />;
}
