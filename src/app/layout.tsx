import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';

import Providers from '@app/providers';
import { NavigationLayout } from '@widgets/NavigationLayout';
import { NotificationsLayout } from '@widgets/NotificationsLayout';

import '@rainbow-me/rainbowkit/styles.css';
import '@app/styles/index.scss';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});

export default async function RootLayout({
  children,
  notifications,
  transaction,
}: {
  children: React.ReactNode;
  notifications: React.ReactNode;
  transaction: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${nunitoSans.variable}`}>
      <body>
        <Providers>
          <NotificationsLayout />

          <NavigationLayout>
            {children}
            {notifications}
            {transaction}
          </NavigationLayout>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'All in one and safe',
};
