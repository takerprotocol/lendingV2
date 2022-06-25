import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import Rectangle from 'assets/images/svg/deposit/Rectangle 853.svg'
import myCollateralIcon from 'assets/images/svg/dashboard/myCollateral-icon.svg'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import DepositHeaderSkeleton from './depositSkeleton/DepositHeaderSkeleton'
const HeaderBox = styled(Box)`
  width: 1012px;
  height: 308px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const BgFlexBox = styled(Box)`
  width: 24px;
  border-radius: 100%;
  height: 24px;
  background: #eff0f6;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const BigTypography = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  line-height: 38px;
  color: #4e4b66;
`
const SmallTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #4e4b66;
`

const ImagesBox = styled(Box)`
  background: #ffffff;
  width: 6px;
  border: 1px solid #d9dbe9;
  border-radius: 0 6px 6px 0;
  border-left: 0;
`
const RightFlexBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 10px;
  padding: 24px 24px 24px 50px;
`
interface DepositHeaderProps {
  loading: boolean
}
export default function DepositHeader({ loading }: DepositHeaderProps) {
  return (
    <Box>
      {loading ? (
        <DepositHeaderSkeleton></DepositHeaderSkeleton>
      ) : (
        <HeaderBox>
          <FlexBox>
            <FlexBox>
              <img src={Rectangle} alt="" />
              <ImagesBox height="110px"></ImagesBox>
              <ImagesBox height="100px"></ImagesBox>
            </FlexBox>
            <Box ml="12px" width="272px">
              <Typography component="p" variant="h1" fontWeight="700" fontSize=" 24px" lineHeight="29px">
                CRYPTOPUNKS
              </Typography>
              <Typography mt="12px" variant="subtitle2" fontWeight="500" lineHeight="16px" color="#A0A3BD">
                60 Active Users
              </Typography>
            </Box>
            <Box width="198px">
              <SmallTypography color="#4E4B66 !important">Total Value Locked</SmallTypography>
              <FlexBox mt="8px">
                <img margin-top="15px" src={myCollateralIcon} alt="" />
                <BigTypography ml="7px" variant="body1">
                  4,726.00
                </BigTypography>
              </FlexBox>
              <Typography mt="4px" component="p" variant="subtitle1" lineHeight="18px" color="#A0A3BD">
                9221 NFTs
              </Typography>
            </Box>
            <Box width="148px">
              <SmallTypography>Floor Price</SmallTypography>
              <Box mt="8px">
                <FlexBox>
                  <img margin-top="15px" src={myCollateralIcon} alt="" />
                  <BigTypography ml="7px" variant="body1">
                    51.90
                  </BigTypography>
                </FlexBox>
                <Box height={'22px'}></Box>
              </Box>
            </Box>
            <Box width="198px">
              <SmallTypography>TLoan to value</SmallTypography>
              <FlexBox mt="8px">
                <img margin-top={'15px'} src={myCollateralIcon} alt="" />
                <BigTypography ml="7px" variant="body1">
                  67.83
                </BigTypography>
              </FlexBox>
              <Typography mt="4px" component="p" variant="subtitle1" lineHeight="18px" color="#A0A3BD">
                70%
              </Typography>
            </Box>
          </FlexBox>
          <FlexBox mt={'24px'}>
            <RightFlexBox>
              <FlexBox>
                <Box width={'86px'}>
                  <BigTypography color="#4BC8B1 !important">20%</BigTypography>
                </Box>
                <Box sx={{ width: '62px' }}>
                  <BgFlexBox>
                    <img margin-left="20px" src={addIcon} alt="" />
                  </BgFlexBox>
                </Box>
                <Box width={'86px'}>
                  <BigTypography variant="h1" color="#6E7191 !important">
                    -10%
                  </BigTypography>
                </Box>
                <Box width="60px">
                  <BgFlexBox>
                    <img margin-left="20px" src={rightIcon} alt="" />
                  </BgFlexBox>
                </Box>
                <Box>
                  <BigTypography>10%</BigTypography>
                </Box>
              </FlexBox>
              <FlexBox>
                <Box mt={'4px'} width="149px">
                  <SmallTypography color="#A0A3BD !important">Token Reward</SmallTypography>
                </Box>
                <Box width="147px">
                  <SmallTypography color="#A0A3BD !important">Borrow APY</SmallTypography>
                </Box>
                <Box>
                  <SmallTypography>Net Borrow APY</SmallTypography>
                </Box>
              </FlexBox>
            </RightFlexBox>
            <RightFlexBox ml={'24px'}>
              <FlexBox>
                <Box ml={'24px'} width={'198px'}>
                  <BigTypography>70%</BigTypography>
                  <SmallTypography mt="4px" color="#A0A3BD !important">
                    Liquidation Threshold
                  </SmallTypography>
                </Box>
                <Box>
                  <BigTypography>10%</BigTypography>
                  <SmallTypography mt="4px" color="#A0A3BD !important">
                    Liquidation Profit
                  </SmallTypography>
                </Box>
              </FlexBox>
            </RightFlexBox>
          </FlexBox>
        </HeaderBox>
      )}
    </Box>
  )
}
