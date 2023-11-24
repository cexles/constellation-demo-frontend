import { Assets } from '@widgets/Assets';

export default function AccountMainPage({ params: { id } }: { params: { id: string } }) {
  return <Assets id={id} />;
}
