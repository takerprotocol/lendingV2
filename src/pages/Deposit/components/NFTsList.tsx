import styled from '@emotion/styled'
import { Box, Checkbox, Skeleton, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { NftTokenModel } from 'services/type/nft'
import NftListSkeleton from './depositSkeleton/NftListSkeleton'

const ListBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
`

const StyledCheckbox = styled(Checkbox)(() => ({
  width: 20,
  height: 20,
  boxShadow: '0px 4px 8px rgba(75, 75, 122, 0.1)',
  color: 'trasnparent !important',
}))
const NftBox = styled(Box)`
  width: 305px;
  height: 144px;
  padding: 11px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
  &.isCheck {
    border: 1px solid #a0a3bd;
  }
`
const MaxBox = styled(Box)`
  width: 69px;
  height: 30px;
  background: #4e4b66;
  border-radius: 23px;
  cursor: pointer;
  padding: 4px 10px;
`

const NftImage = styled('img')<{ loaded: boolean }>(({ loaded }) => ({
  borderRadius: 6,
  widht: 74,
  height: 74,
  zIndex: loaded ? 1 : -1,
  position: loaded ? 'relative' : 'absolute',
}))

const NftImageLoading = styled(Skeleton)`
  width: 74px;
  height: 74px;
  border-radius: 6px;
`

const Image = (props: any) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <>
      <NftImage loaded={imageLoaded} onLoad={() => setImageLoaded(true)} {...props} />
      {!imageLoaded && <NftImageLoading variant="rectangular" />}
    </>
  )
}

interface NFTsLisProps {
  list: NftTokenModel[]
  loading: boolean
  depositType: string
  TypeKey: string
  onChange: Function
}
export default function NFTsList({ list, loading, depositType, onChange, TypeKey }: NFTsLisProps) {
  const [type] = useState<string>('721')
  const [checkboxType, setCheckboxType] = useState<Array<string>>([])
  const LoadingNftListSkeleton = useMemo(
    () => [0, 1, 2, 3, 4, 5].slice(0, 6).map((_collateral, index) => <NftListSkeleton key={`${TypeKey}-${index}`} />),
    [TypeKey]
  )

  return (
    <>
      <ListBox>
        {loading ? (
          LoadingNftListSkeleton
        ) : (
          <>
            {list.slice(0, 10).map((el: NftTokenModel, index: number) => (
              <NftBox className={checkboxType.includes(el.tokenId) ? 'isCheck' : ' '} key={`nft${TypeKey}-${index}`}>
                <FlexBox>
                  <StyledCheckbox
                    checked={checkboxType.includes(el.tokenId)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.checked) {
                        onChange([...checkboxType, el.tokenId])
                        setCheckboxType([...checkboxType, el.tokenId])
                      } else {
                        onChange(checkboxType.filter((cel) => cel !== el.tokenId))
                        setCheckboxType(checkboxType.filter((cel) => cel !== el.tokenId))
                      }
                    }}
                    sx={{ display: `${depositType === 'open' ? '' : 'none'}` }}
                    color="default"
                  />
                  <Box ml="10px">
                    <Box sx={{ display: ' flex', alignItems: 'flex-start' }}>
                      <Image src={el.media[0]?.gateway || ''} alt={`nft-${el.title}`} />
                      <Typography ml={'10px'} variant="subtitle2" component="span" fontWeight="700" color="#14142A">
                        {el.title}
                      </Typography>
                    </Box>
                    {type === '1155' && (
                      <Box mt={'16px'} display="flex" justifyContent="flex-start">
                        <Box
                          sx={{
                            width: '127px',
                            height: '30px',
                            padding: '4px 8px 4px 8px',
                            marginRight: '12px',
                            background: '#F7F7FC',
                          }}
                        >
                          <TextField variant="outlined" />
                          <Typography ml="6px" component="span" variant="body1" color="#A0A3BD">
                            NTFs
                          </Typography>
                        </Box>
                        <MaxBox>
                          <Typography variant="body1" component="span" fontWeight="600" color="#F7F7FC">
                            Max 15
                          </Typography>
                        </MaxBox>
                      </Box>
                    )}
                  </Box>
                </FlexBox>
              </NftBox>
            ))}
          </>
        )}
      </ListBox>
    </>
  )
}
