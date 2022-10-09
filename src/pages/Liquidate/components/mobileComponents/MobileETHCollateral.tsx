import { Box, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SpaceBetweenBox, FlexBox, FlexEndBox } from 'styleds'

const MobileETHCollateralBox = styled(Box)`
  padding: 1rem;
  padding-bottom: 1.375rem;
  margin: 1rem;
  background: #ffffff;
  box-shadow: 0px 0.625rem 1.25rem rgba(218, 218, 238, 0.3);
  border-radius: 0.75rem;
`
const AmountBox = styled(Box)`
  padding: 1rem;
  background: #f7f7fc;
  border-radius: 10px;
  margin: 1.5rem 0 1rem 0;
`
const ProfitableBox = styled(Box)`
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(118, 70, 255, 0.5);
  border-radius: 0.125rem;
  margin-left: 0.5rem;
`
const MaxBox = styled(Box)`
  padding: 0.125rem 0.5rem;
  background: #d9dbe9;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
`
const SubtotalStrikeThroughValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */
  margin-right: 0.5rem;
  text-align: right;
  text-decoration-line: line-through;
  /* Cool Gray 400 */
  color: #a0a3bd;
`
// interface EthCollateralProps {
//   handleAmount: Function
//   max: string
//   potentialProfit: number
//   subtotal: number
//   label: string
// }
// export default function MobileETHCollateral({
//   handleAmount,
//   max,
//   potentialProfit,
//   subtotal,
//   label,
// }: EthCollateralProps) {
export default function MobileETHCollateral() {
  const [amount] = useState('')
  return (
    <MobileETHCollateralBox>
      <FlexBox>
        <Typography variant="subtitle2">ETH Collateral</Typography>
        <ProfitableBox>
          <Typography variant="body2" fontWeight="700" color="#7646FF">
            Profitable
          </Typography>
        </ProfitableBox>
      </FlexBox>
      <AmountBox>
        <SpaceBetweenBox>
          <Box>
            <Typography variant="body2" fontWeight="700" color="#1F1D23">
              Liquidation amount
            </Typography>
            <FlexBox>
              <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.7">
                  <path
                    d="M3 11.7576L8.5 3L14 11.7576L8.5 20L3 11.7576Z"
                    stroke="#14142A"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path d="M3 11.5L8.5 15L14 11.5" stroke="#14142A" strokeWidth="1.5" strokeLinejoin="round" />
                </g>
              </svg>
              <TextField
                autoFocus={true}
                sx={{ fontSize: '28px' }}
                placeholder="0.00"
                value={amount}
                // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                //   event.target.value = event.target.value.replace(/^\D*(\d*(?:\.\d{0,10})?).*$/g, '$1')
                //   handleAmount(event.target.value)
                //   setAmount(event.target.value)
                // }}
              />
            </FlexBox>
          </Box>
          <Box>
            <FlexEndBox>
              <MaxBox>
                <Typography variant="body2" fontWeight="600">
                  MAX
                </Typography>
              </MaxBox>
            </FlexEndBox>
            <Typography variant="body2" fontWeight="600">
              117.5789 ETH
            </Typography>
          </Box>
        </SpaceBetweenBox>
      </AmountBox>
      <SpaceBetweenBox>
        <Typography variant="body1" fontWeight="600" color="#A0A3BD">
          Potential Profit
        </Typography>
        <Typography variant="body1" fontWeight="600" color="#4E4B66">
          4.6 ETH
        </Typography>
      </SpaceBetweenBox>
      <SpaceBetweenBox>
        <Typography variant="body1" fontWeight="600" color="#A0A3BD">
          Subtotal
        </Typography>
        <FlexBox>
          <SubtotalStrikeThroughValue>46.00</SubtotalStrikeThroughValue>
          <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 11.697L6.5 5L11 11.697L6.5 18L2 11.697Z"
              stroke="#A0A3BD"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path d="M2 11L6.5 14L11 11" stroke="#A0A3BD" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <Typography ml="0.125rem" variant="subtitle1" fontWeight="700" color="#7646FF">
            41.4
          </Typography>
        </FlexBox>
      </SpaceBetweenBox>
    </MobileETHCollateralBox>
  )
}
