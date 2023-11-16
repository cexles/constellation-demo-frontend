import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import FujiIcon from '@public/icons/fuji.svg';
import PolygonIcon from '@public/icons/polygon.svg';
import SepoliaIcon from '@public/icons/sepolia.svg';

export const networks: Record<string, string> = {
  fuji: 'Avalanche Fuji',
  polygon: 'Polygon Mumbai',
  sepolia: 'Eth Sepolia',
};

export const networksIcons: Record<string, StaticImport> = {
  fuji: FujiIcon,
  polygon: PolygonIcon,
  sepolia: SepoliaIcon,
};
