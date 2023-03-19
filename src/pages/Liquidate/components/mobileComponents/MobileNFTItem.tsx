import { Box, styled, Typography } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import { Nft } from '@alch/alchemy-sdk'
import { useAlchemy } from 'hooks/useAlchemy'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import { getAlchemyNftMetadata } from 'services/module/deposit'
const CardBox = styled(Box)`
  border-radius: 10px;
  margin-top: 0.5rem;
  &.isCheck {
    background: #f7f7fc;
  }
`
const ImgBox = styled(`img`)`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
`
const StartBox = styled(Box)`
  display: flex;
  align-items: flex-start;
`
const InputBox = styled(FlexBox)`
  height: 1.875rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.75rem;
  background: #f7f7fc;
  border-radius: 6px;
`
const RadiusImg = styled(`img`)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.375;
  border-radius: 100%;
`
const CollectionImagePlaceholder = styled('img')`
  width: 1rem;
  height: 1rem;
  margin-right: 0.375;
  border-radius: 100%;
  object-fit: cover;
  background-color: #7646ff;
`
const StyleTextField = styled('input')`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #4e4b66;
  outline: none;
  border: 0;
  margin-right: 0.375rem;
  line-height: 130%;
  max-width: 3.3125rem;
  max-height: 1.375rem;
  background: transparent;
  &::placeholder {
    color: #4e4b66;
  }
`
const CollectionTitle = styled(Typography)`
  font-weight: 700;
  font-size: 12px;
  margin-left: 0.375rem;
  line-height: 160%;
  color: #14142a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12rem;
`
const NFTTitle = styled(Typography)`
  font-weight: 700;
  font-size: 14px;
  line-height: 160%;
  color: #14142a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 13rem;
`
const NFTImagePlaceholder = styled('div')`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  object-fit: cover;
  background-color: #7646ff;
`
interface MobileNFTItemProps {
  token: string
  handle: Function
  setTokenChecked: Function
  tokenChecked: string
  setValue: Function
}
export default function MobileNFTItem({ token, tokenChecked, setTokenChecked, setValue }: MobileNFTItemProps) {
  const [NftType] = useState<string>('ERC721')
  const [metadata, setMetadata] = useState<Nft | null>(null)
  const [errorNftImage, setErrorNftImage] = useState(false)
  const handleNftImageError = useCallback(() => setErrorNftImage(true), [])
  const [errorCollectionImage, setErrorCollectionImage] = useState(false)
  const handleCollectionImageError = useCallback(() => setErrorCollectionImage(true), [])
  const alchemy = useAlchemy()
  useEffect(() => {
    if (token && alchemy) {
      getAlchemyNftMetadata(token.split('-')[1], token.split('-')[2], alchemy).then((res) => {
        if (res) {
          setMetadata(res)
        }
      })
    }
  }, [token, alchemy])
  return (
    <CardBox
      sx={{ border: `${tokenChecked === token ? '1px solid #a0a3bd' : ''}` }}
      p={tokenChecked === token ? '0.9375rem 0.9375rem 0.8125rem 0.6875rem' : '1rem 1rem 0.875rem 0.75rem'}
      onClick={() => {
        setValue({ icon: metadata?.media[0]?.gateway, token, title: metadata?.title })
        if (tokenChecked === token) {
          setTokenChecked('')
        } else {
          setTokenChecked(token)
        }
      }}
    >
      <FlexBox>
        <Box width="100%">
          <StartBox>
            {!errorNftImage ? (
              <ImgBox onError={handleNftImageError} src={metadata?.media[0]?.gateway} />
            ) : (
              <NFTImagePlaceholder />
            )}
            <Box>
              <FlexBox>
                {!errorCollectionImage ? (
                  <RadiusImg onError={handleCollectionImageError} src={metadata?.media[0]?.gateway} alt="" />
                ) : (
                  <CollectionImagePlaceholder />
                )}
                <CollectionTitle>{token || ''}</CollectionTitle>
              </FlexBox>
              <NFTTitle>{metadata?.title || ''}</NFTTitle>
            </Box>
          </StartBox>
          <SpaceBetweenBox height="1.875rem" mt="1rem">
            {NftType !== 'ERC721' ? (
              <InputBox>
                <StyleTextField
                  autoFocus={true}
                  placeholder="1"
                  // value={amount}
                  // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  //   event.target.value = event.target.value.replace(/^\D*(\d*(?:\.\d{0,10})?).*$/g, '$1')
                  //   handleAmount(event.target.value)
                  //   setAmount(event.target.value)
                  // }}
                />
                <svg width="2" height="18" viewBox="0 0 2 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0.5V17.5" stroke="#EFF0F6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Typography ml="0.5rem" variant="body1" fontWeight="600" color="#6E7191">
                  Max 20
                </Typography>
              </InputBox>
            ) : (
              <Typography variant="body1" color="#A0A3BD">
                Floor Price
              </Typography>
            )}
            {/* <FlexBox>
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
              <Typography fontWeight="700" variant="subtitle2" color="#7646FF">
                7.2176
              </Typography>
            </FlexBox> */}
          </SpaceBetweenBox>
        </Box>
      </FlexBox>
    </CardBox>
  )
}
