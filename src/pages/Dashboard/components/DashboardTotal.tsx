import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import TotalBorrowedIcon from 'assets/images/svg/dashboard/total-borrowed.svg'
import TotalLiquidityIcon from 'assets/images/svg/dashboard/total-liquidity.svg'
import TotalLeft from 'assets/images/svg/dashboard/totalLeft.svg'
import TotalRight from 'assets/images/svg/dashboard/totalRight.svg'
import TopLiquidity from 'assets/images/svg/dashboard/Tips-liquidity.svg'
import BottomLiquidity from 'assets/images/svg/dashboard/bottom-liquidity.svg'
import DashboardTotalSkeleton from './DashboardSkeleton/TotalSkeleton'
import { useLendingPool } from 'hooks/useLendingPool'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { bigNumberToString } from 'utils'

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
  const [loading, setLoading] = useState(true)
  const [poolValues, setPoolValues] = useState<Array<BigNumber>>([new BigNumber(0), new BigNumber(0), new BigNumber(0)])
  const contract = useLendingPool()
  useEffect(() => {
    if (contract) {
      contract
        .getPoolValues()
        .then((res: Array<BigNumber>) => {
          setLoading(false)
          setPoolValues(res)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [contract])
  return (
    <Box>
      {loading ? (
        <DashboardTotalSkeleton />
      ) : (
        <FlexBox>
          <FlexBox sx={{ justifyContent: 'flex-start' }}>
            {type === 1 ? (
              <Box marginLeft="23px" width="62px" height="62px">
                <img width="62px" height="62px" src={TotalLiquidityIcon} alt=" " />
              </Box>
            ) : (
              <Box width="62px" height="62px" marginLeft="23px">
                <img src={TotalLeft} height="62px" width="62px" alt=" " />
              </Box>
            )}
            <Box marginLeft="24px">
              {type === 1 ? (
                <CenterBox marginY="0px">
                  <Typography component="span" variant="subtitle1" fontWeight="500" lineHeight="18px" marginRight="8px">
                    Total Liquidity
                  </Typography>
                  <img src={TopLiquidity} alt="" />
                </CenterBox>
              ) : (
                <CenterBox marginY="0px">
                  <Typography variant="subtitle1" fontWeight="500" lineHeight="18px" marginRight="8px">
                    Total Liquidity
                  </Typography>
                  <img src={TopLiquidity} alt="" />
                </CenterBox>
              )}
              <Box marginTop="16px">
                <img src={BottomLiquidity} alt="" />
                <Typography component="span" variant="h4" marginLeft="6px" fontWeight="600" lineHeight="28px">
                  {bigNumberToString(poolValues[1])}
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
                {bigNumberToString(poolValues[0])} ETH
              </Typography>
              <Typography component="p" marginTop="10px" variant="subtitle2" color="#262338">
                {bigNumberToString(poolValues[1])} ETH
              </Typography>
            </Box>
          </FlexBox>
          <FlexBox sx={{ marginLeft: '120px', justifyContent: 'flex-start' }}>
            {type === 1 ? (
              <Box width="62px" height="62px">
                <img width="62px" height="62px" src={TotalBorrowedIcon} alt="" />
              </Box>
            ) : (
              <Box width="62px" height="62px">
                <img src={TotalRight} height="62px" width="62px" alt="" />
              </Box>
            )}
            <Box sx={{ marginLeft: '24px' }}>
              {type === 1 ? (
                <Box>
                  <Typography component="span" variant="subtitle1" fontWeight="500" lineHeight="18px">
                    Total Borrowed
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography component="span" variant="subtitle1" fontWeight="500" lineHeight="18px">
                    Total Borrowed
                  </Typography>
                </Box>
              )}
              <Box marginTop="16px">
                <img src={BottomLiquidity} alt="" />
                <Typography component="span" variant="h4" marginLeft="6px" fontWeight="600" lineHeight="28px">
                  {bigNumberToString(poolValues[0])}
                </Typography>
              </Box>
            </Box>
          </FlexBox>
        </FlexBox>
      )}
    </Box>
  )
}
