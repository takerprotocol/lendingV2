import { Typography, Box, styled } from '@mui/material'
import NFT1 from 'assets/images/svg/dashboard/NFT1.svg'
import List from 'assets/images/svg/dashboard/List.svg'
import NFT2 from 'assets/images/svg/dashboard/NFT2.svg'
import NFT3 from 'assets/images/svg/dashboard/NFT3.svg'
import NFT4 from 'assets/images/svg/dashboard/NFT4.svg'
import minMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import * as React from 'react'
import { PopperPlacementType } from '@mui/material/Popper'
import NFTListPopper from './NFTListPopper'
import NFTPoolSkeleton from './DashboardSkeleton/NFTPoolSkeleton'
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
const ImgBox = styled(Box)`
  :hover {
    transform: translateY(-4px);
    transition: all 0.25s ease-in;
  }
`
interface NFTPoolType {
  loading: boolean
}
export default function NFTPool({ loading }: NFTPoolType) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState<PopperPlacementType>()
  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }
  return (
    <Box mt="48px">
      {loading ? (
        <NFTPoolSkeleton />
      ) : (
        <>
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
                    <ImgBox mr="4px">
                      <img width="24px" height="24px" src={NFT1} alt="" />
                    </ImgBox>
                    <ImgBox mr="4px">
                      <img width="24px" height="24px" src={NFT2} alt="" />
                    </ImgBox>
                    <ImgBox mr="4px">
                      <img width="24px" height="24px" src={NFT3} alt="" />
                    </ImgBox>
                    <ImgBox>
                      <img width="24px" height="24px" src={NFT4} alt="" />
                    </ImgBox>
                  </NFTpoolFlexBox>
                  <Box mt="12px">
                    <Typography variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66">
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
                    <ImgBox mr="4px">
                      <img width="24px" height="24px" src={NFT1} alt="" />
                    </ImgBox>
                    <ImgBox mr="4px">
                      <img width="24px" height="24px" src={NFT2} alt="" />
                    </ImgBox>
                    <ImgBox mr="4px">
                      <img width="24px" height="24px" src={NFT3} alt="" />
                    </ImgBox>
                    <ImgBox>
                      <img width="24px" height="24px" src={NFT4} alt="" />
                    </ImgBox>
                    <Box onMouseEnter={handleClick('top')} onMouseLeave={handleClick('top')} sx={{ cursor: 'pointer' }}>
                      <img src={List} alt="" />
                    </Box>
                  </NFTpoolFlexBox>
                  <Box mt="12px">
                    <Typography variant="body1" fontWeight="600" lineHeight="14px" color="#4E4B66">
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
          <NFTListPopper open={open} anchorEl={anchorEl} placement={placement}></NFTListPopper>
        </>
      )}
    </Box>
  )
}
