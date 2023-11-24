import { useEffect, useState } from 'react';

import { Asset } from '@entities/asset';
import { AssetBalanceOnNetwork } from '@entities/asset/model/types';
import api from '@shared/config/api.config';
import { networksArray } from '@shared/config/networks';
import { useTable } from '@shared/lib/useTable';

interface AssetDTO {
  name: string;
  symbol: string;
  decimals: number;
  tokenBalance: bigint;
  price: number;
  chains: Record<string, { tokenBalance: bigint }>;
}

export function useAssetsTable(id?: string) {
  const { loading, sorting, setSorting, setLoading } = useTable(100, [{ id: 'value', desc: true }]);
  const [searchQuery, setSearchQuery] = useState('');
  const [networks, setNetworks] = useState<string[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);

  useEffect(() => {
    if (!id || loading) {
      return;
    }

    setLoading(true);

    api
      .get<AssetDTO[]>('user/balance', { params: { address: id } })
      .then(({ data }) => {
        const parsedAssets: Asset[] = [];

        data.forEach((asset) => {
          const assetNetworks: AssetBalanceOnNetwork[] = [];
          const coinUnits: bigint = BigInt(10 ** asset.decimals);
          const formatted: number =
            Number((BigInt(asset.tokenBalance) * 1000000n) / coinUnits) / 1000000;

          Object.keys(asset.chains)
            .map((chain) => ({
              networkId: networksArray.find((n) => n.backendName === chain)?.id,
              backendName: chain,
            }))
            .forEach(({ networkId, backendName }) => {
              if (!networkId) {
                return;
              }

              const networkTokenBalance: bigint = BigInt(asset.chains[backendName].tokenBalance);
              const networkFormatted: number =
                Number((networkTokenBalance * 1000000n) / coinUnits) / 1000000;

              assetNetworks.push({
                networkId,
                tokenBalance: networkTokenBalance,
                formatted: networkFormatted,
                value: networkFormatted * asset.price,
              });
            });

          parsedAssets.push({
            name: asset.name,
            symbol: asset.symbol,
            decimals: asset.decimals,
            price: asset.price,
            tokenBalance: asset.tokenBalance,
            value: formatted * asset.price,
            delta: 0,
            formatted,
            networks: assetNetworks,
          });
        });

        setAssets(parsedAssets);
      })
      .catch(() => {
        setAssets([]);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    let filtered: Asset[] = assets;

    if (networks.length > 0) {
      filtered = filtered.filter((asset) =>
        networks.some((network) => asset.networks.map((n) => n.networkId).includes(+network)),
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()),
      );
    }

    setFilteredAssets(filtered);
  }, [assets, searchQuery, networks]);

  return {
    loading,
    assets: filteredAssets,
    sorting,
    searchQuery,
    networks,
    setSorting,
    setSearchQuery,
    setNetworks,
  };
}
