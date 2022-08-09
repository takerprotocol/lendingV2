import * as React from 'react'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
// import Tooltip from '@mui/material/Tooltip';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
  children: React.ReactElement
  value: number
}
const PrettoSlider = styled(Slider)({
  color: '#5fdac4',
  height: 8,
  padding: 0,
  '& .MuiSlider-track': {
    border: '1px solid #FFFFFF',
    height: '6px',
  },
  '& .MuiSlider-rail': {
    background: '#eff0f6',
  },
  '& .MuiSlider-thumb': {
    height: '14px',
    width: '14px',
    border: '2px solid #FFFFFF',
    background: 'linear-gradient(213.69deg, #66DEC8 14%, #4BC8B1 92%)',
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
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})
interface CustomizedSliderProps {
  riskLevelTag: string
  setSliderValue?: Function
  sliderValue?: number
}
export default function CustomizedSlider({ riskLevelTag, setSliderValue, sliderValue }: CustomizedSliderProps) {
  return (
    <PrettoSlider
      className={`Slider-${riskLevelTag}`}
      valueLabelDisplay="off"
      value={sliderValue}
      aria-label="pretto slider"
      defaultValue={20}
    />
  )
}
