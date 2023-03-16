import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BgIcon from 'assets/images/png/dashboard/bg.png'
import growthBg from 'assets/images/svg/dashboard/growthBg.svg'
import Collection from './components/Collection'
import BlueChipNFTs from './components/BlueChipNFTs'
import DataNFTs from './components/DataNFTs'
import { useLoading, useShowChangeNetWork } from 'state/application/hooks'
import { useAddress, useDashboardType, useLoginWalletType, useMobileMenuType, useMobileType } from 'state/user/hooks'
import { useDepositableNfts } from 'services/module/deposit'
import { useEffect } from 'react'
import { isMobile } from 'utils/userAgent'
import { setAccountNfts, setLoginWalletType, setMobileType } from 'state/user/reducer'
import { useAppDispatch } from 'state/hooks'
// import Footer from 'components/Footer'

// import { getClient } from 'apollo/client'
// import { SupportedChainId } from 'constants/chains'
// import { TEST1 } from 'apollo/queries'
import MobileBlueChipNFts from './components/mobileComponents/MobileBlueChipNFts'
import MobileMyAssets from './components/mobileComponents/MobileMyAssets'
import MobileCollection from './components/mobileComponents/MobileCollection'
import MobileMenu from 'components/Header/components/MobileMenu'
import WalletMessage from 'components/Header/components/WalletMessage'
import WalletModal from 'components/WalletModal'
import MobileGrowthBg from 'assets/images/svg/dashboard/MobileGrowthBg.svg'
import MobileBgIcon from 'assets/images/svg/dashboard/MobileBgIcon.svg'
// import MobileWallet from 'components/WalletModal/MobileWallet'
import { Typography } from '@mui/material'

const Body = styled(Box)`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${BgIcon});
  background-repeat: no-repeat;
  background-size: 100% 685px;
  min-height: calc(100vh - 267px);
`
const Main = styled(Box)`
  width: 1208px;
  margin: 0 auto;
  margin-bottom: 80px;
`
const MobileBody = styled(Box)`
  background-color: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6));
  background-size: 100% 32rem;
  background-repeat: no-repeat;
`
const MobileMain = styled(Box)`
  width: 100%;
  margin: 0 auto;
`
const MenuBg = styled(Box)`
  position: absolute;
  -webkit-backdrop-filter: blur(150px);
  backdrop-filter: blur(150px);
  width: 100wh;
  padding-top: 58px;
  height: 100vh;
  top: 0;
  left: 0;
  width: 100%;
`
const ConnectWalletBox = styled(Box)`
  background: linear-gradient(95.08deg, #7646ff 2.49%, #297ac9 49.84%, #00dfd2 97.19%);
  box-shadow: 0px 0.5rem 1rem rgba(40, 127, 202, 0.2), inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
  border-radius: 1.6875rem;
  padding: 0.875rem;
  margin: 1.5rem 1rem 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default function Dashboard() {
  const type = useDashboardType()
  const loading = useLoading()
  const address = useAddress()
  const showChangeNetWork = useShowChangeNetWork()
  const mobileMenuType = useMobileMenuType()
  const dispatch = useAppDispatch()
  const { list } = useDepositableNfts(address)
  const loginWalletType = useLoginWalletType()
  function ConnectWallet() {
    return (
      <ConnectWalletBox
        onClick={() => {
          dispatch(setLoginWalletType(false))
        }}
      >
        <Typography variant="subtitle2" color="#ffffff" fontWeight="700">
          Connect Wallet
        </Typography>
      </ConnectWalletBox>
    )
  }
  useEffect(() => {
    dispatch(setAccountNfts(list))
    dispatch(setMobileType(!isMobile))
  }, [dispatch, list])
  useEffect(() => {
    dispatch(setMobileType(!isMobile))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const mobile = useMobileType()
  return (
    <>
      {mobile ? (
        <Body
          // className="header-padding"
          sx={{
            backgroundImage: `${type === 1 ? `url(${BgIcon})` : `url(${growthBg})`}`,
            paddingTop: showChangeNetWork ? '118px' : '70px',
          }}
        >
          <Main>
            <BlueChipNFTs type={type}></BlueChipNFTs>
            <DataNFTs loading={loading} type={type}></DataNFTs>
            <Collection loading={loading} type={type}></Collection>
          </Main>
        </Body>
      ) : (
        <MobileBody
          pt="3.625rem"
          height={mobileMenuType ? '100%' : '100vh'}
          sx={{ backgroundImage: `${type === 1 ? `url(${MobileBgIcon})` : `url(${MobileGrowthBg})`}` }}
        >
          <MobileMain>
            <>
              <MobileBlueChipNFts></MobileBlueChipNFts>
              <MobileMyAssets></MobileMyAssets>
              <MobileCollection></MobileCollection>
            </>
            {!mobileMenuType && (
              <MenuBg>
                {loginWalletType ? (
                  <>
                    <MobileMenu></MobileMenu>
                    {address ? <WalletMessage></WalletMessage> : <>{ConnectWallet()}</>}
                  </>
                ) : (
                  <WalletModal></WalletModal>
                )}
              </MenuBg>
            )}
          </MobileMain>
        </MobileBody>
      )}
    </>
  )
}
