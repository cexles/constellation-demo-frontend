import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import BtcbIcon from '@public/icons/binance.svg';
import DigiIcon from '@public/icons/digi.svg';
import NavIcon from '@public/icons/nav.svg';
import KomodoIcon from '@public/icons/komodo.svg';

export const assetsIcons: Record<string, StaticImport> = {
  btcb: BtcbIcon,
  dgb: DigiIcon,
  nav: NavIcon,
  kmd: KomodoIcon,
};
