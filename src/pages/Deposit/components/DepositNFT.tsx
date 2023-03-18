import { Box, styled, Typography } from '@mui/material'
import XIcon from 'assets/images/svg/common/close.svg'
// import RefreshIcon from 'assets/images/svg/common/refresh.svg'
import nullNft from 'assets/images/svg/common/nullNft-icon.svg'
import NFTsList from './NFTsList'
import Pager from '../../../components/Pages/Pager'
import AvailableAndDepositedSkeleton from './depositSkeleton/AvailableAndDepositedSkeleton'
import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import NFTsSelectedModal from './NFTsSelectedModal'
import SureModal from './SureModal'
import { NftTokenModel } from 'services/type/nft'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { CenterBox } from 'styleds'
import { fromWei } from 'web3-utils'

const AvailableNFTsBox = styled(Box)`
  width: 1012px;
  position: relative;
  border-radius: 12px;
  padding: 24px 0 0 24px;
  margin-top: 24px;
  margin-bottom: 42px;
  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 33.61%);
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
// const RefreshButtonBox = styled(Box)`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   background: #eff0f7;
//   width: 44px;
//   height: 44px;
//   border-radius: 100%;
// `
const XButtonBox = styled(Box)`
  display: flex;
  margin-right: 16px;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  background: #eff0f7;
  width: 44px;
  height: 44px;
  border-radius: 100%;
`
const NullDepositBox = styled(CenterBox)`
  background: rgba(217, 219, 233, 0.3);
  border-radius: 12px;
  flex-direction: column;
`
interface AvailableNFTsProps {
  // depositType: string
  // withdrawType: string
  // setDepositType: Function
  setWithdrawCheckedIndex: Function
  checkedIndex: Array<string>
  setCheckedIndex: Function
  floorPrice: string
  list: NftTokenModel[]
  loading: boolean
}
export default function DepositNFT({
  list,
  loading,
  floorPrice,
  checkedIndex,
  setCheckedIndex,
  setWithdrawCheckedIndex,
}: AvailableNFTsProps) {
  const [openSelectedModal, setOpenSelectedModal] = useState<boolean>(false)
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const transactions = useAllTransactions()

  const flag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return tx && tx.receipt && tx.info.type === TransactionType.DEPOSIT_NFT && isTransactionRecent(tx)
    }).length
  }, [transactions])

  useEffect(() => {
    if (flag) {
      setOpenSelectedModal(false)
      setOpenSureModal(false)
      setCheckedIndex([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag])
  // function ButtonDeposit() {
  //   if (withdrawType === 'shut') {
  //     setDepositType('open')
  //   }
  // }
  const [Deposit] = useState<string>('Deposit')
  const amount = useMemo(() => {
    return list.reduce((total: string) => {
      return new BigNumber(total).plus(fromWei(floorPrice || '0')).toString()
    }, '0')
  }, [floorPrice, list])
  return (
    <AvailableNFTsStyleBox
      sx={
        {
          // opacity: `${withdrawType === 'open' ? '0.7' : '1'}`
        }
      }
    >
      {list.length === 0 ? (
        <NullDepositBox my="24px" py={'32px'}>
          <img src={nullNft} alt="" />
          <Typography mt={'16px'} color="#6E7191" variant="subtitle2" fontWeight="500">
            You have no NFT to deposit to this collection
          </Typography>
        </NullDepositBox>
      ) : (
        <AvailableNFTsBox>
          {loading ? (
            <AvailableAndDepositedSkeleton />
          ) : (
            <FlexBox height={'48px'} sx={{ marginBottom: '30px' }}>
              <Box>
                <Typography component="span" variant="h5" fontSize=" 24px" lineHeight="38px">
                  You can deposit
                </Typography>
                <Typography ml={'16px'} component="span" variant="subtitle1" lineHeight="18px" color="#6E7191">
                  {list.length} NFTs / {amount} ETH
                </Typography>
              </Box>
              <Box mr="24px">
                {/* {depositType === 'shut' ? (
                  <Button variant="contained" onClick={ButtonDeposit}>
                    Choose
                  </Button>
                ) : ( */}
                <Box>
                  {checkedIndex.length !== 0 && (
                    <FlexBox>
                      <XButtonBox
                        onClick={() => {
                          // setOpenSureModal(true)
                          setCheckedIndex([])
                        }}
                      >
                        <img width={'14px'} height={'14px'} src={XIcon} alt="" />
                      </XButtonBox>
                      {/* <RefreshButtonBox
                        onClick={() => {
                          setCheckedIndex([])
                          setDepositType('shut')
                        }}
                      >
                        <img src={RefreshIcon} alt="" />
                      </RefreshButtonBox> */}
                      <DepositButtonBox
                        onClick={() => {
                          if (checkedIndex.length !== 0) {
                            setOpenSelectedModal(true)
                          }
                        }}
                      >
                        <Typography variant="body1" component="h1" fontWeight="700" color="#14142A">
                          Deposit {checkedIndex.length} NFTs
                        </Typography>
                      </DepositButtonBox>
                    </FlexBox>
                  )}
                </Box>
                {/* )} */}
              </Box>
            </FlexBox>
          )}
          <NFTsList
            // depositType={depositType}
            TypeKey={Deposit}
            loading={loading}
            setCheckedIndex={setWithdrawCheckedIndex}
            list={list}
            checked={checkedIndex}
            onChange={(data: Array<string>) => {
              setCheckedIndex(data)
            }}
          ></NFTsList>
          <Pager TypeKey={Deposit} list={list}></Pager>
        </AvailableNFTsBox>
      )}
      {openSelectedModal && (
        <NFTsSelectedModal
          type={Deposit}
          floorPrice={floorPrice}
          checkedIndex={checkedIndex}
          data={list.filter((el) => checkedIndex.includes(el.tokenId))}
          openSelectedModal={openSelectedModal}
          setOpenSelectedModal={setOpenSelectedModal}
        ></NFTsSelectedModal>
      )}
      <SureModal
        openSureModal={openSureModal}
        handle={(type: string) => {
          if (type === 'cancel') {
            // setDepositType('shut')
            setCheckedIndex([])
          }
          setOpenSureModal(false)
        }}
      ></SureModal>
    </AvailableNFTsStyleBox>
  )
}
