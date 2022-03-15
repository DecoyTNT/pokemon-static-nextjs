import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>{CssBaseline.flush()}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: <>{initialProps.styles}</>
  };
}

export default MyDocument;

