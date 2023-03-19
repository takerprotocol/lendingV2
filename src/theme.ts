import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
// eslint-disable-next-line no-restricted-imports
import 'react-toastify/dist/ReactToastify.css'
import { isMobile } from 'utils/userAgent'
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
  secondary: '#14142A',
  text: '#14142A',
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
export const theme = createTheme({
  palette: {
    primary: {
      main: '#7646FF',
      dark: 'rgba(0, 255, 10, 0.88)',
      contrastText: '#14142A',
    },
    secondary: {
      main: '#14142A',
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
    MuiList: {
      styleOverrides: {
        root: `
        max-height: 265px;
        overflow: auto;
        padding:12px 0px 12px 0px;
        &::-webkit-scrollbar {
          display: block !important;
          margin-right: 6px !important;
          width: 12px !important;
        }
        &::-webkit-scrollbar-track {
          width: 4px !important;
          margin-right: 6px !important;
        }
        &::-webkit-scrollbar-thumb {
          width: 4px !important;
          height: 92px !important;
          margin-right: 6px !important;
          background-color:  #EFF0F6 !important;
          border-right: 6px solid #fff;
          border-radius: 2px !important;
        }
        `,
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: `
          margin-top: 21px !important;
          margin-left: -5.5px;
          border: 1px solid #eff0f6 !important;
          box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3) !important;
          border-radius: 12px !important;
      `,
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: `
          padding: 0;
          box-sizing: border-box;
          border-radius: 8px;
          height: 45px;
          width: 100%;
          font-weight: 500;
          color: #14142A;
          input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        .MuiInputBase-input {
          padding: 0;
        }
        .MuiOutlinedInput-notchedOutline {
          border-width: 0!important;
        }
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
            box-shadow: 0px 4px 8px rgba(75, 75, 122, 0.3), inset 0px 2px 2px rgba(75, 86, 132, 0.5);
            border: none !important;
          }
          &.MuiButton-containedPrimary.Mui-disabled {
            color: #fff;
            background: #D9DBE9;
            box-shadow: none !important;
          }
          // &:focus {
          //   border: 4px solid #c4b7e8;
          //   box-shadow: none !important;
          //   box-sizing: border-box;
          // }
          &:focus-visible {
            border: 4px solid #c4b7e8;
            box-shadow: none !important;
            box-sizing: content-box;
            padding: 0 !important;
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
            border: none !important;
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
            background: linear-gradient(82.51deg, #7076FF 0%, #796AFF 48.84%, #8E6BFD 100%);
            box-shadow: 0px 5px 10px rgba(125, 112, 239, 0.1);
            color: #fff;
          }
          &.MuiButton-containedSuccess.Mui-disabled {
            background: linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), linear-gradient(82.67deg, #C3A5FF -12.69%, #A8A6FF 31.8%, #A8C5FF 80.81%, #BAE3F4 113.32%);
            color: rgba(255, 255, 255, 0.7);
          }
          &.MuiButton-containedError{
            background: #F9E7EA;
            color: #E1536C;
          }
        `,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: `
        .MuiCheckbox-root {
          border-radius: 4px;
          color: #EFF0F6;
          border: none;
        }
        &.Mui-checked {
          color: #4E4B66;
        }
      `,
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: `
        &.MuiSwitch-root {
          .MuiSwitch-input {
            display: none;
          }
          width: 50px;
          height: 28px;
          padding: 2px;
          background: #d9dbe9;
          border-radius: 20px;
          .Mui-checked {
            transform: translateX(22px);
          }
          .MuiSwitch-switchBase {
            width: 24px;
            height: 24px;
            color: #ffffff;
            margin-right: 2px;
            display: block !important;
            padding: 2px;
          }
          .MuiSwitch-track {
            width: 0px;
            height: 0px;
          }
          .MuiSwitch-thumb {
            width: 24px;
            height: 24px;
            display: block;
            background-color: linear-gradient(180deg, #fbfbfc 0%, #f7f7f8 100%);
            box-shadow: 0px 4px 4px rgba(200, 202, 217, 0.2), inset 0px -1px 1px rgba(219, 224, 238, 0.31),
              inset 0px 1px 1px #ffffff;
          }
        }
      `,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        popper: `
        .MuiTooltip-tooltip {
          background: #14142a !important;
          border-radius: 6px !important;
          font-family: 'Quicksand' !important;
          font-style: normal !important;
          font-weight: 600 !important;
          font-size: 12px !important;
          line-height: 160% !important;
          text-align: center !important;
          color: #ffffff !important;
          padding: 4px 8px !important;
          margin-bottom:0.75rem !important;
        }
        .MuiTooltip-arrow {
          ::before {
            background-color:  #14142a !important;
          }
        }
      `,
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        .header-padding {
          padding-top: 70px;
        }
        body {
          color: #14142A;
        }
        a {
          text-decoration: none;
          color: unset;
        }
        ${
          isMobile
            ? `.Toastify {
          .Toastify__toast-container {
            top: 3.625rem;
            padding: 0 1rem;
          }
          .Toastify__toast {
            padding: 1rem 1.5rem 1rem 1rem;        
            background: rgba(255, 255, 255, 0.9);            
            border: 1px solid #EFF0F6;
            box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.05);
            backdrop-filter: blur(80px);            
            border-radius: 12px;
            .error, .success {
              width: 38px;
              margin-right: 0.75rem;
            }
            .toast-close {
              width: 1rem;
            }
          }
          .MuiTypography-subtitle2{
            font-family: 'Quicksand';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 160%;
            color: #262338;
          }
          .MuiTypography-subtitle1{
            font-size: 16px !important;
          }
          a{
            font-weight: 600 !important;
            font-size: 14px !important;
            line-height: 160% !important;
            text-decoration-line: underline;
            color: #7646FF !important;
            margin-right: 0.5rem;
          }
          .Toastify__toast-icon {
            width: 38px;
            margin-right: 0.75rem;
            svg {
              width: 28px;
              height: 28px;
              background: #fff;
              border-radius: 50%;
            }
          }
          .Toastify__toast-body {
            padding: 0 0 0 0;
            font-weight: 700;
            font-size: 16px;
            line-height: 140%;
            display: flex;
            align-items: center;
            letter-spacing: 0.02em;
            color: #14142A;
          }
          .Toastify__toast--error {
            .success {
              display: none;
            }
          }
          .Toastify__toast--success {
            .error {
              display: none;
            }
            
          }
        }`
            : `.Toastify {
              .Toastify__toast-container {
                width: 480px;
                top: 78px;
              }
              .Toastify__toast {
                padding: 24px;
                background: rgba(255, 255, 255, 0.9);            
                border: 1px solid #EFF0F6;
                box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.05);
                backdrop-filter: blur(80px);            
                border-radius: 12px;
                .error, .success {
                  width: 38px;
                  margin-right: 24px;
                }
                .toast-close {
                  width: 24px;
                }
              }
              .Toastify__toast-icon {
                width: 38px;
                margin-right: 24px;
                svg {
                  width: 28px;
                  height: 28px;
                  background: #fff;
                  border-radius: 50%;
                }
              }
              .Toastify__toast-body {
                padding: 0 30px 0 0;
                font-weight: 700;
                font-size: 18px;
                line-height: 160%;
                display: flex;
                align-items: center;
                letter-spacing: 0.02em;
                color: #14142A;
              }
              .Toastify__toast--error {
                .success {
                  display: none;
                }
              }
              .Toastify__toast--success {
                .error {
                  display: none;
                }
                
              }
        }`
        }
        .MuiMenu-paper {
          box-shadow: 0px 0px 32px rgb(0 0 0 / 10%) !important;
          border-radius: 16px !important;
          width: 240px !important;
          background: white !important;
          margin-top: 15px !important;
        }
        .Healthy {
          color: #4BC8B1;
          border-color: #4BC8B1;
        }
        .Risky {
          color: #EF884F;
          border-color: #EF884F;
        }
        .High-Risk{
          color: #E1536C;
          border-color: #E1536C;
        }
        .In-liquidation{
          color: #E1536C;
          border-color: #E1536C;
        }
        .Slider-Healthy {
          background: #EFF0F6;
          color:  #66DEC8 !important;
          & .MuiSlider-valueLabel {
            backgroundColor:  #66DEC8 !important;
            }
          & .MuiSlider-thumb{
            background: linear-gradient(213.69deg, #66DEC8 14%, #4BC8B1 92%) !important;
          }
        }
        .Slider-Risky {
          background: #EFF0F6;
          color: #FBA170 !important;
          & .MuiSlider-valueLabel {
            backgroundColor:  #EF884F !important;
            }
          & .MuiSlider-thumb{
            background: linear-gradient(180deg, #FBA170 0%, #EF884F 100%) !important;
          }
        }
        .Slider-High-Risk{
          background: #EFF0F6;
          color: #FF7272 !important;
          & .MuiSlider-valueLabel {
            backgroundColor: #E1536C !important;
            }
            & .MuiSlider-thumb{
              background: linear-gradient(180deg, #FF7272 0%, #E1536C 100%) !important;
            }
        }
        .walletconnect-modal__footer {
          width: 100%;
          overflow: auto;
        }
        .Slider-In-liquidation{
          background: #EFF0F6;
          color: #FF7272 !important;
          & .MuiSlider-valueLabel {
            backgroundColor: #E1536C !important;
            }
            & .MuiSlider-thumb{
              background: linear-gradient(180deg, #FF7272 0%, #E1536C 100%) !important;
            }
        }
      `,
    },
  },
})

export default theme
