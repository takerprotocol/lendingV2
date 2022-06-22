import { Box, Button, Modal, styled, Typography } from '@mui/material'
import * as React from 'react'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import NFT5 from 'assets/images/svg/deposit/NFT5.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'

const style = {
  transform: 'rgba(0, 0, 0, 0.5)',
  width: '420px',
  padding: '24px',
  background: '#FFFFFF',
  boxShadow: '0px 15px 30px rgba(20, 20, 42, 0.2)',
  borderRadius: '12px',
}
export const FlexEndBox = styled(Box)`
  display: flex;
  margin: 8px 8px 0px 0px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`
const RightFlexBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 10px;
  padding: 16px;
  margin-top: 24px;
`
const WithdrawList = styled(Box)`
  width: 372px;
  max-height: 257px;
  margin-top: 16px;
  background: #f7f7fc;
  border-radius: 8px;
  overflow: auto;
  padding: 16px 16px 0px 16px;
`
export default function NFTsSelectedModal({ open1, handle1 }: { open1: boolean; handle1: Function }) {
  return (
    <Modal open={open1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <FlexEndBox
          onClick={() => {
            handle1(false)
          }}
        >
          <img src={shutOff} alt="" />
        </FlexEndBox>
        <FlexBox>
          <Typography variant="h5" component="h1" color="#14142A">
            7 NFTs selected
          </Typography>
        </FlexBox>
        <FlexBox mt={'2px'}>
          <Typography variant="body1" component="h1" color="#A0A3BD">
            2.0382 ETH value
          </Typography>
        </FlexBox>
        <WithdrawList>
          <FlexBox mb="24px">
            <img src={NFT5} alt="" />
            <Box width="232px" ml="12px" mr="24px">
              <Typography variant="body1" fontWeight="600" component="h1" color="#A0A3BD">
                CryptoPunk #8314
              </Typography>
            </Box>
            <Typography variant="body1" component="h1" color="#A0A3BD">
              x 1
            </Typography>
          </FlexBox>
        </WithdrawList>
        <SpaceBetweenBox mt="24px">
          <Box>
            <Typography variant="body1" component="p" color="#A0A3BD">
              Collateral value (ETH)
            </Typography>
            <Typography mt="16px" variant="body1" component="p" color="#A0A3BD">
              Borrow Limited (ETH)
            </Typography>
            <Typography mt="16px" variant="body1" component="p" color="#A0A3BD">
              Borrow Limit Used
            </Typography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="body1" component="span" color="#A0A3BD">
                3.0918 {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                3.0918
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
              <Typography variant="body1" component="span" color="#A0A3BD">
                20% {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                20%
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
              <Typography variant="body1" component="span" color="#A0A3BD">
                20% {'>'}
              </Typography>
              <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
                20%
              </Typography>
            </Box>
          </Box>
        </SpaceBetweenBox>
        <SpaceBetweenBox mt="16px">
          <Box>
            <Typography variant="body1" component="span" color="#A0A3BD">
              Risk level
            </Typography>
            <Typography ml="8px" variant="body1" component="span" fontWeight="700" color="#4BC8B1">
              HEALTHY
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography variant="body1" component="span" color="#A0A3BD">
              186% {'>'}
            </Typography>
            <Typography ml="6px" variant="body1" component="span" fontWeight="700" color="#14142A">
              186%
            </Typography>
          </Box>
        </SpaceBetweenBox>
        <RightFlexBox>
          <FlexBox>
            <Box width={'65px'}>
              <Typography component="p" variant="subtitle2" lineHeight="16px" color="#4BC8B1">
                20%
              </Typography>
            </Box>
            <Box sx={{ width: '52px' }}>
              <FlexBox
                sx={{
                  width: '18px',
                  borderRadius: '100%',
                  height: '18px',
                  background: '#EFF0F6',
                  padding: '4.88px',
                }}
              >
                <img height="8.25px" width="8.25px" src={addIcon} alt="" />
              </FlexBox>
            </Box>
            <Box width={'66px'}>
              <Typography component="p" variant="subtitle2" lineHeight="16px" color="#6E7191">
                -10%
              </Typography>
            </Box>
            <Box width="50px">
              <FlexBox
                sx={{
                  width: '18px',
                  borderRadius: '100%',
                  height: '18px',
                  background: '#EFF0F6',
                  padding: '4.88px',
                }}
              >
                <img height="8.25px" width="8.25px" src={rightIcon} alt="" />
              </FlexBox>
            </Box>
            <Box>
              <Typography component="p" variant="subtitle2" lineHeight="16px" color="#4E4B66">
                10%
              </Typography>
            </Box>
          </FlexBox>
          <FlexBox>
            <Box width="117px">
              <Typography component="span" variant="body2" fontWeight="500" color="#A0A3BD">
                Token Reward
              </Typography>
            </Box>
            <Box width="116px">
              <Typography component="span" variant="body2" fontWeight="600" color="#A0A3BD">
                Borrow APY
              </Typography>
            </Box>
            <Box>
              <Typography component="span" variant="body2" fontWeight="600" color="#4E4B66">
                Net Borrow APY
              </Typography>
            </Box>
          </FlexBox>
        </RightFlexBox>
        <Button variant="contained" sx={{ width: '372px', height: '54px', marginTop: '24px' }}>
          Withdraw
        </Button>
      </Box>
    </Modal>
  )
}
