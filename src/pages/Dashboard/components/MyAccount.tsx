import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, CenterBox, FlexBox, SpaceBox } from 'styleds/index'
// import OverviewIcon from 'assets/images/svg/dashboard/overview-icon.svg'
import blackEthLogo from 'assets/images/svg/dashboard/blackEthLogo.svg'
import MyNFTCollateral from './MyNFTCollateral'
import MyETHSupply from './MyETHSupply'
import MyAccountSkeleton from './DashboardSkeleton/MyAccountSkeleton'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useLendingPool } from 'hooks/useLendingPool'
import { useAddress, useEthLiquidity, useUserValue } from 'state/user/hooks'
import TipsTooltip from './TipsTooltip'
import { fixedFormat, plus } from 'utils'
import { setLoading } from 'state/application/reducer'

const MyAccountBox = styled(Box)`
  width: 716px;
  height: 582px;
  padding: 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f7fc 100%);
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
// const RewardsBox = styled(Box)`
//   background: #f7f7fc;
//   display: none;
//   border-radius: 6px;
//   height: 48px;
//   cursor: pointer;
//   padding: 13px 16px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `
const MyAssetsBox = styled(Box)`
  margin: 36px 0 36px 24px;
`
interface MyAccountProps {
  type: number
  loading: boolean
}
export default function MyAccount({ type, loading }: MyAccountProps) {
  const ethLiquidity = useEthLiquidity()
  const userValue = useUserValue()
  const address = useAddress()
  // const [userValues, setUserValues] = useState<BigNumber>(new BigNumber(0))
  const [data] = useState<boolean>(true)
  const contract = useLendingPool()
  useEffect(() => {
    if (contract && address) {
      contract
        .getUserConfig(address)
        .then((res: BigNumber) => {
          setLoading(false)
          // setUserValues(res)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }, [contract, address])
  return (
    <MyAccountBox className={loading ? 'SkeletonBg' : ''}>
      {loading ? (
        <MyAccountSkeleton></MyAccountSkeleton>
      ) : (
        <>
          <SpaceBox sx={{ alignItems: 'flex-start' }}>
            <Typography variant="h4">My Account</Typography>
            {/* <RewardsBox>
              <Typography mr="10px" variant="body1" fontWeight="600">
                Rewards
              </Typography>
              <img src={OverviewIcon} alt="" />
              <Typography ml="4px" variant="subtitle2">
                <>16.84</>
              </Typography>
              <Typography ml="16px" variant="body1" fontWeight="700">
                Claim{' >'}
              </Typography>
            </RewardsBox> */}
          </SpaceBox>
          <MyAssetsBox>
            <Typography variant="subtitle2" fontWeight="500" component="p" color="#A0A3BD">
              My assets
            </Typography>
            <SpaceBetweenBox mt="4px">
              <CenterBox>
                <img src={blackEthLogo} alt="" />
                <Typography ml="8px" variant="h3" fontSize="32px" lineHeight="51px">
                  {fixedFormat(plus(userValue.NFTLiquidity, ethLiquidity))}
                </Typography>
              </CenterBox>
              <FlexBox mt="-15px">
                <Box>
                  <Typography variant="subtitle2" color="#A0A3BD">
                    15%
                  </Typography>
                  <CenterBox mt="2px">
                    <Typography mr="4px" variant="body2" color="#A0A3BD">
                      Net APY
                    </Typography>
                    <TipsTooltip size="14" grey="grey" value={'1111111'}></TipsTooltip>
                  </CenterBox>
                </Box>
                {data ? (
                  <Box ml="36px" width="198px">
                    <Typography variant="subtitle2" component="span" color="#A0A3BD">
                      {'≈ 0.46 ETH '}
                    </Typography>
                    <Typography variant="body1" component="span" fontWeight="600" color="#A0A3BD">
                      {'/day '}
                    </Typography>
                    <FlexBox mt="2px">
                      <Typography mr="4px" component="span" variant="body2" color="#A0A3BD">
                        Income estimation
                      </Typography>
                      <TipsTooltip size="14" grey="grey" value={'1111111'}></TipsTooltip>
                    </FlexBox>
                  </Box>
                ) : (
                  <>
                    <Box ml="36px">
                      <Typography variant="subtitle2" color="#A0A3BD">
                        10%
                      </Typography>
                      <CenterBox mt="2px">
                        <Typography mr="4px" variant="body2" color="#A0A3BD">
                          Borrow APY
                        </Typography>
                      </CenterBox>
                    </Box>
                    <Box mr="28px" ml="36px">
                      <Typography variant="subtitle2" color="#A0A3BD">
                        25%
                      </Typography>
                      <CenterBox mt="2px">
                        <Typography mr="4px" variant="body2" color="#A0A3BD">
                          Earned APY
                        </Typography>
                      </CenterBox>
                    </Box>
                  </>
                )}
              </FlexBox>
            </SpaceBetweenBox>
          </MyAssetsBox>
          <SpaceBetweenBox>
            <MyNFTCollateral type={type} loading={loading}></MyNFTCollateral>
            <MyETHSupply type={type} loading={loading}></MyETHSupply>
          </SpaceBetweenBox>
        </>
      )}
    </MyAccountBox>
  )
}
