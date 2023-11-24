'use client';

import Image from 'next/image';

import { Asset } from '@entities/asset';
import { networks } from '@shared/config/networks';
import { cryptoCurrencies } from '@shared/config/currencies';

import styles from './AssetMeta.module.scss';

export default function AssetMeta({ asset }: { asset: Asset }) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={cryptoCurrencies[asset.symbol]?.icon} alt={asset.symbol} draggable="false" />
      </div>

      <div className={styles.meta}>
        <div className={styles.name}>{asset.name}</div>

        <div className={styles.networks}>
          {asset.networks.map((network) => (
            <div key={network.networkId} className={styles.network}>
              <Image
                src={networks[network.networkId]?.icon}
                alt={network.networkId.toString()}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
