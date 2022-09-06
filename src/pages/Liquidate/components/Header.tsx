import Copy from 'components/Copy'
import CollateralStat from './CollateralStat'
import { styled } from '@mui/system'
import { Box, Typography } from '@mui/material'
import { abbrevAddress } from 'utils/abbrevAddres'

const CollateralStatsContainer = styled('div')`
  display: flex;
  gap: 10px;
`

const Stats = styled('div')`
  background: #262338;
  box-shadow: 0px 10px 20px rgba(38, 35, 56, 0.1);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
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
  gap: 10px;
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
  flex: 1;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  text-align: center;
  text-transform: uppercase;

  color: #e1536c;
  display: flex;
  justify-content: flex-end;
`

const RiskLevel = styled(Typography)`
  border: 1px solid #e1536c;
  border-radius: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  padding-right: 10px;
`

const InfoContainer = styled('div')`
  display: flex;
  align-items: center;
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
  return (
    <Stats>
      <InfoContainer>
        <CollateralAddress>
          {abbrevAddress(address)}
          <Copy text={address} />
        </CollateralAddress>
        <RiskLevelContainer>
          <RiskLevel>Risk level {riskPercentage}%</RiskLevel>
        </RiskLevelContainer>
      </InfoContainer>
      <CollateralStatsContainer>
        <CollateralStat
          title="Collateral"
          total={totalCollateral}
          split1Title="NFT Collateral"
          split1={nftCollateral}
          split2Title="ETH Collateral"
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
    </Stats>
  )
}

export default LiquidateHeader
