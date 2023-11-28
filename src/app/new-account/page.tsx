import { NewAccount } from '@widgets/NewAccount';
import { PageWithTitle } from '@shared/ui';

export default function NewAccountPage() {
  return (
    <PageWithTitle title="New account">
      <NewAccount />
    </PageWithTitle>
  );
}
