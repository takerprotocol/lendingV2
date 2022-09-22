import { Box, styled, Typography, Button, Checkbox } from '@mui/material'
import mobileButtonRight from 'assets/images/svg/dashboard/mobileButtonRight.svg'
import mobileMyETHCollateralPrompt from 'assets/images/svg/dashboard/mobileMyETHCollateralPrompt.svg'
import { SpaceBox, FlexEndBox, CenterBox } from 'styleds'

const MyETHCollateralBox = styled(Box)`
  background: linear-gradient(249.47deg, #6aa2f7 0%, #627eea 100%);
  box-shadow: 0 0.5rem 1rem rgba(128, 139, 238, 0.3), inset 0 0.0625rem 0.1875rem rgba(170, 189, 255, 0.7);
  border-radius: 0.5rem;
  padding: 1rem 1rem 0.75rem 1rem;
  margin-top: 1rem;
  .Padding-button {
    min-width: 5.75rem;
    height: 2.25rem;
    padding: 0.5625rem  0.875rem 0.5625rem ;1.25rem
  }
  .MuiCheckbox-root{
    padding:0;
    width:1.25rem;
    height:1.25rem;
    .PrivateSwitchBase-input{
      width:1.25rem;
      height:1.25rem;
    }
    .MuiSvgIcon-root{
      width:1.25rem;
      height:1.25rem;
    }
  }
`
const NFTsBox = styled(Box)`
  width: 80.2%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
`
const MyETHRightBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const NetSupplyAPYBox = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  width: 56.272%;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  padding: 0.375rem 0.5rem 0.375rem 0.6875rem;
  margin-top: 0.625rem;
  ::before {
    content: '';
    display: block;
    position: absolute;
    right: calc(50% - 1.96875rem);
    bottom: calc(100%);
    border-width: 0.375rem 0.3125rem;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent rgba(217, 217, 217, 0.1) transparent;
  }
`

export default function MobileMyETHCollateral() {
  return (
    <MyETHCollateralBox>
      <SpaceBox>
        <Box>
          <Typography mb={'0.25rem'} variant="body2" color="#ffffff">
            My NFT Collateral
          </Typography>
          <Typography variant="subtitle1" component="span" fontWeight="700" color="#ffffff">
            10.3128{' '}
            <Typography variant="body1" component="span" fontWeight="700" color="#ffffff">
              ETH
            </Typography>
          </Typography>
          <NFTsBox>
            <Typography variant="body2" fontWeight="600" lineHeight="0.75rem" color="#ffffff">
              Withdraw {'>'}
            </Typography>
          </NFTsBox>
        </Box>
        <MyETHRightBox>
          <CenterBox>
            <Typography mr="0.5rem" variant="body2" fontWeight="700" color="#ffffff">
              Used as Collateral
            </Typography>
            <Checkbox defaultChecked />
          </CenterBox>
          <Box mt="33px" ml="2.6rem">
            <Button className="Padding-button" variant="contained" color="secondary">
              <Typography variant="body2" component="span" fontWeight="700" color="#578AEB">
                Supply
              </Typography>
              <img src={mobileButtonRight} alt="" />
            </Button>
          </Box>
        </MyETHRightBox>
      </SpaceBox>
      <FlexEndBox>
        <NetSupplyAPYBox>
          <Typography
            mr="0.5rem"
            variant="body2"
            component="span"
            lineHeight="0.75rem"
            fontWeight="600"
            color="#ffffff"
          >
            30%{' '}
            <Typography lineHeight="0.75rem" variant="body2" color="#ffffff" component="span">
              Net Supply APY
            </Typography>
          </Typography>
          <img src={mobileMyETHCollateralPrompt} alt="" />
        </NetSupplyAPYBox>
      </FlexEndBox>
    </MyETHCollateralBox>
  )
}
