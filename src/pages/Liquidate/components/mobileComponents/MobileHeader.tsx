import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, FlexBox } from 'styleds'
import mobilePurpleETH from 'assets/images/svg/dashboard/mobilePurpleETH-iocn.svg'
const MobileHeaderBox = styled(Box)`
  background: #262338;
  width: 100%;
  padding-top: 7.875rem;
  padding-bottom: 1.8125rem;
`
const HealthBox = styled(Box)`
  padding: 0.25rem 0.75rem;
  border: 0.0625rem solid rgba(225, 83, 108, 0.5);
  filter: drop-shadow(0px 0.25rem 0.5rem rgba(221, 140, 140, 0.1));
  border-radius: 2.1875rem;
  margin-right: 1rem;
`
const CollateralAndTotalDebtBox = styled(FlexBox)`
  margin: 1.5rem 0 0 0;
  width: 23.4375rem;
  overflow: scroll;
`
const CollateralBox = styled(Box)`
  margin-left: 1rem;
  min-width: 13.1875rem;
  padding: 1rem 1.0625rem 1rem 1rem;
  background: #322f46;
  border-radius: 0.625rem;
`
const TotalDebtBox = styled(Box)`
  margin-left: 0.5rem;
  min-width: 13.1875rem;
  margin-right: 1rem;
  padding: 1rem 2.125rem 1rem 1rem;
  background: #322f46;
  border-radius: 0.625rem;
`
const EthTypography = styled(Typography)`
  padding-right: 0.125rem;
  font-weight: 600;
  font-size: 12px;
  line-height: 160%;
  color: #a0a3bd;
`
export default function MobileHeader() {
  return (
    <MobileHeaderBox>
      <SpaceBetweenBox>
        <FlexBox ml="1rem">
          <Typography mr="0.375rem" variant="subtitle1" fontWeight="700" color="#A0A3BD">
            1A12567J...36YU
          </Typography>
          <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.5 7.8125H8.4375C7.81618 7.8125 7.3125 8.31618 7.3125 8.9375V14C7.3125 14.6213 7.81618 15.125 8.4375 15.125H13.5C14.1213 15.125 14.625 14.6213 14.625 14V8.9375C14.625 8.31618 14.1213 7.8125 13.5 7.8125Z"
              stroke="#6E7191"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.0625 11.1875H4.5C4.20163 11.1875 3.91548 11.069 3.7045 10.858C3.49353 10.647 3.375 10.3609 3.375 10.0625V5C3.375 4.70163 3.49353 4.41548 3.7045 4.2045C3.91548 3.99353 4.20163 3.875 4.5 3.875H9.5625C9.86087 3.875 10.147 3.99353 10.358 4.2045C10.569 4.41548 10.6875 4.70163 10.6875 5V5.5625"
              stroke="#6E7191"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </FlexBox>
        <HealthBox>
          <Typography fontWeight="600" variant="body2" color="#E1536C">
            In liquidation... 110%
          </Typography>
        </HealthBox>
      </SpaceBetweenBox>
      <CollateralAndTotalDebtBox>
        <CollateralBox>
          <Typography fontWeight="600" variant="body2" color="#FFFFFF">
            Collateral
          </Typography>
          <FlexBox mt="0.5rem">
            <img src={mobilePurpleETH} alt="" />
            <Typography ml="0.5rem" fontWeight="600" variant="h5" color="#FFFFFF">
              526.1862
            </Typography>
          </FlexBox>
          <SpaceBetweenBox mt="1rem">
            <Box>
              <FlexBox>
                <EthTypography>360.26 </EthTypography>
                <EthTypography>ETH</EthTypography>
              </FlexBox>
              <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                NFT Collateral
              </Typography>
            </Box>
            <Box ml="1rem">
              <FlexBox>
                <EthTypography>360.26 </EthTypography>
                <EthTypography>ETH</EthTypography>
              </FlexBox>
              <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                ETH Collateral
              </Typography>
            </Box>
          </SpaceBetweenBox>
        </CollateralBox>
        <TotalDebtBox>
          <Typography fontWeight="600" variant="body2" color="#FFFFFF">
            Total Debt
          </Typography>
          <FlexBox mt="0.5rem">
            <img src={mobilePurpleETH} alt="" />
            <Typography ml="0.5rem" fontWeight="600" variant="h5" color="#FFFFFF">
              467.5814
            </Typography>
          </FlexBox>
          <SpaceBetweenBox mt="1rem">
            <Box>
              <FlexBox>
                <EthTypography>360.26 </EthTypography>
                <EthTypography>ETH</EthTypography>
              </FlexBox>
              <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                ETH Debt
              </Typography>
            </Box>
            <Box ml="1rem">
              <FlexBox>
                <EthTypography>360.26 </EthTypography>
                <EthTypography>ETH</EthTypography>
              </FlexBox>
              <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                Borrowings
              </Typography>
            </Box>
          </SpaceBetweenBox>
        </TotalDebtBox>
      </CollateralAndTotalDebtBox>
    </MobileHeaderBox>
  )
}
