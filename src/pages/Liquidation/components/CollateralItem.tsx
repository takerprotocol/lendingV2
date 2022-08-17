import { Button, styled, Typography } from '@mui/material'
import Copy from 'components/Copy'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { abbrevAddress } from 'utils/abbrevAddres'

const Card = styled('div')(({ theme }) => ({
  background: '#ffffff',
  border: '1px solid #eff0f6',
  borderRadius: 12,
  width: '100%',
  padding: 23,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    gap: 20,
  },
}))

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
  margin-top: 12px;
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

const StyledCollectionImage = styled('img', {
  shouldForwardProp: (props) => true,
})<{ overflow?: boolean }>(({ theme, overflow }) => ({
  width: 24,
  height: 24,
  borderRadius: 4,
  backgroundColor: theme.palette.primary.main,
  borderLeft: overflow ? '2px white solid' : 'none',
  marginLeft: overflow ? -10 : 0,
  objectFit: 'cover',
  ':first-child': {
    borderLeft: 'none',
    marginLeft: 'none',
  },
}))

const StyledCollectionPlaceholder = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: 4,
  backgroundColor: theme.palette.primary.main,
}))

const CollectionImage = (props: any & { src?: string; overflow?: boolean }) => {
  const [error, setError] = useState(false)
  if (props.src || error) {
    return (
      <StyledCollectionImage
        overflow={!!props.overflow}
        onLoad={() => setError(false)}
        onError={() => setError(true)}
        {...props}
      />
    )
  } else {
    return <StyledCollectionPlaceholder />
  }
}

const CollectionImageContainer = styled('div')`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`

const ShowMoreCollectionsButton = styled('div')`
  width: 24px;
  height: 24px;
  background: #d9dbe9;
  opacity: 0.5;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  > div {
    width: 3px;
    height: 3px;
    background: #a0a3bd;
    border-radius: 50%;

    :first-child {
      margin-right: 2px;
    }

    :last-child {
      margin-left: 2px;
    }
  }
`

const NoCollateralText = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  color: #14142a;
  opacity: 0.7;
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
  const overflow = (collections: any[]) => !!(collections?.length > 9)
  const [shownCollections, setShowCollections] = useState(collections.slice(0, 8))
  const showAllCollections = useCallback(() => setShowCollections(collections), [collections])
  const Collections = useMemo(() => {
    if (shownCollections.length) {
      return shownCollections?.map((collection: any) => (
        <CollectionImage
          key={`collection-${JSON.stringify(collection)}`}
          alt="collection"
          src={collection.image}
          overflow={overflow(collections)}
        />
      ))
    } else {
      return <NoCollateralText>No NFT collateral</NoCollateralText>
    }
  }, [shownCollections, collections])

  const navigate = useNavigate()

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
          <CollectionImageContainer style={{ marginLeft: overflow(collections) ? 10 : 0 }}>
            {Collections}
            {overflow(collections) && collections?.length !== shownCollections?.length && (
              <ShowMoreCollectionsButton onClick={showAllCollections}>
                <div />
                <div />
                <div />
              </ShowMoreCollectionsButton>
            )}
          </CollectionImageContainer>
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
      <Button onClick={() => navigate('/liquidate')} variant="contained" color="primary">
        Liquidate
      </Button>
    </Card>
  )
}

export default CollateralItem
