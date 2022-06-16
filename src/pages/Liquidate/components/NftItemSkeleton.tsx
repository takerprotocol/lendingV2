import { Skeleton, styled, TextField, Typography } from '@mui/material'

const Container = styled('div')`
  padding: 12px;
  border: 1px solid #a0a3bd;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.5);
  border-radius: 10px;
  display: flex;
  gap: 14px;
  align-items: center;
`

const StyledCheckbox = styled(Skeleton)(() => ({
  width: 20,
  height: 20,
  boxShadow: '0px 4px 8px rgba(75, 75, 122, 0.1)',
  color: 'trasnparent !important',
}))

const NFTInfoContainer = styled('div')`
  display: flex;
  gap: 12px;
`

const NFTImagePlaceholder = styled(Skeleton)`
  width: 74px;
  height: 74px;
  border-radius: 6px;
  object-fit: cover;
`

const CollectionInfoContainer = styled('div')`
  display: flex;
  gap: 5px;
  flex-direction: column;
`

const CollectionImage = styled(Skeleton)`
  width: 16px;
  height: 16px;
  object-fit: cover;
  border-radius: 50%;
`

const CollectionTitle = styled(Skeleton)`
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

const NFTTitle = styled(Skeleton)`
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
`

const StyledTextField = styled(TextField)`
  flex: 1.5;
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

const EthValue = styled(Skeleton)`
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
  flex: 1;
`

const NFTItemSkeleton = () => {
  return (
    <Container>
      <StyledCheckbox variant="rectangular" />
      <ActionInfoContainer>
        <NFTInfoContainer>
          <NFTImagePlaceholder variant="rectangular" />
          <CollectionInfoContainer>
            <CollectionImageTitle>
              <CollectionImage variant="rectangular" />
              <CollectionTitle width="120px" />
            </CollectionImageTitle>
            <NFTTitle />
          </CollectionInfoContainer>
        </NFTInfoContainer>
        <NFTActionContainer>
          <StyledTextField value={''} onChange={() => null} type="number" disabled={true} />
          <EthValue variant="rectangular" width="50px" height="30px">
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
          </EthValue>
        </NFTActionContainer>
      </ActionInfoContainer>
    </Container>
  )
}

export default NFTItemSkeleton
