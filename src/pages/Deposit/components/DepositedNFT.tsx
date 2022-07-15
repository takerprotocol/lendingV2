import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import XIcon from 'assets/images/svg/common/close.svg'
import RefreshIcon2 from 'assets/images/svg/common/refresh2.svg'
import redResetButton from 'assets/images/svg/deposit/redResetButton.svg'
import redXButton from 'assets/images/svg/deposit/redXButton.svg'
import NFTsList from './NFTsList'
import Pager from './Pager'
import AvailableAndDepositedSkeleton from './depositSkeleton/AvailableAndDepositedSkeleton'
import { useState } from 'react'
import NFTsSelectedModal from './NFTsSelectedModal'
import SureModal from './SureModal'
import { NftTokenModel } from 'services/type/nft'
const DepositedNFTsStyleBox = styled(Box)``
const DepositedNFTsBox = styled(Box)`
  width: 1012px;
  border-radius: 12px;
  padding: 24px 0 0 24px;
  margin-bottom: 42px;
  position: relative;
  background: linear-gradient(180deg, rgba(217, 219, 233, 0.3) 17.89%, rgba(217, 219, 233, 0) 100%);
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const WithdrawButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 13px 24px;
  height: 48px;
  border-radius: 24px;
`
const RefreshButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`
const XButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`
interface DepositedNftProps {
  depositType: string
  withdrawType: string
  setWithdrawType: Function
  list: NftTokenModel[]
  loading: boolean
}
export default function DepositedNFT({ depositType, withdrawType, setWithdrawType, list, loading }: DepositedNftProps) {
  const [checkedIndex, setCheckedIndex] = useState<Array<string>>([])
  const [openSelectedModal, setOpenSelectedModal] = useState<boolean>(false)
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const [withdrawLargeAmount] = useState<boolean>(true)

  function ButtonWithdraw() {
    if (depositType === 'shut') {
      setWithdrawType('open')
    }
  }
  const [Deposited] = useState<string>('Deposited')
  return (
    <DepositedNFTsStyleBox
      sx={{
        opacity: `${depositType === 'open' ? '0.7' : '1'}`,
      }}
    >
      {list.length !== 0 ? (
        <Box>
          <Typography m="48px 24px" component="span" variant="h5" fontWeight="700" fontSize=" 24px">
            0 Deposited NFTs
          </Typography>
          <Typography ml={'16px'} component="span" variant="subtitle1" color="#6E7191">
            358.48 ETH
          </Typography>
        </Box>
      ) : (
        <DepositedNFTsBox>
          {loading ? (
            <AvailableAndDepositedSkeleton />
          ) : (
            <FlexBox mb="43px">
              <Box>
                <Typography component="span" variant="h5" fontWeight="700" fontSize=" 24px">
                  You can withdraw
                </Typography>
                <Typography ml={'16px'} component="span" variant="subtitle1" color="#6E7191">
                  358.48 ETH
                </Typography>
              </Box>
              {withdrawType === 'shut' ? (
                <Button
                  sx={{ display: `${!list && 'none'}`, marginRight: '24px' }}
                  variant="contained"
                  color="secondary"
                  onClick={ButtonWithdraw}
                >
                  Choose
                </Button>
              ) : (
                <FlexBox mr={'24px'}>
                  <Box display={withdrawLargeAmount ? '' : 'none'} mr="16px">
                    <Typography fontWeight="600" variant="body2" color="#E1536C">
                      The amount of withdraw is too large
                    </Typography>
                    <Typography fontWeight="600" variant="body2" color="#E1536C">
                      and it is easy to be liquidated
                    </Typography>
                  </Box>
                  <XButtonBox
                    onClick={() => setOpenSureModal(true)}
                    sx={{ background: `${withdrawLargeAmount ? ' rgba(225, 83, 108, 0.1)' : '#e1e3ee'}` }}
                  >
                    <img width={'14px'} height={'14px'} src={withdrawLargeAmount ? redXButton : XIcon} alt="" />
                  </XButtonBox>
                  <RefreshButtonBox
                    mx="16px"
                    sx={{
                      borderRadius: '100%',
                      background: `${withdrawLargeAmount ? '' : '#e1e3ee'}`,
                    }}
                    onClick={() => {
                      setWithdrawType('shut')
                    }}
                  >
                    <img src={withdrawLargeAmount ? redResetButton : RefreshIcon2} alt="" />
                  </RefreshButtonBox>
                  <WithdrawButtonBox
                    sx={{ background: `${withdrawLargeAmount ? ' rgba(225, 83, 108, 0.1)' : '#e1e3ee'}` }}
                    onClick={() => {
                      if (checkedIndex.length === 0) {
                        setOpenSelectedModal(true)
                      }
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="h1"
                      fontWeight="700"
                      color={withdrawLargeAmount ? '#E1536C' : '#14142A'}
                    >
                      Withdraw {checkedIndex.length} NFTs
                    </Typography>
                  </WithdrawButtonBox>
                </FlexBox>
              )}
            </FlexBox>
          )}
          <NFTsList
            loading={loading}
            TypeKey={Deposited}
            list={list}
            depositType={withdrawType}
            checked={checkedIndex}
            onChange={(data: Array<string>) => {
              setCheckedIndex(data)
            }}
          ></NFTsList>
          <Pager TypeKey={Deposited} list={list}></Pager>
        </DepositedNFTsBox>
      )}
      <NFTsSelectedModal
        type={Deposited}
        checkedIndex={checkedIndex}
        withdrawLargeAmount={withdrawLargeAmount}
        data={list.filter((el) => checkedIndex.includes(el.tokenId))}
        openSelectedModal={openSelectedModal}
        setOpenSelectedModal={setOpenSelectedModal}
      ></NFTsSelectedModal>
      <SureModal
        openSureModal={openSureModal}
        handle={(type: string) => {
          if (type === 'cancel') {
            setWithdrawType('shut')
            setCheckedIndex([])
          }
          setOpenSureModal(false)
        }}
      ></SureModal>
    </DepositedNFTsStyleBox>
  )
}
