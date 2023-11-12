'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { routes } from '@widgets/NavigationLayout/config/routes';
import { NavigationTabs } from '@shared/ui';
import LogoImage from '@public/logo.svg';

import styles from './Header.module.scss';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const navigationRoutes = routes.filter((route) => route.label);
  const [currentRoute, setCurrentRoute] = useState('');

  const changeTab = (newTab: string) => {
    const route = navigationRoutes.find((r) => r.label === newTab);

    if (route?.href) {
      router.push(route.href);
    }
  };

  useEffect(() => {
    const route = navigationRoutes.find((r) => r.pattern.test(pathname));

    setCurrentRoute(route?.label || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Image src={LogoImage} alt="logo" draggable="false" />

        <div className={styles.navigation}>
          <NavigationTabs
            value={currentRoute}
            options={navigationRoutes.map((route) => route.label!)}
            onChange={changeTab}
          />
        </div>

        <div className={styles.controls} />
      </div>
    </header>
  );
}
