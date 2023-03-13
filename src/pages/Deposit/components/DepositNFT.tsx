import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import XIcon from 'assets/images/svg/common/close.svg'
import RefreshIcon from 'assets/images/svg/common/refresh.svg'
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
  list: NftTokenModel[]
  setDepositType: Function
  loading: boolean
}
export default function DepositNFT({ depositType, withdrawType, list, loading, setDepositType }: AvailableNFTsProps) {
  const [checkedIndex, setCheckedIndex] = useState<Array<string>>([])
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
  }, [flag])
  function ButtonDeposit() {
    if (withdrawType === 'shut') {
      setDepositType('open')
    }
  }
  const [Deposit] = useState<string>('Deposit')
  const amount = useMemo(() => {
    return list.reduce((total: string, current: NftTokenModel) => {
      return new BigNumber(total).plus(current.balance || '0').toString()
    }, '0')
  }, [list])
  return (
    <AvailableNFTsStyleBox sx={{ opacity: `${withdrawType === 'open' ? '0.7' : '1'}` }}>
      {list.length === 0 ? (
        <Typography m="48px 24px 24px 24px" variant="h5" fontWeight="700" fontSize=" 24px">
          0 NFT you can deposit
        </Typography>
      ) : (
        <AvailableNFTsBox>
          {loading ? (
            <AvailableAndDepositedSkeleton />
          ) : (
            <FlexBox sx={{ marginBottom: '30px' }}>
              <Box>
                <Typography component="span" variant="h5" fontSize=" 24px" lineHeight="38px">
                  You can deposit
                </Typography>
                <Typography ml={'16px'} component="span" variant="subtitle1" lineHeight="18px" color="#6E7191">
                  {list.length} NFTs / {amount} ETH
                </Typography>
              </Box>
              <Box mr="24px">
                {depositType === 'shut' ? (
                  <Button variant="contained" onClick={ButtonDeposit}>
                    Choose
                  </Button>
                ) : (
                  <Box>
                    <FlexBox width={'268px'}>
                      <XButtonBox onClick={() => setOpenSureModal(true)}>
                        <img width={'14px'} height={'14px'} src={XIcon} alt="" />
                      </XButtonBox>
                      <RefreshButtonBox
                        onClick={() => {
                          setCheckedIndex([])
                          setDepositType('shut')
                        }}
                      >
                        <img src={RefreshIcon} alt="" />
                      </RefreshButtonBox>
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
                  </Box>
                )}
              </Box>
            </FlexBox>
          )}
          <NFTsList
            depositType={depositType}
            TypeKey={Deposit}
            loading={loading}
            list={list}
            checked={checkedIndex}
            onChange={(data: Array<string>) => {
              setCheckedIndex(data)
            }}
          ></NFTsList>
          <Pager TypeKey={Deposit} list={list}></Pager>
        </AvailableNFTsBox>
      )}
      <NFTsSelectedModal
        type={Deposit}
        checkedIndex={checkedIndex}
        data={list.filter((el) => checkedIndex.includes(el.tokenId))}
        openSelectedModal={openSelectedModal}
        setOpenSelectedModal={setOpenSelectedModal}
      ></NFTsSelectedModal>
      <SureModal
        openSureModal={openSureModal}
        handle={(type: string) => {
          if (type === 'cancel') {
            setDepositType('shut')
            setCheckedIndex([])
          }
          setOpenSureModal(false)
        }}
      ></SureModal>
    </AvailableNFTsStyleBox>
  )
}
