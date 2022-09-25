import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import XIcon from 'assets/images/svg/common/close.svg'
import RefreshIcon2 from 'assets/images/svg/common/refresh2.svg'
import redResetButton from 'assets/images/svg/deposit/redResetButton.svg'
import redXButton from 'assets/images/svg/deposit/redXButton.svg'
import NFTsList from './NFTsList'
import Pager from '../../../components/Pages/Pager'
import AvailableAndDepositedSkeleton from './depositSkeleton/AvailableAndDepositedSkeleton'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SureModal from './SureModal'
import BigNumber from 'bignumber.js'
import { getAlchemyNftMetadata } from 'services/module/deposit'
import { Nft } from '@alch/alchemy-sdk'
import { useCollateralBorrowLimitUsed } from 'state/user/hooks'
import WithdrawSelectedModal from './WithdrawSelectedModal'
import { useAlchemy } from 'hooks/useAlchemy'
const DepositedNFTsStyleBox = styled(Box)`
  margin-bottom: 200px;
`
const DepositedNFTsBox = styled(Box)`
  width: 1012px;
  border-radius: 12px;
  padding: 19px 0 0 24px;
  margin-bottom: 42px;
  position: relative;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const FlexStartBox = styled(Box)`
  display: flex;
  align-items: flex-start;
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
  list: any[]
  loading: boolean
}
export default function WithdrawNFT({ depositType, withdrawType, setWithdrawType, list, loading }: DepositedNftProps) {
  const [checkedIndex, setCheckedIndex] = useState<Array<string>>([])
  const [withdrawList, setWithdrawList] = useState<Array<Nft>>([])
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const alchemy = useAlchemy()
  const withdrawAmount = useMemo(() => {
    let totalAmount = '0'
    checkedIndex.forEach((el) => {
      const checkedNft = list.find((nft) => nft.id.split('-')[2] === el)
      totalAmount = new BigNumber(checkedNft.amount).plus(totalAmount).toString()
    })
    return totalAmount
  }, [checkedIndex, list])
  const borrowLimitUsed = useCollateralBorrowLimitUsed(withdrawAmount)
  const withdrawLargeAmount = useMemo(() => {
    return new BigNumber(borrowLimitUsed).gte(1)
  }, [borrowLimitUsed])
  function ButtonWithdraw() {
    if (depositType === 'shut') {
      setWithdrawType('open')
    }
  }
  const [withdraw] = useState<string>('withdraw')
  const amount = useMemo(() => {
    return list.reduce((total: string, current: any) => {
      return new BigNumber(total).plus(current.amount || '0').toString()
    }, '0')
  }, [list])

  const getWithdrawList = useCallback(async () => {
    if (alchemy) {
      const arr: Array<Nft> = []
      for (let i = 0, length = list.length; i < length; i++) {
        const nft = await getAlchemyNftMetadata(list[i].id.split('-')[1], list[i].id.split('-')[2], alchemy)
        arr.push(nft)
      }
      setWithdrawList(arr)
    }
  }, [alchemy, list])
  useEffect(() => {
    getWithdrawList()
  }, [getWithdrawList])
  return (
    <DepositedNFTsStyleBox
      sx={{
        opacity: `${depositType === 'open' ? '0.7' : '1'}`,
      }}
    >
      <DepositedNFTsBox
        sx={{
          background: `${
            list.length === 0
              ? ''
              : 'linear-gradient(180deg, rgba(217, 219, 233, 0.3) 17.89%, rgba(217, 219, 233, 0) 100%)'
          }`,
        }}
      >
        {loading ? (
          <AvailableAndDepositedSkeleton />
        ) : (
          <FlexBox mb="43px">
            <>
              {list.length === 0 ? (
                <FlexStartBox>
                  <Typography lineHeight="38px" color="#4E4B66" fontWeight="700" fontSize=" 24px">
                    You can withdraw
                  </Typography>
                  <Typography mt="12px" ml="16px" variant="subtitle1" lineHeight="18px" color="#A0A3BD">
                    {list.length} NFTs / {amount} ETH
                  </Typography>
                </FlexStartBox>
              ) : (
                <FlexStartBox>
                  <Typography lineHeight="38px" color="#4E4B66" fontWeight="700" fontSize=" 24px">
                    0 Deposited NFTs
                  </Typography>
                  <Typography mt="12px" ml="16px" variant="subtitle1" lineHeight="18px" color="#A0A3BD">
                    0.00 ETH
                  </Typography>
                </FlexStartBox>
              )}
            </>
            {withdrawType === 'shut' ? (
              <Button
                sx={{ display: `${list.length === 0 && 'none'}`, marginRight: '24px' }}
                variant="contained"
                color="secondary"
                onClick={ButtonWithdraw}
              >
                Choose
              </Button>
            ) : (
              <FlexBox mr={'24px'}>
                {withdrawLargeAmount && (
                  <Box display={withdrawLargeAmount ? '' : 'none'} mr="16px">
                    <Typography fontWeight="600" variant="body2" color="#E1536C">
                      The amount of withdraw is too large
                    </Typography>
                    <Typography fontWeight="600" variant="body2" color="#E1536C">
                      and it is easy to be liquidated
                    </Typography>
                  </Box>
                )}
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
                    if (checkedIndex.length !== 0) {
                      setOpenSelect(true)
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
          TypeKey={withdraw}
          list={withdrawList}
          depositType={withdrawType}
          checked={checkedIndex}
          onChange={(data: Array<string>) => {
            setCheckedIndex(data)
          }}
        ></NFTsList>
        <Pager TypeKey={withdraw} list={list}></Pager>
      </DepositedNFTsBox>
      <WithdrawSelectedModal
        type={withdraw}
        checkedIndex={checkedIndex}
        amount={withdrawAmount}
        amountList={list.filter((el) => checkedIndex.includes(el.id.split('-')[2]))}
        data={withdrawList.filter((el) => checkedIndex.includes(el.tokenId))}
        open={openSelect}
        close={setOpenSelect}
      ></WithdrawSelectedModal>
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
