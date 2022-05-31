import { Typography, Box, styled } from '@mui/material'
import NFT1 from 'assets/images/svg/dashboard/NFT1.svg'
import NFT2 from 'assets/images/svg/dashboard/NFT2.svg'
import NFT3 from 'assets/images/svg/dashboard/NFT3.svg'
import NFT4 from 'assets/images/svg/dashboard/NFT4.svg'
import minMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
const NFTpoolBox = styled(Box)`
  width: 494px;
  height: 98px;
  background: rgba(239, 240, 246, 0.5);
  border-radius: 12px;
  margin-right: 24px;
`
const NFTpoolFlexBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
`
export default function Pool() {
  return (
    <Box mt="48px">
      <Box mb="24px">
        <Typography component="samp" variant="h4" color="#14142A" ml="24px">
          NFT Pool
        </Typography>
      </Box>
      <NFTpoolFlexBox>
        <NFTpoolBox>
          <NFTpoolFlexBox>
            <Box width="50%" padding="24px">
              <NFTpoolFlexBox height="24px">
                <Box mr="4px">
                  <img width="24px" height="24px" src={NFT1} alt="" />
                </Box>
                <Box mr="4px">
                  <img width="24px" height="24px" src={NFT2} alt="" />
                </Box>
                <Box mr="4px">
                  <img width="24px" height="24px" src={NFT3} alt="" />
                </Box>
                <Box>
                  <img width="24px" height="24px" src={NFT4} alt="" />
                </Box>
              </NFTpoolFlexBox>
              <Box>
                <Typography component="p" variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66" mt="12px">
                  4 Deposited Collections
                </Typography>
              </Box>
            </Box>
            <Box width="50%">
              <NFTpoolFlexBox mt="17px">
                <Box>
                  <Typography component="span" variant="h5" fontWeight="600" color="#14142A" mr="10px">
                    6
                  </Typography>
                  <Typography component="span" variant="subtitle1" fontWeight="700" color="#14142A" mr="12px">
                    NFTs
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <img width="17px" src={minMyCollateralIcon} alt="" />
                  <Typography component="span" variant="subtitle2" color="#A0A3BD" ml="6px">
                    26.48
                  </Typography>
                </Box>
              </NFTpoolFlexBox>
              <Box>
                <Typography component="span" variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66">
                  My Deposited
                </Typography>
              </Box>
            </Box>
          </NFTpoolFlexBox>
        </NFTpoolBox>
        <NFTpoolBox>
          <NFTpoolFlexBox>
            <Box padding="24px" width="50%">
              <NFTpoolFlexBox height="24px">
                <Box mr="4px">
                  <img width="24px" height="24px" src={NFT1} alt="" />
                </Box>
                <Box mr="4px">
                  <img width="24px" height="24px" src={NFT2} alt="" />
                </Box>
                <Box mr="4px">
                  <img width="24px" height="24px" src={NFT3} alt="" />
                </Box>
                <Box>
                  <img width="24px" height="24px" src={NFT4} alt="" />
                </Box>
              </NFTpoolFlexBox>
              <Box>
                <Typography component="p" variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66" mt="12px">
                  6 Deposited Collections
                </Typography>
              </Box>
            </Box>
            <Box width="50%">
              <NFTpoolFlexBox mt="17px">
                <Box>
                  <Typography component="span" variant="h5" color="#14142A" mr="10px">
                    12
                  </Typography>
                  <Typography component="span" variant="subtitle2" fontWeight="700" color="#14142A" mr="12px">
                    NFTs
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <img width="17px" src={minMyCollateralIcon} alt="" />
                  <Typography component="span" variant="subtitle2" color="#A0A3BD" ml="6px">
                    48.75
                  </Typography>
                </Box>
              </NFTpoolFlexBox>
              <Box>
                <Typography component="span" variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66">
                  My Available Balance
                </Typography>
              </Box>
            </Box>
          </NFTpoolFlexBox>
        </NFTpoolBox>
      </NFTpoolFlexBox>
    </Box>
  )
}
