import { Accounts } from '@widgets/Accounts';
import { Actions } from '@widgets/Actions';

import styles from './DashboardPage.module.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.accounts}>
        <Accounts />
      </div>

      <div className={styles.section}>
        <Actions />

        {children}
      </div>
    </div>
  );
}
