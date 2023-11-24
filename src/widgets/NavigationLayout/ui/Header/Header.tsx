'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { OpenNotifications } from '@features/user/openNotifications';
import { routes } from '@widgets/NavigationLayout/config/routes';
import { Profile } from '@widgets/Profile';
import { NavigationTabs } from '@shared/ui';
import LogoImage from '@public/logo.svg';

import styles from './Header.module.scss';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const navigationRoutes = routes.filter((route) => route.label || route.keep);
  const [currentRoute, setCurrentRoute] = useState('');

  const changeTab = (newTab: string) => {
    const route = navigationRoutes.find((r) => r.label === newTab);

    if (route?.href) {
      router.push(route.href);
    }
  };

  useEffect(() => {
    const route = navigationRoutes.find((r) => r.pattern.test(pathname));

    if (!route?.keep) {
      setCurrentRoute(route?.label || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Image src={LogoImage} className={styles.logo} alt="logo" draggable="false" />

        <div className={styles.navigation}>
          <NavigationTabs
            value={currentRoute}
            options={Object.fromEntries(
              navigationRoutes
                .filter((route) => route.label)
                .map((route) => [route.label, route.label]),
            )}
            onChange={changeTab}
          />
        </div>

        <div className={styles.controls}>
          <OpenNotifications />
          <Profile />
        </div>
      </div>
    </header>
  );
}
