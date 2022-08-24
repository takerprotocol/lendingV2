import * as React from 'react'
import { styled, Menu, MenuItem } from '@mui/material'
import { setCollateralsType } from 'state/user/reducer'
import { useAppDispatch } from 'state/hooks'
import { useCollateralsType } from 'state/user/hooks'
const CollateralsMenu = styled(Menu)`
  .MuiList-root {
    width: 224px;
  }
`
const StyledMenuItem = styled(MenuItem)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #14142a;
  display: flex;
  border-radius: 6px;
  padding: 12px;
  margin: 0 0 0 12px;
  justify-content: flex-start;
  align-items: center;
  :hover {
    background: #f7f7fc;
  }
  &.selected {
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
interface CollateralsTypeProps {
  open: boolean
  anchorEl: any
  setAnchorEl: any
}
export default function CollateralsType({ open, anchorEl, setAnchorEl }: CollateralsTypeProps) {
  const dispatch = useAppDispatch()
  const collateralsType = useCollateralsType()
  return (
    <div>
      <CollateralsMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null)
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem
          className={collateralsType === 'All Collaterals' ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            dispatch(setCollateralsType('All Collaterals'))
          }}
        >
          All Collaterals
        </StyledMenuItem>
        <StyledMenuItem
          className={collateralsType === 'Liquidate' ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            dispatch(setCollateralsType('Liquidate'))
          }}
        >
          Liquidate
        </StyledMenuItem>
        <StyledMenuItem
          className={collateralsType === 'Without Liquidation' ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            dispatch(setCollateralsType('Without Liquidation'))
          }}
        >
          Without Liquidation
        </StyledMenuItem>
      </CollateralsMenu>
    </div>
  )
}
