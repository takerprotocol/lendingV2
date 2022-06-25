import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import XIcon from 'assets/images/svg/common/close.svg'
import RefreshIcon from 'assets/images/svg/common/refresh.svg'
import NFTsList from './NFTsList'
import Pager from './Pager'
import AvailableAndDepositedSkeleton from './depositSkeleton/AvailableAndDepositedSkeleton'
import { useState } from 'react'

const AvailableNFTsBox = styled(Box)`
  width: 1012px;
  position: relative;
  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 33.61%);
  border-radius: 12px;
  padding: 24px 0 0 24px;
  margin-top: 24px;
  margin-bottom: 42px;
`
const AvailableNFTsStyleBox = styled(Box)``
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const DepositButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 13px 22px;
  width: 148px;
  height: 48px;
  border-radius: 24px;
  background: #eff0f7;
`
const RefreshButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  background: #eff0f7;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`
const XButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  background: #eff0f7;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`
interface AvailableNFTsProps {
  depositType: string
  withdrawType: string
  list: any[]
  setDepositType: Function
  loading: boolean
  setOpenSelectedModal: Function //SureModal
  setOpenSureModal: Function //NFTsSelectedModal
}
export default function AvailableNFTs({
  depositType,
  withdrawType,
  list,
  loading,
  setOpenSelectedModal,
  setOpenSureModal,
  setDepositType,
}: AvailableNFTsProps) {
  function ButtonDeposit() {
    if (withdrawType === 'shut') {
      setDepositType('open')
    }
  }
  const [Available] = useState<string>('Available')
  return (
    <AvailableNFTsStyleBox>
      <AvailableNFTsBox
        sx={{
          background: `${loading ? '' : 'linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 33.61%)'}`,
          opacity: `${withdrawType === 'open' ? '0.7' : '1'}`,
        }}
      >
        {loading ? (
          <AvailableAndDepositedSkeleton />
        ) : (
          <FlexBox sx={{ marginBottom: '30px' }}>
            <Box>
              <Typography component="span" variant="h5" fontSize=" 24px" lineHeight="38px">
                60 Available NFTs
              </Typography>
              <Typography ml={'16px'} component="span" variant="subtitle1" lineHeight="18px" color="#6E7191">
                253.57 ETH
              </Typography>
            </Box>
            <Box mr="24px">
              {depositType === 'shut' ? (
                <Button variant="contained" onClick={ButtonDeposit}>
                  Deposit
                </Button>
              ) : (
                <Box>
                  <FlexBox width={'268px'}>
                    <XButtonBox onClick={() => setOpenSureModal(true)}>
                      <img width={'14px'} height={'14px'} src={XIcon} alt="" />
                    </XButtonBox>
                    <RefreshButtonBox
                      onClick={() => {
                        setDepositType('shut')
                      }}
                    >
                      <img src={RefreshIcon} alt="" />
                    </RefreshButtonBox>
                    <DepositButtonBox onClick={() => setOpenSelectedModal(true)}>
                      <Typography variant="body1" component="h1" fontWeight="700" color="#14142A">
                        Deposit 6 NFTs
                      </Typography>
                    </DepositButtonBox>
                  </FlexBox>
                </Box>
              )}
            </Box>
          </FlexBox>
        )}
        <NFTsList
          depositType={depositType}
          TypeKey={Available}
          loading={loading}
          list={list}
          onChange={(data: Array<number>) => {
            console.log(data)
          }}
        ></NFTsList>
        <Pager TypeKey={Available} list={list}></Pager>
      </AvailableNFTsBox>
    </AvailableNFTsStyleBox>
  )
}
