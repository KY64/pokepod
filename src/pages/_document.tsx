import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from "next/document";

import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/styles/theme";

class Document extends NextDocument {
  /* Reference for DocumentInitialProps types
   * https://github.com/vercel/next.js/blob/b2c7b316cb1f3cca76173f3df95fdb5e7ebc6ebc/packages/next/pages/_document.tsx#L167-L172
   */
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps: DocumentInitialProps =
      await NextDocument.getInitialProps(ctx);

    return initialProps;
  }

  /* Reference for color mode to support dark mode
   * https://chakra-ui.com/docs/features/color-mode#for-nextjs
   */
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
