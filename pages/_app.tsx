import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ThemeProvider } from 'next-themes';

// const { wrapper } = require('../lib/store/store');

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

// export default wrapper.withRedux(MyApp);
