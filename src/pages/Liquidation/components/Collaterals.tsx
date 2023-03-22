import { Checkbox, Typography, Box, styled } from '@mui/material'
import CustomizedSelect from 'components/Select'
import BigNumber from 'bignumber.js'
import { useCallback, useMemo, useState } from 'react'
import CollateralItem from './CollateralItem'
import CollateralPagination from './CollateralPagination'
import React from 'react'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import CollateralsType from './CollateralsType'
import { useCollateralsType } from 'state/user/hooks'
import { CollateralModel, CollectionsModel } from 'services/type/nft'
import { useAppDispatch } from 'state/hooks'
import { setCollateralsType } from 'state/user/reducer'
import CollateralItemSkeleton from './LiquidationSkeleton/CollateralItemSkeleton'
import CollateralSkeleton from './LiquidationSkeleton/CollateralSkeleton'
import liquidationChecked from 'assets/images/svg/liquidation/liquidationChecked-Icon.svg'
import liquidationNotChecked from 'assets/images/svg/liquidation/liquidationNotChecked-Icon.svg'
import EmptyState from './EmptyState'

const CollateralsBox = styled(Box)`
  width: calc(100% - 280px);
  overflow-x: scroll;
  margin: 0 auto;
  border-radius: 12px;
`
const CollateralsContainer = styled(Box)`
  width: 1160px;
  min-width: 1160px;
  margin: 0 auto;
  border-radius: 12px;
  position: relative;
  z-index: 5;
`
const CollateralsBg = styled(Box)`
  width: 100%;
  max-height: 856px;
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 15.73%, rgba(255, 255, 255, 0) 78.72%);
  backdrop-filter: blur(40px);
  margin: 0 auto;
  top: 0px;
  left: 0px;
  position: absolute;
  border-radius: 12px;
  z-index: -1;
`

const CollateralSelectText = styled(Typography)`
  height: 45px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 160%;
  color: #14142a;
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

// const InputContainer = styled(Box)`
//   position: relative;
// `

// const KeywordSearchInput = styled('input')`
//   width: 343px;
//   height: 54px;
//   right: 190px;
//   top: 405px;
//   background: #ffffff;
//   box-shadow: 0px 10px 20px rgba(208, 217, 244, 0.15);
//   border-radius: 12px;
//   outline: none;
//   border: none;
//   padding: 16px;
//   padding-left: 48px;
//   font-family: 'Quicksand';
//   font-style: normal;
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 22px;
//   :focus {
//     border: 1px solid #7646ff !important;
//     box-shadow: 0px 10px 20px rgba(208, 217, 244, 0.5) !important;
//   }
//   &::placeholder {
//     color: rgba(110, 113, 145, 0.7);
//   }
//   display: flex;
//   align-items: center;
// `

// const SearchIcon = styled('svg')`
//   position: absolute;
//   top: 16px;
//   left: 18px;
// `

// const SortFilterContainer = styled(Box)`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
// `

// const FilterContainer = styled(Box)`
//   display: flex;
//   width: 100%;
//   gap: 20px;
// `

const SortContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

// const DebtFilterSelect = styled(CustomizedSelect)`
//   margin-left: 2px;
// `

const CollateralItems = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

// const CollectionSortItem = styled(Box)`
//   display: flex;
//   gap: 6px;
//   align-items: center;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   img {
//     width: 16px;
//     height: 16px;
//     border-radius: 50%;
//     background-color: #7646ff;
//     object-fit: cover;
//   }
// `

// const AutoCompleteContainer = styled(Box)`
//   background: #ffffff;
//   border: 1px solid #eff0f6;
//   box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
//   border-radius: 12px;
//   width: 100%;
//   position: absolute;
//   z-index: 4;
//   top: 62px;
//   padding: 12px;
// `

// const AutoCompleteItem = styled(Typography)`
//   border-radius: 6px;
//   padding: 12px;
//   font-family: 'Quicksand';
//   font-style: normal;
//   font-weight: 600;
//   font-size: 16px;
//   line-height: 22px;
//   color: #a0a3bd !important;
//   color: grey;
//   &:hover {
//     cursor: pointer;
//     background: #f7f7fc;
//   }
//   .searchterm {
//     color: #14142a;
//   }
// `

// const TermsContainer = styled(Box)`
//   position: absolute;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   left: 50px;
// `

// const TermItem = styled(Box)`
//   height: 40px;
//   left: 48px;
//   top: 7px;
//   background: #f7f7fc;
//   border-radius: 6px;
//   padding: 8px 14px 8px 12px;
//   display: flex;
//   align-items: center;
//   gap: 18px;
// `
// const TermTypography = styled(Typography)`
//   max-width: 227px;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `

// const CloseTermIcon = styled('svg')`
//   cursor: pointer;
// `
//---------------//
const PaddingBox = styled(Box)`
  padding-left: 50px;
  padding-right: 50px;
  // max-height: 735px;
  // overflow: scroll;
`
const LiquidationBox = styled(SpaceBetweenBox)`
  min-width: 246px;
  padding: 9px 12px;
  margin-right: 24px;
  height: 48px;
  border-radius: 8px;
`
const CheckedImg = styled(`img`)`
  transform: translateY(4px);
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
  setInLiquidation: Function
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
  setInLiquidation,
}: CollateralsProps) => {
  const dispatch = useAppDispatch()
  const [openChecked, setOpenChecked] = useState<boolean>(false)
  const allFilterType = useMemo(() => {
    return (
      new BigNumber(sort).eq(0) &&
      new BigNumber(debtFilter).eq(0) &&
      new BigNumber(collectionFilter).eq(0) &&
      new BigNumber(collaterals.length).eq(0) &&
      !new BigNumber(searchTerms.length).eq(0)
    )
  }, [collaterals.length, collectionFilter, debtFilter, searchTerms.length, sort])
  // const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
  //   if (searchTerms[0]) {
  //     setSearchTerms(searchTerms.filter((currentTerm: string) => currentTerm !== searchTerms[0]))
  //     setSearch(searchTerms[0])
  //   } else {
  //     // setSearch(String(e.currentTarget.value))
  //   }
  // }
  // const handleCollectionFilterChange = useCallback((event: any) => {
  //   setCollectionFilter(event.target.value as number)
  //   setFilterType(false)
  //   eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  // const collections = useMemo(() => collaterals.map((collateral: any) => collateral.collections).flat(), [collaterals])
  // const uniqueCollections: any = useMemo(
  //   () => [...new Set(collections.map((collection: any) => collection.name))],
  //   [collections]
  // )
  // const [collectionValue, setCollectionValue] = useState<number>(0)
  // const collectionOptions = useMemo(() => {
  //   return [
  //     {
  //       value: 0,
  //       name: 'All Collections',
  //     },
  //     ...collection.map((collection: any, index: number) => ({
  //       value: index + 1,
  //       name: (
  //         <CollectionSortItem>
  //           <img alt={collection.name} src={collection.icon} />
  //           {collection.name}
  //         </CollectionSortItem>
  //       ),
  //     })),
  //   ]
  // }, [collection])
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

  // const handleDebtFilterChange = useCallback((event: SelectChangeEvent<unknown>, _child: ReactNode) => {
  //   setFilterType(false)
  //   setDebtFilter(event.target.value as number)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  // const [debtFiltersValue, setDebtFiltersValue] = useState<number>(0)
  // const debtFilters = useMemo(() => {
  //   return [
  //     {
  //       value: 0,
  //       name: 'All Debts',
  //     },
  //     {
  //       value: 1,
  //       name: '< 10 ETH',
  //     },
  //     {
  //       value: 2,
  //       name: '10 ETH - 30 ETH',
  //     },
  //     {
  //       value: 3,
  //       name: '30 ETH - 50 ETH',
  //     },
  //     {
  //       value: 4,
  //       name: '> 50 ETH',
  //     },
  //   ]
  // }, [])
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
  const handleSortUpdate = useCallback(
    (event: any) => {
      setFilterType(false)
      setSort(event.target.value as number)
      if (sort === 5 || sort === 6) {
        dispatch(setCollateralsType('All Borrowers'))
      }
    },
    [dispatch, setSort, sort]
  )
  const [sortValue, setSortValue] = useState<number>(0)
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
        name: 'Heath Level: Low to High',
      },
      {
        value: 6,
        name: 'Heath Level: High to Low',
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

  const [, setCurrentPage] = React.useState<number>(1)
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
  // const autocompleteOptions = useMemo(
  //   () =>
  //     collaterals
  //       .map((collateral: any) => collateral.collections.map((collection: any) => collection.__typename))
  //       .flat()
  //       .filter((collection: string, index: number, self: any) => self.indexOf(collection) === index),
  //   [collaterals]
  // )
  // const handleAddSearchTerm = useCallback((term: string) => {
  //   setSearchTerms([term])
  //   // setSearch('')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
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
  // const liquidation = useMemo(() => {
  //   return openChecked ? '1' : '0'
  // }, [openChecked])
  // useEffect(() => {
  //   setInLiquidation(liquidation)
  // }, [liquidation, setInLiquidation])
  return (
    <CollateralsBox>
      <CollateralsContainer>
        <CollateralsBg></CollateralsBg>
        {loading ? (
          <CollateralSkeleton></CollateralSkeleton>
        ) : (
          <CollateralsFilterHeader>
            <FlexBox
              mt="4px"
              sx={{ cursor: `${sort === 5 || sort === 6 ? 'pointer' : ''}` }}
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(event: any) => {
                handleClick(event)
              }}
            >
              <CollateralSelectText mr="8px">{collateralsType}</CollateralSelectText>
              <>
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
                    <path
                      d="M16 2L9 9L2 2"
                      stroke="#14142A"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </>
            </FlexBox>
            <FlexBox>
              <LiquidationBox sx={{ border: openChecked ? '1px solid #262338' : '1px solid #d9dbe9' }}>
                <FlexBox>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6 5V4.5C5.72386 4.5 5.5 4.72386 5.5 5H6ZM17 5H17.5C17.5 4.72386 17.2761 4.5 17 4.5V5ZM7.18273 8.61281L6.77952 8.90849V8.90849L7.18273 8.61281ZM9.66667 12L10.0699 12.2957C10.1989 12.1197 10.1989 11.8803 10.0699 11.7043L9.66667 12ZM7.18273 15.3872L7.58593 15.6829H7.58593L7.18273 15.3872ZM6 19H5.5C5.5 19.2761 5.72386 19.5 6 19.5V19ZM17 19V19.5C17.2761 19.5 17.5 19.2761 17.5 19H17ZM15.8173 15.3872L16.2205 15.0915H16.2205L15.8173 15.3872ZM13.3333 12L12.9301 11.7043C12.8011 11.8803 12.8011 12.1197 12.9301 12.2957L13.3333 12ZM15.8173 8.61281L16.2205 8.90849L16.2205 8.90849L15.8173 8.61281ZM6 5.5H17V4.5H6V5.5ZM7.58593 8.31713C6.8804 7.35504 6.5 6.19306 6.5 5H5.5C5.5 6.40575 5.94821 7.77489 6.77952 8.90849L7.58593 8.31713ZM10.0699 11.7043L7.58593 8.31713L6.77952 8.90849L9.26346 12.2957L10.0699 11.7043ZM9.26346 11.7043L6.77952 15.0915L7.58593 15.6829L10.0699 12.2957L9.26346 11.7043ZM6.77952 15.0915C5.94821 16.2251 5.5 17.5942 5.5 19H6.5C6.5 17.8069 6.8804 16.645 7.58593 15.6829L6.77952 15.0915ZM6 19.5H17V18.5H6V19.5ZM17.5 19C17.5 17.5942 17.0518 16.2251 16.2205 15.0915L15.4141 15.6829C16.1196 16.645 16.5 17.8069 16.5 19H17.5ZM16.2205 15.0915L13.7365 11.7043L12.9301 12.2957L15.4141 15.6829L16.2205 15.0915ZM15.4141 8.31713L12.9301 11.7043L13.7365 12.2957L16.2205 8.90849L15.4141 8.31713ZM16.5 5C16.5 6.19306 16.1196 7.35504 15.4141 8.31713L16.2205 8.90849C17.0518 7.77489 17.5 6.40575 17.5 5H16.5Z"
                      fill="#6E7191"
                    />
                  </svg>
                  <Typography ml="6px" variant="subtitle2" fontWeight="500" color="#4e4b66">
                    In Liquidation
                  </Typography>
                </FlexBox>
                <Checkbox
                  checked={openChecked}
                  checkedIcon={<CheckedImg src={liquidationChecked} alt="" />}
                  icon={<img src={liquidationNotChecked} alt="" />}
                  sx={{ width: '24px', height: '24px' }}
                  onChange={() => {
                    setOpenChecked(!openChecked)
                    setInLiquidation(!openChecked ? 1 : 0)
                  }}
                />
              </LiquidationBox>
              <SortContainer>
                <CustomizedSelect
                  valueIndex={sortValue}
                  allFilterType={allFilterType ? 1 : 0}
                  setValueIndex={setSortValue}
                  value={sort}
                  options={sortOptions}
                  filter={filter}
                  onChange={handleSortUpdate}
                  startAdornment={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.5 18.5V5.5L5.5 8.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M14.5 5.5V18.5L17.5 15.5"
                        stroke="#6E7191"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  labelId="collateral-sort"
                  id="collateral-sort"
                  disabled
                />
              </SortContainer>
            </FlexBox>
            {/* <InputContainer>
              {searchTerms[0] !== '' && (
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
                        onClick={() => {
                          setSearchTerms(searchTerms.filter((currentTerm: string) => currentTerm !== term))
                        }}
                      >
                        <path
                          d="M11.3957 1.81286C11.7295 1.47912 11.7295 0.938023 11.3957 0.604285C11.062 0.270548 10.5209 0.270548 10.1871 0.604286L6 4.79143L1.81286 0.604285C1.47912 0.270547 0.938023 0.270548 0.604286 0.604285C0.270548 0.938023 0.270548 1.47912 0.604286 1.81286L4.79143 6L0.604285 10.1871C0.270547 10.5209 0.270548 11.062 0.604286 11.3957C0.938023 11.7294 1.47912 11.7294 1.81286 11.3957L6 7.20857L10.1871 11.3957C10.5209 11.7294 11.062 11.7294 11.3957 11.3957C11.7295 11.062 11.7295 10.5209 11.3957 10.1871L7.20857 6L11.3957 1.81286Z"
                          fill="#A0A3BD"
                        />
                      </CloseTermIcon>
                    </TermItem>
                  ))}
                </TermsContainer>
              )}
              <KeywordSearchInput
                value={search}
                onChange={handleSearch}
                onFocus={handleSearch}
                placeholder={!searchTerms.length ? 'Search keyword' : undefined}
                onBlur={() => {
                  handleAddSearchTerm(search)
                  setFilterType(true)
                }}
                onKeyDown={(e: any) => {
                  if (e.code === 'Tab' || e.code === 'Enter') {
                    handleAddSearchTerm(search)
                    e.target.blur()
                    setFilterType(true)
                  }
                }}
              />
              {search &&
                autocompleteOptions.find((option: string) => option.toLowerCase().includes(search.toLowerCase())) && (
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
            </InputContainer> */}
          </CollateralsFilterHeader>
        )}
        <PaddingBox>
          {/* {!loading && (
            <SortFilterContainer>
              <FilterContainer>
                <CustomizedSelect
                  allFilterType={allFilterType ? 1 : 0}
                  valueIndex={collectionValue}
                  setValueIndex={setCollectionValue}
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
                  allFilterType={allFilterType ? 1 : 0}
                  options={debtFilters}
                  valueIndex={debtFiltersValue}
                  setValueIndex={setDebtFiltersValue}
                  filter={filter}
                  onChange={handleDebtFilterChange}
                  startAdornment={
                    <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6 11.7576L11.5 3L17 11.7576L11.5 20L6 11.7576Z"
                        stroke="#6E7191"
                        strokeLinejoin="round"
                      />
                      <path d="M6 11.5L11.5 15L17 11.5" stroke="#6E7191" strokeLinejoin="round" />
                    </svg>
                  }
                  labelId="debt-filter"
                  id="debt-filter"
                />
                {!allFilterType && (
                  <FlexBox
                    onClick={() => {
                      setSort(0)
                      setDebtFilter(0)
                      setCollectionFilter(0)
                      setCollectionValue(0)
                      setSortValue(0)
                      setDebtFiltersValue(0)
                      dispatch(setCollateralsType('All Borrowers'))
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
                )}
              </FilterContainer>
              <SortContainer>
                <CustomizedSelect
                  valueIndex={sortValue}
                  allFilterType={allFilterType ? 1 : 0}
                  setValueIndex={setSortValue}
                  value={sort}
                  options={sortOptions}
                  filter={filter}
                  onChange={handleSortUpdate}
                  startAdornment={
                    <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.5 18.5V5.5L5.5 8.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M14.5 5.5V18.5L17.5 15.5"
                        stroke="#6E7191"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                  labelId="collateral-sort"
                  id="collateral-sort"
                  disabled
                />
              </SortContainer>
            </SortFilterContainer>
          )} */}
          <CollateralItems>
            {loading ? (
              CollateralSkeletonList
            ) : CollateralList.length === 0 ? (
              <EmptyState
                searchTerm={searchTerms}
                setOpenChecked={setOpenChecked}
                setInLiquidation={setInLiquidation}
                setSortValue={setSortValue}
              />
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
    </CollateralsBox>
  )
}

export default Collaterals
