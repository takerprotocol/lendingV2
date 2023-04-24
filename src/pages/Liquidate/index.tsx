import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { useCallback, useEffect, useMemo, useState } from 'react'
import LiquidateBody from './components/Body'
import LiquidateHeader from './components/Header'
import { getClient } from 'apollo/client'
import { User } from 'apollo/queries'
import { fromWei, toWei } from 'web3-utils'
import { desensitization, getRiskLevel, getRiskLevelTag, minus, plus, times, div } from 'utils'
import BigNumber from 'bignumber.js'
import { CollateralModel, TokenModel } from 'services/type/nft'
import { useParams } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'
import { useDashboardType, useMobileType } from 'state/user/hooks'
import MobileHeader from './components/mobileComponents/MobileHeader'
import MobileMain from './components/mobileComponents/MobileMain'
// import MobileETHCollateral from './components/mobileComponents/MobileETHCollateral'
import MobileNFTCollaterals from './components/mobileComponents/MobileNFTCollaterals'
import MobileFooter from './components/mobileComponents/MobileFooter'
import MobileLiquidateTitleSkeleton from './components/mobileLiquidateSkeleton/MobileLiquidateTitleSkeleton'
import { useCollections, useShowChangeNetWork } from 'state/application/hooks'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import { toast } from 'react-toastify'
import { TransactionType } from 'state/transactions/types'
import numbro from 'numbro'
import { useGateway, usePunkGateway } from 'hooks/useGateway'
import { useLendingPool } from 'hooks/useLendingPool'

const Body = styled(Box)`
  width: 100%;
  max-width: 1012px;
  margin: 0 auto;
`
const MobileBody = styled(Box)`
  width: 100%;
  background: #f7f7fc;
  position: relative;
`

const Liquidate = () => {
  const { chainId } = useActiveWeb3React()
  const [collaterals, setCollaterals] = useState<CollateralModel | null>(null)
  const [totalDebt, setTotalDebt] = useState('0')
  const showChangeNetWork = useShowChangeNetWork()
  const [totalCollateral, setTotalCollateral] = useState('0')
  const [nftCollateral, setNftCollateral] = useState('0')
  const [heath, setHeath] = useState('0')
  // const [loading, setLoading] = useState(false)
  const { address } = useParams()
  const [value, setValue] = useState<any>()
  const [ethValue, setEthValue] = useState('0')
  const [client, setClient] = useState<any>(null)
  // const dashboardType = useDashboardType()
  const [tokenChecked, setTokenChecked] = useState<string>('')
  const addTransaction = useTransactionAdder()
  const contract = useGateway()
  const punkGatewayContract = usePunkGateway()
  const lpContract = useLendingPool()
  const dashboardType = useDashboardType()
  const [blueChipLoading, setBlueChipLoading] = useState(false)
  const [growthLoading, setGrowthLoading] = useState(false)
  const allCollections = useCollections()
  const transactions = useAllTransactions()
  const flag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return tx && tx.receipt && tx.info.type === TransactionType.LIQUIDATE && isTransactionRecent(tx)
    }).length
  }, [transactions])

  const [userValue, setUserValue] = useState({
    borrowLiquidity: '0',
    NFTLiquidity: '0',
    totalDebt: '0',
    totalCollateral: '0',
    heathFactor: '0',
  })
  useEffect(() => {
    if (lpContract && address) {
      lpContract.getUserState(address).then((res: Array<BigNumber>) => {
        let _heath = times(fromWei(res[6].toString()), 100)
        if (new BigNumber(heath).gt(1000000)) {
          _heath = '>1M'
        } else {
          _heath = numbro(_heath).format({ spaceSeparated: true, average: true }).replace(' ', '')
        }
        setUserValue({
          borrowLiquidity: fromWei(res[0].toString()),
          NFTLiquidity: fromWei(res[1].toString()),
          totalDebt: fromWei(res[3].toString()),
          totalCollateral: fromWei(res[2].toString()),
          heathFactor: _heath,
        })
      })
    }
  }, [lpContract, address, flag, heath])
  const loading = useMemo(() => {
    return dashboardType === 1 ? blueChipLoading : growthLoading
  }, [blueChipLoading, dashboardType, growthLoading])
  useEffect(() => {
    if (contract) {
      // contract.getUserState(address).then((res: Array<BigNumber>) => {
      //   console.log('1111', res)
      // })
      // contract.getUserValues(address).then((res: Array<BigNumber>) => {
      //   console.log('11122', res)
      // })
    }
  }, [contract])
  const nfts = useMemo(() => {
    const _nfts: Array<TokenModel> = []
    if (collaterals) {
      collaterals.collections.forEach((collection) => {
        collection.tokens.forEach((token) => {
          _nfts.push(token)
        })
      })
    }
    return _nfts
  }, [collaterals])
  const submit = (value: string) => {
    if (contract) {
      const collections: Array<string> = []
      const tokenIds: Array<string> = []
      const amounts: Array<string> = []
      nfts
        .filter((nft) => tokenChecked.includes(nft.id))
        .forEach((el) => {
          collections.push(el.id.split('-')[1])
          tokenIds.push(el.id.split('-')[2])
          amounts.push(el.amount)
        })
      const _collection = allCollections.find(
        (el) => el.id.toLocaleLowerCase() === collections.toString().toLocaleLowerCase()
      )
      if (_collection.name.toLocaleLowerCase().indexOf('punks') > -1) {
        punkGatewayContract &&
          punkGatewayContract
            .liquidate(lpContract?.address, tokenIds.toString(), address, {
              gasLimit: 610000,
              value: toWei(plus(times(div(fromWei(value), userValue.totalCollateral), userValue.totalDebt), 0.1)),
            })
            .then((res: any) => {
              addTransaction(res, {
                type: TransactionType.LIQUIDATE,
                amount: plus(nftAmount, ethValue || '0'),
              })
              toast.success(desensitization(res.hash))
              setEthValue('')
            })
            .catch((error: any) => {
              console.log(error.message)
              toast.error(error.message)
            })
      } else {
        contract
          .liquidate(lpContract?.address, collections.toString(), tokenIds.toString(), address, false, {
            gasLimit: 610000,
            value: toWei(plus(times(div(fromWei(value), userValue.totalCollateral), userValue.totalDebt), 0.1)),
          })
          .then((res: any) => {
            addTransaction(res, {
              type: TransactionType.LIQUIDATE,
              amount: plus(nftAmount, ethValue || '0'),
            })
            toast.success(desensitization(res.hash))
            setEthValue('')
          })
          .catch((error: any) => {
            console.log(error.message)
            toast.error(error.message)
          })
      }

      // console.log('collections', ...collections, 'tokenIds', ...tokenIds, 'chainId', chainId, 'address', address)
    }
  }
  const nftAmount = useMemo(() => {
    let amount = '0'
    nfts
      .filter((nft) => tokenChecked.includes(nft.id))
      .forEach((el) => {
        amount = new BigNumber(el.amount).plus(amount).toString()
      })
    return amount
  }, [nfts, tokenChecked])
  //
  useEffect(() => {
    if (chainId) {
      setClient(getClient(dashboardType)[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 42])
    }
  }, [chainId, dashboardType])
  const getCollaterals = useCallback(async () => {
    if (address && client) {
      const user = await client.query({
        query: User(`${address}`),
      })
      // setLoading(false)
      dashboardType === 1 ? setBlueChipLoading(false) : setGrowthLoading(false)
      // let _totalCollateral = '0'
      // let _totalDebt = '0'
      // let _nftCollateral = '0'
      if (user.data.user) {
        // user.data.user.reserves.forEach((el: any) => {
        //   _totalCollateral = plus(fromWei(el.depositedAmount), _totalCollateral)
        //   _totalDebt = plus(fromWei(el.borrowedAmount), totalDebt)
        // })
        // user.data.user.collections.forEach((el: any) => {
        //   el.tokens.forEach((tokenItem: any) => {
        //     _nftCollateral = plus(fromWei(tokenItem.amount), nftCollateral)
        //   })
        // })
      }
      let _heath = '0'
      if (user.data.user.healthFactor) {
        _heath = times(fromWei(user.data.user.healthFactor), 100)
        if (new BigNumber(heath).gt(1000000)) {
          _heath = '>1M'
        } else {
          _heath = numbro(_heath).format({ spaceSeparated: true, average: true }).replace(' ', '')
        }
      }
      setCollaterals({
        address,
        collateral: fromWei(user.data.user.totalCollateral),
        collections: user.data.user.collections,
        debt: fromWei(user.data.user.totalDebt),
        riskPercentage: _heath,
        type: '',
        riskLevel: getRiskLevel(_heath),
        riskLevelTag: getRiskLevelTag(_heath),
      })
      setNftCollateral(fromWei(user.data.user.nftCollateral))
      setHeath(_heath)
      setTotalDebt(fromWei(user.data.user.totalDebt))
      setTotalCollateral(fromWei(user.data.user.totalCollateral))
    }
  }, [address, client, dashboardType, heath])
  useEffect(() => {
    getCollaterals()
  }, [getCollaterals, dashboardType])
  useEffect(() => {
    if (flag > 0) {
      getCollaterals()
    }
  }, [flag, getCollaterals])
  const mobile = useMobileType()
  return (
    <>
      {mobile ? (
        <Body pt={showChangeNetWork ? '130px' : '82px'}>
          <LiquidateHeader
            address={address || ''}
            riskPercentage={userValue.heathFactor}
            totalCollateral={userValue.totalCollateral}
            nftCollateral={nftCollateral}
            ethCollateral={minus(totalCollateral, nftCollateral)}
            totalDebt={
              new BigNumber(userValue.totalDebt).gt(0) && new BigNumber(userValue.totalDebt).lt(0.01)
                ? '<0.01'
                : userValue.totalDebt
            }
            ethDebt={
              new BigNumber(userValue.totalDebt).gt(0) && new BigNumber(userValue.totalDebt).lt(0.01)
                ? '<0.01'
                : userValue.totalDebt
            }
            borrowings={
              new BigNumber(userValue.totalDebt).gt(0) && new BigNumber(userValue.totalDebt).lt(0.01)
                ? '<0.01'
                : userValue.totalDebt
            }
          />
          <LiquidateBody
            totalDebt={
              new BigNumber(userValue.totalDebt).gt(0) && new BigNumber(userValue.totalDebt).lt(0.01)
                ? '<0.01'
                : userValue.totalDebt
            }
            total={userValue.totalCollateral}
            collaterals={collaterals}
            loading={loading}
            heath={heath}
            setTokenChecked={setTokenChecked}
            tokenChecked={tokenChecked}
            barTotal={plus(nftAmount, ethValue || '0')}
            nfts={tokenChecked.length}
            nftsValue={nftAmount}
            ethValue={ethValue}
            submit={(value: string) => {
              submit(value)
            }}
          />
        </Body>
      ) : (
        <MobileBody
          pt={showChangeNetWork ? '7.1875rem' : '3.125rem'}
          sx={{ paddingBottom: `${loading ? '1.4375rem' : '7.25rem'}` }}
        >
          <MobileHeader
            address={address || ''}
            riskPercentage={heath}
            totalCollateral={totalCollateral}
            nftCollateral={nftCollateral}
            ethCollateral={minus(totalCollateral, nftCollateral)}
            totalDebt={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
            ethDebt={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
            loading={loading}
            borrowings={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
          ></MobileHeader>
          {loading ? (
            <MobileLiquidateTitleSkeleton></MobileLiquidateTitleSkeleton>
          ) : (
            <MobileMain
              totalDebt={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
            ></MobileMain>
          )}
          {/* <MobileETHCollateral loading={loading}></MobileETHCollateral> */}
          <MobileNFTCollaterals
            setTokenChecked={setTokenChecked}
            tokenChecked={tokenChecked}
            collaterals={collaterals}
            loading={loading}
            setValue={setValue}
          ></MobileNFTCollaterals>
          {!loading && (
            <MobileFooter
              total={plus(nftAmount, ethValue || '0')}
              nfts={tokenChecked.length}
              nftsValue={nftAmount}
              value={value}
              ethValue={ethValue}
              submit={(value: string) => {
                submit(value)
              }}
            ></MobileFooter>
          )}
        </MobileBody>
      )}
    </>
  )
}

export default Liquidate
