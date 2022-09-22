import { Box, Button, styled, Typography } from '@mui/material'
import mobileButtonDown from 'assets/images/svg/dashboard/mobileButtonDown.svg'
import { useNavigate } from 'react-router-dom'
import { SpaceBox } from 'styleds'
const MyNFTCollateralBox = styled(Box)`
  background: linear-gradient(249.47deg, #7a82ff 0%, #9574f5 100%);
  box-shadow: 0 0.5rem 1rem rgba(128, 139, 238, 0.3), inset 0 0.0625rem 0.1875rem rgba(170, 189, 255, 0.7);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  .Padding-button {
    min-width: 5.75rem;
    height: 2.25rem;
    padding: 0.5625rem 0.75rem 0.5625rem 1.0625rem;
  }
`
const NFTsBox = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  opacity: 0.6;
  border-radius: 4px;
  padding: 0.375rem 0.5rem;
  margin-top: 0.5rem;
`
export default function MobileMyNFTCollateral() {
  const navigate = useNavigate()
  return (
    <MyNFTCollateralBox>
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
            <Typography variant="body2" lineHeight="0.75rem" color="#ffffff">
              6 NFTs · 2 collections
            </Typography>
          </NFTsBox>
        </Box>
        <Box mt="48px">
          <Button onClick={() => navigate('/deposit')} className="Padding-button" variant="contained" color="secondary">
            <Typography variant="body2" component="span" fontWeight="700" color=" #716CF8">
              Deposit
            </Typography>
            <img src={mobileButtonDown} alt="" />
          </Button>
        </Box>
      </SpaceBox>
    </MyNFTCollateralBox>
  )
}
