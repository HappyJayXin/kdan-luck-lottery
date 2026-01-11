import React, { useEffect } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import store from '../store';
import { Provider } from 'react-redux';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}
