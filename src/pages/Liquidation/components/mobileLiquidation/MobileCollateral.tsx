import { Box, styled, Typography } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import mobileCollaterals from 'assets/images/svg/liquidation/mobileCollaterals-bg.svg'
import mobileSearch from 'assets/images/svg/liquidation/mobileSearch-icon.svg'
import SortIcon from 'assets/images/svg/liquidation/mobileSort-icon.svg'
import FilterIcon from 'assets/images/svg/liquidation/mobileFilter-icon.svg'
import { CollateralModel } from 'services/type/nft'
import { useAppDispatch } from 'state/hooks'
import MobileCollateralList from './MobileCollateralList'
import MobileCollateralPagination from './MobileCollateralPagination'
import { useCallback, useEffect, useMemo, useState } from 'react'
import MobileCollateralsSort from './MobileCollateralsSort'
import MobileFilterModal from './MobileFilterModal'
import MobileCollateralsType from './MobileCollateralsType'
import { useCollateralsType } from 'state/user/hooks'
import { setCollateralsType } from 'state/user/reducer'
import MobileEmptyState from './MobileEmptyState'
const MobileCollateralBox = styled(Box)`
  background-image: url(${mobileCollaterals});
  backdrop-filter: blur(1.5625rem);
  background-repeat: no-repeat;
  border-radius: 0.75rem;
  padding: 1rem 0 2.375rem 0;
`
const CollateralsTypography = styled(Typography)`
  font-weight: 700;
  font-size: 18px;
  line-height: 140%;
`
const SortTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`
const SortAndFilterBox = styled(SpaceBetweenBox)`
  background: rgba(217, 219, 233, 0.3);
  border-radius: 0.625rem;
  padding: 0.75rem 0.5rem;
`
const ValueBox = styled(SpaceBetweenBox)`
  width: 6.875rem;
  padding: 0.375rem 0.25rem 0.375rem 0.75rem;
  background: rgba(217, 219, 233, 0.3);
  border-radius: 0.375rem;
`
const ValueTypography = styled(Typography)`
  width: 4.75rem;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.375rem;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  color: #14142a;
`
const SearchInput = styled(`input`)`
  width: 6.375rem;
  height: 1.375rem;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  border: 0;
  outline: none;
  padding: 0;
  background: 0;
`

interface MobileCollateralProps {
  collaterals: Array<CollateralModel>
  setSearchTerms: Function
  searchTerms: Array<string>
  setSort: Function
  sort: number
  setCollectionFilter: Function
  collectionFilter: number
  setDebtFilter: Function
  debtFilter: number
}
export default function MobileCollateral({
  collaterals,
  setSort,
  collectionFilter,
  setCollectionFilter,
  setSearchTerms,
  searchTerms,
  sort,
  setDebtFilter,
  debtFilter,
}: MobileCollateralProps) {
  const [openFilter, setOpenFilter] = useState(false)
  const [search, setSearch] = useState<boolean>(false)
  const collateralsType = useCollateralsType()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [anchorElCollaterals, setAnchorElCollaterals] = useState<null | HTMLElement>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (searchTerms[0]) {
      setSearchTerms(searchTerms.filter((currentTerm: string) => currentTerm !== searchTerms[0]))
      setSearchValue(searchTerms[0])
    } else {
      setSearchValue(String(e.currentTarget.value))
    }
  }
  const searchType = useMemo(() => {
    return !search && searchTerms[0]
  }, [search, searchTerms])
  const handleAddSearchTerm = useCallback((term: string) => {
    setSearchTerms([term])
    setSearchValue('')
    setSearch(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const openCollaterals = Boolean(anchorElCollaterals)
  const handleClickCollaterals = (event: any) => {
    setAnchorElCollaterals(event.currentTarget)
  }
  const AllFilterType = useMemo(() => {
    return sort === 0 && collectionFilter === 0 && debtFilter === 0 && collaterals.length === 0
  }, [collaterals.length, collectionFilter, debtFilter, sort])
  const sortValue = useMemo(() => {
    switch (sort) {
      case 1:
        return 'Collateral ↓'
      case 2:
        return 'Collateral ↑'
      case 3:
        return 'Total Debt ↓'
      case 4:
        return 'Total Debt ↑'
      case 5:
        return 'Risk Level: Low to High'
      case 6:
        return 'Risk Level: High to Low'
      default:
        return 'Default Sort'
    }
  }, [sort])
  useEffect(() => {
    if (!(sort === 5 || sort === 6)) {
      if (collateralsType !== 'All Borrowers') {
        dispatch(setCollateralsType('All Borrowers'))
      }
    }
  }, [collateralsType, dispatch, sort])
  const FilterCount = useMemo(() => {
    let count = 0
    if (debtFilter !== 0) {
      count++
    }
    if (collectionFilter !== 0) {
      count++
    }
    return count
  }, [collectionFilter, debtFilter])
  return (
    <MobileCollateralBox>
      <Box m="0 1rem">
        <SpaceBetweenBox mb="0.5rem">
          <FlexBox
            onClick={(event: any) => {
              if (sort === 5 || sort === 6) {
                handleClickCollaterals(event)
              }
            }}
            ml="0.5rem"
          >
            <CollateralsTypography>{collateralsType}</CollateralsTypography>
            {(sort === 5 || sort === 6) && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 10.5L12 15.5L7 10.5"
                  stroke="#14142A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </FlexBox>
          <FlexBox>
            <img
              onClick={() => {
                setSearch(true)
              }}
              src={mobileSearch}
              alt=""
            />
            {search && (
              <SearchInput
                value={searchValue}
                placeholder={'Search address'}
                onChange={handleSearch}
                autoFocus={true}
                onFocus={handleSearch}
                onBlur={() => {
                  handleAddSearchTerm(searchValue)
                }}
                onKeyDown={(e: any) => {
                  if (e.code === 'Tab' || e.code === 'Enter') {
                    handleAddSearchTerm(searchValue)
                    e.target.blur()
                  }
                }}
              />
            )}
            {searchType && (
              <ValueBox
                onClick={() => {
                  setSearch(true)
                }}
              >
                <ValueTypography>{searchTerms[0]}</ValueTypography>
                <svg
                  onClick={() => {
                    handleAddSearchTerm('')
                    setSearch(false)
                  }}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.0468 5.85964C13.2971 5.60934 13.2971 5.20352 13.0468 4.95321C12.7965 4.70291 12.3907 4.70291 12.1404 4.95321L9 8.09357L5.85964 4.95321C5.60934 4.70291 5.20352 4.70291 4.95321 4.95321C4.70291 5.20352 4.70291 5.60934 4.95321 5.85964L8.09357 9L4.95321 12.1404C4.70291 12.3907 4.70291 12.7965 4.95321 13.0468C5.20352 13.2971 5.60934 13.2971 5.85964 13.0468L9 9.90643L12.1404 13.0468C12.3907 13.2971 12.7965 13.2971 13.0468 13.0468C13.2971 12.7965 13.2971 12.3907 13.0468 12.1404L9.90643 9L13.0468 5.85964Z"
                    fill="#A0A3BD"
                  />
                </svg>
              </ValueBox>
            )}
          </FlexBox>
        </SpaceBetweenBox>
        <SortAndFilterBox>
          <FlexBox
            onClick={(event: any) => {
              if (!AllFilterType) {
                handleClick(event)
              }
            }}
          >
            <img src={SortIcon} alt="" />
            <FlexBox sx={{ opacity: `${AllFilterType ? '0.5' : '1'}` }}>
              <SortTypography color={sort === 0 ? '#14142A' : '#7646FF'} ml="0.25rem">
                {sortValue}
              </SortTypography>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d={!open ? 'M16 10L11.5 15L7 10' : 'M16 15L11.5 10L7 15'}
                  stroke={sort === 0 ? '#14142A' : '#7646FF'}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </FlexBox>
          </FlexBox>
          <FlexBox
            onClick={() => {
              if (!AllFilterType) {
                setOpenFilter(true)
              }
            }}
          >
            <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 0.5V23.5" stroke="#D9DBE9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <FlexBox sx={{ opacity: `${AllFilterType ? '0.5' : '1'}` }}>
              <SortTypography color={openFilter || FilterCount !== 0 ? '#7646FF' : '#14142A'} ml="1rem">
                Filter
              </SortTypography>
              {FilterCount === 2 ? (
                <SortTypography ml="0.25rem" color="#7646FF">
                  ({FilterCount})
                </SortTypography>
              ) : FilterCount === 1 ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 18V11L17 7H7L10 11V16"
                    stroke="#7646FF"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <img src={FilterIcon} alt="" />
              )}
            </FlexBox>
          </FlexBox>
        </SortAndFilterBox>
      </Box>
      {collaterals.length !== 0 ? (
        <>
          {collaterals.map((el: any, index: number) => (
            <MobileCollateralList {...el} key={`collateral-${JSON.stringify(el)}${index}`}></MobileCollateralList>
          ))}
          <MobileCollateralPagination collaterals={collaterals} onPageSelect={(number: number) => null} />
        </>
      ) : (
        <MobileEmptyState searchTerm={searchTerms}></MobileEmptyState>
      )}
      <MobileCollateralsSort
        sort={sort}
        setSort={setSort}
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      ></MobileCollateralsSort>
      <MobileFilterModal
        collaterals={collaterals}
        setDebtFilter={setDebtFilter}
        debtFilter={debtFilter}
        collectionFilter={collectionFilter}
        setCollectionFilter={setCollectionFilter}
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
      ></MobileFilterModal>
      <MobileCollateralsType
        open={openCollaterals}
        anchorEl={anchorElCollaterals}
        setAnchorEl={setAnchorElCollaterals}
      ></MobileCollateralsType>
    </MobileCollateralBox>
  )
}
