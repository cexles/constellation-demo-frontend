import type { Metadata } from 'next';

import Providers from '@app/providers';
import { NavigationLayout } from '@widgets/NavigationLayout';
import { NotificationsLayout } from '@widgets/NotificationsLayout';

import '@rainbow-me/rainbowkit/styles.css';
import '@app/styles/index.scss';

export default async function RootLayout({
  children,
  notifications,
}: {
  children: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          <NotificationsLayout />

          <NavigationLayout>
            {children}
            {notifications}
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
