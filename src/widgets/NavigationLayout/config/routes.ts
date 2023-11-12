import { NavigationRoute } from '@widgets/NavigationLayout/model/types';

export const routes: NavigationRoute[] = [
  {
    pattern: /^\/dashboard/i,
    label: 'Dashboard',
    href: '/dashboard',
    subRoutes: [
      {
        pattern: /^\/dashboard$/i,
        label: 'Main page',
        href: '/dashboard',
      },
      {
        pattern: /^\/dashboard\/transaction$/i,
        label: 'Transaction',
        href: '/dashboard/transaction',
      },
    ],
  },
  {
    pattern: /^\/investment/i,
    label: 'Investment',
    href: '/investment',
    subRoutes: [],
  },
  {
    pattern: /^\/protocol/i,
    label: 'Protocol',
    href: '/protocol',
    subRoutes: [],
  },
  {
    pattern: /^\/documentation/i,
    label: 'Documentation',
    href: '/documentation',
    subRoutes: [],
  },
  {
    pattern: /^\/account/i,
    subRoutes: [
      {
        pattern: /^\/account\/[a-z0-9]+$/i,
        label: 'Account info',
        hrefFn: (pathname: string) => `/account/${pathname.split('/')[2]}`,
      },
      {
        pattern: /^\/account\/[a-z0-9]+\/transaction$/i,
        label: 'Transaction',
        hrefFn: (pathname: string) => `/account/${pathname.split('/')[2]}/transaction`,
      },
      {
        pattern: /^\/account\/[a-z0-9]+\/members$/i,
        label: 'Members',
        hrefFn: (pathname: string) => `/account/${pathname.split('/')[2]}/members`,
      },
    ],
    withBack: true,
  },
  {
    pattern: /^\/new-account$/i,
    subRoutes: [],
    withBack: true,
  },
  {
    pattern: /^\/deposit$/i,
    subRoutes: [],
    withBack: true,
  },
  {
    pattern: /^\/transfer$/i,
    subRoutes: [],
    withBack: true,
  },
  {
    pattern: /^\/privacy-policy$/i,
    subRoutes: [],
    withBack: true,
  },
  {
    pattern: /^\/terms$/i,
    subRoutes: [],
    withBack: true,
  },
];
