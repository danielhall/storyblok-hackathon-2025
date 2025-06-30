
import RawDashboard from './RawDashboard';
import { draftMode } from 'next/headers';

export default async function Page() {
  const { isEnabled } = await draftMode();
  return <RawDashboard isDraftMode={isEnabled} />;
}
