import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import LiquidateBody from './components/Body'
import LiquidateHeader from './components/Header'
import { getClient } from 'apollo/client'
import { SupportedChainId } from 'constants/chains'
import { User } from 'apollo/queries'
import { fromWei } from 'web3-utils'
import { div, getRiskLevel, getRiskLevelTag, minus, times } from 'utils'
import BigNumber from 'bignumber.js'
import { CollateralModel } from 'services/type/nft'
import { useParams } from 'react-router-dom'

const client = getClient()[SupportedChainId.MAINNET]
const Body = styled(Box)`
  width: 100%;
  max-width: 1012px;
  margin: 0 auto;
  padding-top: 94px;
`

const Liquidate = () => {
  const [collaterals, setCollaterals] = useState<CollateralModel | null>(null)
  const [totalDebt, setTotalDebt] = useState('0')
  const [totalCollateral, setTotalCollateral] = useState('0')
  const [nftCollateral, setNftCollateral] = useState('0')
  const [heath, setHeath] = useState('0')
  const [loading, setLoading] = useState(false)
  const { address } = useParams()
  const getCollaterals = useCallback(async () => {
    if (address) {
      const user = await client.query({
        query: User(`${address}`),
      })
      setLoading(false)
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
      const _heath = div(times(user.data.user.reserveSupply, user.data.user.liqThreshold), user.data.user.totalDebt)
      setCollaterals({
        address,
        collateral: fromWei(user.data.user.reserveSupply),
        collections: user.data.user.collections,
        debt: fromWei(user.data.user.totalDebt),
        riskPercentage: _heath,
        riskLevel: getRiskLevel(_heath),
        riskLevelTag: getRiskLevelTag(_heath),
      })
      setNftCollateral(user.data.user.reserveSupply)
      setHeath(_heath)
      setTotalDebt(user.data.user.totalDebt)
      setTotalCollateral(user.data.user.nftCollateral)
    }
  }, [address])
  useEffect(() => {
    getCollaterals()
  }, [getCollaterals])
  return (
    <Body>
      <LiquidateHeader
        address={address || ''}
        riskPercentage={heath}
        totalCollateral={totalCollateral}
        nftCollateral={nftCollateral}
        ethCollateral={minus(totalCollateral, nftCollateral)}
        totalDebt={totalDebt}
        ethDebt={totalDebt}
        borrowings={totalDebt}
      />
      <LiquidateBody
        total={new BigNumber(totalDebt).gt(totalCollateral) ? minus(totalDebt, totalCollateral) : '0'}
        collaterals={collaterals}
        loading={loading}
      />
    </Body>
  )
}

export default Liquidate
