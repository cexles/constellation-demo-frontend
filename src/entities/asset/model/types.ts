export interface Asset {
  name: string;
  symbol: string;
  decimals: number;
  price: number;
  tokenBalance: bigint;
  formatted: number;
  value: number;
  delta: number;
  networks: AssetBalanceOnNetwork[];
}

export interface AssetBalanceOnNetwork {
  networkId: number;
  tokenBalance: bigint;
  formatted: number;
  value: number;
}
