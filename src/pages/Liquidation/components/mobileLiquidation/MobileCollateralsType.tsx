import * as React from 'react'
import { styled, Menu, MenuItem } from '@mui/material'
import { setCollateralsType } from 'state/user/reducer'
import { useAppDispatch } from 'state/hooks'
import { useCollateralsType } from 'state/user/hooks'
const CollateralsMenu = styled(Menu)`
  .MuiPaper-root {
    max-width: 10.0625rem !important;
    margin-top: 0.5625rem !important;
    margin-left: -0.5625rem !important;
    border: 1px solid #eff0f6 !important;
    box-shadow: 0px 0.625rem 1.25rem rgba(218, 218, 238, 0.3) !important;
    border-radius: 0.75rem !important;
  }
  .MuiList-root {
    width: 10.0625rem !important;
    margin: 0rem !important;
    padding: 1rem 0 0 1rem;
  }
  .MuiMenuItem-root {
    margin: 0rem !important;
    padding: 0 0 1rem 0 !important;
    min-height: 1.375rem;
  }
`
const StyledMenuItem = styled(MenuItem)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  line-height: 1.375rem !important;
  color: #14142a;
  display: flex;
  border-radius: 0.375rem;
  justify-content: flex-start;
  align-items: center;
  &.selected {
    font-family: 'Quicksand';
    font-style: normal;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.375rem;
    background-color: #ffffff !important;
    color: #7646ff;
  }
`
interface CollateralsTypeProps {
  open: boolean
  anchorEl: any
  setAnchorEl: any
}
export default function MobileCollateralsType({ open, anchorEl, setAnchorEl }: CollateralsTypeProps) {
  const dispatch = useAppDispatch()
  const collateralsType = useCollateralsType()
  return (
    <div>
      <CollateralsMenu
        id="basic-menu"
        anchorEl={anchorEl}
        className="Collaterals"
        open={open}
        onClose={() => {
          setAnchorEl(null)
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <StyledMenuItem
          className={collateralsType === 'All Borrowers' ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            dispatch(setCollateralsType('All Borrowers'))
          }}
        >
          All Borrowers
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
