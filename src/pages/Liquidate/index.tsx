import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import LiquidateBody from './components/Body'
import LiquidateHeader from './components/Header'
import { getClient } from 'apollo/client'
import { User } from 'apollo/queries'
import { fromWei } from 'web3-utils'
import { div, getRiskLevel, getRiskLevelTag, minus, times } from 'utils'
import BigNumber from 'bignumber.js'
import { CollateralModel } from 'services/type/nft'
import { useParams } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'

const Body = styled(Box)`
  width: 100%;
  max-width: 1012px;
  margin: 0 auto;
  padding-top: 94px;
`

const Liquidate = () => {
  const { chainId } = useActiveWeb3React()
  const [collaterals, setCollaterals] = useState<CollateralModel | null>(null)
  const [totalDebt, setTotalDebt] = useState('0')
  const [totalCollateral, setTotalCollateral] = useState('0')
  const [nftCollateral, setNftCollateral] = useState('0')
  const [heath, setHeath] = useState('0')
  const [loading, setLoading] = useState(false)
  const { address } = useParams()
  const [client, setClient] = useState<any>(null)

  useEffect(() => {
    if (chainId) {
      setClient(getClient()[chainId === 1 ? 42 : chainId === 4 ? 4 : 42])
    }
  }, [chainId])
  const getCollaterals = useCallback(async () => {
    if (address && client) {
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
      setNftCollateral(fromWei(user.data.user.nftCollateral))
      setHeath(_heath)
      setTotalDebt(fromWei(user.data.user.totalDebt))
      setTotalCollateral(fromWei(user.data.user.reserveSupply))
    }
  }, [address, client])
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
        totalDebt={totalDebt}
        total={new BigNumber(totalDebt).gt(totalCollateral) ? minus(totalDebt, totalCollateral) : '0'}
        collaterals={collaterals}
        loading={loading}
      />
    </Body>
  )
}

export default Liquidate
