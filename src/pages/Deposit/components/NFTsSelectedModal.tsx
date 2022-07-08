import { Box, Button, Modal, styled, Typography } from '@mui/material'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import shutOff from 'assets/images/svg/common/shutOff.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds/index'
import { NftTokenModel } from 'services/type/nft'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useLendingPool } from 'hooks/useLendingPool'
import { useAddress } from 'state/user/hooks'
import { gasLimit } from 'config'
import { toast } from 'react-toastify'

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
interface NFTsSelectedType {
  openSelectedModal: boolean
  data: NftTokenModel[]
  setOpenSelectedModal: Function
  type: string
}
export default function NFTsSelectedModal({ openSelectedModal, setOpenSelectedModal, data, type }: NFTsSelectedType) {
  const contract = useLendingPool()
  const address = useAddress()
  const amount = useMemo(() => {
    return data.reduce((total: string, current: NftTokenModel) => {
      return new BigNumber(total).plus(current.balance || '0').toString()
    }, '0')
  }, [data])
  const withdraw = () => {
    console.log('withdraw')
  }
  const deposit = async () => {
    console.log(
      data.map((el) => el.contract.address),
      data.map((el) => el.tokenId),
      1,
      address
    )
    if (contract && address) {
      contract
        .depositNFTs(
          data.map((el) => el.contract.address),
          data.map((el) => el.tokenId),
          [1],
          address,
          { gasLimit }
        )
        .then((res: any) => {
          if (res && res.hash) {
            toast.success('success')
          }
        })
    }
    console.log('deposit')
  }
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
            {data.length} NFTs selected
          </Typography>
        </FlexBox>
        <FlexBox mt={'2px'}>
          <Typography variant="body1" component="h1" color="#A0A3BD">
            {amount} ETH value
          </Typography>
        </FlexBox>
        <WithdrawList>
          {data.map((el: NftTokenModel, index: number) => (
            <FlexBox mb="24px" key={index}>
              <img width="48px" src={el.rawMetadata.image} alt="" />
              <Box width="232px" ml="12px" mr="24px">
                <BodyTypography color="#6E7191 !important" fontWeight="600 !important">
                  {el.rawMetadata.name}
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
        <Button
          variant="contained"
          sx={{ width: '372px', height: '54px', marginTop: '24px' }}
          onClick={() => {
            if (type === 'Withdraw') {
              withdraw()
            } else {
              deposit()
            }
          }}
        >
          {type}
        </Button>
      </Box>
    </Modal>
  )
}
