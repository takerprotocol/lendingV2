import Copy from 'components/Copy'
import CollateralStat from './CollateralStat'
import { styled } from '@mui/system'
import { FlexBox } from 'styleds'
import { Box, Typography } from '@mui/material'
import { liquidateAbbrevAddress } from 'utils/abbrevAddres'
import { useMemo } from 'react'
import { getRiskLevelTag } from 'utils'

const CollateralStatsContainer = styled('div')`
  display: flex;
  margin-left: 95px;
`

const Stats = styled('div')`
  background: #262338;
  box-shadow: 0px 10px 20px rgba(38, 35, 56, 0.1);
  border-radius: 12px;
  padding: 24px;
  align-items: center;
  justify-content: space-between;
  display: flex;
`

const CollateralAddress = styled(Box)`
  flex: 2;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  color: #a0a3bd;
  display: flex;
  gap: 6px;
  align-items: center;

  > div {
    width: 24px !important;
    height: 24px !important;
  }

  > div > svg {
    width: 24px !important;
    height: 24px !important;
  }
`

const RiskLevelContainer = styled('div')`
  padding: 3px 11px;
  border: 1px solid transparent;
  height: 30px;
  /* border: 1px solid rgba(225, 83, 108, 0.5); */
  filter: drop-shadow(0px 4px 8px rgba(221, 140, 140, 0.1));
  border-radius: 35px;
  &.Healthy {
    border-color: #4bc8b1;
  }
  &.In-liquidation {
    border-color: #e1536c;
  }
  &.High-Risk {
    border-color: #e1536c;
  }
  &.Risky {
    border-color: #ef884f;
  }
`

const RiskLevel = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */
  text-align: center;
  text-transform: uppercase;
  &.Healthy {
    color: #4bc8b1;
  }
  &.In-liquidation {
    color: #e1536c;
  }
  &.High-Risk {
    color: #e1536c;
  }
  &.Risky {
    color: #ef884f;
  }
  /* color: #e1536c; */

  /* Inside auto layout */
`

const InfoContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

type LiquidateHeaderType = {
  address: string
  riskPercentage: string
  totalCollateral: string
  nftCollateral: string
  ethCollateral: string
  totalDebt: string
  ethDebt: string
  borrowings: string
}

const LiquidateHeader = ({
  address,
  riskPercentage,
  totalCollateral,
  nftCollateral,
  ethCollateral,
  totalDebt,
  ethDebt,
  borrowings,
}: LiquidateHeaderType) => {
  const myLoanRiskLevelTag = useMemo(() => {
    return getRiskLevelTag(riskPercentage)
  }, [riskPercentage])

  return (
    <Stats>
      <FlexBox>
        <InfoContainer>
          <CollateralAddress>
            {liquidateAbbrevAddress(address)}
            <Copy text={address} />
          </CollateralAddress>
        </InfoContainer>
        <CollateralStatsContainer>
          <CollateralStat
            title="Collateral"
            total={totalCollateral}
            split1Title="NFT Collateral"
            split1={nftCollateral}
            split2Title=""
            split2={ethCollateral}
          />
          <CollateralStat
            title="Total Debt"
            total={totalDebt}
            split1Title="ETH Debt"
            split1={ethDebt}
            split2Title="Borrowings"
            split2={borrowings}
          />
        </CollateralStatsContainer>
      </FlexBox>
      <RiskLevelContainer className={myLoanRiskLevelTag}>
        <RiskLevel>Heath Level {riskPercentage}%</RiskLevel>
      </RiskLevelContainer>
    </Stats>
  )
}

export default LiquidateHeader
