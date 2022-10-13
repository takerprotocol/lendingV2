import { Box, Button, styled, Typography } from '@mui/material'
import mobilePrompt from 'assets/images/svg/dashboard/mobilePrompt.svg'
import mobilePrompt2 from 'assets/images/svg/dashboard/mobilePrompt-2.svg'
import mobileEth from 'assets/images/svg/dashboard/mobileEth-icon.svg'
import mobileBlackEthLogo from 'assets/images/svg/dashboard/mobileBlackEthLogo.svg'
import mobilePurpleETH from 'assets/images/svg/dashboard/mobilePurpleETH-iocn.svg'
import mobileDown from 'assets/images/svg/dashboard/mobileDown.svg'
import mobileUp from 'assets/images/svg/dashboard/mobileUp.svg'
import { FlexBox, SpaceBetweenBox, CenterBox } from 'styleds'
import OverviewIcon from 'assets/images/svg/dashboard/overview-icon.svg'
import mobileWallet from 'assets/images/svg/dashboard/mobileWallet-icon.svg'
import { useState, useEffect } from 'react'
import {
  useAddress,
  useDashboardType,
  useDecimal,
  useEthCollateral,
  // useUserValue,
  useWalletBalance,
} from 'state/user/hooks'
import MobileMyETHCollateral from './MobileMyETHCollateral'
import MobileMyNFTCollateral from './MobileMyNFTCollateral'
import { useNavigate } from 'react-router-dom'
import MobileMyLoan from './MobileMyLoan'
import { decimalFormat, plus } from 'utils'
import { useLoading, usePoolValues } from 'state/application/hooks'
import { useAppDispatch } from 'state/hooks'
import { setLoginWalletType, setMobileMenuType } from 'state/user/reducer'
import MobileMyAssetsModal from './MobileMyAssetsModal'
import MobileTotalSkeleton from '../mobileDashboardSkeleton/MobileTotalSkeleton'
import MobileMyAssetsSkeleton from '../mobileDashboardSkeleton/MobileMyAssetsSkeleton'
// import MobileMyAssetsModal from './MobileMyAssetsModal'

const TotalBox = styled(Box)`
  width: 100%;
  padding: 1.25rem 0rem 2rem 1.375rem;
  border-radius: 0.375rem;
  background: linear-gradient(180deg, rgba(153, 159, 210, 0.1) 0%, rgba(157, 162, 197, 0.0384882) 84.87%);
`
const MyAssetsBox = styled(Box)`
  width: 100%;
  padding: 1rem;
  margin-top: -0.75rem;
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
const ConnectWalletBox = styled(Box)`
  background: linear-gradient(180deg, #ffffff 0%, #f7f7fc 100%);
  border-radius: 12px;
  display: flex;
  margin: 0 1rem 1rem 1rem;
  padding: 1.875rem 0 1.5rem 0;
  flex-direction: column;
`
const WalletTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  /* identical to box height, or 32px */
  text-align: center;
  /* Cool Gray 800 */
  color: #14142a;
  margin: 0.5rem 0 0.5rem 0;
`
const ConnectWalletButton = styled(Button)`
  background: linear-gradient(82.51deg, #7076ff 0%, #796aff 48.84%, #8e6bfd 100%) !important;
  box-shadow: 0px 4px 8px rgba(125, 112, 239, 0.1) !important;
  border-radius: 80px !important;
  padding: 0.375rem 2.125rem !important;
`
const PrimaryButton = styled(Button)`
  box-shadow: 0px 4px 8px rgba(125, 112, 239, 0.1) !important;
  border-radius: 80px !important;
  padding: 0.375rem 2.125rem !important;
`
export default function MobileMyAssets() {
  const [myAssetsType, setMyAssetsType] = useState<boolean>(true)
  const navigate = useNavigate()
  const poolValues = usePoolValues()
  const loading = useLoading()
  const decimal = useDecimal()
  const balance = useWalletBalance()
  // const userValue = useUserValue()
  const ethCollateral = useEthCollateral()
  const [openMySupplyModal, setOpenMySupplyModal] = useState(false)
  const type = useDashboardType()
  const address = useAddress()
  const dispatch = useAppDispatch()
  const [typeModal, setTypeModal] = useState<number>(1) // MySupplyModal State Supply(1) ro Withdraw(2)
  useEffect(() => {
    if (address) {
      dispatch(setLoginWalletType(true))
      dispatch(setMobileMenuType(true))
    }
  }, [address, dispatch])
  return (
    <Box mt="0.5rem">
      <Box p="0 1rem">
        {loading ? (
          <MobileTotalSkeleton></MobileTotalSkeleton>
        ) : (
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
                    {decimalFormat(plus(poolValues[1].toString(), poolValues[0].toString()), decimal)}
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
                    {decimalFormat(poolValues[0].toString(), decimal)}
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
          </TotalBox>
        )}
      </Box>
      {address ? (
        <>
          <Box p="0 1rem">
            {loading ? (
              <MobileMyAssetsSkeleton></MobileMyAssetsSkeleton>
            ) : (
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
                          {balance}
                        </Typography>
                      </FlexBox>
                    </Box>
                    <FlexBox>
                      <NFTBox onClick={() => navigate('/Deposit')}>
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          color="rgba(255, 255, 255, 0.5)"
                          lineHeight="1.0625rem"
                        >
                          NFT
                        </Typography>
                        <Typography variant="body2" fontWeight="700" color="rgba(255, 255, 255)" lineHeight="1.0625rem">
                          Deposit {'>'}
                        </Typography>
                      </NFTBox>
                      <ETHBox>
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          color="rgba(255, 255, 255, 0.5)"
                          lineHeight="1.0625rem"
                        >
                          ETH
                        </Typography>
                        <Typography
                          variant="body2"
                          onClick={() => {
                            setTypeModal(1)
                            setOpenMySupplyModal(true)
                          }}
                          fontWeight="700"
                          color="rgba(255, 255, 255)"
                          lineHeight="1.0625rem"
                        >
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
                            {balance}
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
                    <MobileMyETHCollateral
                      setOpenMySupplyModal={setOpenMySupplyModal}
                      setTypeModal={setTypeModal}
                    ></MobileMyETHCollateral>
                  </Box>
                )}
              </MyAssetsBox>
            )}
          </Box>
          <MobileMyLoan></MobileMyLoan>
        </>
      ) : (
        <ConnectWalletBox>
          <CenterBox>
            <img src={mobileWallet} alt="" />
          </CenterBox>
          <WalletTypography>Please connect your wallet</WalletTypography>
          <CenterBox>
            <Typography color="#A0A3BD" variant="body1">
              To see your deposited / borrowed assets,you
            </Typography>
          </CenterBox>
          <CenterBox>
            <Typography color="#A0A3BD" variant="body1">
              need to connect your wallet.
            </Typography>
          </CenterBox>
          <CenterBox mt="2rem">
            {type === 2 ? (
              <ConnectWalletButton
                onClick={() => {
                  dispatch(setLoginWalletType(false))
                  dispatch(setMobileMenuType(false))
                  dispatch(setLoginWalletType(false))
                }}
                variant="contained"
                color="primary"
              >
                Connect Wallet
              </ConnectWalletButton>
            ) : (
              <PrimaryButton
                variant="contained"
                color="primary"
                onClick={() => {
                  dispatch(setLoginWalletType(false))
                  dispatch(setMobileMenuType(false))
                  dispatch(setLoginWalletType(false))
                }}
              >
                Connect Wallet
              </PrimaryButton>
            )}
          </CenterBox>
        </ConnectWalletBox>
      )}
      <MobileMyAssetsModal
        openMySupplyModal={openMySupplyModal}
        setOpenMySupplyModal={setOpenMySupplyModal}
        type={typeModal}
        mySupply={decimalFormat(ethCollateral.replace(/,/g, ''), 0)}
      ></MobileMyAssetsModal>
    </Box>
  )
}
