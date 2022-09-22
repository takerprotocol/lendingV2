import { Box, styled, Typography } from '@mui/material'
import mobilePrompt from 'assets/images/svg/dashboard/mobilePrompt.svg'
import mobilePrompt2 from 'assets/images/svg/dashboard/mobilePrompt-2.svg'
import mobileEth from 'assets/images/svg/dashboard/mobileEth-icon.svg'
import mobileBlackEthLogo from 'assets/images/svg/dashboard/mobileBlackEthLogo.svg'
import mobilePurpleETH from 'assets/images/svg/dashboard/mobilePurpleETH-iocn.svg'
import mobileDown from 'assets/images/svg/dashboard/mobileDown.svg'
import mobileUp from 'assets/images/svg/dashboard/mobileUp.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import OverviewIcon from 'assets/images/svg/dashboard/overview-icon.svg'
import { useState } from 'react'
import { useDashboardType } from 'state/user/hooks'
import MobileMyETHCollateral from './MobileMyETHCollateral'
import MobileMyNFTCollateral from './MobileMyNFTCollateral'
import { useNavigate } from 'react-router-dom'

const TotalBox = styled(Box)`
  width: 100%;
  padding: 1.25rem 0rem 2rem 1.375rem;
  border-radius: 0.375rem;
  background: linear-gradient(180deg, rgba(153, 159, 210, 0.1) 0%, rgba(157, 162, 197, 0.0384882) 84.87%);
`
const MyAssetsBox = styled(Box)`
  width: 100%;
  margin-top: -0.8125rem;
  padding: 1rem;
  border-radius: 0.75rem;
`
const NFTBox = styled(Box)`
  background: linear-gradient(249.47deg, #7a82ff 0%, #9574f5 100%);
  box-shadow: 0px 0.25rem 0.5rem rgba(130, 128, 238, 0.3), inset 0px 0.0625rem 0.1875rem rgba(170, 189, 255, 0.7);
  border-radius: 0.375rem;
  padding: 0.4375rem 1.0625rem 0.4375rem 0.75rem;
`
const ETHBox = styled(Box)`
  margin-left: 0.5rem;
  background: linear-gradient(249.47deg, #6aa2f7 0%, #627eea 100%);
  box-shadow: 0 0.25rem 0.5rem rgba(128, 159, 238, 0.3), inset 0px 0.0625rem 0.1875rem rgba(170, 189, 255, 0.7);
  border-radius: 0.375rem;
  padding: 0.4375rem 1.3125rem 0.4375rem 0.75rem;
`
export const ClaimBox = styled(Box)`
  display: flex;
  align-items: center;
  background: #f7f7fc;
  border-radius: 0.375rem;
  padding: 0.5rem;
`
export default function MobileMyAssets() {
  const [myAssetsType, setMyAssetsType] = useState<boolean>(true)
  const navigate = useNavigate()
  const type = useDashboardType()
  return (
    <Box mt="0.5rem">
      <TotalBox>
        <FlexBox>
          <Box width="54.517%">
            <FlexBox>
              <Typography mr="0.5rem" variant="body2" fontWeight="600" lineHeight="0.75rem" color="#6E7191">
                Total Liquidity
              </Typography>
              <img src={mobilePrompt} alt="" />
            </FlexBox>
            <FlexBox mt="0.75rem">
              <img src={type === 1 ? mobileEth : mobilePurpleETH} alt="" />
              <Typography ml="0.375rem" variant="subtitle1" fontWeight="600" lineHeight="1.125rem" color="#262338">
                174,236.01
              </Typography>
            </FlexBox>
          </Box>
          <Box>
            <FlexBox>
              <Typography mr="0.5rem" variant="body2" fontWeight="600" lineHeight="0.8125rem" color="#6E7191">
                Total Borrowed
              </Typography>
            </FlexBox>
            <FlexBox mt="0.8125rem">
              <img src={type === 1 ? mobileEth : mobilePurpleETH} alt="" />
              <Typography ml="0.375rem" variant="subtitle1" fontWeight="600" lineHeight="1.125rem" color="#262338">
                64,236.42
              </Typography>
            </FlexBox>
          </Box>
        </FlexBox>
      </TotalBox>
      <MyAssetsBox
        sx={{ background: `${myAssetsType ? '#ffffff' : 'linear-gradient(180deg, #FFFFFF 0%, #F7F7FC 100%)'}` }}
      >
        <SpaceBetweenBox>
          <FlexBox
            onClick={() => {
              setMyAssetsType(!myAssetsType)
            }}
          >
            <Typography mr="0.5rem" variant="subtitle2" fontWeight="700">
              My Assets
            </Typography>
            <img src={myAssetsType ? mobileDown : mobileUp} alt="" />
          </FlexBox>
          <ClaimBox>
            <img src={OverviewIcon} alt="" />
            <Typography ml="0.25rem" mr="0.5rem" variant="body2" fontWeight="600">
              16.84
            </Typography>
            <Typography variant="body2" fontWeight="700">
              Claim {'>'}
            </Typography>
          </ClaimBox>
        </SpaceBetweenBox>
        {myAssetsType ? (
          <SpaceBetweenBox mt="1rem">
            <Box ml="0.375rem">
              <Typography variant="body2" color="#A0A3BD">
                My Assets
              </Typography>
              <FlexBox>
                <img src={mobileBlackEthLogo} alt="" />
                <Typography ml="0.4375rem" variant="h5" fontSize="1.125rem" lineHeight="1.8125rem">
                  22.4653
                </Typography>
              </FlexBox>
            </Box>
            <FlexBox>
              <NFTBox onClick={() => navigate('/Deposit')}>
                <Typography variant="body2" fontWeight="700" color="rgba(255, 255, 255, 0.5)" lineHeight="1.0625rem">
                  NFT
                </Typography>
                <Typography variant="body2" fontWeight="700" color="rgba(255, 255, 255)" lineHeight="1.0625rem">
                  Deposit {'>'}
                </Typography>
              </NFTBox>
              <ETHBox>
                <Typography variant="body2" fontWeight="700" color="rgba(255, 255, 255, 0.5)" lineHeight="1.0625rem">
                  ETH
                </Typography>
                <Typography variant="body2" fontWeight="700" color="rgba(255, 255, 255)" lineHeight="1.0625rem">
                  Supply {'>'}
                </Typography>
              </ETHBox>
            </FlexBox>
          </SpaceBetweenBox>
        ) : (
          <Box>
            <SpaceBetweenBox mt="1rem" mr="2.75rem">
              <Box ml="0.375rem">
                <Typography variant="body2" color="#A0A3BD">
                  My Assets
                </Typography>
                <FlexBox>
                  <img src={mobileBlackEthLogo} alt="" />
                  <Typography ml="0.4375rem" variant="h5" fontSize="1.125rem" lineHeight="1.8125rem">
                    22.4653
                  </Typography>
                </FlexBox>
              </Box>
              <Box>
                <Typography variant="body1" fontWeight="600" color="#A0A3BD">
                  15%
                </Typography>
                <FlexBox>
                  <Typography mr="0.25rem" variant="body2" color="#A0A3BD">
                    Net APY
                  </Typography>
                  <img src={mobilePrompt2} alt="" />
                </FlexBox>
              </Box>
            </SpaceBetweenBox>
            <MobileMyNFTCollateral></MobileMyNFTCollateral>
            <MobileMyETHCollateral></MobileMyETHCollateral>
          </Box>
        )}
      </MyAssetsBox>
    </Box>
  )
}
