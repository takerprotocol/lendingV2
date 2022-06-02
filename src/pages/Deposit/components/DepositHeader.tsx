import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import Rectangle from 'assets/images/svg/deposit/Rectangle 853.svg'
import myCollateralIcon from 'assets/images/svg/dashboard/myCollateral-icon.svg'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
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
export default function DepositHeader() {
  return (
    <Box>
      <HeaderBox>
        <FlexBox>
          <FlexBox>
            <img src={Rectangle} alt="" />
            <ImagesBox height="110px"></ImagesBox>
            <ImagesBox height="100px"></ImagesBox>
          </FlexBox>
          <Box ml="12px" width="272px">
            <Typography component="p" variant="h1" fontWeight="700" fontSize=" 24px" lineHeight="29px" color="#14142A">
              CRYPTOPUNKS
            </Typography>
            <Typography
              mt={'12px'}
              component="p"
              variant="subtitle2"
              fontWeight="500"
              lineHeight="16px"
              color="#A0A3BD"
            >
              60 Active Users
            </Typography>
          </Box>
          <Box width="198px">
            <Typography component="p" variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66">
              Total Value Locked{' '}
            </Typography>
            <Box>
              <img margin-top={'15px'} src={myCollateralIcon} alt="" />
              <Typography
                ml="7px"
                mt={'8px'}
                component="span"
                variant="body1"
                fontSize="24px"
                fontWeight="600"
                lineHeight="38px"
                color="#4E4B66"
              >
                4,726.00
              </Typography>
            </Box>
            <Typography mt={'4px'} component="p" variant="subtitle1" fontWeight="600" lineHeight="18px" color="#A0A3BD">
              9221 NFTs
            </Typography>
          </Box>
          <Box width="148px">
            <Typography component="p" variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66">
              Floor Price
            </Typography>
            <Box>
              <img margin-top={'15px'} src={myCollateralIcon} alt="" />
              <Typography
                ml="7px"
                mt={'8px'}
                component="span"
                variant="body1"
                fontSize="24px"
                fontWeight="600"
                lineHeight="38px"
                color="#4E4B66"
              >
                51.90
              </Typography>
              <Box height={'22px'}></Box>
            </Box>
          </Box>
          <Box width="198px">
            <Typography component="p" variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66">
              TLoan to value
            </Typography>
            <Box>
              <img margin-top={'15px'} src={myCollateralIcon} alt="" />
              <Typography
                ml="7px"
                mt={'8px'}
                component="span"
                variant="body1"
                fontSize="24px"
                fontWeight="600"
                lineHeight="38px"
                color="#4E4B66"
              >
                67.83
              </Typography>
            </Box>
            <Typography mt={'4px'} component="p" variant="subtitle1" fontWeight="600" lineHeight="18px" color="#A0A3BD">
              70%
            </Typography>
          </Box>
        </FlexBox>
        <FlexBox mt={'24px'}>
          <RightFlexBox>
            <FlexBox>
              <Box width={'86px'}>
                <Typography
                  component="p"
                  variant="h1"
                  fontWeight="600"
                  fontSize=" 24px"
                  lineHeight="38px"
                  color="#4BC8B1"
                >
                  20%
                </Typography>
              </Box>
              <Box sx={{ width: '62px' }}>
                <FlexBox
                  sx={{
                    width: '24px',
                    borderRadius: '100%',
                    height: '24px',
                    background: '#EFF0F6',
                    padding: '5px',
                  }}
                >
                  <img margin-left="20px" src={addIcon} alt="" />
                </FlexBox>
              </Box>
              <Box width={'86px'}>
                <Typography
                  component="p"
                  variant="h1"
                  fontWeight="600"
                  fontSize=" 24px"
                  lineHeight="38px"
                  color="#6E7191"
                >
                  -10%
                </Typography>
              </Box>
              <Box width="60px">
                <FlexBox
                  sx={{
                    width: '24px',
                    borderRadius: '100%',
                    height: '24px',
                    background: '#EFF0F6',
                    padding: '5px',
                  }}
                >
                  <img margin-left="20px" src={rightIcon} alt="" />
                </FlexBox>
              </Box>

              <Box>
                <Typography
                  component="p"
                  variant="h1"
                  fontWeight="600"
                  fontSize=" 24px"
                  lineHeight="38px"
                  color="#4E4B66"
                >
                  10%
                </Typography>
              </Box>
            </FlexBox>
            <FlexBox>
              <Box mt={'4px'} width="149px">
                <Typography component="span" variant="body1" fontWeight="600" color="#A0A3BD">
                  Token Reward
                </Typography>
              </Box>
              <Box width="147px">
                <Typography component="span" variant="body1" fontWeight="600" color="#A0A3BD">
                  Borrow APY
                </Typography>
              </Box>
              <Box>
                <Typography component="span" variant="body1" fontWeight="600" color="#4E4B66">
                  Net Borrow APY
                </Typography>
              </Box>
            </FlexBox>
          </RightFlexBox>
          <RightFlexBox ml={'24px'}>
            <FlexBox>
              <Box ml={'24px'} width={'198px'}>
                <Typography
                  component="p"
                  variant="h1"
                  fontWeight="600"
                  fontSize=" 24px"
                  lineHeight="38px"
                  color="#4E4B66"
                >
                  70%
                </Typography>
                <Typography mt={'4px'} component="span" variant="body1" fontWeight="600" color="#A0A3BD">
                  Liquidation Threshold
                </Typography>
              </Box>
              <Box>
                <Typography
                  component="p"
                  variant="h1"
                  fontWeight="600"
                  fontSize=" 24px"
                  lineHeight="38px"
                  color="#4E4B66"
                >
                  10%
                </Typography>
                <Typography mt={'4px'} component="span" variant="body1" fontWeight="600" color="#A0A3BD">
                  Liquidation Profit
                </Typography>
              </Box>
            </FlexBox>
          </RightFlexBox>
        </FlexBox>
      </HeaderBox>
    </Box>
  )
}
