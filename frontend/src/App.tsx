import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/global';
import { IndexPage } from './pages/IndexPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <IndexPage />
    </ThemeProvider>
  );
}

export default App;
