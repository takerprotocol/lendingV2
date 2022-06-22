import { Checkbox, styled, TextField, Typography } from '@mui/material'
import { useCallback, useState } from 'react'

const Container = styled('div')`
  padding: 12px;
  border: 1px solid #a0a3bd;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.5);
  border-radius: 10px;
  display: flex;
  gap: 14px;
  align-items: center;
  cursor: pointer;
  user-select: none;
`

const StyledCheckbox = styled(Checkbox)(() => ({
  width: 20,
  height: 20,
  boxShadow: '0px 4px 8px rgba(75, 75, 122, 0.1)',
  color: 'trasnparent !important',
}))

const NFTInfoContainer = styled('div')`
  display: flex;
  gap: 12px;
`

const NFTImage = styled('img')`
  width: 74px;
  height: 74px;
  border-radius: 6px;
  object-fit: cover;
`

const NFTImagePlaceholder = styled('div')`
  width: 74px;
  height: 74px;
  border-radius: 6px;
  object-fit: cover;
  background-color: #7646ff;
`

const CollectionInfoContainer = styled('div')`
  display: flex;
  gap: 5px;
  flex-direction: column;
`

const CollectionImage = styled('img')`
  width: 16px;
  height: 16px;
  object-fit: cover;
  border-radius: 50%;
`

const CollectionImagePlaceholder = styled('img')`
  width: 16px;
  height: 16px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #7646ff;
`

const CollectionTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 160%;
  color: #14142a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
`

const CollectionImageTitle = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`

const NFTTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;

  color: #14142a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 157px;
`

const ActionInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const NFTActionContainer = styled('div')`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`

const StyledTextField = styled(TextField)`
  flex: 1;
  background: #eff0f6;
  border-radius: 6px;
  max-height: 30px;
  input {
    background: #eff0f6;
    padding-left: 8px !important;
    border-radius: 6px;
    max-width: 100px;
    max-height: 30px;
  }
`

const FloorPriceLabel = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  /* Cool Gray 400 */

  color: #a0a3bd;
`

const MaxText = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  text-align: right;
  color: #6e7191;
  position: absolute;
  right: 10px;
  cursor: pointer;
`

const EthValue = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */

  display: flex;
  align-items: center;
  text-align: right;

  /* Main color 2 */

  color: #7646ff;
`

type NFTItemProps = {
  name: string
  image: string
  collection: {
    name: string
    image: string
  }
  price: number
  max: number
}

const NFTItem = ({ name, image, collection, price, max }: NFTItemProps) => {
  const [checked, setChecked] = useState<boolean>(false)
  const handleCheck = useCallback(() => setChecked(!checked), [checked])
  const [floorPrice, setFloorPrice] = useState<string | number>('')
  const [errorNftImage, setErrorNftImage] = useState(false)
  const handleNftImageError = useCallback(() => setErrorNftImage(true), [])
  const [errorCollectionImage, setErrorCollectionImage] = useState(false)
  const handleCollectionImageError = useCallback(() => setErrorCollectionImage(true), [])

  return (
    <Container onClick={handleCheck}>
      <StyledCheckbox checked={checked} onChange={handleCheck} />
      <ActionInfoContainer>
        <NFTInfoContainer>
          {!errorNftImage ? <NFTImage onError={handleNftImageError} src={image} alt="nft" /> : <NFTImagePlaceholder />}
          <CollectionInfoContainer>
            <CollectionImageTitle>
              {!errorCollectionImage ? (
                <CollectionImage
                  onError={handleCollectionImageError}
                  src={collection.image}
                  alt={`collection-${collection.name}`}
                />
              ) : (
                <CollectionImagePlaceholder />
              )}
              <CollectionTitle>{collection.name || ''}</CollectionTitle>
            </CollectionImageTitle>
            <NFTTitle>{name || ''}</NFTTitle>
          </CollectionInfoContainer>
        </NFTInfoContainer>
        <NFTActionContainer>
          {!!max ? (
            <StyledTextField
              placeholder="Floor Price"
              InputProps={{
                endAdornment: <MaxText onClick={() => setFloorPrice(15)}>Max {max}</MaxText>,
              }}
              value={floorPrice}
              onChange={(event) => setFloorPrice(event.target.value)}
              type="number"
              disabled={!checked}
            />
          ) : (
            <FloorPriceLabel>Floor Price</FloorPriceLabel>
          )}
          <EthValue>
            <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.5">
                <path
                  d="M4 12.2121L8.5 5L13 12.2121L8.5 19L4 12.2121Z"
                  stroke="#6E7191"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M4 12L8.5 14.5L13 12" stroke="#6E7191" strokeLinejoin="round" />
              </g>
            </svg>
            {price || '0.0000'}
          </EthValue>
        </NFTActionContainer>
      </ActionInfoContainer>
    </Container>
  )
}

export default NFTItem
