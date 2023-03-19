import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, FlexBox } from 'styleds'
import Copy from 'components/Copy'
import mobilePurpleETH from 'assets/images/svg/dashboard/mobilePurpleETH-iocn.svg'
import { liquidateAbbrevAddress } from 'utils/abbrevAddres'
import MobileLiquidateHeaderSkeleton from '../mobileLiquidateSkeleton/MobileLiquidateHeaderSkeleton'
import { fixedFormat, getRiskLevelTag } from 'utils'
import { useMemo } from 'react'
const MobileHeaderBox = styled(Box)`
  background: #262338;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1.8125rem;
`
const HealthBox = styled(Box)`
  padding: 0.1875rem 0.75rem;
  border: 0.0625rem solid rgba(225, 83, 108, 0.5);
  filter: drop-shadow(0px 0.25rem 0.5rem rgba(221, 140, 140, 0.1));
  border-radius: 2.1875rem;
  margin-right: 1rem;
`
const CollateralAndTotalDebtBox = styled(FlexBox)`
  margin: 1.4375rem 1rem 0 1rem;
  padding: 1rem;
  border-radius: 0.625rem;
  background: #322f46;
`
const CollateralBox = styled(Box)`
  width: 10rem;
`
const TotalDebtBox = styled(Box)``
// const EthTypography = styled(Typography)`
//   padding-right: 0.125rem;
//   font-weight: 600;
//   font-size: 12px;
//   line-height: 160%;
//   color: #a0a3bd;
// `
interface MobileHeaderProps {
  address: string
  riskPercentage: string
  totalCollateral: string
  nftCollateral: string
  ethCollateral: string
  totalDebt: string
  ethDebt: string
  borrowings: string
  loading: boolean
}
export default function MobileHeader({
  address,
  riskPercentage,
  totalCollateral,
  nftCollateral,
  ethCollateral,
  totalDebt,
  ethDebt,
  borrowings,
  loading,
}: MobileHeaderProps) {
  const myLoanRiskLevelTag = useMemo(() => {
    return getRiskLevelTag(riskPercentage)
  }, [riskPercentage])
  return (
    <MobileHeaderBox>
      {loading ? (
        <MobileLiquidateHeaderSkeleton></MobileLiquidateHeaderSkeleton>
      ) : (
        <>
          <SpaceBetweenBox>
            <FlexBox ml="1rem">
              <Typography mr="0.375rem" variant="subtitle1" fontWeight="700" color="#A0A3BD">
                {liquidateAbbrevAddress(address)}
              </Typography>
              <Copy text={address} />
            </FlexBox>
            <HealthBox className={myLoanRiskLevelTag} sx={{ border: '1px solid' }}>
              <Typography fontWeight="600" className={myLoanRiskLevelTag} variant="body2">
                IN LIQUIDATION... {riskPercentage}%
              </Typography>
            </HealthBox>
          </SpaceBetweenBox>
          <CollateralAndTotalDebtBox>
            <CollateralBox>
              <Typography fontWeight="600" lineHeight="0.75rem" variant="body2" color="#FFFFFF">
                Collateral
              </Typography>
              <FlexBox mt="0.5rem">
                <img src={mobilePurpleETH} alt="" />
                <Typography ml="0.5rem" variant="subtitle1" color="#FFFFFF">
                  {fixedFormat(totalCollateral)}
                </Typography>
              </FlexBox>
              {/* <SpaceBetweenBox mt="1rem">
                <Box>
                  <FlexBox>
                    <EthTypography>{nftCollateral} </EthTypography>
                    <EthTypography>ETH</EthTypography>
                  </FlexBox>
                  <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                    NFT Collateral
                  </Typography>
                </Box>
                <Box ml="1rem">
                  <FlexBox>
                    <EthTypography>{ethCollateral} </EthTypography>
                    <EthTypography>ETH</EthTypography>
                  </FlexBox>
                  <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                    ETH Collateral
                  </Typography>
                </Box>
              </SpaceBetweenBox> */}
            </CollateralBox>
            <TotalDebtBox>
              <Typography lineHeight="0.75rem" fontWeight="600" variant="body2" color="#FFFFFF">
                Total Debt
              </Typography>
              <FlexBox mt="0.5rem">
                <img src={mobilePurpleETH} alt="" />
                <Typography ml="0.5rem" variant="subtitle1" color="#FFFFFF">
                  {fixedFormat(totalDebt)}
                </Typography>
              </FlexBox>
              {/* <SpaceBetweenBox mt="1rem">
                <Box>
                  <FlexBox>
                    <EthTypography>{ethDebt} </EthTypography>
                    <EthTypography>ETH</EthTypography>
                  </FlexBox>
                  <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                    ETH Debt
                  </Typography>
                </Box>
                <Box ml="1rem">
                  <FlexBox>
                    <EthTypography>{borrowings} </EthTypography>
                    <EthTypography>ETH</EthTypography>
                  </FlexBox>
                  <Typography color="rgba(160, 163, 189, 0.7)" variant="body2">
                    Borrowings
                  </Typography>
                </Box>
              </SpaceBetweenBox> */}
            </TotalDebtBox>
          </CollateralAndTotalDebtBox>
        </>
      )}
    </MobileHeaderBox>
  )
}
