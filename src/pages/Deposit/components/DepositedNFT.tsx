import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import XIcon from 'assets/images/svg/common/close.svg'
import RefreshIcon2 from 'assets/images/svg/common/refresh2.svg'
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
  width: 161px;
  height: 48px;
  border-radius: 24px;
  background: #e1e3ee;
`
const RefreshButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #e1e3ee;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`
const XButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  background: #e1e3ee;
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
  function ButtonWithdraw() {
    if (depositType === 'shut') {
      setWithdrawType('open')
    }
  }
  const [Deposited] = useState<string>('Deposited')
  return (
    <DepositedNFTsStyleBox>
      <DepositedNFTsBox
        sx={{
          background: `${
            loading
              ? ''
              : `${
                  list ? 'linear-gradient(180deg, rgba(217, 219, 233, 0.3) 17.89%, rgba(217, 219, 233, 0) 33.61%)' : ''
                }`
          } `,
          opacity: `${depositType === 'open' ? '0.7' : '1'}`,
        }}
      >
        {loading ? (
          <AvailableAndDepositedSkeleton />
        ) : (
          <FlexBox mb="43px">
            <Box>
              <Typography component="span" variant="h5" fontWeight="700" fontSize=" 24px">
                105 Deposited NFTs
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
                Withdraw
              </Button>
            ) : (
              <FlexBox width={'268px'} mr={'24px'}>
                <XButtonBox onClick={() => setOpenSureModal(true)}>
                  <img width={'14px'} height={'14px'} src={XIcon} alt="" />
                </XButtonBox>
                <RefreshButtonBox sx={{ borderRadius: '100%' }}>
                  <img src={RefreshIcon2} alt="" />
                </RefreshButtonBox>
                <WithdrawButtonBox
                  onClick={() => {
                    setWithdrawType('shut')
                    setOpenSelectedModal(true)
                  }}
                >
                  <Typography variant="body1" component="h1" fontWeight="700" color="#14142A">
                    Withdraw 6 NFTs
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
          onChange={(data: Array<string>) => {
            setCheckedIndex(data)
          }}
        ></NFTsList>
        <Pager TypeKey={Deposited} list={list}></Pager>
      </DepositedNFTsBox>
      <NFTsSelectedModal
        type="Withdraw"
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
