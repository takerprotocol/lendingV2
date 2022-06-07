import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

interface COLOR {
  barBackground: string
  barSecondBackground: string
  barThirdBackground: string
  tooltipBackground: string
  progressBackground: string
  primary: string
  secondary: string
  text: string
  white: string
  dialogHeaderBg: string
  textGrey: {
    [key: number]: string
  }
  blue: {
    [key: number]: string
  }
}

export const colors: COLOR = {
  white: '#ffffff',
  dialogHeaderBg: '#fff',
  textGrey: {
    50: 'rgba(255, 255, 255, 0.5)',
    100: 'rgba(255, 255, 255, 0.2)',
  },
  barBackground: '#4221DE',
  primary: '#FFB900',
  secondary: '#03011B',
  text: '#03011B',
  progressBackground: '#805d00',
  barSecondBackground: 'rgba(66, 33, 222, 0.2)',
  tooltipBackground: '#5050A0',
  barThirdBackground: 'rgba(66, 33, 222, 0.8)',
  blue: {
    1: '#5050A0',
    2: 'rgba(80, 80, 160, 0.95)',
    3: 'rgba(80, 80, 160, 0.5)',
    4: 'rgba(80, 80, 160, 0.2)',
  },
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#7646FF',
      dark: 'rgba(0, 255, 10, 0.88)',
      contrastText: '#262338',
    },
    secondary: {
      main: '#03011B',
      dark: 'rgba(255, 255, 255, 0.88)',
      contrastText: '#ffffff',
      50: 'rgba(3, 1, 27, 0.8)',
      100: 'rgba(3, 1, 27, 0.5)',
      200: 'rgba(3, 1, 27, 0.05)',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: '#FFFFFF',
      default: '#F7F7FC',
    },
    grey: {
      50: 'rgba(255, 255, 255, 0.8)',
      100: 'rgba(255, 255, 255, 0.5)',
      200: 'rgba(255, 255, 255, 0.05)',
      500: 'rgba(255, 255, 255, 0.1)',
      600: 'rgba(255, 255, 255, 0.2)',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: 'Quicksand',
    h1: {
      fontSize: '56px',
      lineHeight: '78px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '48px',
      lineHeight: '72px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '36px',
      lineHeight: '54px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '28px',
      lineHeight: '45px',
      fontWeight: 700,
    },
    h5: {
      fontSize: '22px',
      lineHeight: '35px',
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '18px',
      lineHeight: '29px',
      fontWeight: '600',
    },
    subtitle2: {
      fontSize: '16px',
      lineHeight: '26px',
      fontWeight: '600',
    },
    body1: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '22px',
    },
    body2: {
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '19px',
    },
    button: {
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 600,
      textTransform: 'none',
    },
    overline: {
      fontSize: '18px',
      lineHeight: '28px',
      cursor: 'pointer',
      fontWeight: 600,
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: `
          display: flex;
          align-items: center;
          justify-content: center;
        `,
      },
    },
    MuiModal: {
      styleOverrides: {
        root: `
          display: flex;
          align-items: center;
          justify-content: center;
        `,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: `
          min-width: 118px;
          border-radius: 6px;
          height: 48px;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          line-height: 22px;
          &.Mui-disabled {
            color: #fff;
            background: #D9DBE9;
            box-shadow: none !important;
            cursor: not-allowed !important;
          }
          &.MuiButton-containedPrimary {
            background: linear-gradient(61.18deg, rgba(102, 166, 232, 0) 0%, rgba(135, 143, 248, 0.098) 51.07%, rgba(105, 165, 233, 0.2) 97.23%), #262338;
            box-shadow: 0px 4px 8px rgba(75, 75, 122, 0.1), inset 0px 2px 2px rgba(75, 86, 132, 0.5);
          }
          &.MuiButton-containedPrimary:hover {
            box-shadow: 0px 4px 8px rgba(75, 75, 122, 0.3), inset 0px 2px 2px rgba(75, 86, 132, 0.5) !important;
          }
          &.MuiButton-containedPrimary.Mui-disabled {
            color: #fff;
            background: #D9DBE9;
            box-shadow: none !important;
          }
          &:focus {
            border: 4px solid #c4b7e8 !important;;
            box-shadow: none !important;
          }
          &.MuiButton-containedSecondary {
            background: #F7F7FC;
            color: #373737;
            box-shadow: none;
          }
          &.MuiButton-containedSecondary.Mui-disabled {
            color: rgba(55, 55, 55, 0.3);
            background: #D9DBE9;
            box-shadow: none !important;
          }
          &.MuiButton-containedInfo {
            background: linear-gradient(180deg, #F9F8FF 0%, #F8F7FF 100%);
            box-shadow: 0px 4px 4px rgba(124, 115, 226, 0.3), inset 0px -2px 2px rgba(182, 168, 240, 0.3), inset 0px 2px 2px #FFFFFF;
            color: #7646FF;
          }
          &.MuiButton-containedInfo:hover {
            box-shadow: 0px 5px 10px rgba(113, 104, 210, 0.8), inset 0px -2px 2px rgba(182, 168, 240, 0.3), inset 0px 2px 2px #FFFFFF;
          }
          &.MuiButton-containedInfo.Mui-disabled {
            opacity: 0.5;
          }
          &.MuiButton-containedWarning {
            background: rgba(255, 255, 255, 0.3);
            mix-blend-mode: normal;
            box-shadow: none;
          }
          &.MuiButton-containedInfo.Mui-disabled {
            opacity: 0.6;
          }
          &.MuiButton-containedSuccess {
            background: linear-gradient(82.51deg, #A476FF 0%, #7E7BFF 42.39%, #6096FF 74.2%, #53CBFF 100%);
            color: #fff;
          }
          &.MuiButton-containedSuccess.Mui-disabled {
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(82.67deg, #C3A5FF -12.69%, #A8A6FF 31.8%, #A8C5FF 80.81%, #BAE3F4 113.32%);
            color: rgba(255, 255, 255, 0.7);
          }
        `,
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .header-padding {
          padding-top: 70px;
        }
        a {
          text-decoration: none;
          color: unset;
        }
        .MuiMenu-paper {
          box-shadow: 0px 0px 32px rgb(0 0 0 / 10%) !important;
          border-radius: 16px !important;
          width: 240px !important;
          background: white !important;
          margin-top: 15px !important;
          left: 190px !important;
        }
      `,
    },
  },
})

export default theme
