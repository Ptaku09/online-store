import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <title>Online store!</title>
          <link href="https://fonts.googleapis.com/css2?family=Sedgwick+Ave&display=optional" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200&display=optional" rel="stylesheet" />
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
