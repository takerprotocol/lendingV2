import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import LiquidateBody from './components/Body'
import LiquidateHeader from './components/Header'

const Body = styled(Box)`
  width: 100%;
  max-width: 1012px;
  margin: 0 auto;
  margin-top: 94px;
`

const collateralData = [
  {
    name: 'CRYPTOPUNK #4728',
    image: 'https://cryptopunks.app/cryptopunks/cryptopunk4728.png',
    collection: {
      name: 'Cryptopunks',
      image:
        'https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FBdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE%3Ds10000?fit=max&h=120&w=120&auto=format&s=5eab9dfe19106ac590e683947112951b',
    },
    price: 7.2176,
    max: 15,
  },
  {
    name: 'CRYPTOPUNK #4728',
    image: 'https://cryptopunks.app/cryptopunks/cryptopunk4728.png',
    collection: {
      name: 'Cryptopunks',
      image:
        'https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FBdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE%3Ds10000?fit=max&h=120&w=120&auto=format&s=5eab9dfe19106ac590e683947112951b',
    },
    price: 7.2176,
    max: 0,
  },
  {
    name: 'CRYPTOPUNK #4728',
    image: 'https://cryptopunks.app/cryptopunks/cryptopunk4728.png',
    collection: {
      name: 'Cryptopunks',
      image:
        'https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2FBdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE%3Ds10000?fit=max&h=120&w=120&auto=format&s=5eab9dfe19106ac590e683947112951b',
    },
    price: 7.2176,
    max: 15,
  },
]

const Liquidate = () => {
  const [collaterals, setCollaterals] = useState<any>([])
  useEffect(() => {
    setTimeout(() => setCollaterals(collateralData), 1000)
  }, [])
  return (
    <Body>
      <LiquidateHeader
        address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
        riskPercentage={110}
        totalCollateral={526.1862}
        nftCollateral={360.26}
        ethCollateral={165.93}
        totalDebt={467.5814}
        ethDebt={420.82}
        borrowings={46.75}
      />
      <LiquidateBody
        total={233.7965}
        collaterals={collaterals.length ? [...collaterals, ...collaterals, ...collaterals] : []}
        loading={!!!collaterals.length}
      />
    </Body>
  )
}

export default Liquidate
