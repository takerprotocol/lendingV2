// import logo from './logo.svg';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import BgIcon from 'assets/images/png/dashboard/bg.png'
import DashboardTotal from './components/DashboardTotal'
import Overview from './components/Overview'
import PoolMySupply from './components/PoolMySupply'
import Collection from './components/Collection'
import BlueChipNFTs from './components/BlueChipNFTs'
import NFTPool from './components/NFTPool'
const Body = styled(Box)`
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${BgIcon});
  background-image: url(${BgIcon});
  background-repeat: no-repeat;
`
const Main = styled(Box)`
  width: 1159px;
  margin: 0 auto;
`
export default function Dashboard() {
  return (
    <Body className="header-padding">
      <BlueChipNFTs></BlueChipNFTs>
      <Main>
        <DashboardTotal></DashboardTotal>
        <Overview></Overview>
        <PoolMySupply></PoolMySupply>
        <NFTPool></NFTPool>
        <Collection></Collection>
      </Main>
    </Body>
  )
}
