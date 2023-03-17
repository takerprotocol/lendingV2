import { ReactNode, useCallback, useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { MenuItem, Select, SelectProps } from '@mui/material'

const StyledSelect = styled(Select)`
  .MuiPaper-elevation {
    margin-left: -100px !important;
    border: 1px solid #eff0f6 !important;
    box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3) !important;
    border-radius: 12px !important;
  }
  display: flex;
  width: 240px;
  height: 48px;
  /* Cool Gray 300 */
  border: 1px solid #d9dbe9;
  border-radius: 8px;
  align-items: center;
  padding-right: 12px;
  padding-left: 12px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
  fieldset {
    border: 1px solid #d9dbe9;
  }
  ::before,
  ::after {
    border-bottom: none !important;
  }
  .MuiInput-input {
    padding-right: 0px !important;
    width: 165px;
    background: transparent !important;
    padding-left: 6px;
    &.open {
      border: 1px solid #262338 !important;
    }
  }
`

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  border-radius: 6px;
  padding: 12px;
  margin: 0 0 0 12px;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #14142a;
  :hover {
    background: #f7f7fc;
  }
  &.Mui-selected {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height, or 138% */
    background-color: #ffffff !important;
    color: #7646ff;
  }
`

type CustomizedSelectProps = SelectProps & {
  options: any
  filter: number
  valueIndex: number
  setValueIndex: Function
  allFilterType?: number
}

export default function CustomizedSelect(props: CustomizedSelectProps) {
  const [open, setOpen] = useState(false)
  const Options = useMemo(
    () =>
      props.options.map((option: any) => (
        <StyledMenuItem
          sx={{
            marginRight: `${props.options[0].name === 'Default Sort' ? '12px' : '28px'}`,
          }}
          key={`${option.value}-item`}
          value={option.value}
          onClick={() => {
            if (props.setValueIndex) {
              props.setValueIndex(option.value)
            }
          }}
        >
          {option.name}
        </StyledMenuItem>
      )),
    [props]
  )
  const Arrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9263 10L11.9631 16.9632L4.99994 10" stroke="#A0A3BD" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  const openArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.9263 14.9629L11.9632 7.99972L5 14.9629"
        stroke="#6E7191"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
  const onChange = useCallback(
    (event: any, child: ReactNode) => {
      if (props.onChange) {
        props.onChange(event, child)
      }
    },
    [props]
  )
  return (
    <div>
      <StyledSelect
        className={open ? 'focus' : ''}
        startAdornment={props.startAdornment}
        IconComponent={open ? openArrow : Arrow}
        variant="standard"
        open={open}
        onClick={() => {
          if (!(props.filter === 1)) {
            if (props.allFilterType === 0) {
              setOpen(!open)
            }
          }
        }}
        // className={props.startAdornment ? 'withicon' : ''}
        value={props.valueIndex}
        onChange={onChange}
        sx={{
          border: `${open ? '1px solid #262338 !important' : ' 1px solid #d9dbe9;'}`,
          opacity: `${props.allFilterType === 1 ? '0.4' : '1'}`,
        }}
        disabled={props.filter === 1}
      >
        {Options}
      </StyledSelect>
    </div>
  )
}
