import { Button, styled, Typography } from '@mui/material'
import { useMemo } from 'react'
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

const EthCollateralsTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 160%;
  /* or 35px */

  /* Cool Gray 800 */

  color: #14142a;
  margin-top: 48px;
`

const EthCollateralsContainer = styled('div')`
  margin-top: 24px;
  display: flex;
  gap: 25px;
`

const LiquidationAmountContainer = styled('div')`
  background: #ffffff;
  /* Cool Gray 100 */

  border: 1px solid #f7f7fc;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 10px;
  flex: 1.5;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const PotentialProfitContainer = styled('div')`
  background: #f1f1f8;
  border-radius: 10px;
  flex: 1;
  padding: 24px;
  display: flex;
  justify-content: space-between;
`

const LiquidationAmountTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  /* Cool Gray 400 */

  color: #a0a3bd;
`

const LiquidationValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 160%;
  /* identical to box height, or 45px */

  /* Cool Gray 800 */

  color: #14142a;
  display: flex;
  align-items: center;
  gap: 7px;
`

const MaxContainer = styled('div')`
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`

const MaxText = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 160%;
  text-align: center;
  color: #14142a;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  border: 1px solid black;
  border-radius: 3px;
  width: 40px;
`

const MaxValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: right;

  /* Cool Gray 800 */

  color: #14142a;
`

const ProfitableBadge = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  /* Main color 2 */

  color: #7646ff;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 2px;
  padding-bottom: 2px;
  border: 1px solid rgba(118, 70, 255, 0.3);
  height: 25px;
  border-radius: 3px;
`

const EthCollateralProfitable = styled('div')`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  height: 60px;
`

const PotentialProfitLabel = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  /* Cool Gray 400 */

  color: #a0a3bd;
`

const LabelContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 11px;
`

const ValueContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const ProfitValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: right;

  /* Cool Gray 600 */
  color: #4e4b66;
`

const SubtotalValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 160%;
  /* or 35px */

  text-align: right;

  /* Main color 2 */

  color: #7646ff;
`

const SubtotalValueContainer = styled('div')`
  display: flex;
  gap: 6px;
  align-items: center;
`

const SubtotalStrikeThroughValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: right;
  text-decoration-line: line-through;

  /* Cool Gray 400 */

  color: #a0a3bd;
`

const TotalLiquidationAmountContainer = styled('div')`
  background: #262338;
  box-shadow: 0px 10px 20px rgba(38, 35, 56, 0.1);
  border-radius: 12px;
  margin: 0 auto;
  padding: 24px;
  padding-bottom: 18px;
  margin-top: 43px;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  align-items: center;
`

const TotalLiqudiationTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  /* Cool Gray 400 */

  color: #a0a3bd;
`

const TotalLiquidationAmount = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 160%;
  /* identical to box height, or 29px */

  /* Cool Gray 300 */

  color: #d9dbe9;
`

const TotalLiquidationAmountWrapper = styled('div')`
  display: flex;
  gap: 6px;
  align-items: center;
`

const LiquidateButton = styled(Button)`
  background: linear-gradient(82.51deg, #884bff 0%, #6865ff 42.39%, #4785ff 74.2%, #2fc1ff 100%) !important;
`

const LabelValueContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const LabelValueContainerPrice = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8.5px;
`

const StatsContainer = styled('div')`
  display: flex;
  gap: 40px;
`

const TotalPrice = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  /* identical to box height, or 12px */

  /* Cool Gray 200 */

  color: #eff0f6;
`

const TotalPriceValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  /* or 38px */

  text-align: right;

  color: #ffffff;
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
    [collaterals]
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
      <EthCollateralProfitable>
        <EthCollateralsTitle>ETH Collateral</EthCollateralsTitle>
        <ProfitableBadge>Profitable</ProfitableBadge>
      </EthCollateralProfitable>
      <EthCollateralsContainer>
        <LiquidationAmountContainer>
          <div>
            <LiquidationAmountTitle>Liquidation amount</LiquidationAmountTitle>
            <LiquidationValue>
              <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.7">
                  <path
                    d="M3 12.7576L8.5 4L14 12.7576L8.5 21L3 12.7576Z"
                    stroke="#14142A"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M3 12.5L8.5 16L14 12.5" stroke="#14142A" strokeWidth="1.5" strokeLinejoin="round" />
                </g>
              </svg>
              46.00
            </LiquidationValue>
          </div>
          <MaxContainer>
            <MaxText>MAX</MaxText>
            <MaxValue>117.5789 ETH</MaxValue>
          </MaxContainer>
        </LiquidationAmountContainer>
        <PotentialProfitContainer>
          <LabelContainer>
            <PotentialProfitLabel>Potential Profit</PotentialProfitLabel>
            <PotentialProfitLabel>Subtotal</PotentialProfitLabel>
          </LabelContainer>
          <ValueContainer>
            <ProfitValue>4.6 ETH</ProfitValue>
            <SubtotalValueContainer>
              <SubtotalStrikeThroughValue>46.00</SubtotalStrikeThroughValue>
              <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 12.697L6.5 6L11 12.697L6.5 19L2 12.697Z"
                  stroke="#A0A3BD"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path d="M2 12L6.5 15L11 12" stroke="#A0A3BD" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              <SubtotalValue>41.4</SubtotalValue>
            </SubtotalValueContainer>
          </ValueContainer>
        </PotentialProfitContainer>
      </EthCollateralsContainer>
      <TotalLiquidationAmountContainer>
        <LabelValueContainer>
          <TotalLiqudiationTitle>Total liquidation amount</TotalLiqudiationTitle>
          <TotalLiquidationAmountWrapper>
            <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 10.7121L8.5 3.5L13 10.7121L8.5 17.5L4 10.7121Z"
                stroke="#A0A3BD"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M4 10.5L8.5 13L13 10.5" stroke="#A0A3BD" strokeLinejoin="round" />
            </svg>
            <TotalLiquidationAmount>233.7965</TotalLiquidationAmount>
          </TotalLiquidationAmountWrapper>
        </LabelValueContainer>
        <StatsContainer>
          <LabelValueContainer>
            <TotalLiqudiationTitle>0 NFT</TotalLiqudiationTitle>
            <TotalLiquidationAmountWrapper>
              <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 10.7121L8.5 3.5L13 10.7121L8.5 17.5L4 10.7121Z"
                  stroke="#A0A3BD"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M4 10.5L8.5 13L13 10.5" stroke="#A0A3BD" strokeLinejoin="round" />
              </svg>
              <TotalLiquidationAmount>116.2176</TotalLiquidationAmount>
            </TotalLiquidationAmountWrapper>
          </LabelValueContainer>
          <LabelValueContainer>
            <TotalLiqudiationTitle>ETH</TotalLiqudiationTitle>
            <TotalLiquidationAmountWrapper>
              <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 10.7121L8.5 3.5L13 10.7121L8.5 17.5L4 10.7121Z"
                  stroke="#A0A3BD"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M4 10.5L8.5 13L13 10.5" stroke="#A0A3BD" strokeLinejoin="round" />
              </svg>
              <TotalLiquidationAmount>41.4</TotalLiquidationAmount>
            </TotalLiquidationAmountWrapper>
          </LabelValueContainer>
          <LabelValueContainerPrice>
            <TotalPrice>Total price</TotalPrice>
            <TotalLiquidationAmountWrapper>
              <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 10.7121L8.5 3.5L13 10.7121L8.5 17.5L4 10.7121Z"
                  stroke="#A0A3BD"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M4 10.5L8.5 13L13 10.5" stroke="#A0A3BD" strokeLinejoin="round" />
              </svg>
              <TotalPriceValue>41.4</TotalPriceValue>
            </TotalLiquidationAmountWrapper>
          </LabelValueContainerPrice>
          <LiquidateButton variant="contained" color="primary">
            Liquidate
          </LiquidateButton>
        </StatsContainer>
      </TotalLiquidationAmountContainer>
    </Container>
  )
}

export default LiquidateBody
