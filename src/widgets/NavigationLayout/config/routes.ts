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
      // {
      //   pattern: /^\/dashboard\/transactions$/i,
      //   label: 'Transactions',
      //   href: '/dashboard/transactions',
      // },
    ],
  },
  // {
  //   pattern: /^\/investment/i,
  //   href: '/investment',
  // },
  // {
  //   pattern: /^\/protocol/i,
  //   href: '/protocol',
  // },
  {
    pattern: /^\/documentation/i,
    label: 'Documentation',
    href: '/documentation',
  },

  {
    pattern: /^\/account/i,
    mainPage: 'Dashboard',
    subRoutes: [
      {
        pattern: /^\/account\/[a-z0-9]+$/i,
        label: 'Account info',
        hrefFn: (pathname: string) => `/account/${pathname.split('/')[2]}`,
      },
      // {
      //   pattern: /^\/account\/[a-z0-9]+\/transactions$/i,
      //   label: 'Transactions',
      //   hrefFn: (pathname: string) => `/account/${pathname.split('/')[2]}/transactions`,
      // },
    ],
    withBack: true,
  },
  {
    pattern: /^\/new-account$/i,
    mainPage: 'Dashboard',
    withBack: true,
  },
  {
    pattern: /^\/deposit$/i,
    mainPage: 'Dashboard',
    withBack: true,
  },
  {
    pattern: /^\/transfer$/i,
    mainPage: 'Dashboard',
    withBack: true,
  },
  // {
  //   pattern: /^\/privacy-policy$/i,
  //   mainPage: 'Dashboard',
  //   withBack: true,
  // },
  // {
  //   pattern: /^\/terms$/i,
  //   mainPage: 'Dashboard',
  //   withBack: true,
  // },

  // {
  //   pattern: /^\/edit-member\/[a-z0-9]+$/i,
  //   mainPage: 'Dashboard',
  //   keep: true,
  // },
  // {
  //   pattern: /^\/new-member$/i,
  //   mainPage: 'Dashboard',
  //   keep: true,
  // },
  {
    pattern: /^\/notifications$/i,
    mainPage: 'Dashboard',
    keep: true,
  },
  // {
  //   pattern: /^\/transaction$/i,
  //   mainPage: 'Dashboard',
  //   keep: true,
  // },
];
