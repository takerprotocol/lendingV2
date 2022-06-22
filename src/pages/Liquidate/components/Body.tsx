import { styled, Typography } from '@mui/material'
import { useMemo } from 'react'
import EthCollateral from './EthCollateral'
import LiquidationBar from './LiquidationBar'
import NFTItem from './NFTItem'
import NFTItemSkeleton from './NftItemSkeleton'

const Container = styled('div')`
  width: 1012px;
  margin: 0 auto;
  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 63.61%);
  border-radius: 12px;
  min-height: 300px;
  margin-top: 16px;
  padding: 29px 24px;
`

const Title = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  color: #14142a;
`

const SubTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;

  color: #a0a3bd;
`

const TitleRow = styled('div')`
  display: flex;
  justify-content: space-between;
`

const TotalLiqudationContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-end;
`

const TotalLiquidation = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 160%;
  color: #14142a;
`

const NFTRow = styled('div')`
  margin-top: 35px;
`

const NFTRowTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 160%;
  color: #14142a;
`

const NFTCollaterals = styled('div')`
  display: grid;
  margin-top: 30px;
  grid-template-columns: repeat(auto-fit, minmax(305px, 1fr));
  grid-gap: 24px;
`

const LiquidateBody = ({ total, collaterals, loading }: { total: number; collaterals: any[]; loading: boolean }) => {
  const Collaterals = useMemo(
    () =>
      collaterals
        .slice(0, 9)
        .map((collateral, index) => <NFTItem {...collateral} key={`collateral-${collateral.name}-${index}`} />),
    [collaterals]
  )
  const LoadingCollaterals = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .slice(0, 9)
        .map((_collateral, index) => <NFTItemSkeleton key={`collateral-${index}`} />),
    []
  )
  return (
    <Container>
      <TitleRow>
        <Title>Liquidate</Title>
        <div>
          <SubTitle>Total liquidation amount</SubTitle>
          <TotalLiqudationContainer>
            <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                stroke="#14142A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M4 11.5L8.5 14L13 11.5" stroke="#14142A" strokeLinejoin="round" />
            </svg>
            <TotalLiquidation>{total}</TotalLiquidation>
          </TotalLiqudationContainer>
        </div>
      </TitleRow>
      <NFTRow>
        <NFTRowTitle>{collaterals.length || 0} NFT Collaterals</NFTRowTitle>
      </NFTRow>
      <NFTCollaterals>{loading ? LoadingCollaterals : Collaterals}</NFTCollaterals>
      <EthCollateral liquidationAmount={46.0} max={117.5789} potentialProfit={3.6} subtotal={41.4} label="Profitable" />
      <LiquidationBar total={233.7965} nfts={2} nftsValue={116.2176} ethValue={41.4} />
    </Container>
  )
}

export default LiquidateBody