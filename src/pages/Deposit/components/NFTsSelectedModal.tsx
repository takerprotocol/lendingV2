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
const BodyTypography = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #a0a3bd;
`
interface NFTsSelectedTypy {
  openSelectedModal: boolean
  setOpenSelectedModal: Function
}
export default function NFTsSelectedModal({ openSelectedModal, setOpenSelectedModal }: NFTsSelectedTypy) {
  return (
    <Modal open={openSelectedModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <FlexEndBox
          onClick={() => {
            setOpenSelectedModal(false)
          }}
        >
          <img src={shutOff} alt="" />
        </FlexEndBox>
        <FlexBox>
          <Typography variant="h5" component="h1">
            7 NFTs selected
          </Typography>
        </FlexBox>
        <FlexBox mt={'2px'}>
          <Typography variant="body1" component="h1" color="#A0A3BD">
            2.0382 ETH value
          </Typography>
        </FlexBox>
        <WithdrawList>
          {[0, 1, 2, 3, 4, 5].map((el: any, index: number) => (
            <FlexBox mb="24px" key={index}>
              <img src={NFT5} alt="" />
              <Box width="232px" ml="12px" mr="24px">
                <BodyTypography color="#6E7191 !important" fontWeight="600 !important">
                  CryptoPunk #8314
                </BodyTypography>
              </Box>
              <BodyTypography>x 1</BodyTypography>
            </FlexBox>
          ))}
        </WithdrawList>

        <SpaceBetweenBox mt="24px">
          <Box>
            <BodyTypography>Collateral value (ETH)</BodyTypography>
            <BodyTypography mt="16px"> Borrow Limited (ETH)</BodyTypography>
            <BodyTypography mt="16px">Borrow Limit Used</BodyTypography>
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BodyTypography>3.0918 {'>'}</BodyTypography>
              <BodyTypography ml="6px" fontWeight="700 !important" color="#14142A !important">
                3.0918
              </BodyTypography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
              <BodyTypography>20% {'>'}</BodyTypography>
              <BodyTypography ml="6px !important" fontWeight="700" color="#14142A !important">
                20%
              </BodyTypography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} mt="16px">
              <BodyTypography>20% {'>'}</BodyTypography>
              <BodyTypography ml="6px" fontWeight="700 !important" color="#14142A !important">
                20%
              </BodyTypography>
            </Box>
          </Box>
        </SpaceBetweenBox>
        <SpaceBetweenBox mt="16px">
          <Box>
            <BodyTypography sx={{ display: 'inline-block' }}>Risk level</BodyTypography>
            <BodyTypography
              sx={{ display: 'inline-block' }}
              ml="8px"
              fontWeight="700 !important"
              color="#4BC8B1 !important"
            >
              HEALTHY
            </BodyTypography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <BodyTypography>186% {'>'}</BodyTypography>
            <BodyTypography ml="6px" fontWeight="700 !important" color="#14142A !important">
              186%
            </BodyTypography>
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
              <BodyTypography>Token Reward</BodyTypography>
            </Box>
            <Box width="116px">
              <BodyTypography fontWeight="600 !important">Borrow APY</BodyTypography>
            </Box>
            <Box>
              <BodyTypography fontWeight="600 !important" color="#4E4B66 !important">
                Net Borrow APY
              </BodyTypography>
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
