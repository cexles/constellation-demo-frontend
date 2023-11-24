import { StaticImageData } from 'next/image';

export interface Action {
  label: string;
  href: string;
  icon: StaticImageData;
}
