import { Box, Button, styled, Tooltip, Typography } from '@mui/material'
import NFT1 from 'assets/images/svg/dashboard/NFT1.svg'
import MyNFTCollateralBg from 'assets/images/svg/dashboard/MyNFTCollateralBg.svg'
import ButtonDeposit from 'assets/images/svg/dashboard/Buttom-Deposit.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNftCollateral, useUserNftConfig } from 'state/user/hooks'

const MyNFTCollateralBox = styled(Box)`
  width: 322px;
  height: 333px;
  position: relative;
`
const TopBox = styled(Box)`
  width: 322px;
  padding: 24px 24px;
  height: 98px;
  position: absolute;
  top: 0px;
  background-image: url(${MyNFTCollateralBg});
  background-repeat: no-repeat;
`
const ButtonBox = styled(Box)`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  height: 28px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TypographyButton = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  color: #ffffff;
  opacity: 0.8;
`
const BottomBox = styled(Box)`
  padding: 36px 16px;
  width: 322px;
  top: 86px;
  height: 247px;
  position: absolute;
  background: linear-gradient(180deg, #ffffff 49.8%, rgba(255, 255, 255, 0) 100%);
  box-shadow: 0px 5px 10px #f8f8fd;
  .left {
    margin-left: 8px;
  }
`
const BottomTopBox = styled(Box)`
  width: 290px;
  padding: 10px 10px 10px 8px;
  background: #f7f7fc;
  border-radius: 4px;
  margin-bottom: 31px;
`
const ImgBox = styled(Box)`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`
const NftListBox = styled(Box)`
  margin-bottom: 16px;
  margin-left: 8px;
`
interface MyNFTCollateralProps {
  type: number
  loading: boolean
}
export default function MyNFTCollateral({ type, loading }: MyNFTCollateralProps) {
  const navigate = useNavigate()
  const nftConfig = useUserNftConfig()
  const [dataType] = useState<boolean>(true)
  const collateral = useNftCollateral()
  return (
    <MyNFTCollateralBox>
      <BottomBox>
        <BottomTopBox>
          {dataType ? (
            <SpaceBetweenBox>
              <Box>
                <Typography variant="body1" fontWeight="700" color="#6E7191">
                  My Deposited Collections
                </Typography>
              </Box>
              <FlexBox>
                {[0, 1].map((el: any) => {
                  return (
                    <ImgBox key={`ImgBox${el}`}>
                      <img width="24px" height="24px" src={NFT1} alt="" />
                    </ImgBox>
                  )
                })}
              </FlexBox>
            </SpaceBetweenBox>
          ) : (
            <Typography variant="body1" fontWeight="700" color="#6E7191">
              You haven{`'`}t deposit any collections.
            </Typography>
          )}
        </BottomTopBox>
        <NftListBox>
          <Typography variant="body2" fontWeight="600" color="#A0A3BD">
            We support these collections
          </Typography>
          <FlexBox mt="12px">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((el: any) => {
              return (
                <Tooltip key={`ImgBox${el}`} title="Add" arrow placement="top">
                  <ImgBox>
                    <img width="24px" height="24px" src={NFT1} alt="" />
                  </ImgBox>
                </Tooltip>
              )
            })}
          </FlexBox>
        </NftListBox>
        <Button
          sx={{ width: '274px', marginLeft: '8px', height: '48px' }}
          variant="contained"
          onClick={() => navigate('/deposit')}
        >
          Deposit
          <img className="left" src={ButtonDeposit} alt="" />
        </Button>
      </BottomBox>
      <TopBox>
        <Typography mb="12px" variant="body1" color=" rgba(255, 255, 255, 0.7)" lineHeight="14px">
          My NFT Collateral
        </Typography>
        <SpaceBetweenBox>
          <FlexBox>
            <Typography variant="h5" fontWeight="600" color="#ffffff" lineHeight="22px">
              {collateral}
            </Typography>
            <Typography ml="8px" variant="subtitle1" fontWeight="700" color="#ffffff" lineHeight="18px">
              ETH
            </Typography>
          </FlexBox>
          {dataType && (
            <ButtonBox>
              <TypographyButton>{nftConfig} NFTs</TypographyButton>
            </ButtonBox>
          )}
        </SpaceBetweenBox>
      </TopBox>
    </MyNFTCollateralBox>
  )
}
