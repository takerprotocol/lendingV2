import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import LiquidateBody from './components/Body'
import LiquidateHeader from './components/Header'
import { getClient } from 'apollo/client'
import { SupportedChainId } from 'constants/chains'
import { User } from 'apollo/queries'
import { fromWei } from 'web3-utils'
import { minus, plus } from 'utils'
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
  const [loading, setLoading] = useState(false)
  const { address } = useParams()
  const getCollaterals = useCallback(async () => {
    if (address) {
      const user = await client.query({
        query: User(`${address}`),
      })
      setLoading(false)
      let _totalCollateral = '0'
      let _totalDebt = '0'
      let _nftCollateral = '0'
      if (user.data.user) {
        user.data.user.reserves.forEach((el: any) => {
          _totalCollateral = plus(fromWei(el.depositedAmount), _totalCollateral)
          _totalDebt = plus(fromWei(el.borrowedAmount), totalDebt)
        })
        user.data.user.collections.forEach((el: any) => {
          el.tokens.forEach((tokenItem: any) => {
            _nftCollateral = plus(fromWei(tokenItem.amount), nftCollateral)
          })
        })
      }
      setCollaterals({
        address,
        collateral: _totalCollateral,
        collections: user.data.user.collections,
        debt: _totalDebt,
        riskPercentage: '100',
        riskLevel: 'TypographyRiskLevel',
        riskLevelTag: 'riskLevelTag',
      })
      setNftCollateral(_totalCollateral)
      setTotalDebt(_totalDebt)
      setTotalCollateral(_nftCollateral)
    }
  }, [address, nftCollateral, totalDebt])
  useEffect(() => {
    getCollaterals()
  }, [getCollaterals])
  return (
    <Body>
      <LiquidateHeader
        address={address || ''}
        riskPercentage={110}
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
