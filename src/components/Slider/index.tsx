import * as React from 'react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
// import Tooltip from '@mui/material/Tooltip';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CustomizedSliderProps {
  riskLevelTag: string
  sliderValue?: number
  setSlider?: Function
}
const PrettoSlider = styled(Slider)({
  margin: '0 7px',
  width: 'calc(100% - 14px)',
  // width: `${calc('100%' - '14px')}`,
  color: '#5fdac4',
  height: 8,
  padding: 0,
  // '&.max': {
  // '& .MuiSlider-thumb': {
  //   transform: `translate(-100%, -50%)`,
  // },
  // },
  '& .MuiSlider-track': {
    border: '1px solid #EFF0F6',
    height: '6px',
    maxWidth: '100% !important',
  },
  '& .MuiSlider-rail': {
    background: '#eff0f6',
  },
  '& .MuiSlider-thumb': {
    height: '14px',
    width: '14px',
    border: '2px solid #FFFFFF',
    background: 'linear-gradient(213.69deg, #66DEC8 14%, #4BC8B1 92%)',
    boxShadow: '0px 2px 4px rgba(155, 192, 186, 0.4)',
    transform: `translate( -50%, -50%)`,
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:after': {
      display: 'none',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: '12px',
    height: '12px',
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#5fdac4',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:after': { display: 'none' },
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(0, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})
export default function CustomizedSlider({ setSlider, riskLevelTag, sliderValue }: CustomizedSliderProps) {
  return (
    <PrettoSlider
      // className={`Slider-${riskLevelTag} ${(sliderValue || 0) >= 96 && 'max'}`}
      className={`Slider-${riskLevelTag}`}
      // valueLabelDisplay="off"
      value={sliderValue}
      // aria-label="pretto slider"
      onChange={(el: any) => {
        if (setSlider) {
          setSlider(el.target.value)
          // console.log('@@@@', el.target.value)
        }
      }}
    />
  )
}
