import { Box, styled, Typography } from '@mui/material'
import XIcon from 'assets/images/svg/common/close.svg'
import nullNft from 'assets/images/svg/common/nullNft-icon.svg'
// import RefreshIcon2 from 'assets/images/svg/common/refresh2.svg'
// import redResetButton from 'assets/images/svg/deposit/redResetButton.svg'
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
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { CenterBox } from 'styleds'
import { fromWei } from 'web3-utils'
import { fixedFormat, minus, times } from 'utils'
import { PUNKS_ADDRESS } from 'config'

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
// const RefreshButtonBox = styled(Box)`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   width: 44px;
//   height: 44px;
//   border-radius: 100%;
// `
const XButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  padding: 15px;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`
const NullDepositBox = styled(CenterBox)`
  background: rgba(217, 219, 233, 0.3);
  border-radius: 12px;
  flex-direction: column;
`
interface WithdrawNFTProps {
  // depositType: string
  // withdrawType: string
  // setWithdrawType: Function
  checkedIndex: Array<string>
  setCheckedIndex: Function
  setDepositCheckedIndex: Function
  list: any[]
  floorPrice: string
  loading: boolean
  tNFT: string
  getWayFlag: number
}
export default function WithdrawNFT({
  list,
  tNFT,
  loading,
  floorPrice,
  checkedIndex,
  setCheckedIndex,
  setDepositCheckedIndex,
  getWayFlag,
}: WithdrawNFTProps) {
  const [withdrawList, setWithdrawList] = useState<Array<Nft>>([])
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [pageType, setPageType] = useState<number>(1) //page
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const transactions = useAllTransactions()
  const NftList = useMemo(() => {
    if (pageType === 1) {
      return withdrawList.slice(0, 9)
    } else {
      return withdrawList.slice(+times(minus(pageType, 1), 9), +times(pageType, 9))
    }
  }, [withdrawList, pageType])
  const flag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return tx && tx.receipt && tx.info.type === TransactionType.WITHDRAW_NFT && isTransactionRecent(tx)
    }).length
  }, [transactions])
  useEffect(() => {
    if (flag) {
      setOpenSelect(false)
      setOpenSureModal(false)
      setCheckedIndex([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag])
  const alchemy = useAlchemy()
  const withdrawAmount = useMemo(() => {
    let totalAmount = '0'
    checkedIndex.forEach((el) => {
      totalAmount = new BigNumber(fromWei(floorPrice)).plus(totalAmount).toString()
    })
    return totalAmount
  }, [checkedIndex, floorPrice])
  const borrowLimitUsed = useCollateralBorrowLimitUsed(withdrawAmount)
  const withdrawLargeAmount = useMemo(() => {
    return new BigNumber(borrowLimitUsed).gte(1)
  }, [borrowLimitUsed])
  // function ButtonWithdraw() {
  //   if (depositType === 'shut') {
  //     setWithdrawType('open')
  //   }
  // }
  const [withdraw] = useState<string>('withdraw')
  const amount = useMemo(() => {
    return list.reduce((total: string) => {
      return new BigNumber(total).plus(fromWei(floorPrice || '0')).toString()
    }, '0')
  }, [floorPrice, list])
  const getWithdrawList = useCallback(async () => {
    if (alchemy) {
      const arr: Array<Nft> = []
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id) {
          const nft = await getAlchemyNftMetadata(
            getWayFlag === 1 ? PUNKS_ADDRESS : list[i].id.split('-')[1],
            list[i].id.split('-')[2],
            alchemy
          )
          arr.push(nft)
        } else {
          const nft = await getAlchemyNftMetadata(
            getWayFlag === 1 ? PUNKS_ADDRESS : list[i].contract.address,
            list[i].tokenId,
            alchemy
          )
          arr.push(nft)
        }
      }
      setWithdrawList(arr)
    }
  }, [alchemy, getWayFlag, list])
  useEffect(() => {
    getWithdrawList()
  }, [getWithdrawList])
  return (
    <DepositedNFTsStyleBox
      sx={
        {
          // opacity: `${depositType === 'open' ? '0.7' : '1'}`,
        }
      }
    >
      {list.length !== 0 ? (
        <>
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
              <FlexBox height={'48px'} mb="43px">
                <FlexStartBox>
                  <Typography lineHeight="38px" color="#4E4B66" fontWeight="700" fontSize=" 24px">
                    You can withdraw
                  </Typography>
                  <Typography mt="12px" ml="16px" variant="subtitle1" lineHeight="18px" color="#A0A3BD">
                    {list.length} NFTs / {fixedFormat(amount)} ETH
                  </Typography>
                </FlexStartBox>
                {/* {withdrawType === 'shut' ? (
                  <Button
                    sx={{ display: `${list.length === 0 && 'none'}`, marginRight: '24px' }}
                    variant="contained"
                    color="secondary"
                    onClick={ButtonWithdraw}
                  >
                    Choose
                  </Button>
                ) : ( */}
                {checkedIndex.length !== 0 && (
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
                      onClick={() => {
                        // setOpenSureModal(true)
                        setCheckedIndex([])
                      }}
                      sx={{ background: `${withdrawLargeAmount ? ' rgba(225, 83, 108, 0.1)' : '#e1e3ee'}` }}
                    >
                      <img width={'14px'} height={'14px'} src={withdrawLargeAmount ? redXButton : XIcon} alt="" />
                    </XButtonBox>
                    {/* <RefreshButtonBox
                      mr="16px"
                      sx={{
                        borderRadius: '100%',
                        background: `${withdrawLargeAmount ? '' : '#e1e3ee'}`,
                      }}
                      onClick={() => {
                        setWithdrawType('shut')
                        setCheckedIndex([])
                      }}
                    >
                      <img src={withdrawLargeAmount ? redResetButton : RefreshIcon2} alt="" />
                    </RefreshButtonBox> */}
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
                {/* )} */}
              </FlexBox>
            )}
            <NFTsList
              loading={loading}
              TypeKey={withdraw}
              list={NftList}
              setCheckedIndex={setDepositCheckedIndex}
              // depositType={withdrawType}
              checked={checkedIndex}
              onChange={(data: Array<string>) => {
                setCheckedIndex(data)
              }}
            ></NFTsList>
            <Pager pageType={pageType} setPageType={setPageType} TypeKey={withdraw} list={list}></Pager>
          </DepositedNFTsBox>
          <WithdrawSelectedModal
            type={withdraw}
            tNFT={tNFT}
            checkedIndex={checkedIndex}
            amount={withdrawAmount}
            getWayFlag={getWayFlag}
            amountList={list.filter((el) => checkedIndex.includes(el.id.split('-')[2]))}
            data={withdrawList.filter((el) => checkedIndex.includes(el.tokenId))}
            open={openSelect}
            close={setOpenSelect}
          ></WithdrawSelectedModal>
          <SureModal
            openSureModal={openSureModal}
            handle={(type: string) => {
              if (type === 'cancel') {
                // setWithdrawType('shut')
                setCheckedIndex([])
              }
              setOpenSureModal(false)
            }}
          ></SureModal>
        </>
      ) : (
        <NullDepositBox my="24px" py={'32px'}>
          <img src={nullNft} alt="" />
          <Typography mt={'16px'} color="#6E7191" variant="subtitle2" fontWeight="500">
            You haven{`'`}t deposited any NFT yet
          </Typography>
        </NullDepositBox>
      )}
    </DepositedNFTsStyleBox>
  )
}
