import { Box, styled, Typography } from '@mui/material'
import footerTaker from 'assets/images/svg/common/footerTaker.svg'
import footer1 from 'assets/images/svg/common/footer-1.svg'
import footer2 from 'assets/images/svg/common/footer-2.svg'
import footer3 from 'assets/images/svg/common/footer-3.svg'
import footer4 from 'assets/images/svg/common/footer-4.svg'

const FooterStyleBox = styled(Box)`
  width: 100%;
  height: 267px;
  background: #14142a;
  padding: 48px 140px;
  margin-top: 72px;
`
const FlexBox = styled(Box)`
  display: flex;
`
const ImgBox = styled(Box)`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin: 24px 24px 24px 0px;
`

export default function Footer() {
  return (
    <FooterStyleBox>
      <FlexBox>
        <Box width="581px">
          <img src={footerTaker} alt="" />
          <Typography mt="25px" variant="body1" fontWeight="400" color="#A0A3BD">
            The fundamental financial infrastructure
          </Typography>
          <Typography variant="body1" fontWeight="400" color="#A0A3BD">
            for NFT ecosystem
          </Typography>
          <Typography mt="16px" variant="body1" fontWeight="400" color="#A0A3BD">
            Contact us via{' '}
            <Typography component="span" variant="body1" color=" rgba(217, 219, 233)">
              support@taker.org
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography fontWeight="700" variant="subtitle1" color="#ffffff">
            support@taker.org
          </Typography>
          <FlexBox>
            <ImgBox>
              <img src={footer1} alt="" />
            </ImgBox>
            <ImgBox>
              <img src={footer2} alt="" />
            </ImgBox>
            <ImgBox>
              <img src={footer3} alt="" />
            </ImgBox>
            <ImgBox>
              <img src={footer4} alt="" />
            </ImgBox>
          </FlexBox>
          <Typography lineHeight="20px" variant="body1" fontWeight="400" color="#A0A3BD">
            © 2022 Taker Protocol | Privacy Policy | Terms
          </Typography>
        </Box>
      </FlexBox>
    </FooterStyleBox>
  )
}
