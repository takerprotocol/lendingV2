import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SelectChangeEvent, Typography } from '@mui/material'
import CustomizedSelect from 'components/Select'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import CollateralItem from './CollateralItem'
import CollateralItemSkeleton from './CollateralItemSkeleton'
import EmptyState from './EmptyState'
import collateralsBg from 'assets/images/svg/liquidation/collaterals-Bg.svg'
import CollateralPagination from './CollateralPagination'
import React from 'react'
import { FlexBox } from 'styleds'
import CollateralsType from './CollateralsType'
import { useCollateralsType } from 'state/user/hooks'
import { CollateralModel, CollectionsModel } from 'services/type/nft'
import { plus, minus, times } from 'utils'
import { useCollections } from 'state/application/hooks'
// import { setUserValues } from 'state/user/reducer'

const CollateralsContainer = styled(Box)`
  width: calc(100% - 280px);
  min-height: 100vh;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-image: url(${collateralsBg});
  background-size: cover;
  border-radius: 12px;
  z-index: 5;
`

const CollateralSelectText = styled(Typography)`
  height: 45px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 160%;
  /* identical to box height, or 45px */

  /* Cool Gray 800 */

  color: #14142a;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

const CollateralsFilterHeader = styled(Box)`
  padding-top: 27px;
  padding-left: 48px;
  padding-right: 50px;
  padding-bottom: 40px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
`

const InputContainer = styled(Box)`
  position: relative;
`

const KeywordSearchInput = styled('input')`
  width: 343px;
  height: 54px;
  right: 190px;
  top: 405px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(208, 217, 244, 0.15);
  border-radius: 12px;
  outline: none;
  border: none;
  padding: 16px;
  padding-left: 48px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  :focus {
    border: 1px solid #7646ff !important;
    box-shadow: 0px 10px 20px rgba(208, 217, 244, 0.5) !important;
  }
  display: flex;
  align-items: center;
`

const SearchIcon = styled('svg')`
  position: absolute;
  top: 16px;
  left: 18px;
`

const SortFilterContainer = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const FilterContainer = styled(Box)`
  display: flex;
  width: 100%;
  gap: 20px;
`

const SortContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

const DebtFilterSelect = styled(CustomizedSelect)`
  margin-left: 2px;
`

const CollateralItems = styled(Box)`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CollectionSortItem = styled(Box)`
  display: flex;
  gap: 6px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #7646ff;
    object-fit: cover;
  }
`

const AutoCompleteContainer = styled(Box)`
  background: #ffffff;
  border: 1px solid #eff0f6;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
  width: 100%;
  position: absolute;
  z-index: 4;
  top: 62px;
  padding: 12px;
`

const AutoCompleteItem = styled(Typography)`
  border-radius: 6px;
  padding: 12px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #a0a3bd !important;
  color: grey;
  &:hover {
    cursor: pointer;
    background: #f7f7fc;
  }
  .searchterm {
    color: #14142a;
  }
`
interface CollateralsProps {
  collaterals: Array<CollateralModel>
  loading: boolean
  setSort: Function
  sort: number
  setDebtFilter: Function
  debtFilter: number
  setCollectionFilter: Function
  collectionFilter: number
  setSearchTerms: Function
  searchTerms: Array<string>
}
const Collaterals = ({
  collaterals,
  loading = false,
  setSort,
  sort,
  setDebtFilter,
  debtFilter,
  setSearchTerms,
  searchTerms,
  setCollectionFilter,
  collectionFilter,
}: CollateralsProps) => {
  const [search, setSearch] = useState('')
  const collection = useCollections()
  console.log('collection', collection)
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    if (searchTerms[0]) {
      setSearchTerms(searchTerms.filter((currentTerm: string) => currentTerm !== searchTerms[0]))
      setSearch(searchTerms[0])
    } else {
      setSearch(String(e.currentTarget.value))
    }
  }
  const handleCollectionFilterChange = useCallback((event: any) => {
    setCollectionFilter(event.target.value as number)
    setFilterType(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // const collections = useMemo(() => collaterals.map((collateral: any) => collateral.collections).flat(), [collaterals])
  // const uniqueCollections: any = useMemo(
  //   () => [...new Set(collections.map((collection: any) => collection.name))],
  //   [collections]
  // )
  const collectionOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Collections',
      },
      ...collection.map((collection: any, index: number) => ({
        value: index + 1,
        name: (
          <CollectionSortItem>
            <img alt={collection.name} src={collection.icon} />
            {collection.name}
          </CollectionSortItem>
        ),
      })),
    ]
  }, [collection])
  // const collectionsFilterFunction = useCallback(
  //   (collateral: any) => {
  //     if (!collectionFilter) {
  //       return true
  //     } else {
  //       const filterCollection = String(uniqueCollections[collectionFilter - 1]).toLowerCase()
  //       return Boolean(
  //         collateral.collections.find((collection: any) => collection.name.toLowerCase() === filterCollection)
  //       )
  //     }
  //   },
  //   [collectionFilter, uniqueCollections]
  // )

  const handleDebtFilterChange = useCallback((event: SelectChangeEvent<unknown>, _child: ReactNode) => {
    setFilterType(false)
    setDebtFilter(event.target.value as number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const debtFilters = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Debts',
      },
      {
        value: 1,
        name: '< 10 ETH',
      },
      {
        value: 2,
        name: '10 ETH - 30 ETH',
      },
      {
        value: 3,
        name: '30 ETH - 50 ETH',
      },
      {
        value: 4,
        name: '> 50 ETH',
      },
    ]
  }, [])
  // const deptFilterFunction = useCallback(
  //   (collateral: any) => {
  //     switch (debtFilter) {
  //       case 1:
  //         return collateral.debt < 10
  //       case 2:
  //         return collateral.debt > 10 && collateral.debt < 30
  //       case 3:
  //         return collateral.debt > 30 && collateral.debt < 50
  //       case 4:
  //         return collateral.debt > 50
  //       default:
  //         return true
  //     }
  //   },
  //   [debtFilter]
  // )
  const handleSortUpdate = useCallback((event: any) => {
    setFilterType(false)
    setSort(event.target.value as number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const sortOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'Default Sort',
      },
      {
        value: 1,
        name: 'Collateral ↓',
      },
      {
        value: 2,
        name: 'Collateral ↑',
      },
      {
        value: 3,
        name: 'Total Debt ↓',
      },
      {
        value: 4,
        name: 'Total Debt ↑',
      },
      {
        value: 5,
        name: 'Risk Level: Low to High',
      },
      {
        value: 6,
        name: 'Risk Level: High to Low',
      },
    ]
  }, [])

  // const sortOptionsFunction = useCallback(
  //   (collateralA: CollateralModel, collateralB: CollateralModel) => {
  //     switch (sort) {
  //       case 1:
  //         return new BigNumber(collateralA.collateral).gt(collateralB.collateral) ? 1 : -1
  //       case 2:
  //         return new BigNumber(collateralB.collateral).gt(collateralA.collateral) ? 1 : -1
  //       case 3:
  //         return new BigNumber(collateralA.debt).gt(collateralB.debt) ? 1 : -1
  //       case 4:
  //         return new BigNumber(collateralB.debt).gt(collateralA.debt) ? 1 : -1
  //       case 5:
  //         return new BigNumber(collateralA.riskPercentage).gt(collateralB.riskPercentage) ? 1 : -1
  //       case 6:
  //         return new BigNumber(collateralB.riskPercentage).gt(collateralA.riskPercentage) ? 1 : -1
  //       default:
  //         return 0
  //     }
  //   },
  //   [sort]
  // )

  //------------//

  const [currentPage, setCurrentPage] = React.useState<number>(1)
  const currentPageIndex = useMemo(
    () =>
      Math.ceil(collaterals.length / 16) === currentPage
        ? plus(plus(collaterals.length, currentPage % 16), times(minus(currentPage, 1), 16))
        : times(currentPage, 16),
    [collaterals.length, currentPage]
  )
  console.log(currentPageIndex)
  //------------//
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
          return <CollateralItem key={`collateral-${JSON.stringify(collateral)}${index}`} {...collateral} nfts={nfts} />
        })
    )
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [collaterals, collectionFilter, debtFilter, sort, searchTerms])
  const CollateralSkeletonList = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((collateral: any, index: number) => {
      return <CollateralItemSkeleton key={`collateral-${JSON.stringify(collateral)}${index}`} />
    })
  }, [])
  const autocompleteOptions = useMemo(
    () =>
      collaterals
        .map((collateral: any) => collateral.collections.map((collection: any) => collection.__typename))
        .flat()
        .filter((collection: string, index: number, self: any) => self.indexOf(collection) === index),
    [collaterals]
  )

  const handleAddSearchTerm = useCallback((term: string) => {
    setSearchTerms([term])
    setSearch('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const TermsContainer = styled(Box)`
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    left: 50px;
  `

  const TermItem = styled(Box)`
    height: 40px;
    left: 48px;
    top: 7px;
    background: #f7f7fc;
    border-radius: 6px;
    padding: 8px 14px 8px 12px;
    display: flex;
    align-items: center;
    gap: 18px;
  `
  const TermTypography = styled(Typography)`
    max-width: 227px;
    overflow: hidden;
    text-overflow: ellipsis;
  `

  const CloseTermIcon = styled('svg')`
    cursor: pointer;
  `
  //---------------//
  const PaddingBox = styled(Box)`
    padding-left: 50px;
    padding-right: 50px;
    // max-height: 735px;
    // overflow: scroll;
  `
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [filterType, setFilterType] = React.useState<boolean>(false)
  const filter = useMemo(() => {
    if (filterType && CollateralList.length === 0 && searchTerms.length !== 0) {
      return 1
    } else {
      return 0
    }
  }, [CollateralList.length, filterType, searchTerms.length])
  const open = Boolean(anchorEl)
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const collateralsType = useCollateralsType()
  //---------------//
  return (
    <CollateralsContainer>
      <CollateralsFilterHeader>
        <FlexBox
          mt="4px"
          sx={{ cursor: 'pointer' }}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <CollateralSelectText mr="8px">{collateralsType}</CollateralSelectText>
          {open ? (
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 17L11 10L4 17"
                stroke="#14142A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L9 9L2 2" stroke="#14142A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </FlexBox>
        <InputContainer>
          <TermsContainer>
            {searchTerms.map((term: string, index: number) => (
              <TermItem key={`${term}${index}`}>
                <TermTypography variant="subtitle2">{term}</TermTypography>
                <CloseTermIcon
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => setSearchTerms(searchTerms.filter((currentTerm: string) => currentTerm !== term))}
                >
                  <path
                    d="M11.3957 1.81286C11.7295 1.47912 11.7295 0.938023 11.3957 0.604285C11.062 0.270548 10.5209 0.270548 10.1871 0.604286L6 4.79143L1.81286 0.604285C1.47912 0.270547 0.938023 0.270548 0.604286 0.604285C0.270548 0.938023 0.270548 1.47912 0.604286 1.81286L4.79143 6L0.604285 10.1871C0.270547 10.5209 0.270548 11.062 0.604286 11.3957C0.938023 11.7294 1.47912 11.7294 1.81286 11.3957L6 7.20857L10.1871 11.3957C10.5209 11.7294 11.062 11.7294 11.3957 11.3957C11.7295 11.062 11.7295 10.5209 11.3957 10.1871L7.20857 6L11.3957 1.81286Z"
                    fill="#A0A3BD"
                  />
                </CloseTermIcon>
              </TermItem>
            ))}
          </TermsContainer>
          <KeywordSearchInput
            value={search}
            onChange={handleSearch}
            onFocus={handleSearch}
            placeholder={!searchTerms.length ? 'Search keyword' : undefined}
            onKeyDown={(e: any) => {
              if (e.code === 'Tab' || e.code === 'Enter') {
                handleAddSearchTerm(search)
                e.target.blur()
                setFilterType(true)
              }
            }}
          />
          {search && autocompleteOptions.find((option: string) => option.toLowerCase().includes(search.toLowerCase())) && (
            <AutoCompleteContainer>
              {autocompleteOptions.map((option: string) => {
                if (option.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <AutoCompleteItem
                      key={option}
                      // dangerouslySetInnerHTML={{
                      //   __html: option.replace(new RegExp(search, 'i'), `<span class="searchterm">${search}</span>`),
                      // }}
                      onClick={() => handleAddSearchTerm(option)}
                    />
                  )
                }
                return null
              })}
            </AutoCompleteContainer>
          )}
          <SearchIcon width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.7104 19.29L17.0004 15.61C18.4405 13.8144 19.1379 11.5353 18.9492 9.24133C18.7605 6.94733 17.7001 4.81281 15.9859 3.27667C14.2718 1.74053 12.0342 0.919537 9.73332 0.982497C7.43243 1.04546 5.24311 1.98759 3.61553 3.61517C1.98795 5.24275 1.04582 7.43207 0.982863 9.73295C0.919903 12.0338 1.7409 14.2714 3.27704 15.9855C4.81318 17.6997 6.94769 18.7601 9.24169 18.9488C11.5357 19.1375 13.8148 18.4401 15.6104 17L19.2904 20.68C19.3834 20.7738 19.494 20.8481 19.6158 20.8989C19.7377 20.9497 19.8684 20.9758 20.0004 20.9758C20.1324 20.9758 20.2631 20.9497 20.385 20.8989C20.5068 20.8481 20.6174 20.7738 20.7104 20.68C20.8906 20.4936 20.9914 20.2444 20.9914 19.985C20.9914 19.7257 20.8906 19.4765 20.7104 19.29V19.29ZM10.0004 17C8.61592 17 7.26255 16.5895 6.1114 15.8203C4.96026 15.0511 4.06305 13.9579 3.53324 12.6788C3.00342 11.3997 2.8648 9.99226 3.1349 8.63439C3.40499 7.27653 4.07168 6.02925 5.05065 5.05028C6.02961 4.07131 7.27689 3.40463 8.63476 3.13453C9.99263 2.86443 11.4001 3.00306 12.6792 3.53287C13.9583 4.06268 15.0515 4.95989 15.8207 6.11103C16.5899 7.26218 17.0004 8.61556 17.0004 10C17.0004 11.8565 16.2629 13.637 14.9501 14.9498C13.6374 16.2625 11.8569 17 10.0004 17V17Z"
              fill="#A0A3BD"
            />
          </SearchIcon>
        </InputContainer>
      </CollateralsFilterHeader>
      <PaddingBox>
        <SortFilterContainer>
          <FilterContainer>
            <CustomizedSelect
              value={collectionFilter}
              filter={filter}
              options={collectionOptions}
              onChange={handleCollectionFilterChange}
              startAdornment={
                <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="11" width="12" height="8" stroke="#6E7191" strokeLinejoin="round" />
                  <path d="M7 8H17" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 5H16" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              labelId="collateral-filter"
              id="collateral-filter"
            />
            <DebtFilterSelect
              value={debtFilter}
              options={debtFilters}
              filter={filter}
              onChange={handleDebtFilterChange}
              startAdornment={
                <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 11.7576L11.5 3L17 11.7576L11.5 20L6 11.7576Z" stroke="#6E7191" strokeLinejoin="round" />
                  <path d="M6 11.5L11.5 15L17 11.5" stroke="#6E7191" strokeLinejoin="round" />
                </svg>
              }
              labelId="debt-filter"
              id="debt-filter"
            />
            <FlexBox
              onClick={() => {
                setSort(0)
                setDebtFilter(0)
                setCollectionFilter(0)
              }}
              sx={{ cursor: 'pointer' }}
              ml="12px"
              width="120px"
            >
              <Typography fontStyle="16px" color="#4E4B66" fontWeight="700" lineHeight="22px" mr="4px">
                Reset All
              </Typography>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 18C8.68629 18 6 15.3137 6 12C6 9.99247 6.98593 8.21523 8.5 7.12605L5 8M12 6C15.3137 6 18 8.68629 18 12C18 14.0075 17.0141 15.7848 15.5 16.874L19 16"
                  stroke="#6E7191"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </FlexBox>
          </FilterContainer>
          <SortContainer>
            <CustomizedSelect
              value={sort}
              options={sortOptions}
              filter={filter}
              onChange={handleSortUpdate}
              startAdornment={
                <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.5 18.5V5.5L5.5 8.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.5 5.5V18.5L17.5 15.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              labelId="collateral-sort"
              id="collateral-sort"
              disabled
            />
          </SortContainer>
        </SortFilterContainer>
        <CollateralItems>
          {loading ? (
            CollateralSkeletonList
          ) : CollateralList.length === 0 ? (
            <EmptyState searchTerm={searchTerms} />
          ) : (
            CollateralList
          )}
        </CollateralItems>
      </PaddingBox>
      {CollateralList.length !== 0 && (
        <CollateralPagination
          collaterals={CollateralList}
          setCurrentPage={setCurrentPage}
          onPageSelect={(number: number) => null}
        />
      )}
      <CollateralsType open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl}></CollateralsType>
    </CollateralsContainer>
  )
}

export default Collaterals
