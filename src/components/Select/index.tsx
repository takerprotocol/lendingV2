import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material'

const StyledSelect = styled(Select)`
  display: flex;
  width: 240px;
  height: 48px;
  /* Cool Gray 300 */
  border: 1px solid #d9dbe9;
  border-radius: 50px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 2px;
  cursor: pointer;
  fieldset {
    border: 1px solid #d9dbe9;
  }
  ::before,
  ::after {
    border-bottom: none !important;
  }
  .MuiInput-input {
    background: transparent !important;
    padding-left: 10px;
    &.open {
      border: 1px solid #7646ff !important;
    }
  }
`

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  border-radius: 6px;
  padding: 12px;
  margin: 0 12px 0 12px;
  justify-content: flex-start;
  align-items: center;
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

const Arrow = () => (
  <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.9263 1L7.96317 7.96317L1 1"
      stroke="#6E7191"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type CustomizedSelectProps = SelectProps & { options: { value: any; name: string | JSX.Element }[] }

export default function CustomizedSelect(props: CustomizedSelectProps) {
  const Options = useMemo(
    () =>
      props.options.map((option: any) => (
        <StyledMenuItem
          sx={{ marginRight: `${props.options[0].name === 'All Debt' ? '28px' : '12px'}` }}
          key={`${option.value}-item`}
          value={option.value}
        >
          {option.name}
        </StyledMenuItem>
      )),
    [props.options]
  )

  const [open, setOpen] = useState(false)

  const [value, setValue] = useState('0')
  const onChange = useCallback(
    (event: SelectChangeEvent<unknown>, child: ReactNode) => {
      setValue(event.target.value as string)
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
        {...props}
        IconComponent={Arrow}
        variant="standard"
        open={open}
        onClick={() => setOpen(!open)}
        // className={props.startAdornment ? 'withicon' : ''}
        value={value}
        onChange={onChange}
        sx={{
          border: `${open ? '1px solid #7646ff !important' : 'border: 1px solid #d9dbe9;'}`,
        }}
      >
        {Options}
      </StyledSelect>
    </div>
  )
}
