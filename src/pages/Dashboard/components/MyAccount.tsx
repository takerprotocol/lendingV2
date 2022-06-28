import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, CenterBox, FlexBox } from 'styleds/index'
import OverviewIcon from 'assets/images/svg/dashboard/overview-icon.svg'
import blackEthLogo from 'assets/images/svg/dashboard/blackEthLogo.svg'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'
import MyNFTCollateral from './MyNFTCollateral'
import MyETHSupply from './MyETHSupply'
import MyAccountSkeleton from './DashboardSkeleton/MyAccountSkeleton'

const MyAccountBox = styled(Box)`
  width: 716px;
  height: 582px;
  padding: 24px;
  background: linear-gradient(180deg, #ffffff 0%, #f7f7fc 100%);
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
const RewardsBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 6px;
  height: 48px;
  cursor: pointer;
  padding: 13px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MyAssetsBox = styled(Box)`
  margin: 39px 0 36px 24px;
  width: 570px;
`
interface MyAccountProps {
  type: number
  loading: boolean
}
export default function MyAccount({ type, loading }: MyAccountProps) {
  return (
    <MyAccountBox className={loading ? 'SkeletonBg' : ''}>
      {loading ? (
        <MyAccountSkeleton></MyAccountSkeleton>
      ) : (
        <>
          <SpaceBetweenBox>
            <Typography variant="h4">My Account</Typography>
            <RewardsBox display="">
              <Typography mr="10px" variant="body1" fontWeight="600">
                Rewards
              </Typography>
              <img src={OverviewIcon} alt="" />
              <Typography ml="4px" variant="subtitle2">
                16.84
              </Typography>
              <Typography ml="16px" variant="body1" fontWeight="700">
                Claim{' >'}
              </Typography>
            </RewardsBox>
          </SpaceBetweenBox>
          <MyAssetsBox>
            <Typography variant="subtitle2" fontWeight="500" component="p" color="#A0A3BD">
              My assets
            </Typography>
            <SpaceBetweenBox>
              <CenterBox>
                <img src={blackEthLogo} alt="" />
                <Typography ml="13px" variant="h3" fontSize="32px" lineHeight="51px">
                  22.4653
                </Typography>
              </CenterBox>
              <FlexBox>
                <Box>
                  <Typography variant="subtitle2" color="#A0A3BD">
                    15%
                  </Typography>
                  <CenterBox>
                    <Typography mr="4px" variant="body2" color="#A0A3BD">
                      Net APY
                    </Typography>
                    <img width="14px" height="14px" src={greyPrompt} alt="" />
                  </CenterBox>
                </Box>
                <Box ml="36px">
                  <Typography variant="subtitle2" component="span" color="#A0A3BD">
                    {'≈ 0.46 ETH '}
                  </Typography>
                  <Typography variant="body1" component="span" fontWeight="600" color="#A0A3BD">
                    {'/day '}
                  </Typography>
                  <CenterBox>
                    <Typography mr="4px" component="span" variant="body2" color="#A0A3BD">
                      Income estimation
                    </Typography>
                    <img width="14px" height="14px" src={greyPrompt} alt="" />
                  </CenterBox>
                </Box>
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
