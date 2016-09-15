import {
  darkBlack,
  fullBlack,
  green400,
  grey300,
  grey500,
  grey700,
  lime500,
  red400,
  white,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    // MUI
    primary1Color: '#00539e', // secondary button, table header, textbox selected underline
    primary2Color: lime500,
    primary3Color: lime500,
    accent1Color: '#8cc63e', // primary button, ink bar
    accent2Color: lime500,
    accent3Color: grey500, // zone delete icons, col headers
    // textbox text, text on card, table row data, listitem primary text, listitem hover, default button text
    textColor: grey700,
    // default button bg, primary & secondary raised button text, app bar text, tab text
    alternateTextColor: white,
    canvasColor: white, // appbar bg
    borderColor: grey300, // textbox unselected underline, table borders
    disabledColor: fade(darkBlack, 0.3), // hint
    pickerHeaderColor: lime500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack, // card shadow

    unconfiguredColor: red400, // equipment table
    configuredColor: green400, // equipment table
    tableSuperHeader: {
      color: white,
      fontSize: '14px',
      paddingLeft: '14px',
      fontWeight: 700,
      height: '38px',
      lineHeight: '38px',
    },
    tableHeader: {
      height: '38px',
    },
    tableRow: {
      height: '38px',
    },
    highlightTableRow: {
      background: fade('#00539e', 0.06),
      transition: 'background 1s ease-in-out',
      MozTransition: 'background 1s ease-in-out',
      WebkitTransition: 'background 1s ease-in-out',
    },
    unHighlightTableRow: {
      transition: 'background 1s ease-in-out',
      MozTransition: 'background 1s ease-in-out',
      WebkitTransition: 'background 1s ease-in-out',
    },
    listBackgroundColor: fade(grey700, 0.04),
  },
};
