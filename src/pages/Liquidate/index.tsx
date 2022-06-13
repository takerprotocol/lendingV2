import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Copy from 'components/Copy'
import CollateralStat from './components/CollateralStat'

const CollateralStatsContainer = styled('div')`
  display: flex;
  gap: 10px;
`

const Body = styled(Box)`
  width: 100%;
  max-width: 1012px;
  margin: 0 auto;
  margin-top: 94px;
`

const Stats = styled('div')`
  background: #262338;
  box-shadow: 0px 10px 20px rgba(38, 35, 56, 0.1);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`

const CollateralAddress = styled(Typography)`
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

const Liquidate = () => {
  return (
    <Body>
      <Stats>
        <InfoContainer>
          <CollateralAddress>
            1A12567J...36YU
            <Copy text="ddd" />
          </CollateralAddress>
          <RiskLevelContainer>
            <RiskLevel>Risk level 110%</RiskLevel>
          </RiskLevelContainer>
        </InfoContainer>
        <CollateralStatsContainer>
          <CollateralStat
            title="Collateral"
            total={526.1862}
            split1Title="NFT Collateral"
            split1={360.26}
            split2Title="ETH Collateral"
            split2={165.93}
          />
          <CollateralStat
            title="Collateral"
            total={526.1862}
            split1Title="NFT Collateral"
            split1={360.26}
            split2Title="ETH Collateral"
            split2={165.93}
          />
        </CollateralStatsContainer>
      </Stats>
    </Body>
  )
}

export default Liquidate
