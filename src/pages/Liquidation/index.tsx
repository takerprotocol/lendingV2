import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import Collection1 from '../../assets/images/png/liquidation/example/1.png'
import Collection2 from '../../assets/images/png/liquidation/example/2.png'
import Collection3 from '../../assets/images/png/liquidation/example/3.png'
import { useEffect, useMemo, useState } from 'react'
// import Collection6 from '../../assets/images/png/liquidation/example/6.png'

const Body = styled(Box)`
  background: #e5e5e5;
  width: 100%;
`

export default function Liquidation() {
  const collaterals = useMemo(
    () => [
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 120,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
        ],
        debt: 50,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 2,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
        ],
        debt: 2,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 50,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
        ],
        debt: 398,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 20,
        collections: [
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(2),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
        ],
        debt: 60,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 0.1,
        collections: [
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(2),
          },
        ],
        debt: 20,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 60,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
          {
            name: 'NFTrees',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(2),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(5),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(3),
          },
        ],
        debt: 35,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
    ],
    []
  )

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  return (
    <Body className="header-padding">
      <Header />
      <Collaterals loading={loading} collaterals={collaterals} />
    </Body>
  )
}
