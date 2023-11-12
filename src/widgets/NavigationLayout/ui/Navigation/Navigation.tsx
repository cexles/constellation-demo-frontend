'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

import { routes } from '@widgets/NavigationLayout/config/routes';
import ArrowLeftIcons from '@public/icons/arrow-left.svg';

import styles from './Navigation.module.scss';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const currentRoute = routes.find((route) => route.pattern.test(pathname));
  const subroutes = currentRoute?.subRoutes.filter((route) => route.label) || [];

  return (
    <nav className={styles.navigation}>
      <div className={styles.wrapper}>
        {currentRoute?.withBack && (
          <div className={styles.back} onClick={router.back}>
            <Image src={ArrowLeftIcons} alt="Back" draggable="false" />

            <div>Back</div>
          </div>
        )}

        {currentRoute?.withBack && subroutes.length > 0 && <div className={styles.separator} />}

        <div className={styles.routes}>
          {subroutes.map((route) => (
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
