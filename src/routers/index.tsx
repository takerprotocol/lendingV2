import { Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
import Liquidation from 'pages/Liquidation'
import Deposit from 'pages/Deposit'
import Liquidate from 'pages/Liquidate'
import { useCallback, useMemo, useEffect, useLayoutEffect } from 'react'
import { useLendingPool } from 'hooks/useLendingPool'
import { useAddress } from 'state/user/hooks'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import {
  setDecimal,
  setErc20Ltv,
  setErc721Ltv,
  setReserveData,
  setUsedCollateral,
  setUserEthAsset,
  setUserNftConfig,
  setUserNftValues,
  setUserState,
  setUserValues,
} from 'state/user/reducer'
import { bigNumberToString, div, stringFormat } from 'utils'
import { WETH, ERC721_ADDRESS, DECIMALS_MASK, LTV_MASK, CHAIN_ID, COLLATERAL_MASK } from 'config'
import { fromWei } from 'web3-utils'
import BN from 'bn.js'
import { useActiveWeb3React } from 'hooks/web3'
import { toast } from 'react-toastify'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { getClient } from 'apollo/client'
import { SupportedChainId } from 'constants/chains'
import { LendingPool, UserNftCollection } from 'apollo/queries'
import { getCollectionStats } from 'services/module/collection'
import erc721abi from 'abis/MockERC721.json'
import { setCollections, setDepositedCollection, setLoading } from 'state/application/reducer'
import ERC721 from 'assets/images/png/collection/721.png'
import Azuki from 'assets/images/png/collection/azuki.png'
import Bayc from 'assets/images/png/collection/bayc.png'
import Mayc from 'assets/images/png/collection/mayc.png'
import { Contract } from '@ethersproject/contracts'
export default function CustomizeRoutes() {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  const { chainId, library } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const contract = useLendingPool()
  const address = useAddress()
  const transactions = useAllTransactions()
  const client = getClient()[SupportedChainId.MAINNET]
  const flag = useMemo(() => {
    return (
      transactions &&
      Object.keys(transactions).some((hash) => {
        const tx = transactions[hash]
        return tx && tx.receipt && tx.info.type !== TransactionType.APPROVAL && isTransactionRecent(tx)
      })
    )
  }, [transactions])
  useEffect(() => {
    if (address && chainId && CHAIN_ID && chainId !== CHAIN_ID) {
      toast.error('Please switch network to Rinkeby')
    }
  }, [chainId, address])
  useEffect(() => {
    if (contract && address && chainId === CHAIN_ID) {
      contract
        .getUserAssetValues(address, WETH)
        .then((res: Array<BigNumber>) => {
          dispatch(setLoading(false))
          dispatch(
            setUserNftValues(
              res.map((el) => {
                return stringFormat(fromWei(el.toString()))
              })
            )
          )
        })
        .catch((err: any) => {
          console.log(err)
        })
      contract.getUserConfig(address).then((res: any) => {
        dispatch(setUsedCollateral(new BN(res.toString()).and(new BN(COLLATERAL_MASK, 16)).toString() !== '0'))
      })
      contract.getReserveConfig(WETH).then((res: any) => {
        dispatch(setDecimal(new BN(res.toString()).and(new BN(DECIMALS_MASK, 16)).shrn(32).toString()))
        dispatch(setErc20Ltv(new BN(res.toString()).and(new BN(LTV_MASK, 16)).toString()))
      })
      contract.getReserveConfig(ERC721_ADDRESS).then((res: any) => {
        dispatch(setErc721Ltv(new BN(res.toString()).and(new BN(LTV_MASK, 16)).toString()))
      })
      contract.getReserveData(WETH).then((res: any) => {
        console.log(fromWei(res.borrowRate.toString()))
        console.log(res.borrowRate.toString())
        dispatch(
          setReserveData({
            borrowRate: new BigNumber(div(fromWei(res.borrowRate.toString()), 10000)).decimalPlaces(2, 1).toString(),
            configuration: res.configuration.toString(),
            debtIndex: res.debtIndex.toString(),
            debtTokenAddress: res.debtTokenAddress.toString(),
            depositRate: new BigNumber(div(fromWei(res.depositRate.toString()), 10000)).decimalPlaces(2, 1).toString(),
            interestRateCalculatorAddress: res.interestRateCalculatorAddress.toString(),
            tTokenAddress: res.tTokenAddress.toString(),
            treasury: res.treasury.toString(),
            lastUpdateTimestamp: res.lastUpdateTimestamp.toString(),
            liquidityIndex: res.liquidityIndex.toString(),
          })
        )
      })
      contract.getUserState(address).then((res: Array<BigNumber>) => {
        dispatch(
          setUserState({
            loanToValue: div(res[0].toString(), 10000),
            liquidationThreshold: div(res[1].toString(), 10000),
            heathFactor: res[2].toString(),
          })
        )
      })
      contract.getUserValues(address).then((res: Array<BigNumber>) => {
        dispatch(
          setUserValues({
            borrowLiquidity: fromWei(res[0].toString()),
            NFTLiquidity: fromWei(res[1].toString()),
            totalDebt: fromWei(res[2].toString()),
            totalCollateral: fromWei(res[3].toString()),
          })
        )
      })
      contract.getUserAssetValues(address, WETH).then((res: Array<BigNumber>) => {
        dispatch(
          setUserEthAsset([
            fromWei(res[0].toString()).toString(),
            fromWei(res[1].toString()).toString(),
            fromWei(res[2].toString()).toString(),
          ])
        )
      })
      // contract.getReserveConfig('0x6310098a56F9dd4D1F2a8A0Ab0E82565415054D8').then((res: any) => {
      //   console.log('getReserveConfig', res)
      // })
      contract.getUserConfig(address).then((res: BigNumber) => {
        dispatch(setLoading(false))
        dispatch(setUserNftConfig(bigNumberToString(res)))
      })
    }
  }, [contract, address, dispatch, chainId, flag])

  const renderImg = (symbol?: string) => {
    if (symbol) {
      if (symbol.toLocaleLowerCase().indexOf('mayc') > -1) {
        return Mayc
      } else if (symbol.toLocaleLowerCase().indexOf('azuki') > -1) {
        return Azuki
      } else if (symbol.toLocaleLowerCase().indexOf('bayc') > -1) {
        return Bayc
      }
    }
    return ERC721
  }

  const getCollection = useCallback(async () => {
    if (client) {
      const lendingPoolRes = await client.query({
        query: LendingPool(contract ? contract.address : '0xEB6f6d0B528e0222B924dd5527117f8aa5f48AD0'),
      })
      const nfts: Array<any> = []
      const depositedCollection: Array<any> = []
      if (lendingPoolRes.data && lendingPoolRes.data.lendingPool) {
        lendingPoolRes.data.lendingPool.nfts.forEach(async (element: any) => {
          const item: any = {}
          const ercContract = new Contract(element.id, erc721abi, library)
          if (address) {
            const res = await client.query({
              query: UserNftCollection(`${address.toLocaleLowerCase()}-${element.id}`),
            })
            if (res.data && res.data.userNftCollection) {
              depositedCollection.push(res.data)
            }
            if (chainId === CHAIN_ID) {
              const balance = await ercContract.balanceOf(element.tNFT)
              item.totalValue = balance ? fromWei(balance.toString()) : '0'
            }
          }

          // const info = await getCollectionInfo(element.id)
          // item.info = info.data
          item.icon = renderImg(element.symbol)
          const stats = await getCollectionStats(element.id)
          item.stats = stats.data
          item.id = element.id
          item.name = element.name
          item.symbol = element.symbol
          item.floorPrice = element.floorPrice
          item.interestRateCalculator = element.interestRateCalculator
          item.liqThreshold = element.liqThreshold
          item.ltv = element.ltv
          item.tToken = element.tToken
          nfts.push(item)
          if (nfts.length === lendingPoolRes.data.lendingPool.nfts.length) {
            dispatch(setLoading(false))
            dispatch(setCollections(nfts))
            dispatch(setDepositedCollection(depositedCollection))
          }
        })

        // const nftRes = await client.query({
        //   query: UserNftCollection(
        //     `${address}-${lendingPoolRes.data.lendingPool.nfts[0].id}-${lendingPoolRes.data.lendingPool.nfts[0].tNFT}`
        //   ),
        // })
        // console.log(nftRes)
      }
    }
  }, [client, contract, library, address, chainId, dispatch])

  useEffect(() => {
    getCollection()
  }, [getCollection])
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/deposit/:id" element={<Deposit />} />
      <Route path="/liquidate" element={<Liquidate />} />
      <Route path="/liquidation" element={<Liquidation />} />
      <Route path="/liquidation/:page" element={<Liquidation />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  )
}
