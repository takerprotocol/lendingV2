import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Collaterals from './components/Collaterals'
import Collection1 from '../../assets/images/png/liquidation/example/1.png'
import Collection2 from '../../assets/images/png/liquidation/example/2.png'
import Collection3 from '../../assets/images/png/liquidation/example/3.png'
import { useMemo, useState } from 'react'
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
        collateral: 0.1,
        collections: [
          {
            image: Collection1,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection3,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
        ],
        debt: 5,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 0.1,
        collections: [
          {
            image: Collection1,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection3,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
        ],
        debt: 5,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 0.1,
        collections: [
          {
            image: Collection1,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection3,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
        ],
        debt: 5,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 0.1,
        collections: [
          {
            image: Collection1,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection3,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection1,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection3,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
        ],
        debt: 5,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 0.1,
        collections: [
          {
            image: Collection1,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection3,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection2,
            nfts: new Array(2),
          },
          {
            image: Collection3,
            nfts: new Array(5),
          },
          {
            image: Collection2,
            nfts: new Array(5),
          },
          {
            image: Collection2,
            nfts: new Array(5),
          },
          {
            image: Collection2,
            nfts: new Array(5),
          },
          {
            image: Collection3,
            nfts: new Array(5),
          },
          {
            image: Collection2,
            nfts: new Array(3),
          },
        ],
        debt: 5,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
    ],
    []
  )

  const [loading] = useState(false)

  return (
    <Body className="header-padding">
      <Header />
      <Collaterals loading={loading} collaterals={collaterals} />
    </Body>
  )
}
