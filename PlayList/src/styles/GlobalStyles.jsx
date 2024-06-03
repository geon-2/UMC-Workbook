import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    ${reset};

    html {
        font-size: 62.5%;
        font-family: 'Roboto', sans-serif;
    }

`;

export default GlobalStyles;