import { ChakraProvider, CSSReset, useColorMode } from '@chakra-ui/react';

import { ProvideAuth } from '../lib/auth';
import '../styles/globals.css';
import theme from '../styles/theme';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import { css, Global } from '@emotion/react';

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <div>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            height: 100vh;
          }
        `}
      />
      {children}
    </div>
  );
};
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <GlobalStyle />
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
}

export default MyApp;
