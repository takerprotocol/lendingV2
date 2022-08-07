import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TotalBorrowedIcon from 'assets/images/svg/dashboard/total-borrowed.svg'
import TotalLiquidityIcon from 'assets/images/svg/dashboard/total-liquidity.svg'
import TotalLeft from 'assets/images/svg/dashboard/totalLeft.svg'
import TotalRight from 'assets/images/svg/dashboard/totalRight.svg'
import BottomLiquidity from 'assets/images/svg/dashboard/bottom-liquidity.svg'
import DashboardTotalSkeleton from './DashboardSkeleton/TotalSkeleton'
import { useLendingPool } from 'hooks/useLendingPool'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { decimalFormat } from 'utils'
import { useDecimal } from 'state/user/hooks'
import TipsTooltip from './TipsTooltip'
import { useAppDispatch } from 'state/hooks'
import { setPoolValues } from 'state/application/reducer'
import { usePoolValues } from 'state/application/hooks'

const FlexBox = styled(Box)`
  height: 62px;
  display: flex;
  align-items: center;
`
const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
`
interface DashboardTotalType {
  type: number
}
export default function DashboardTotal({ type }: DashboardTotalType) {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const poolValues = usePoolValues()
  const decimal = useDecimal()
  const contract = useLendingPool()
  useEffect(() => {
    if (contract) {
      contract
        .getPoolValues()
        .then((res: Array<BigNumber>) => {
          setLoading(false)
          dispatch(setPoolValues([res[0].toString(), res[1].toString(), res[2].toString()]))
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [contract, dispatch])
  return (
    <Box>
      {loading ? (
        <DashboardTotalSkeleton />
      ) : (
        <FlexBox>
          <FlexBox sx={{ justifyContent: 'flex-start' }}>
            {type === 1 ? (
              <Box marginLeft="23px" width="74px" height="74px">
                <img width="74px" height="74px" src={TotalLiquidityIcon} alt=" " />
              </Box>
            ) : (
              <Box width="74px" height="74px" marginLeft="23px">
                <img src={TotalLeft} height="74px" width="74px" alt=" " />
              </Box>
            )}
            <Box marginLeft="24px">
              <CenterBox marginY="0px">
                <Typography component="span" variant="subtitle1" fontWeight="500" lineHeight="18px" marginRight="8px">
                  Total Liquidity
                </Typography>
                <TipsTooltip size="16" value={'Total Liquidity'}></TipsTooltip>
              </CenterBox>
              <Box marginTop="16px">
                <img src={BottomLiquidity} alt="" />
                <Typography component="span" variant="h4" marginLeft="6px" fontWeight="600" lineHeight="28px">
                  {decimalFormat(poolValues[1].toString(), decimal)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginLeft: '55px' }}>
              <Typography component="p" fontWeight="500" variant="subtitle2" color="#6E7191">
                ETH Supply
              </Typography>
              <Typography component="p" marginTop="10px" fontWeight="500" variant="subtitle2" color="#6E7191">
                NFT Collaterals
              </Typography>
            </Box>
            <Box sx={{ marginLeft: '10px' }}>
              <Typography component="p" variant="subtitle2" color="#262338">
                {decimalFormat(poolValues[0].toString(), decimal)} ETH
              </Typography>
              <Typography component="p" marginTop="10px" variant="subtitle2" color="#262338">
                {decimalFormat(poolValues[1].toString(), decimal)} ETH
              </Typography>
            </Box>
          </FlexBox>
          <FlexBox sx={{ marginLeft: '120px', justifyContent: 'flex-start' }}>
            {type === 1 ? (
              <Box width="74px" height="74px">
                <img width="74px" height="74px" src={TotalBorrowedIcon} alt="" />
              </Box>
            ) : (
              <Box width="74px" height="74px">
                <img src={TotalRight} height="74px" width="74px" alt="" />
              </Box>
            )}
            <Box sx={{ marginLeft: '24px' }}>
              <Box>
                <Typography component="span" variant="subtitle1" fontWeight="500" lineHeight="18px">
                  Total Borrowed
                </Typography>
              </Box>
              <Box marginTop="16px">
                <img src={BottomLiquidity} alt="" />
                <Typography component="span" variant="h4" marginLeft="6px" fontWeight="600" lineHeight="28px">
                  {decimalFormat(poolValues[2].toString(), decimal)}
                </Typography>
              </Box>
            </Box>
          </FlexBox>
        </FlexBox>
      )}
    </Box>
  )
}
