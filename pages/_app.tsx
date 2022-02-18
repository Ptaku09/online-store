import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ThemeProvider } from 'next-themes';
import CartProvider from '../providers/CartDataProvider';
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session} refetchInterval={0}>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
