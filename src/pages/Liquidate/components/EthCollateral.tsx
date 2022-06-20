import { styled, Typography } from '@mui/material'

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

type EthCollateralType = {
  liquidationAmount: number
  max: number
  potentialProfit: number
  subtotal: number
  label: string
}

const EthCollateral = ({ liquidationAmount, max, potentialProfit, subtotal, label }: EthCollateralType) => {
  return (
    <>
      <EthCollateralProfitable>
        <EthCollateralsTitle>ETH Collateral</EthCollateralsTitle>
        <ProfitableBadge>{label}</ProfitableBadge>
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
              {liquidationAmount}
            </LiquidationValue>
          </div>
          <MaxContainer>
            <MaxText>MAX</MaxText>
            <MaxValue>{max} ETH</MaxValue>
          </MaxContainer>
        </LiquidationAmountContainer>
        <PotentialProfitContainer>
          <LabelContainer>
            <PotentialProfitLabel>Potential Profit</PotentialProfitLabel>
            <PotentialProfitLabel>Subtotal</PotentialProfitLabel>
          </LabelContainer>
          <ValueContainer>
            <ProfitValue>{potentialProfit} ETH</ProfitValue>
            <SubtotalValueContainer>
              <SubtotalStrikeThroughValue>{subtotal}</SubtotalStrikeThroughValue>
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
    </>
  )
}

export default EthCollateral
