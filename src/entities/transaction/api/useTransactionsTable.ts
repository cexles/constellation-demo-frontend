import { useEffect, useState } from 'react';
import moment from 'moment';

import { Transaction } from '@entities/transaction';
import { useTable } from '@shared/lib/useTable';
import api from '@shared/config/api.config';

interface TransactionDTO {}

export function useTransactionsTable(id?: string) {
  const { loading, pagination, setLoading } = useTable();
  const [type, setType] = useState('all');
  const [account, setAccount] = useState('');
  const [dateFrom, setDateFrom] = useState(+moment());
  const [dateTo, setDateTo] = useState(+moment());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!id || loading) {
      return;
    }

    setLoading(true);

    api
      .get<TransactionDTO[]>('user/balance', { params: { address: id } })
      .then(() => {
        const parsedAssets: Transaction[] = [
          {
            id: '914c8ny0148yt10mxt018',
            type: 'send',
            timestamp: 1701413689000,
            sender: {
              address: '23-9ctm8324890cttm',
              asset: 'BTC',
              price: 0,
              amount: 0.85,
            },
            recipient: {
              address: '23-9ctm8324890cttm',
              asset: 'BTC',
              price: 0,
              amount: 0.85,
            },
          },
          {
            id: 'b623b62356v35',
            type: 'send',
            timestamp: 1701413689000,
            sender: {
              address: '23-9ctm8324890cttm',
              asset: 'MATIC',
              price: 0,
              amount: 0.85,
            },
            recipient: {
              address: '23-9ctm8324890cttm',
              asset: 'MATIC',
              price: 0,
              amount: 0.85,
            },
          },
          {
            id: '914c8ny0148yct13tt10mxt018',
            type: 'trade',
            timestamp: 1701413689000,
            sender: {
              address: '23-9ctm8324890cttm',
              asset: 'AVAX',
              price: 0,
              amount: 83568,
            },
            recipient: {
              address: '3255b524890cttm',
              asset: 'BNB',
              price: 0,
              amount: 63456.34,
            },
          },
          {
            id: '914c8ny0148yt10cvxxvmxt018',
            type: 'send',
            timestamp: 1701413689000,
            sender: {
              address: '23-9ctm8324890cttm',
              asset: 'BTC',
              price: 0,
              amount: 0.85,
            },
            recipient: {
              address: '23-9ctm8324890cttm',
              asset: 'BTC',
              price: 0,
              amount: 0.85,
            },
          },
          {
            id: '914c8ny0148sdfsyt10mxt018',
            type: 'trade',
            timestamp: 1701411689000,
            sender: {
              address: '223423432r2qm832489123m',
              asset: 'TRX',
              price: 0,
              amount: 38423.5845,
            },
            recipient: {
              address: '23q23rq23r24890cttm',
              asset: 'LTC',
              price: 0,
              amount: 77.55,
            },
          },
          {
            id: '914c8ny01481231yt10mxt018',
            type: 'send',
            timestamp: 1701213689000,
            sender: {
              address: '23-9ctm8324890cttm',
              asset: 'BTC',
              price: 0,
              amount: 0.85,
            },
            recipient: {
              address: '23-9ctm8324890cttm',
              asset: 'BTC',
              price: 0,
              amount: 0.85,
            },
          },
          {
            id: '914c8ny0148y234c2t10mxt018',
            type: 'send',
            timestamp: 1701283689000,
            sender: {
              address: '23-9ctm8324890cttm',
              asset: 'XRP',
              price: 0,
              amount: 21423.85,
            },
            recipient: {
              address: '23-9ctm8324890cttm',
              asset: 'XRP',
              price: 0,
              amount: 21423.85,
            },
          },
          {
            id: '914c8ny0148yt10mdsfgdfgxt018',
            type: 'receive',
            timestamp: 1701413629000,
            sender: {
              address: '23-9ctm8324890cttm',
              asset: 'USDT',
              price: 0,
              amount: 234234,
            },
            recipient: {
              address: '23-9ctm8324890cttm',
              asset: 'USDT',
              price: 0,
              amount: 234234,
            },
          },
        ];

        setTransactions(parsedAssets);
      })
      .catch(() => {
        setTransactions([]);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return {
    loading,
    transactions: filteredTransactions,
    type,
    account,
    dateFrom,
    dateTo,
    pagination,
    setType,
    setAccount,
    setDateFrom,
    setDateTo,
  };
}
