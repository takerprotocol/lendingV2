import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import myCollateralIcon from 'assets/images/svg/dashboard/myCollateral-icon.svg'
import addIcon from 'assets/images/svg/common/add.svg'
import rightIcon from 'assets/images/svg/common/right.svg'
import DepositHeaderSkeleton from './depositSkeleton/DepositHeaderSkeleton'
import { useDecimal, useErc20ReserveData } from 'state/user/hooks'
import { useCollections } from 'state/application/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { decimalFormat, div, times } from 'utils'
import { useLendingPool } from 'hooks/useLendingPool'
import { fromWei } from 'web3-utils'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from 'hooks/web3'
import { getClient } from 'apollo/client'
import { NftCollection } from 'apollo/queries'

// import { percent } from 'utils'
const HeaderBox = styled(Box)`
  width: 1012px;
  padding: 24px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const FlexBoxBetween = styled(FlexBox)`
  justify-content: space-between;
`

const BgFlexBox = styled(Box)`
  width: 24px;
  border-radius: 100%;
  height: 24px;
  background: #eff0f6;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const BigTypography = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  line-height: 38px;
  color: #4e4b66;
`
const SmallTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #4e4b66;
`
const TokenTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: #4e4b66;
`

const ImagesBox = styled(Box)`
  background: #ffffff;
  width: 6px;
  border: 1px solid #d9dbe9;
  border-radius: 0 6px 6px 0;
  border-left: 0;
`
const LeftFlexBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 10px;
  padding: 24px 18px 24px 50px;
`
const RightFlexBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 10px;
  padding: 24px 83px 24px 74px;
`
const ImgBox = styled('img')`
  width: 124px;
  height: 124px;
  display: block;
  border-radius: 10px;
`
export const FlexEndBox = styled(Box)`
  display: flex;
  align-items: flex-start;
  padding-top: 14px;
`
interface DepositHeaderProps {
  loading: boolean
}

export default function DepositHeader({ loading }: DepositHeaderProps) {
  const { chainId } = useActiveWeb3React()
  const collections = useCollections()
  const decimal = useDecimal()
  const [totalValue, setTotalValue] = useState('')
  const [borrowRate, setBorrowRate] = useState('')
  const erc20ReserveData = useErc20ReserveData()
  const [total, setTotal] = useState(0)
  const { id } = useParams()
  const contract = useLendingPool()
  const [client, setClient] = useState<any>(null)
  useEffect(() => {
    if (chainId) {
      setClient(getClient()[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 5])
    }
  }, [chainId])
  const collection = useMemo(() => {
    if (collections && id) {
      return collections.find((el) => el.id.toLocaleLowerCase() === id.toLocaleLowerCase())
    } else {
      return null
    }
  }, [collections, id])
  useEffect(() => {
    if (contract && id) {
      contract.getAssetValues(id).then((res: any) => {
        setTotalValue(decimalFormat(res[0].toString(), decimal))
      })
      contract.getReserveData(id).then((res: any) => {
        setBorrowRate(new BigNumber(times(fromWei(res.borrowRate.toString()), 100)).decimalPlaces(2, 1).toString())
      })
    }
  }, [contract, decimal, id])
  const getCollection = useCallback(async () => {
    if (client && id) {
      const res = await client.query({
        query: NftCollection(id),
      })
      let count = 0
      if (res && res.data && res.data.nftCollection) {
        res.data.nftCollection.users.array.forEach((element: any) => {
          count = count + element.tokens.length
        })
      }
      setTotal(count)
    }
  }, [client, id])
  useEffect(() => {
    getCollection()
  }, [getCollection])
  return (
    <Box>
      {loading ? (
        <DepositHeaderSkeleton></DepositHeaderSkeleton>
      ) : (
        <HeaderBox>
          <FlexBox>
            <FlexBox>
              <ImgBox src={collection?.icon} alt="" />
              <ImagesBox height="110px"></ImagesBox>
              <ImagesBox height="100px"></ImagesBox>
            </FlexBox>
            <Box ml="12px" width="272px">
              <Typography component="p" variant="h1" fontWeight="700" fontSize=" 24px" lineHeight="29px">
                {collection?.symbol}
              </Typography>
              <Typography mt="12px" variant="subtitle2" fontWeight="500" lineHeight="16px" color="#A0A3BD">
                {collection?.activeUser} Active Users
              </Typography>
            </Box>
            <FlexEndBox>
              <Box width="198px">
                <SmallTypography color="#4E4B66 !important">Total Value Locked</SmallTypography>
                <FlexBox mt="8px">
                  <img margin-top="15px" src={myCollateralIcon} alt="" />
                  <BigTypography ml="4px" variant="body1">
                    {totalValue || 0}
                  </BigTypography>
                </FlexBox>
                <Typography mt="4px" component="p" variant="subtitle1" lineHeight="18px" color="#A0A3BD">
                  {total || 0} NFTs
                </Typography>
              </Box>
              <Box width="148px">
                <SmallTypography>Floor Price</SmallTypography>
                <Box mt="8px">
                  <FlexBox>
                    <img src={myCollateralIcon} alt="" />
                    <BigTypography ml="4px" variant="body1">
                      {decimalFormat(collection?.floorPrice || 0, decimal)}
                    </BigTypography>
                  </FlexBox>
                  <Box height={'22px'}></Box>
                </Box>
              </Box>
              <Box width="198px">
                <SmallTypography>Loan to value</SmallTypography>
                <FlexBox mt="8px">
                  <img src={myCollateralIcon} alt="" />
                  <BigTypography ml="4px" variant="body1">
                    {decimalFormat(times(collection?.floorPrice || 0, div(collection?.ltv, 10000)), decimal)}
                  </BigTypography>
                </FlexBox>
                <Typography mt="4px" variant="subtitle1" lineHeight="18px" color="#A0A3BD">
                  {div(collection?.ltv, 100)}%
                </Typography>
              </Box>
            </FlexEndBox>
          </FlexBox>
          <FlexBoxBetween mt={'24px'}>
            <LeftFlexBox>
              <FlexBox>
                <Box width={'86px'}>
                  <BigTypography color="#4BC8B1 !important">0%</BigTypography>
                </Box>
                <Box sx={{ width: '62px' }}>
                  <BgFlexBox>
                    <img margin-left="20px" src={addIcon} alt="" />
                  </BgFlexBox>
                </Box>
                <Box width={'86px'}>
                  <BigTypography variant="h1" color="#6E7191 !important">
                    {borrowRate}%
                  </BigTypography>
                </Box>
                <Box width="60px">
                  <BgFlexBox>
                    <img margin-left="20px" src={rightIcon} alt="" />
                  </BgFlexBox>
                </Box>
                <Box>
                  <BigTypography>{erc20ReserveData.borrowRate}%</BigTypography>
                </Box>
              </FlexBox>
              <FlexBox mt="4px">
                <Box width="149px">
                  <TokenTypography color="#A0A3BD !important">Token Reward</TokenTypography>
                </Box>
                <Box width="147px">
                  <TokenTypography color="#A0A3BD !important">Borrow APY</TokenTypography>
                </Box>
                <Box>
                  <TokenTypography>Net Borrow APY</TokenTypography>
                </Box>
              </FlexBox>
            </LeftFlexBox>
            <RightFlexBox>
              <FlexBox>
                <Box width={'198px'}>
                  <BigTypography> {div(collection?.liqThreshold, 100)}%</BigTypography>
                  <TokenTypography mt="4px" color="#A0A3BD !important">
                    Liquidation Threshold
                  </TokenTypography>
                </Box>
                <Box>
                  <BigTypography>10%</BigTypography>
                  <TokenTypography mt="4px" color="#A0A3BD !important">
                    Liquidation Profit
                  </TokenTypography>
                </Box>
              </FlexBox>
            </RightFlexBox>
          </FlexBoxBetween>
        </HeaderBox>
      )}
    </Box>
  )
}
