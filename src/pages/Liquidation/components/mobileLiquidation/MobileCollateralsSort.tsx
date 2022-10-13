import * as React from 'react'
import { styled, Menu, MenuItem } from '@mui/material'
const CollateralsMenu = styled(Menu)`
  .MuiPaper-root {
    max-width: 14.3125rem !important;
    margin-top: 1.25rem !important;
    margin-left: -0.5625rem !important;
    border: 1px solid #eff0f6 !important;
    box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3) !important;
    border-radius: 0.75rem !important;
  }
  .MuiList-root {
    width: 14.3125rem !important;
    max-height: 13.625rem !important;
    padding: 0 0 1rem 0;
    margin: 0rem;
  }
`
const StyledMenuItem = styled(MenuItem)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  min-height: 38px;
  font-size: 0.875rem;
  line-height: 1.375rem;
  color: #14142a;
  display: flex;
  padding: 1rem 1rem 0 1rem;
  justify-content: flex-start;
  align-items: center;
  :hover {
    background: #f7f7fc;
  }
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
  setSort: Function
  sort: number
}
export default function MobileCollateralsSort({ sort, setSort, open, anchorEl, setAnchorEl }: CollateralsTypeProps) {
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
          className={sort === 0 ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            setSort(0)
          }}
        >
          Default sort
        </StyledMenuItem>
        <StyledMenuItem
          className={sort === 1 ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            setSort(1)
          }}
        >
          Collateral ↓
        </StyledMenuItem>
        <StyledMenuItem
          className={sort === 2 ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            setSort(2)
          }}
        >
          Collateral ↑
        </StyledMenuItem>
        <StyledMenuItem
          className={sort === 3 ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            setSort(3)
          }}
        >
          Total Debt ↓
        </StyledMenuItem>
        <StyledMenuItem
          className={sort === 4 ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            setSort(4)
          }}
        >
          Total Debt ↑
        </StyledMenuItem>
        <StyledMenuItem
          className={sort === 5 ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            setSort(5)
          }}
        >
          Risk Level: Low to High
        </StyledMenuItem>
        <StyledMenuItem
          className={sort === 6 ? 'selected' : ''}
          onClick={() => {
            setAnchorEl(null)
            setSort(6)
          }}
        >
          Risk Level: High to Low
        </StyledMenuItem>
      </CollateralsMenu>
    </div>
  )
}
