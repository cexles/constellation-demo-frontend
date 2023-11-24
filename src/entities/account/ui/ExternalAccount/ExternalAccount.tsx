'use client';

import { AccountCard, useExternalAccount } from '@entities/account';

export default function ExternalAccount({ withType }: { withType?: boolean }) {
  const externalAccount = useExternalAccount();

  return <AccountCard account={externalAccount} withType={withType} withLink />;
}
