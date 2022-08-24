import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SelectChangeEvent, Typography } from '@mui/material'
import CustomizedSelect from 'components/Select'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import CollateralItem from './CollateralItem'
import CollateralItemSkeleton from './CollateralItemSkeleton'
import EmptyState from './EmptyState'
import CollateralPagination from './CollateralPagination'
import { FlexBox } from 'styleds'
import React from 'react'
import CollateralsType from './CollateralsType'
import { useCollateralsType } from 'state/user/hooks'
// import { setUserValues } from 'state/user/reducer'

const CollateralsContainer = styled(Box)`
  width: calc(100% - 280px);
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 308px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 15.73%, rgba(255, 255, 255, 0) 78.72%);
  backdrop-filter: blur(80px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 12px;
  z-index: 5;
  padding-top: 27px;
  padding-left: 50px;
  padding-right: 50px;
  position: relative;
  padding-bottom: 48px;
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
  :focus {
    border: 1px solid #7646ff !important;
  }
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
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const CollectionSortItem = styled('div')`
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

const AutoCompleteContainer = styled('div')`
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
  color: grey;
  &:hover {
    cursor: pointer;
    background: #f7f7fc;
  }

  .searchterm {
    color: #14142a;
  }
`

const Collaterals = ({ collaterals, loading = false }: { collaterals?: any; loading: boolean }) => {
  const [search, setSearch] = useState('')
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => setSearch(String(e.currentTarget.value))
  const [collectionFilter, setCollectionFilter] = useState(0)
  const handleCollectionFilterChange = useCallback(
    (event: any) => setCollectionFilter(event.target.value as number),
    []
  )
  const collections = useMemo(() => collaterals.map((collateral: any) => collateral.collections).flat(), [collaterals])
  const uniqueCollections: any = useMemo(
    () => [...new Set(collections.map((collection: any) => collection.name))],
    [collections]
  )
  const collectionOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Collections',
      },
      ...uniqueCollections.map((collection: any, index: number) => ({
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
  const collectionsFilterFunction = useCallback(
    (collateral: any) => {
      if (!collectionFilter) {
        return true
      } else {
        const filterCollection = String(uniqueCollections[collectionFilter - 1]).toLowerCase()
        return Boolean(
          collateral.collections.find((collection: any) => collection.name.toLowerCase() === filterCollection)
        )
      }
    },
    [collectionFilter, uniqueCollections]
  )

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

  const [sort, setSort] = useState(0)
  const handleSortUpdate = useCallback((event: any) => setSort(event.target.value as number), [])
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
        name: 'Risk Level ↓',
      },
      {
        value: 6,
        name: 'Risk Level ↑',
      },
    ]
  }, [])

  const sortOptionsFunction = useCallback(
    (collateralA: any, collateralB: any) => {
      switch (sort) {
        case 1:
          return collateralA.collateral - collateralB.collateral
        case 2:
          return collateralB.collateral - collateralA.collateral
        case 3:
          return collateralA.debt - collateralB.debt
        case 4:
          return collateralB.debt - collateralA.debt
        case 5:
          return collateralA.riskPercentage - collateralB.riskPercentage
        case 6:
          return collateralB.riskPercentage - collateralA.riskPercentage
        default:
          return true
      }
    },
    [sort]
  )

  const CollateralList = useMemo(() => {
    return collaterals
      .filter(collectionsFilterFunction)
      .filter(deptFilterFunction)
      .sort(sortOptionsFunction)
      .map((collateral: any, index: number) => {
        const nfts = collateral.collections.reduce((acc: any, current: any) => acc + current.nfts.length, 0)
        return <CollateralItem key={`collateral-${JSON.stringify(collateral)}${index}`} {...collateral} nfts={nfts} />
      })
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
        .map((collateral: any) => collateral.collections.map((collection: any) => collection.name))
        .flat()
        .filter((collection: string, index: number, self: any) => self.indexOf(collection) === index),
    [collaterals]
  )

  const handleAddSearchTerm = useCallback(
    (term: string) => {
      setSearchTerms([...searchTerms, term])
      setSearch('')
    },
    [searchTerms]
  )

  const TermsContainer = styled('div')`
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    left: 50px;
  `

  const TermItem = styled('div')`
    height: 40px;
    left: 48px;
    top: 7px;

    /* Cool Gray 100 */

    background: #f7f7fc;
    border-radius: 6px;
    padding: 12px 9px;
    display: flex;
    align-items: center;
    gap: 10px;
  `

  const CloseTermIcon = styled('svg')`
    cursor: pointer;
  `
  //---------------//
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
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
          mt="5px"
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
                {term}
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
            placeholder={!searchTerms.length ? 'Search keyword' : undefined}
            onKeyDown={(e: any) => {
              if (e.code === 'Tab' || e.code === 'Enter') {
                handleAddSearchTerm(search)
              }
            }}
            disabled={!!searchTerms.length}
          />
          {search && autocompleteOptions.find((option: string) => option.toLowerCase().includes(search.toLowerCase())) && (
            <AutoCompleteContainer>
              {autocompleteOptions.map((option: string) => {
                if (option.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <AutoCompleteItem
                      key={option}
                      dangerouslySetInnerHTML={{
                        __html: option.replace(new RegExp(search, 'i'), `<span class="searchterm">${search}</span>`),
                      }}
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
      <SortFilterContainer>
        <FilterContainer>
          <CustomizedSelect
            value={collectionFilter}
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
      <CollateralPagination collaterals={collaterals} onPageSelect={(number: number) => null} />
      <CollateralsType open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl}></CollateralsType>
    </CollateralsContainer>
  )
}

export default Collaterals
