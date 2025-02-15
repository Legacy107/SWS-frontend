import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ApolloProvider from '@/components/ApolloProvider';
import ThemeProvider from '@/components/ThemeProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SWS Companies',
  description: 'Companies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ApolloProvider>{children}</ApolloProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
