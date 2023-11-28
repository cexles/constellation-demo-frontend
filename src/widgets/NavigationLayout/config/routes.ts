import { NavigationRoute } from '@widgets/NavigationLayout/model/types';

export const routes: NavigationRoute[] = [
  {
    pattern: /^\/dashboard/i,
    label: 'Dashboard',
    href: '/dashboard',
    subRoutes: [
      {
        pattern: /^\/dashboard$/i,
        label: 'Assets',
        href: '/dashboard',
      },
      {
        pattern: /^\/dashboard\/transaction$/i,
        label: 'Transactions',
        href: '/dashboard/transaction',
      },
    ],
  },
  {
    pattern: /^\/investment/i,
    href: '/investment',
  },
  {
    pattern: /^\/protocol/i,
    href: '/protocol',
  },
  {
    pattern: /^\/documentation/i,
    label: 'Documentation',
    href: '/documentation',
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
        label: 'Transactions',
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
    withBack: true,
  },
  {
    pattern: /^\/deposit$/i,
    withBack: true,
  },
  {
    pattern: /^\/transfer$/i,
    withBack: true,
  },
  {
    pattern: /^\/privacy-policy$/i,
    withBack: true,
  },
  {
    pattern: /^\/terms$/i,
    withBack: true,
  },

  {
    pattern: /^\/edit-member\/[a-z0-9]+$/i,
    keep: true,
  },
  {
    pattern: /^\/new-member$/i,
    keep: true,
  },
  {
    pattern: /^\/notifications$/i,
    keep: true,
  },
  {
    pattern: /^\/transaction\/[a-z0-9]+$/i,
    keep: true,
  },
];
