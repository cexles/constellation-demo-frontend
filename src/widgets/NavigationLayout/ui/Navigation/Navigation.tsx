'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { routes } from '@widgets/NavigationLayout/config/routes';
import { NavigationRoute } from '@widgets/NavigationLayout/model/types';
import ArrowLeftIcons from '@public/icons/arrow-left.svg';

import styles from './Navigation.module.scss';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentRoute, setCurrentRoute] = useState<NavigationRoute>();

  useEffect(() => {
    const route = routes.find((r) => r.pattern.test(pathname));

    if (!route?.keep) {
      setCurrentRoute(route);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (
    (!currentRoute?.withBack || searchParams.get('back') === 'false') &&
    (!currentRoute?.subRoutes || currentRoute?.subRoutes?.length === 0)
  ) {
    return null;
  }

  return (
    <nav className={styles.navigation}>
      <div className={styles.wrapper}>
        {currentRoute?.withBack && searchParams.get('back') !== 'false' && (
          <div className={styles.back} onClick={router.back}>
            <Image src={ArrowLeftIcons} alt="Back" draggable="false" />

            <div>Back</div>
          </div>
        )}

        {currentRoute?.withBack && currentRoute.subRoutes && currentRoute.subRoutes.length > 0 && (
          <div className={styles.separator} />
        )}

        <div className={styles.routes}>
          {currentRoute?.subRoutes?.map((route) => (
            <Link
              key={route.label}
              href={route.href || route.hrefFn?.(pathname) || ''}
              className={clsx(route.pattern.test(pathname) && styles.current)}
            >
              <div
                className={clsx(styles.route, route.pattern.test(pathname) && styles.route_current)}
              >
                <div>{route.label}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
