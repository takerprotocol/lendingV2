import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from 'assets/images/png/liquidation/header.png'
import Header2 from 'assets/images/png/liquidation/header2.png'
import Header3 from 'assets/images/png/liquidation/header3.png'
import { Typography } from '@mui/material'
import { useCallback, useMemo, useRef, useState } from 'react'
import CustomizedSelect from 'components/Select'

const Body = styled(Box)`
  background: #e5e5e5;
  width: 100%;
  min-height: 100vh;
`

const Image = styled('img')`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  object-fit: cover;
  width: 100%;
  height: 100vh;

  &.infront {
    z-index: 2;
  }

  &.back {
    z-index: 0;
  }
`

const Title = styled(Typography)`
  position: absolute;
  width: 470px;
  height: 58px;
  left: 140px;
  top: 157px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 160%;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #ffffff;
  z-index: 5;
`

const Subtitle = styled(Typography)`
  position: absolute;
  width: 482px;
  height: 70px;
  left: 140px;
  top: 234px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 160%;
  letter-spacing: 0.05em;
  color: #ffffff;
  z-index: 5;
`

const CollateralsContainer = styled(Box)`
  position: absolute;
  width: calc(100% - 280px);
  height: 856px;
  left: 140px;
  top: 378px;

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

const FilterContainer = styled('div')`
  display: flex;
  width: 100%;
  margin-top: 40px;
`

const DebtFilterSelect = styled(CustomizedSelect)`
  margin-left: 10px;
`

export default function Liquidation() {
  const [search, setSearch] = useState('')
  const handleSearch = (e: any) => setSearch(String(e.target.value))
  const [collateralFilter, setCollateralFilter] = useState(0)
  const handleCollateralFilterChange = useCallback((value: any) => setCollateralFilter(value), [])
  const collateralOptions = useMemo(() => {
    return [
      {
        value: 0,
        label: 'All Collaterals',
      },
    ]
  }, [])
  const [debtFilter, setDebtFilter] = useState(0)
  const handleDebtFilterChange = useCallback((value: any) => setDebtFilter(value), [])
  const debtFilters = useMemo(() => {
    return [
      {
        value: 0,
        label: 'All Debts',
      },
    ]
  }, [])

  const debtfilterRef = useRef<any>(null)

  return (
    <Body className="header-padding">
      <div>
        <Image src={Header} alt="header" />
        <Image src={Header3} alt="header3" className="back" />
        <Image src={Header2} alt="header2" className="infront" />
      </div>
      <Title variant="h3">Found some treasure!</Title>
      <Subtitle>Liquidate with a floor price to get some NFTs you like</Subtitle>
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
        <FilterContainer>
          <CustomizedSelect
            value={collateralFilter}
            options={collateralOptions}
            onChange={handleCollateralFilterChange}
            startAdornment={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 6 }}
              >
                <rect x="6" y="11" width="12" height="8" stroke="#6E7191" strokeLinejoin="round" />
                <path d="M7 8H17" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 5H16" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
          />
          <DebtFilterSelect
            ref={debtfilterRef}
            value={debtFilter}
            options={debtFilters}
            onChange={handleDebtFilterChange}
            startAdornment={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginRight: 6 }}
              >
                <path d="M6 11.7576L11.5 3L17 11.7576L11.5 20L6 11.7576Z" stroke="#6E7191" strokeLinejoin="round" />
                <path d="M6 11.5L11.5 15L17 11.5" stroke="#6E7191" strokeLinejoin="round" />
              </svg>
            }
          />
        </FilterContainer>
      </CollateralsContainer>
    </Body>
  )
}
