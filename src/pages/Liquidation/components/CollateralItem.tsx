import { Button, styled, Typography } from '@mui/material'
import Copy from 'components/Copy'
import { useMemo } from 'react'
import { abbrevAddress } from 'utils/abbrevAddres'

const Card = styled('div')`
  background: #ffffff;
  border: 1px solid #eff0f6;
  border-radius: 12px;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Header = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  color: #a0a3bd;
`

const Value = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
`

const DataItem = styled('div')`
  display: flex;
  flex-direction: column;
`

const CollectionDataItem = styled(DataItem)`
  width: 250px;
`

const CollectionImage = styled('img')`
  width: 24px;
  height: 24px;
  border-radius: 4px;
`

const CollectionImageContainer = styled('div')`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`

type CollateralItemType = {
  address: string
  collateral: number
  collections: any
  debt: number
  riskPercentage: number
  riskLevel: string
  nfts: number
}

const CollateralItem = ({
  address,
  collateral,
  collections,
  debt,
  riskPercentage = 0,
  riskLevel,
  nfts = 0,
}: CollateralItemType) => {
  const Collections = useMemo(() => {
    return collections?.map((collection: any) => (
      <CollectionImage key={`collection-${JSON.stringify(collection)}`} alt="collection" src={collection.image} />
    ))
  }, [collections])

  return (
    <Card>
      <DataItem>
        <Header>Address</Header>
        <Value>
          {abbrevAddress(address)}&nbsp;
          <Copy text={address} />
        </Value>
      </DataItem>
      <DataItem>
        <Header>Collateral</Header>
        <Value>
          <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 10.7121L8.5 3.5L13 10.7121L8.5 17.5L4 10.7121Z"
              stroke="#14142A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M4 10.5L8.5 13L13 10.5" stroke="#14142A" strokeLinejoin="round" />
          </svg>
          {collateral}
        </Value>
      </DataItem>
      <CollectionDataItem>
        <Header>
          {collections?.length || 0} Collections / {nfts} NFTs
        </Header>
        <Value>
          <CollectionImageContainer>{Collections}</CollectionImageContainer>
        </Value>
      </CollectionDataItem>
      <DataItem>
        <Header>Total Debt</Header>
        <Value>
          <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 10.7121L8.5 3.5L13 10.7121L8.5 17.5L4 10.7121Z"
              stroke="#14142A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M4 10.5L8.5 13L13 10.5" stroke="#14142A" strokeLinejoin="round" />
          </svg>
          {debt}
        </Value>
      </DataItem>
      <DataItem>
        <Header>Risk Level</Header>
        <Value>
          {riskPercentage}% - {riskLevel}
        </Value>
      </DataItem>
      <Button variant="contained" color="primary">
        Liquidate
      </Button>
    </Card>
  )
}

export default CollateralItem