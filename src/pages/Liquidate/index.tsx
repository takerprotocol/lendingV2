import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { getWETH } from 'config'
import { useCallback, useEffect, useMemo, useState } from 'react'
import LiquidateBody from './components/Body'
import LiquidateHeader from './components/Header'
import { getClient } from 'apollo/client'
import { User } from 'apollo/queries'
import { fromWei } from 'web3-utils'
import { desensitization, getRiskLevel, getRiskLevelTag, minus, plus } from 'utils'
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
import { useShowChangeNetWork } from 'state/application/hooks'
import { useLendingPool } from 'hooks/useLendingPool'
import { useTransactionAdder } from 'state/transactions/hooks'
import { toast } from 'react-toastify'
import { TransactionType } from 'state/transactions/types'

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
  const contract = useLendingPool()
  const dashboardType = useDashboardType()
  const [blueChipLoading, setBlueChipLoading] = useState(false)
  const [growthLoading, setGrowthLoading] = useState(false)
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
  const submit = () => {
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
      contract
        .liquidate(collections, tokenIds, getWETH(chainId), address, true)
        .then((res: any) => {
          addTransaction(res, {
            type: TransactionType.LIQUIDATE,
            amount: plus(nftAmount, ethValue || '0'),
          })
          toast.success(desensitization(res.hash))
          setEthValue('')
        })
        .catch((error: any) => {
          toast.error(error.message)
        })
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
        _heath = new BigNumber(fromWei(user.data.user.healthFactor)).toFixed(2, 1)
      }
      setCollaterals({
        address,
        collateral: fromWei(user.data.user.totalCollateral),
        collections: user.data.user.collections,
        debt: fromWei(user.data.user.totalDebt),
        riskPercentage: _heath,
        type: '',
        tokens: [],
        riskLevel: getRiskLevel(_heath),
        riskLevelTag: getRiskLevelTag(_heath),
      })
      setNftCollateral(fromWei(user.data.user.nftCollateral))
      setHeath(_heath)
      setTotalDebt(fromWei(user.data.user.totalDebt))
      setTotalCollateral(fromWei(user.data.user.totalCollateral))
    }
  }, [address, client, dashboardType])
  useEffect(() => {
    getCollaterals()
  }, [getCollaterals, dashboardType])
  const mobile = useMobileType()
  return (
    <>
      {mobile ? (
        <Body pt={showChangeNetWork ? '130px' : '82px'}>
          <LiquidateHeader
            address={address || ''}
            riskPercentage={heath}
            totalCollateral={totalCollateral}
            nftCollateral={nftCollateral}
            ethCollateral={minus(totalCollateral, nftCollateral)}
            totalDebt={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
            ethDebt={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
            borrowings={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
          />
          <LiquidateBody
            totalDebt={new BigNumber(totalDebt).gt(0) && new BigNumber(totalDebt).lt(0.01) ? '<0.01' : totalDebt}
            total={new BigNumber(totalDebt).gt(totalCollateral) ? minus(totalDebt, totalCollateral) : '0'}
            collaterals={collaterals}
            loading={loading}
            setTokenChecked={setTokenChecked}
            tokenChecked={tokenChecked}
            barTotal={plus(nftAmount, ethValue || '0')}
            nfts={tokenChecked.length}
            nftsValue={nftAmount}
            ethValue={ethValue}
            submit={() => {
              submit()
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
              submit={() => {
                submit()
              }}
            ></MobileFooter>
          )}
        </MobileBody>
      )}
    </>
  )
}

export default Liquidate
