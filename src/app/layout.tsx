import type { Metadata } from 'next';

import Providers from '@app/providers';
import { NavigationLayout } from '@widgets/NavigationLayout';

import '@app/styles/index.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Providers>
          <NavigationLayout>{children}</NavigationLayout>
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: 'All in one and safe',
};
