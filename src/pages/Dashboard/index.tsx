import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BgIcon from 'assets/images/png/dashboard/bg.png'
import growthBg from 'assets/images/svg/dashboard/growthBg.svg'
import Collection from './components/Collection'
import BlueChipNFTs from './components/BlueChipNFTs'
import DataNFTs from './components/DataNFTs'
import { useLoading } from 'state/application/hooks'
import { useAddress, useDashboardType, useMobileMenuType, useMobileType } from 'state/user/hooks'
import { useDepositableNfts } from 'services/module/deposit'
import { useEffect, useState } from 'react'
import { setAccountNfts } from 'state/user/reducer'
import { useAppDispatch } from 'state/hooks'
// import Footer from 'components/Footer'

// import { getClient } from 'apollo/client'
// import { SupportedChainId } from 'constants/chains'
// import { TEST1 } from 'apollo/queries'
import MobileBlueChipNFts from './components/mobileComponents/MobileBlueChipNFts'
import MobileMyAssets from './components/mobileComponents/MobileMyAssets'
import MobileMyLoan from './components/mobileComponents/MobileMyLoan'
import MobileCollection from './components/mobileComponents/MobileCollection'
import MobileMenu from 'components/Header/components/MobileMenu'
import WalletMessage from 'components/Header/components/WalletMessage'
import WalletModal from 'components/WalletModal'
import MobileGrowthBg from 'assets/images/svg/dashboard/MobileGrowthBg.svg'
import MobileBgIcon from 'assets/images/svg/dashboard/MobileBgIcon.svg'
import MobileWallet from 'components/WalletModal/MobileWallet'
import { Typography } from '@mui/material'

const Body = styled(Box)`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${BgIcon});
  background-repeat: no-repeat;
  background-size: contain;
`
const Main = styled(Box)`
  width: 1208px;
  margin: 0 auto;
  margin-bottom: 72px;
`
const MobileBody = styled(Box)`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${BgIcon});
  background-repeat: no-repeat;
  background-size: cover;
`
const MobileMain = styled(Box)`
  width: 100%;
  padding: 0px 1rem;
  margin: 0 auto;
`
const ConnectWalletBox = styled(Box)`
  background: linear-gradient(95.08deg, #7646ff 2.49%, #297ac9 49.84%, #00dfd2 97.19%);
  box-shadow: 0px 0.5rem 1rem rgba(40, 127, 202, 0.2), inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
  border-radius: 1.6875rem;
  margin-top: 1rem;
  padding: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
`
export default function Dashboard() {
  const type = useDashboardType()
  const loading = useLoading()
  const address = useAddress()
  const mobileMenuType = useMobileMenuType()
  const dispatch = useAppDispatch()
  const { list } = useDepositableNfts(address)
  const [loginWalletType, setLoginWalletType] = useState<boolean>(true)
  function ConnectWallet() {
    return (
      <ConnectWalletBox
        onClick={() => {
          setLoginWalletType(false)
        }}
      >
        <Typography variant="subtitle2" color="#ffffff" fontWeight="600">
          Connect Wallet
        </Typography>
      </ConnectWalletBox>
    )
  }
  useEffect(() => {
    dispatch(setAccountNfts(list))
  }, [dispatch, list])
  const mobile = useMobileType()
  return (
    <>
      {mobile ? (
        <Body
          className="header-padding"
          sx={{ backgroundImage: `${type === 1 ? `url(${BgIcon})` : `url(${growthBg})`}` }}
        >
          <Main>
            <BlueChipNFTs loading={loading} type={type}></BlueChipNFTs>
            <DataNFTs loading={loading} type={type}></DataNFTs>
            <Collection loading={loading} type={type}></Collection>
          </Main>
        </Body>
      ) : (
        <MobileBody
          pt="6.375rem"
          sx={{ backgroundImage: `${type === 1 ? `url(${MobileBgIcon})` : `url(${MobileGrowthBg})`}` }}
        >
          <MobileMain>
            {mobileMenuType ? (
              <>
                <MobileBlueChipNFts></MobileBlueChipNFts>
                <MobileMyAssets></MobileMyAssets>
                <MobileMyLoan></MobileMyLoan>
                <MobileCollection></MobileCollection>
              </>
            ) : (
              <>
                {loginWalletType ? (
                  <>
                    <MobileMenu></MobileMenu>
                    {address ? <WalletMessage></WalletMessage> : <>{ConnectWallet()}</>}
                  </>
                ) : (
                  <MobileWallet setLoginWallet={setLoginWalletType}></MobileWallet>
                )}
              </>
            )}
          </MobileMain>
          <WalletModal></WalletModal>
        </MobileBody>
      )}
    </>
  )
}
