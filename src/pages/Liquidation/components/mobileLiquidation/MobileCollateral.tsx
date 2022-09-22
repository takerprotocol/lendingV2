import { Box, styled, Typography } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import mobileCollaterals from 'assets/images/svg/liquidation/mobileCollaterals-bg.svg'
import mobileSearch from 'assets/images/svg/liquidation/mobileSearch-icon.svg'
import SortIcon from 'assets/images/svg/liquidation/mobileSort-icon.svg'
import FilterIcon from 'assets/images/svg/liquidation/mobileFilter-icon.svg'
import MobileCollateralList from './MobileCollateralList'
import { useState } from 'react'
import MobileCollateralPagination from './MobileCollateralPagination'
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
export default function MobileCollateral() {
  const [list] = useState([1, 2, 4, 5, 3, 6, 7, 8])
  return (
    <MobileCollateralBox>
      <Box m="0 1rem">
        <SpaceBetweenBox mb="0.5rem">
          <FlexBox ml="0.5rem">
            <CollateralsTypography>All Collaterals</CollateralsTypography>
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
          <FlexBox ml="0.5rem">
            <img src={mobileSearch} alt="" />
          </FlexBox>
        </SpaceBetweenBox>
        <SortAndFilterBox>
          <FlexBox>
            <img src={SortIcon} alt="" />
            <SortTypography ml="0.25rem">Default sort</SortTypography>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 10L11.5 15L7 10"
                stroke="#14142A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </FlexBox>
          <FlexBox>
            <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 0.5V23.5" stroke="#D9DBE9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <SortTypography ml="1rem">Filter</SortTypography>
            <img src={FilterIcon} alt="" />
          </FlexBox>
        </SortAndFilterBox>
      </Box>
      {list.map((el: number) => (
        <MobileCollateralList key={el}></MobileCollateralList>
      ))}
      <MobileCollateralPagination collaterals={list} onPageSelect={(number: number) => null} />
    </MobileCollateralBox>
  )
}
