import * as React from 'react'
import Slider, { SliderThumb } from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
// import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box'
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
    border: 'none',
  },
  '& .MuiSlider-rail': {
    background: '#eff0f6',
  },
  '& .MuiSlider-thumb': {
    height: '12px',
    width: '12px',
    background: 'linear-gradient(213.69deg, #66DEC8 14%, #4BC8B1 92%)',
    border: '2px solid #FFFFFF',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
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

type AirbnbThumbComponentProps = React.HTMLAttributes<unknown>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  )
}
interface CustomizedSliderProps {
  colorClass: string
}
export default function CustomizedSlider({ colorClass }: CustomizedSliderProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <PrettoSlider
        className={`Slider-${colorClass}`}
        valueLabelDisplay="off"
        aria-label="pretto slider"
        defaultValue={20}
      />
    </Box>
  )
}
