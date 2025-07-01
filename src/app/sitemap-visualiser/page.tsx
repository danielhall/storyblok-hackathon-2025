
import SitemapVisualiser from './sitemap-visualiser';
import { draftMode } from 'next/headers';

export default async function Page() {
  const { isEnabled } = await draftMode();
  return <SitemapVisualiser isDraftMode={isEnabled} />;
}
