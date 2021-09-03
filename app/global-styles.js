import { createGlobalStyle } from 'styled-components';
import './index.css';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Source Sans Pro', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p {
    font-family: 'Source Sans Pro', Times, 'Times New Roman', serif;
    font-weight: 400;
    line-height: 1.5em;
  }
  label {
    font-family: 'Source Sans Pro', Times, 'Times New Roman', serif;
    font-weight: 600;
    line-height: 1.5em;
  }

  dacticColor {
    color: '#5222D0'
  }
`;

export default GlobalStyle;
