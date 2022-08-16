import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BgIcon from 'assets/images/png/dashboard/bg.png'
import growthBg from 'assets/images/svg/dashboard/growthBg.svg'
import Collection from './components/Collection'
import BlueChipNFTs from './components/BlueChipNFTs'
import DataNFTs from './components/DataNFTs'
import { useLoading } from 'state/application/hooks'
import { useAddress, useDashboardType } from 'state/user/hooks'
import { useDepositableNfts } from 'services/module/deposit'
import { useEffect } from 'react'
import { setAccountNfts } from 'state/user/reducer'
import { useAppDispatch } from 'state/hooks'
// import Footer from 'components/Footer'

// import { getClient } from 'apollo/client'
// import { SupportedChainId } from 'constants/chains'
// import { TEST1 } from 'apollo/queries'

const Body = styled(Box)`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${BgIcon});
  background-repeat: no-repeat;
  background-size: cover;
`
const Main = styled(Box)`
  width: 1208px;
  margin: 0 auto;
`
export default function Dashboard() {
  const type = useDashboardType()
  const loading = useLoading()
  const address = useAddress()
  const dispatch = useAppDispatch()
  const { list } = useDepositableNfts(address)

  useEffect(() => {
    dispatch(setAccountNfts(list))
  }, [dispatch, list])

  return (
    <Body className="header-padding" sx={{ backgroundImage: `${type === 1 ? `url(${BgIcon})` : `url(${growthBg})`}` }}>
      <Main>
        <BlueChipNFTs loading={loading} type={type}></BlueChipNFTs>
        <DataNFTs loading={loading} type={type}></DataNFTs>
        <Collection loading={loading} type={type}></Collection>
      </Main>
    </Body>
  )
}
