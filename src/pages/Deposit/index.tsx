import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import DepositHeader from 'pages/Deposit/components/DepositHeader'
import DepositNFT from './components/DepositNFT'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Nft } from '@alch/alchemy-sdk'
import WithdrawNFT from './components/WithdrawNFT'
import { useDepositableNfts } from 'services/module/deposit'
import { useAddress, useCollateralBorrowLimitUsed, useDashboardType, useMobileType } from 'state/user/hooks'
import { useParams } from 'react-router-dom'
// import { getAlchemyNftMetadata } from 'services/module/deposit'
import { useCollections, useDepositedCollection, useShowChangeNetWork } from 'state/application/hooks'
import MobileHeader from './components/mobileComponents/MobileHeader'
import MobileDepositRoWithdraw from './components/mobileComponents/MobileDepositRoWithdraw'
import MobileFooter from './components/mobileComponents/MobileFooter'
import BigNumber from 'bignumber.js'
import { useAlchemy } from 'hooks/useAlchemy'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { useAppDispatch } from 'state/hooks'
import { setDashboardType } from 'state/user/reducer'
import { useActiveWeb3React } from 'hooks/web3'
import { getClient } from 'apollo/client'
import { UserPunkNft } from 'apollo/queries'
import { PUNKS_ADDRESS } from 'config'
import { getMultipleTokenId } from 'services/module/collection'
const growths = [
  '0x07875841846abb8fba50dbc64ab4b77cbb6b5ca1',
  '0x8c8f9db836049a7b11c561510d5b8318cccb6e0b',
  '0xdcb017b5b37cf40d4955c5df42964464b5b0ea36',
  '0x9a79bccd419c9604ce02645950e994b708553165',
]
const Body = styled(Box)`
  padding-top: 233px;
  width: 100%;
  position: relative;
`
const Main = styled(Box)`
  width: 1012px;
  margin: 0 auto;
`
const HeaderBg = styled(Box)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -3;
`
const LadingHeaderBg = styled(Box)`
  background: #eff0f5;
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -3;
`
const FilterBg = styled(Box)`
  backdrop-filter: blur(80px);
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -2;
`
const OpacityBg = styled(Box)`
  width: 100%;
  height: 300px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`
const MobileBody = styled(Box)`
  width: 100%;
  background: #f7f7fc;
`
const MobileMain = styled(Box)`
  padding: 0rem 1rem 0rem 1rem;
  position: relative;
  margin-top: -10.1875rem;
  width: 100%;
`
const MobileHeaderBg = styled(Box)`
  background-size: 42.5rem 42.5rem;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 14.0625rem;
  z-index: -2;
`
const MobileBg = styled(Box)`
  background: #eff0f5;
  width: 100%;
  height: 14.0625rem;
  z-index: -2;
`
const MobileFilterBg = styled(Box)`
  backdrop-filter: blur(30px);
  width: 100%;
  height: 14.0625rem;
  z-index: -1;
`
export default function Deposit() {
  const { id } = useParams()
  const { chainId } = useActiveWeb3React()
  const alchemy = useAlchemy()
  const address = useAddress()
  const showChangeNetWork = useShowChangeNetWork()
  const [TestWithdrawList, setWithdrawList] = useState<any>([])
  const [punks, setPunks] = useState<Array<Nft>>([])
  // const [depositType, setDepositType] = useState<string>('shut')
  // const [withdrawType, setWithdrawType] = useState<string>('shut')
  const [depositCheckedIndex, setDepositCheckedIndex] = useState<Array<string>>([])
  const [withdrawCheckedIndex, setWithdrawCheckedIndex] = useState<Array<string>>([])
  const mobile = useMobileType()
  const dispatch = useAppDispatch()
  const [type, setType] = useState<number>(1)
  const [mobileWithdrawCheckedIndex, setMobileWithdrawCheckedIndex] = useState<Array<string>>([])
  const [mobileDepositCheckedIndex, setMobileDepositCheckedIndex] = useState<Array<string>>([])
  const collections = useCollections()
  const depositedCollection = useDepositedCollection()
  const transactions = useAllTransactions()
  const [client, setClient] = useState<any>(null)
  const dashboardType = useDashboardType()
  const depositFlag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return (
        tx &&
        tx.receipt &&
        (tx.info.type === TransactionType.DEPOSIT_NFT || tx.info.type === TransactionType.WITHDRAW_NFT) &&
        isTransactionRecent(tx)
      )
    }).length
  }, [transactions])
  // useEffect(() => {
  //   window.location.reload()
  // }, [depositFlag])
  useEffect(() => {
    if (chainId) {
      setClient(getClient(dashboardType)[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 42])
    }
  }, [chainId, dashboardType])

  const { list, loading } = useDepositableNfts(address, id || '', id, depositFlag)
  const withdrawList = useMemo(() => {
    if (depositedCollection && id) {
      const collection = depositedCollection.find((el) => {
        return el.userNftCollection.id.split('-')[1].toLocaleLowerCase() === id.toLocaleLowerCase()
      })
      return collection ? collection.userNftCollection.tokens : []
    }
    return []
  }, [depositedCollection, id])
  const collection = useMemo(() => {
    if (collections && id) {
      return collections.find((el) => el.id.toLocaleLowerCase() === id.toLocaleLowerCase())
    } else {
      return null
    }
  }, [collections, id])
  const mobileFlag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return (
        tx &&
        tx.receipt &&
        (tx.info.type === TransactionType.DEPOSIT_NFT || tx.info.type === TransactionType.WITHDRAW_NFT) &&
        isTransactionRecent(tx)
      )
    }).length
  }, [transactions])
  useEffect(() => {
    if (mobileFlag) {
      setMobileWithdrawCheckedIndex([])
      setMobileDepositCheckedIndex([])
    }
  }, [mobileFlag])

  const withdrawAmount = useMemo(() => {
    let totalAmount = '0'
    mobileWithdrawCheckedIndex.forEach((el) => {
      const checkedNft = withdrawList.find((nft: { id: string }) => nft.id.split('-')[2] === el)
      totalAmount = new BigNumber(checkedNft.amount).plus(totalAmount).toString()
    })
    return totalAmount
  }, [mobileWithdrawCheckedIndex, withdrawList])
  const borrowLimitUsed = useCollateralBorrowLimitUsed(withdrawAmount)
  const withdrawLargeAmount = useMemo(() => {
    return new BigNumber(borrowLimitUsed).gte(1)
  }, [borrowLimitUsed])
  const getWithdrawList = useCallback(async () => {
    if (alchemy && id && withdrawList && withdrawList.length > 0) {
      const arrTokenId = withdrawList.map((el: any) => (el.id ? el.id.split('-')[2] : el.tokenId))
      await getMultipleTokenId(
        collection && collection.name && collection.name.toLocaleLowerCase().indexOf('punks') > -1 ? PUNKS_ADDRESS : id,
        arrTokenId
      ).then((req) => {
        setWithdrawList(req)
      })
      // for (let i = 0, length = withdrawList.length; i < length; i++) {
      //   if (withdrawList[i].id) {
      //     const nft = await getAlchemyNftMetadata(
      //       withdrawList[i].id.split('-')[1],
      //       withdrawList[i].id.split('-')[2],
      //       alchemy
      //     )
      //   } else {
      //     const nft = await getAlchemyNftMetadata(withdrawList[i].contract.address, withdrawList[i].tokenId, alchemy)
      //     arr.push(nft)
      //   }
      //   arr.push(nft)
      // }
    }
  }, [alchemy, collection, id, withdrawList])
  useEffect(() => {
    getWithdrawList()
  }, [getWithdrawList, mobileFlag])
  useEffect(() => {
    if (id) {
      dispatch(setDashboardType(growths.some((el) => el.toLocaleLowerCase() === id.toLocaleLowerCase()) ? 2 : 1))
    }
  }, [dispatch, id])
  const getPunkNft = useCallback(async () => {
    if (collection && client && collection.name && collection.name.toLocaleLowerCase().indexOf('punks') > -1) {
      const res = await client.query({
        query: UserPunkNft(`${address}`),
      })
      // const arr: Array<Nft> = []
      let arr: any = []
      const arrTokenId: Array<string> = []
      for (let i = 0, length = res.data.cryptoPunks.length; i < length; i++) {
        arrTokenId.push(res.data.cryptoPunks[i].punkIndex)
      }
      await getMultipleTokenId(PUNKS_ADDRESS, arrTokenId).then((req) => {
        arr = req
      })
      // if (res && res.data && res.data.cryptoPunks && alchemy) {
      //   for (let i = 0, length = res.data.cryptoPunks.length; i < length; i++) {
      //     const nft = await getAlchemyNftMetadata(PUNKS_ADDRESS, res.data.cryptoPunks[i].punkIndex, alchemy)
      //     arr.push(nft)
      //   }
      // }
      setPunks(arr)
    }
  }, [address, client, collection])
  useEffect(() => {
    getPunkNft()
  }, [getPunkNft, depositFlag])
  return (
    <>
      {mobile ? (
        <Body sx={{ marginTop: showChangeNetWork ? '48px' : '0' }}>
          {loading ? (
            <LadingHeaderBg top={showChangeNetWork ? '48px' : '0'}></LadingHeaderBg>
          ) : (
            <>
              <HeaderBg
                top={showChangeNetWork ? '48px' : '0'}
                sx={{ backgroundImage: `url(${collection?.icon})` }}
              ></HeaderBg>
              <FilterBg top={showChangeNetWork ? '48px' : '0'}></FilterBg>
              <OpacityBg top={showChangeNetWork ? '48px' : '0'}></OpacityBg>
            </>
          )}
          <Main>
            <DepositHeader loading={loading}></DepositHeader>
            <DepositNFT
              loading={loading}
              list={
                collection && collection.name && collection.name.toLocaleLowerCase().indexOf('punks') > -1
                  ? punks
                  : list
              }
              floorPrice={collection ? collection.floorPrice : '0'}
              checkedIndex={depositCheckedIndex}
              setCheckedIndex={setDepositCheckedIndex}
              setWithdrawCheckedIndex={setWithdrawCheckedIndex}
              // setDepositType={setDepositType}
              // depositType={depositType}
              // withdrawType={withdrawType}
            ></DepositNFT>
            <WithdrawNFT
              loading={loading}
              tNFT={collection ? collection.tNFT : ''}
              list={withdrawList}
              TestWithdrawList={TestWithdrawList}
              getWayFlag={collection && collection.name.indexOf('punks') > -1 ? 1 : 0}
              floorPrice={collection ? collection.floorPrice : '0'}
              checkedIndex={withdrawCheckedIndex}
              setDepositCheckedIndex={setDepositCheckedIndex}
              setCheckedIndex={setWithdrawCheckedIndex}
              // depositType={depositType}
              // withdrawType={withdrawType}
              // setWithdrawType={setWithdrawType}
            ></WithdrawNFT>
          </Main>
        </Body>
      ) : (
        <MobileBody
          pt={showChangeNetWork ? '7.1875rem' : '3.125rem'}
          pb={
            mobileWithdrawCheckedIndex.length !== 0 || mobileDepositCheckedIndex.length !== 0 ? '7.5625rem' : '1.25rem'
          }
        >
          {loading ? (
            <MobileBg></MobileBg>
          ) : (
            <MobileHeaderBg sx={{ backgroundImage: `url(${collection?.icon})` }}>
              <MobileFilterBg></MobileFilterBg>
            </MobileHeaderBg>
          )}
          <MobileMain>
            <MobileHeader loading={loading}></MobileHeader>
            <MobileDepositRoWithdraw
              loading={loading}
              depositedList={list}
              withdrawList={withdrawList}
              floorPrice={collection ? collection.floorPrice : '0'}
              type={type}
              setType={setType}
              TestWithdrawList={TestWithdrawList}
              mobileWithdrawCheckedIndex={mobileWithdrawCheckedIndex}
              mobileDepositCheckedIndex={mobileDepositCheckedIndex}
              setMobileWithdrawCheckedIndex={setMobileWithdrawCheckedIndex}
              setMobileDepositCheckedIndex={setMobileDepositCheckedIndex}
            ></MobileDepositRoWithdraw>
          </MobileMain>
          {!loading && (
            <MobileFooter
              mobileWithdrawCheckedIndex={mobileWithdrawCheckedIndex}
              mobileDepositCheckedIndex={mobileDepositCheckedIndex}
              depositedList={list}
              floorPrice={collection ? collection.floorPrice : '0'}
              TestWithdrawList={TestWithdrawList}
              withdrawAmount={withdrawAmount}
              setMobileWithdrawCheckedIndex={setMobileWithdrawCheckedIndex}
              setMobileDepositCheckedIndex={setMobileDepositCheckedIndex}
              withdrawLargeAmount={withdrawLargeAmount}
              withdrawList={withdrawList}
              type={type}
            ></MobileFooter>
          )}
        </MobileBody>
      )}
    </>
  )
}
