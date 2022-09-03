import { Button, styled, Typography } from '@mui/material'

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

type LiquidationBarType = {
  total: string
  nfts: number
  nftsValue: string
  ethValue: string
  submit: Function
}

const LiquidationBar = ({ total, nfts, nftsValue, ethValue, submit }: LiquidationBarType) => {
  return (
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
          <TotalLiquidationAmount>{total}</TotalLiquidationAmount>
        </TotalLiquidationAmountWrapper>
      </LabelValueContainer>
      <StatsContainer>
        <LabelValueContainer>
          <TotalLiqudiationTitle>{nfts} NFT</TotalLiqudiationTitle>
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
            <TotalLiquidationAmount>{nftsValue}</TotalLiquidationAmount>
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
            <TotalLiquidationAmount>{ethValue}</TotalLiquidationAmount>
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
            <TotalPriceValue>{ethValue + nftsValue}</TotalPriceValue>
          </TotalLiquidationAmountWrapper>
        </LabelValueContainerPrice>
        <LiquidateButton
          variant="contained"
          color="primary"
          onClick={() => {
            submit()
          }}
        >
          Liquidate
        </LiquidateButton>
      </StatsContainer>
    </TotalLiquidationAmountContainer>
  )
}

export default LiquidationBar
