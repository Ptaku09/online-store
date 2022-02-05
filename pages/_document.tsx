import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Sedgwick+Ave&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Outfit&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=optional" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
