import { Box, Typography, styled } from '@mui/material'
import TotalBorrowedIcon from 'assets/images/svg/dashboard/total-borrowed.svg'
import TotalLiquidityIcon from 'assets/images/svg/dashboard/total-liquidity.svg'
import TotalLeft from 'assets/images/svg/dashboard/totalLeft.svg'
import TotalRight from 'assets/images/svg/dashboard/totalRight.svg'
import BottomLiquidity from 'assets/images/svg/dashboard/bottom-liquidity.svg'
import DashboardTotalSkeleton from './DashboardSkeleton/TotalSkeleton'
import { useLendingPool } from 'hooks/useLendingPool'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { decimalFormat, plus } from 'utils'
import { useDecimal } from 'state/user/hooks'
import TipsTooltip from './TipsTooltip'
import { useAppDispatch } from 'state/hooks'
import { setPoolValues } from 'state/application/reducer'
import { usePoolValues } from 'state/application/hooks'

const CenterBox = styled(Box)`
  display: flex;
  align-items: center;
`
const FlexStartBox = styled(Box)`
  display: flex;
  justify-content: flex-start;
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
        <FlexStartBox>
          <FlexStartBox ml="18px" sx={{ justifyContent: 'flex-start' }}>
            {type === 1 ? (
              <img width="74px" height="74px" src={TotalLiquidityIcon} alt=" " />
            ) : (
              <img src={TotalLeft} height="74px" width="74px" alt=" " />
            )}
            <Box width="236px" mt="2px" height="62px" marginLeft="16px">
              <CenterBox>
                <Typography component="span" variant="subtitle1" fontWeight="500" lineHeight="18px" marginRight="8px">
                  Total Liquidity
                </Typography>
                <TipsTooltip size="16" value={'Total Liquidity'}></TipsTooltip>
              </CenterBox>
              <CenterBox marginTop="16px">
                <img src={BottomLiquidity} alt="" />
                <Typography component="span" variant="h4" marginLeft="6px" fontWeight="600" lineHeight="28px">
                  {decimalFormat(plus(poolValues[1].toString(), poolValues[0].toString()), decimal)}
                </Typography>
              </CenterBox>
            </Box>
            <Box mt="2px" height="62px">
              <Typography component="p" fontWeight="500" variant="subtitle2" color="#6E7191">
                NFT Collaterals
              </Typography>
              <Typography component="p" marginTop="10px" fontWeight="500" variant="subtitle2" color="#6E7191">
                ETH Supply
              </Typography>
            </Box>
            <Box mt="2px" height="62px" width="262px" sx={{ marginLeft: '10px' }}>
              <Typography component="p" variant="subtitle2" color="#262338">
                {decimalFormat(poolValues[1].toString(), decimal)} ETH
              </Typography>
              <Typography component="p" mt="10px" variant="subtitle2" color="#262338">
                {decimalFormat(poolValues[0].toString(), decimal)} ETH
              </Typography>
            </Box>
          </FlexStartBox>
          <FlexStartBox>
            {type === 1 ? (
              <img width="74px" height="74px" src={TotalBorrowedIcon} alt="" />
            ) : (
              <img src={TotalRight} height="74px" width="74px" alt="" />
            )}
            <Box mt="2px" height="62px" sx={{ marginLeft: '16px' }}>
              <Box>
                <Typography component="span" variant="subtitle1" fontWeight="500" lineHeight="18px">
                  Total Borrowed
                </Typography>
              </Box>
              <Box marginTop="16px">
                <img src={BottomLiquidity} alt="" />
                <Typography component="span" variant="h4" marginLeft="6px" fontWeight="600" lineHeight="28px">
                  {decimalFormat(poolValues[0].toString(), decimal)}
                </Typography>
              </Box>
            </Box>
          </FlexStartBox>
        </FlexStartBox>
      )}
    </Box>
  )
}
