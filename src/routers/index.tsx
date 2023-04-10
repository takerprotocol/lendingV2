import { Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from 'pages/Dashboard'
import Liquidation from 'pages/Liquidation'
import Deposit from 'pages/Deposit'
import Liquidate from 'pages/Liquidate'
import { useCallback, useMemo, useEffect, useLayoutEffect, useState } from 'react'
import { useLendingPool } from 'hooks/useLendingPool'
import { useAddress, useDashboardType } from 'state/user/hooks'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import {
  setDecimal,
  setErc20Ltv,
  // setErc721Ltv,
  setReserveData,
  setUsedCollateral,
  setUserEthAsset,
  setUserNftConfig,
  // setUserNftValues,
  setUserState,
  setUserValues,
} from 'state/user/reducer'
import { bigNumberToString, div, times } from 'utils'
import { getWETH, DECIMALS_MASK, LTV_MASK, COLLATERAL_MASK, CHAIN_IDs } from 'config'
import { fromWei } from 'web3-utils'
import BN from 'bn.js'
import { useActiveWeb3React } from 'hooks/web3'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { getClient } from 'apollo/client'
import { LendingPool, UserNftCollection } from 'apollo/queries'
// import { getCollectionStats } from 'services/module/collection'
import erc721abi from 'abis/MockERC721.json'
import { setCollections, setDepositedCollection, setLoading, setShowChangeNetWork } from 'state/application/reducer'
import ERC721 from 'assets/images/png/collection/721.png'
import Azuki from 'assets/images/png/collection/azuki.png'
import Bayc from 'assets/images/png/collection/bayc.png'
import Mayc from 'assets/images/png/collection/mayc.png'
import Women from 'assets/images/png/collection/women.gif'
import Cat from 'assets/images/png/collection/cat.png'
import Clonex from 'assets/images/png/collection/clonex.png'
import Doodles from 'assets/images/png/collection/doodles.png'
import CryptoPunks from 'assets/images/png/collection/cryptopunks.png'
import { Contract } from '@ethersproject/contracts'
import { setMobileType } from 'state/user/reducer'
import { isMobile } from 'utils/userAgent'
import Mint from 'pages/Mint'
import Price from 'pages/Price'

export default function CustomizeRoutes() {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
    if (location.pathname === '/') {
      window.location.href = '/dashboard'
    }
  }, [location.pathname])
  const { chainId, library } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const contract = useLendingPool()
  const address = useAddress()
  const transactions = useAllTransactions()
  const [client, setClient] = useState<any>(null)
  const dashboardType = useDashboardType()

  useEffect(() => {
    if (chainId) {
      setClient(getClient(dashboardType)[chainId === 1 ? 42 : chainId === 4 ? 4 : chainId === 5 ? 5 : 5])
    }
  }, [chainId, dashboardType])
  const flag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return tx && tx.receipt && tx.info.type !== TransactionType.APPROVAL && isTransactionRecent(tx)
    }).length
  }, [transactions])
  useEffect(() => {
    if (address && chainId) {
      dispatch(setShowChangeNetWork(chainId !== 5))
    }
  }, [chainId, address, dispatch])
  useEffect(() => {
    if (contract && address && chainId && CHAIN_IDs.includes(chainId)) {
      contract.getUserConfig(address).then((res: any) => {
        dispatch(setUsedCollateral(new BN(res.toString()).and(new BN(COLLATERAL_MASK, 16)).toString() !== '0'))
      })
      contract.getReserveConfig(getWETH(chainId).toLocaleLowerCase(), false).then((res: any) => {
        dispatch(setDecimal(new BN(res.toString()).and(new BN(DECIMALS_MASK, 16)).shrn(32).toString()))
        dispatch(setErc20Ltv(new BN(res.toString()).and(new BN(LTV_MASK, 16)).toString()))
      })
      // contract.getReserveConfig(getERC721Address(chainId)).then((res: any) => {
      //   dispatch(setErc721Ltv(new BN(res.toString()).and(new BN(LTV_MASK, 16)).toString()))
      // })
      contract.getReserveData(getWETH(chainId)).then((res: any) => {
        dispatch(
          setReserveData({
            borrowRate: new BigNumber(times(fromWei(res.borrowRate.toString(), 'gether'), 100))
              .decimalPlaces(2, 1)
              .toString(),
            configuration: res.configuration.toString(),
            debtIndex: res.debtIndex.toString(),
            debtTokenAddress: res.debtTokenAddress.toString(),
            depositRate: new BigNumber(times(fromWei(res.depositRate.toString(), 'gether'), 100))
              .decimalPlaces(2, 1)
              .toString(),
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
            loanToValue: div(res[4].toString(), 10000),
            liquidationThreshold: div(res[5].toString(), 10000),
            heathFactor: res[6].toString(),
          })
        )
        dispatch(
          setUserValues({
            borrowLiquidity: fromWei(res[0].toString()),
            NFTLiquidity: fromWei(res[1].toString()),
            totalDebt: fromWei(res[3].toString()),
            totalCollateral: fromWei(res[2].toString()),
          })
        )
      })
      contract.getUserAssetValues(address, getWETH(chainId)).then((res: Array<BigNumber>) => {
        dispatch(
          setUserEthAsset([
            fromWei(res[0].toString()).toString(),
            fromWei(res[1].toString()).toString(),
            fromWei(res[2].toString()).toString(),
          ])
        )
      })
      contract.getUserConfig(address).then((res: BigNumber) => {
        dispatch(setLoading(false))
        dispatch(setUserNftConfig(bigNumberToString(res)))
      })
    } else {
      if (dispatch) {
        dispatch(setLoading(false))
      }
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
      } else if (symbol.toLocaleLowerCase().indexOf('world_of_women') > -1) {
        return Women
      } else if (symbol.toLocaleLowerCase().indexOf('doodles') > -1) {
        return Doodles
      } else if (symbol.toLocaleLowerCase().indexOf('cool_cats') > -1) {
        return Cat
      } else if (symbol.toLocaleLowerCase().indexOf('clonex') > -1) {
        return Clonex
      } else if (symbol.toLocaleLowerCase().indexOf('wpunks') > -1) {
        return CryptoPunks
      }
    }
    return ERC721
  }

  const renderName = (symbol?: string) => {
    if (symbol) {
      if (symbol.toLocaleLowerCase().indexOf('mayc') > -1) {
        return 'Mutant Ape Yacht Club'
      } else if (symbol.toLocaleLowerCase().indexOf('azuki') > -1) {
        return 'Azuki'
      } else if (symbol.toLocaleLowerCase().indexOf('bayc') > -1) {
        return 'Bored Ape Yacht Club'
      } else if (symbol.toLocaleLowerCase().indexOf('world_of_women') > -1) {
        return 'World of Women'
      } else if (symbol.toLocaleLowerCase().indexOf('doodles') > -1) {
        return 'Doodles'
      } else if (symbol.toLocaleLowerCase().indexOf('cool_cats') > -1) {
        return 'Cool Cats NFT'
      } else if (symbol.toLocaleLowerCase().indexOf('clonex') > -1) {
        return 'CLONE X - X TAKASHI MURAKAMI'
      } else if (symbol.toLocaleLowerCase().indexOf('wpunks') > -1) {
        return 'Cryptopunks'
      } else if (symbol.toLocaleLowerCase().indexOf('wrapped cryptopunks') > -1) {
        return 'Cryptopunks'
      }
    }
    return symbol
  }

  const getCollection = useCallback(async () => {
    if (client && contract) {
      const lendingPoolRes = await client.query({
        query: LendingPool(
          contract
            ? contract.address
            : chainId === 4
            ? '0xEB6f6d0B528e0222B924dd5527117f8aa5f48AD0'
            : '0xDb2d112963A0c320b6DE43AD732b0Fb815a3Bf27'
        ),
      })
      const nfts: Array<any> = []
      const depositedCollection: Array<any> = []
      if (lendingPoolRes.data && lendingPoolRes.data.lendingPools && lendingPoolRes.data.lendingPools.length > 0) {
        lendingPoolRes.data.lendingPools[0].nfts.forEach(async (element: any) => {
          const item: any = {}
          const ercContract = new Contract(element.id, erc721abi, library)
          if (address) {
            const res = await client.query({
              query: UserNftCollection(`${address.toLocaleLowerCase()}-${element.id}`),
            })
            if (res.data && res.data.userNftCollection) {
              depositedCollection.push(res.data)
            }
            if (chainId && CHAIN_IDs.includes(chainId)) {
              const balance = await ercContract.balanceOf(element.tNFT)
              item.totalValue = balance ? fromWei(balance.toString()) : '0'
            }
          }
          // const info = await getCollectionInfo(element.id)
          // item.info = info.data
          item.icon = renderImg(element.symbol)
          // const stats = await getCollectionStats(element.id, chainId)
          // item.stats = stats.data
          item.activeUser = element.users ? element.users.length : 0
          item.id = element.id
          item.name = renderName(element.name)
          item.symbol = element.symbol
          item.floorPrice = element.floorPrice
          item.interestRateCalculator = element.interestRateCalculator
          item.liqThreshold = element.liqThreshold
          item.ltv = element.ltv
          item.tToken = element.tToken
          nfts.push(item)
          if (nfts.length === lendingPoolRes.data.lendingPools[0].nfts.length) {
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
    dispatch(setMobileType(!isMobile))
  }, [dispatch])
  useEffect(() => {
    getCollection()
  }, [getCollection, flag, dashboardType])
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/deposit/:id" element={<Deposit />} />
      <Route path="/mint" element={<Mint />} />
      <Route path="/price" element={<Price />} />
      <Route path="/liquidate" element={<Liquidate />} />
      <Route path="/liquidate/:address" element={<Liquidate />} />
      <Route path="/liquidation" element={<Liquidation />} />
      <Route path="/liquidation/:page" element={<Liquidation />} />
      {/* <Route path="*" element={<Dashboard />} /> */}
    </Routes>
  )
}
