import { Box, Button, styled, Tooltip, Typography } from '@mui/material'
import Copy from 'components/Copy'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { abbrevAddress } from 'utils/abbrevAddres'
import { fixedFormat } from 'utils'
import numbro from 'numbro'
import { Nft } from '@alch/alchemy-sdk'
const Card = styled('div')(({ theme }) => ({
  background: '#ffffff',
  border: '1px solid #eff0f6',
  borderRadius: 12,
  width: '100%',
  // minWidth: '1060px',
  // overflow: 'scroll',
  padding: 24,
  paddingTop: 22,
  paddingBottom: 22,
  display: 'flex',
  [theme.breakpoints.down('md')]: {},
}))

const Header = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  color: #a0a3bd;
`

const Value = styled(Box)`
  font-family: 'Quicksand';
  font-style: normal;
  overflow: hidden;
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
`
// const ValueText = styled(Typography)`
//   font-weight: 500;
//   font-size: 12px;
//   line-height: 120%;
//   color: #a0a3bd;
//   display: flex;
//   flex-wrap: wrap;
// `

const DataItem = styled(Box)`
  display: flex;
  flex-direction: column;
`

const CollectionDataItem = styled(DataItem)`
  width: 222px;
`

const StyledCollectionImage = styled('img', {
  shouldForwardProp: (props) => true,
})<{ overflow?: boolean }>(({ theme, overflow }) => ({
  width: 26,
  height: 28,
  borderRadius: 4,
  backgroundColor: theme.palette.primary.main,
  borderLeft: overflow ? '2px white solid' : 'none',
  borderTop: '2px white solid',
  borderBottom: overflow ? '2px white solid' : 'none',
  marginLeft: overflow ? -10 : 0,
  objectFit: 'cover',
  ':first-of-type': {
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
      <Tooltip title={props.text} arrow placement="top">
        <StyledCollectionImage onLoad={() => setError(false)} onError={() => setError(true)} {...props} />
      </Tooltip>
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

    :first-of-type {
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
  collateral: string
  collections: any
  debt: string
  type: string
  tokens: Nft[]
  riskPercentage: string
  riskLevel: string
  riskLevelTag?: string
  nfts: number
}

const CollateralItem = ({
  address,
  collateral,
  collections,
  tokens,
  debt,
  type,
  riskPercentage = '0',
  riskLevelTag,
  riskLevel,
  nfts = 0,
}: CollateralItemType) => {
  const overflow = useMemo(() => {
    return tokens ? tokens.length > 9 : undefined
  }, [tokens])

  const showAllCollections = useCallback(() => tokens, [tokens])
  const Collections = useMemo(() => {
    if (tokens.length) {
      return tokens.map((nft: Nft, index: number) => (
        <CollectionImage
          key={`collection-${nft.tokenId}${index}`}
          alt="collection"
          text={nft.tokenId}
          src={nft.media[0]?.gateway}
        />
      ))
    } else {
      return <NoCollateralText>No NFT collateral</NoCollateralText>
    }
  }, [tokens])
  const navigate = useNavigate()

  return (
    <Card>
      <DataItem width={'222px'}>
        <Header>Address</Header>
        <Value>
          {abbrevAddress(address)}&nbsp;
          <Copy text={address} />
        </Value>
      </DataItem>
      <CollectionDataItem>
        <Header>
          {/* {collections?.length || 0} Collections / {nfts} NFTs
           */}
          {collections?.length || 0} {type} NFTs
        </Header>
        <Value>
          <CollectionImageContainer style={{ marginLeft: overflow ? 10 : 0 }}>
            {Collections}
            {overflow && collections?.length !== tokens?.length && (
              <ShowMoreCollectionsButton onClick={showAllCollections}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle opacity="0.5" cx="12" cy="12" r="12" fill="#D9DBE9" />
                  <path
                    d="M13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5C12.8284 13.5 13.5 12.8284 13.5 12Z"
                    fill="#A0A3BD"
                  />
                  <path
                    d="M19 12C19 11.1716 18.3284 10.5 17.5 10.5C16.6716 10.5 16 11.1716 16 12C16 12.8284 16.6716 13.5 17.5 13.5C18.3284 13.5 19 12.8284 19 12Z"
                    fill="#A0A3BD"
                  />
                  <path
                    d="M8 12C8 11.1716 7.32843 10.5 6.5 10.5C5.67157 10.5 5 11.1716 5 12C5 12.8284 5.67157 13.5 6.5 13.5C7.32843 13.5 8 12.8284 8 12Z"
                    fill="#A0A3BD"
                  />
                </svg>
              </ShowMoreCollectionsButton>
            )}
          </CollectionImageContainer>
        </Value>
      </CollectionDataItem>
      <DataItem width={'148px'}>
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
      <DataItem width={'148px'}>
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
          <Typography width="100px" overflow="hidden" variant="body1" fontWeight="700">
            {fixedFormat(debt)}
          </Typography>
        </Value>
      </DataItem>
      <DataItem width={'154px'}>
        <Header>Health Level</Header>
        <Value color={numbro.unformat(riskPercentage) <= 120 ? '#E1536C' : '#4E4B66'}>{riskPercentage}%</Value>
      </DataItem>
      <Button
        onClick={() => navigate(`/liquidate/${address}`)}
        disabled={numbro.unformat(riskPercentage.replaceAll('>', '').toLocaleLowerCase()) > 120}
        variant="contained"
        color="primary"
      >
        LIQUIDATE
      </Button>
    </Card>
  )
}

export default CollateralItem
