import { createGlobalStyle } from 'styled-components';
import { colors } from './settings/colors';
import { fontFamilies, fontSizes, fontWeights } from './settings/fonts';

const AppStyles: any = createGlobalStyle`
    html, body{
        min-height: 100vh;
    }

    body{
        font-family: ${fontFamilies.roboto};
        font-size: ${fontSizes.f18};
        color: ${colors.black};
        background: ${colors.white};
        padding: 2em;
    }

    h1{
        font-size: ${fontSizes.f72};
        font-weight: ${fontWeights.normal};
    }
`;

export { AppStyles };
