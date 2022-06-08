import { useCallback, useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import { MenuItem, Select, SelectProps } from '@mui/material'

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
    border: 1px solid #d9dbe9 !important;
  }
  ::before,
  ::after {
    border-bottom: none !important;
  }
  .MuiInput-input {
    background: transparent !important;
    padding-left: 10px;
  }
`

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
        <StyledMenuItem key={`${option.value}-item`} value={option.value}>
          {option.name}
        </StyledMenuItem>
      )),
    [props.options]
  )

  const [open, setOpen] = useState(false)

  const [value, setValue] = useState('0')
  const onChange = useCallback((event: any) => setValue(String(event.target.value)), [])

  return (
    <div>
      <StyledSelect
        {...props}
        IconComponent={Arrow}
        variant="standard"
        open={open}
        onClick={() => setOpen(!open)}
        className={props.startAdornment ? 'withicon' : ''}
        value={value}
        onChange={onChange}
      >
        {Options}
      </StyledSelect>
    </div>
  )
}
