import { Box, styled, Typography } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import mobileCollaterals from 'assets/images/svg/liquidation/mobileCollaterals-bg.svg'
import SortIcon from 'assets/images/svg/liquidation/mobileSort-icon.svg'
import FilterIcon from 'assets/images/svg/liquidation/mobileFilter-icon.svg'
import { CollateralModel, CollectionsModel } from 'services/type/nft'
import { useAppDispatch } from 'state/hooks'
import MobileCollateralList from './MobileCollateralList'
import MobileCollateralPagination from './MobileCollateralPagination'
import { useCallback, useMemo, useState } from 'react'
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
  background-size: 100%;
  border-radius: 0.75rem;
  padding: 1.7188rem 0 2.375rem 0;
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
  margin-left: 0.375rem;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
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
  max-width: 6.375rem;
  height: 1.375rem;
  margin-left: 0.375rem;
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
  &::placeholder {
    color: rgba(110, 113, 145, 0.7);
  }
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
        return 'Heath Level: Low to High'
      case 6:
        return 'Heath Level: High to Low'
      default:
        return 'Default Sort'
    }
  }, [sort])
  function resetFilters() {
    setSort(0)
    setDebtFilter(0)
    setCollectionFilter(0)
    handleAddSearchTerm('')
    dispatch(setCollateralsType('All Borrowers'))
  }
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
  const CollateralList = useMemo(() => {
    return (
      collaterals
        // .filter(collectionsFilterFunction)
        // .filter(deptFilterFunction)
        // .sort(sortOptionsFunction)
        // .slice(+times(minus(currentPage, 1), 16), +currentPageIndex)
        .map((collateral: any, index: number) => {
          const nfts = collateral.collections.reduce(
            (acc: any, current: CollectionsModel) => acc + current.tokens.length,
            0
          )
          return (
            <MobileCollateralList
              key={`collateral-${JSON.stringify(collateral)}${index}`}
              {...collateral}
              nfts={nfts}
            />
          )
        })
    )
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [collaterals, collectionFilter, debtFilter, sort, searchTerms])
  return (
    <MobileCollateralBox>
      <Box m="0 1rem">
        <SpaceBetweenBox mb="1.1875rem">
          <FlexBox
            onClick={(event: any) => {
              handleClickCollaterals(event)
            }}
            ml="0.5rem"
          >
            <CollateralsTypography>{collateralsType}</CollateralsTypography>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 10.5L12 15.5L7 10.5"
                stroke="#14142A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </FlexBox>
          <FlexBox mr={!searchType ? `${searchValue === '' ? '0.5rem' : '0'}` : '0'}>
            <svg
              onClick={() => {
                setSearch(true)
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.7753 18.6511L16.8091 15.7067C17.9605 14.2699 18.5181 12.4464 18.3672 10.6109C18.2164 8.77535 17.3685 7.06745 15.998 5.83834C14.6275 4.60923 12.8385 3.95232 10.9989 4.0027C9.15928 4.05307 7.40887 4.8069 6.10758 6.10918C4.80629 7.41146 4.05303 9.1632 4.0027 11.0042C3.95236 12.8452 4.60876 14.6356 5.83694 16.0071C7.06512 17.3787 8.77172 18.2272 10.6058 18.3781C12.4399 18.5291 14.2621 17.9711 15.6978 16.8188L18.64 19.7633C18.7143 19.8383 18.8028 19.8978 18.9002 19.9385C18.9976 19.9791 19.1021 20 19.2077 20C19.3132 20 19.4177 19.9791 19.5152 19.9385C19.6126 19.8978 19.701 19.8383 19.7753 19.7633C19.9194 19.6141 20 19.4147 20 19.2072C20 18.9997 19.9194 18.8003 19.7753 18.6511ZM11.2124 16.8188C10.1055 16.8188 9.02346 16.4903 8.10309 15.8749C7.18272 15.2595 6.46538 14.3847 6.04178 13.3613C5.61818 12.3379 5.50735 11.2117 5.7233 10.1252C5.93925 9.03875 6.47228 8.04076 7.25499 7.25746C8.0377 6.47416 9.03493 5.94072 10.1206 5.72461C11.2062 5.50849 12.3315 5.61941 13.3542 6.04333C14.3768 6.46725 15.2509 7.18514 15.8659 8.1062C16.4809 9.02727 16.8091 10.1102 16.8091 11.2179C16.8091 12.7034 16.2195 14.128 15.1699 15.1784C14.1203 16.2287 12.6968 16.8188 11.2124 16.8188Z"
                fill={search ? '#14142A' : '#A0A3BD'}
              />
            </svg>
            {search && (
              <>
                <SearchInput
                  value={searchValue}
                  placeholder={'Search address'}
                  sx={{
                    width: `${searchValue === '' ? '6.375rem' : '5.375rem'}`,
                    marginRight: `${searchValue === '' ? 0 : '0.375rem'}`,
                  }}
                  onChange={handleSearch}
                  autoFocus={true}
                  onFocus={handleSearch}
                  // onBlur={() => {
                  //   handleAddSearchTerm(searchValue)
                  // }}
                  onKeyDown={(e: any) => {
                    if (e.code === 'Tab' || e.code === 'Enter') {
                      handleAddSearchTerm(searchValue)
                      e.target.blur()
                    }
                  }}
                />
                {searchValue && (
                  <svg
                    onClick={() => {
                      setSearchValue('')
                      setSearch(false)
                    }}
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="18" height="18" rx="9" fill="#D9DBE9" fillOpacity="0.5" />
                    <path
                      d="M13.0468 5.85964C13.2971 5.60934 13.2971 5.20352 13.0468 4.95321C12.7965 4.70291 12.3907 4.70291 12.1404 4.95321L9 8.09357L5.85964 4.95321C5.60934 4.70291 5.20352 4.70291 4.95321 4.95321C4.70291 5.20352 4.70291 5.60934 4.95321 5.85964L8.09357 9L4.95321 12.1404C4.70291 12.3907 4.70291 12.7965 4.95321 13.0468C5.20352 13.2971 5.60934 13.2971 5.85964 13.0468L9 9.90643L12.1404 13.0468C12.3907 13.2971 12.7965 13.2971 13.0468 13.0468C13.2971 12.7965 13.2971 12.3907 13.0468 12.1404L9.90643 9L13.0468 5.85964Z"
                      fill="#A0A3BD"
                    />
                  </svg>
                )}
              </>
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
              <SortTypography color={sort !== 0 || open ? '#7646FF' : '#14142A'} ml="0.25rem">
                {sortValue}
              </SortTypography>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d={!open ? 'M16 10L11.5 15L7 10' : 'M16 15L11.5 10L7 15'}
                  stroke={sort !== 0 || open ? '#7646FF' : '#14142A'}
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
          {CollateralList}
          <MobileCollateralPagination collaterals={collaterals} onPageSelect={(number: number) => null} />
        </>
      ) : (
        <MobileEmptyState resetFilters={resetFilters} searchTerm={searchTerms}></MobileEmptyState>
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
