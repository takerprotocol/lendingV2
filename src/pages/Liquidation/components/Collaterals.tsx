import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SelectChangeEvent, Typography } from '@mui/material'
import CustomizedSelect from 'components/Select'
import React, { ReactNode, useCallback, useMemo, useState } from 'react'
import CollateralItem from './CollateralItem'
import CollateralItemSkeleton from './CollateralItemSkeleton'
import EmptyState from './EmptyState'

const CollateralsContainer = styled(Box)`
  width: calc(100% - 280px);
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 378px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 15.73%, rgba(255, 255, 255, 0) 78.72%);
  backdrop-filter: blur(80px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 12px;
  z-index: 5;
  padding-top: 32px;
  padding-left: 50px;
  padding-right: 50px;
  position: relative;
`

const CollateralSelectText = styled(Typography)`
  width: 187px;
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

const CollateralsFilterHeader = styled('div')`
  display: flex;
  justify-content: space-between;
`

const InputContainer = styled('div')`
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
  padding-left: 46px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
`

const SearchIcon = styled('svg')`
  position: absolute;
  top: 16px;
  left: 16px;
`

const SortFilterContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const FilterContainer = styled('div')`
  display: flex;
  width: 100%;
  margin-top: 40px;
  gap: 20px;
`

const SortContainer = styled('div')`
  display: flex;
  width: 100%;
  margin-top: 40px;
  justify-content: flex-end;
`

const DebtFilterSelect = styled(CustomizedSelect)`
  margin-left: 10px;
`

const CollateralItems = styled('div')`
  margin-top: 50px;
  margin-bottom: 100px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CollectionSortItem = styled('div')`
  display: flex;
  gap: 6px;
  align-items: center;

  img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    backgroundcolor: #7646ff;
    object-fit: cover;
  }
`

const Collaterals = ({ collaterals, loading = false }: { collaterals?: any; loading: boolean }) => {
  const [search, setSearch] = useState('')
  const handleSearch = (e: any) => setSearch(String(e.target.value))
  const [collectionFilter, setCollectionFilter] = useState(0)
  const handleCollectionFilterChange = useCallback((value: any) => setCollectionFilter(value), [])
  const collections = useMemo(() => collaterals.map((collateral: any) => collateral.collections).flat(), [collaterals])
  const uniqueCollections = useMemo(
    () => [...new Set(collections.map((collection: any) => collection.name))],
    [collections]
  )
  const collateralOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Collections',
      },
      ...uniqueCollections.map((collection: any, index) => ({
        value: index + 1,
        name: (
          <CollectionSortItem>
            <img
              alt={collection}
              src={collections.find((findCollection: any) => findCollection.name === collection).image}
            />
            {collection}
          </CollectionSortItem>
        ),
      })),
    ]
  }, [uniqueCollections, collections])
  const [debtFilter, setDebtFilter] = useState(0)
  const handleDebtFilterChange = useCallback(
    (event: SelectChangeEvent<unknown>, _child: ReactNode) => setDebtFilter(event.target.value as number),
    []
  )
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

  const [sort, setSort] = useState(0)
  const handleSortUpdate = useCallback((value: any) => setSort(value), [])
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
        value: 3,
        name: 'Risk Level ↓',
      },
      {
        value: 4,
        name: 'Risk Level ↑',
      },
    ]
  }, [])
  const deptFilterFunction = useCallback(
    (collateral: any) => {
      switch (debtFilter) {
        case 1:
          return collateral.debt < 10
        case 2:
          return collateral.debt > 10 && collateral.debt < 30
        case 3:
          return collateral.debt > 30 && collateral.debt < 50
        case 4:
          return collateral.debt > 50
        default:
          return true
      }
    },
    [debtFilter]
  )

  const CollateralList = useMemo(() => {
    return collaterals.filter(deptFilterFunction).map((collateral: any) => {
      const nfts = collateral.collections.reduce((acc: any, current: any) => acc + current.nfts.length, 0)
      return <CollateralItem key={`collateral-${JSON.stringify(collateral)}`} {...collateral} nfts={nfts} />
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [collaterals, sort, search, collectionFilter, deptFilterFunction])

  const CollateralSkeletonList = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((collateral: any) => {
      return <CollateralItemSkeleton key={`collateral-${JSON.stringify(collateral)}`} />
    })
  }, [])

  return (
    <CollateralsContainer>
      <CollateralsFilterHeader>
        <CollateralSelectText>All Collaterals</CollateralSelectText>
        <InputContainer>
          <KeywordSearchInput value={search} onChange={handleSearch} placeholder="Search keyword" />
          <SearchIcon width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.7104 19.29L17.0004 15.61C18.4405 13.8144 19.1379 11.5353 18.9492 9.24133C18.7605 6.94733 17.7001 4.81281 15.9859 3.27667C14.2718 1.74053 12.0342 0.919537 9.73332 0.982497C7.43243 1.04546 5.24311 1.98759 3.61553 3.61517C1.98795 5.24275 1.04582 7.43207 0.982863 9.73295C0.919903 12.0338 1.7409 14.2714 3.27704 15.9855C4.81318 17.6997 6.94769 18.7601 9.24169 18.9488C11.5357 19.1375 13.8148 18.4401 15.6104 17L19.2904 20.68C19.3834 20.7738 19.494 20.8481 19.6158 20.8989C19.7377 20.9497 19.8684 20.9758 20.0004 20.9758C20.1324 20.9758 20.2631 20.9497 20.385 20.8989C20.5068 20.8481 20.6174 20.7738 20.7104 20.68C20.8906 20.4936 20.9914 20.2444 20.9914 19.985C20.9914 19.7257 20.8906 19.4765 20.7104 19.29V19.29ZM10.0004 17C8.61592 17 7.26255 16.5895 6.1114 15.8203C4.96026 15.0511 4.06305 13.9579 3.53324 12.6788C3.00342 11.3997 2.8648 9.99226 3.1349 8.63439C3.40499 7.27653 4.07168 6.02925 5.05065 5.05028C6.02961 4.07131 7.27689 3.40463 8.63476 3.13453C9.99263 2.86443 11.4001 3.00306 12.6792 3.53287C13.9583 4.06268 15.0515 4.95989 15.8207 6.11103C16.5899 7.26218 17.0004 8.61556 17.0004 10C17.0004 11.8565 16.2629 13.637 14.9501 14.9498C13.6374 16.2625 11.8569 17 10.0004 17V17Z"
              fill="#A0A3BD"
            />
          </SearchIcon>
        </InputContainer>
      </CollateralsFilterHeader>
      <SortFilterContainer>
        <FilterContainer>
          <CustomizedSelect
            value={collectionFilter}
            options={collateralOptions}
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
        </FilterContainer>
        <SortContainer>
          <CustomizedSelect
            value={sort}
            options={sortOptions}
            onChange={handleSortUpdate}
            startAdornment={
              <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 18.5V5.5L5.5 8.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.5 5.5V18.5L17.5 15.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            labelId="collateral-sort"
            id="collateral-sort"
          />
        </SortContainer>
      </SortFilterContainer>
      <CollateralItems>
        {loading ? CollateralSkeletonList : !!collaterals.length ? CollateralList : <EmptyState />}
      </CollateralItems>
    </CollateralsContainer>
  )
}

export default Collaterals
