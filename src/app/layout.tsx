import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { IoIosHome } from 'react-icons/io';
import './globals.css';

import StoryblokProvider from '@/components/StoryblokProvider';

import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Storyblok IA Dashboard',
  description:
    'Visualise and manage your Storyblok Information Architecture with live tree view, OpenAI-powered redirect suggestions, and modern UX.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoryblokProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className='flex items-center gap-x-6 py-2 px-[15px]'>
            <Link href='/'>
              <IoIosHome
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </Link>

            <Link className='mt-0.5' href='/dashboard'>
              Dashboard
            </Link>
            <Link className='mt-0.5' href='/sitemap-visualiser'>
              Visualiser
            </Link>
          </div>

          {children}
        </body>
      </html>
    </StoryblokProvider>
  );
}
