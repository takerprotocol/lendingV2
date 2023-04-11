import { Nft } from '@alch/alchemy-sdk'
import styled from '@emotion/styled'
import { Box, Skeleton, TextField, Typography } from '@mui/material'
import { PUNKS_ADDRESS } from 'config'
import { useEffect, useMemo, useState } from 'react'
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

// const StyledCheckbox = styled(Checkbox)(() => ({
//   width: 20,
//   height: 20,
//   boxShadow: '0px 4px 8px rgba(75, 75, 122, 0.1)',
//   color: 'trasnparent !important',
// }))
const NftBox = styled(Box)`
  width: 305px;
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
  &.isCheck {
    padding: 11px;
    border: 1px solid #262338;
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
  width: 74,
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
      <NftImage
        onError={(e: any) => {
          e.target.src = props.src
        }}
        loaded={imageLoaded}
        onLoad={() => setImageLoaded(true)}
        {...props}
      />
      {!imageLoaded && <NftImageLoading variant="rectangular" />}
    </>
  )
}
interface NFTsLisProps {
  list: NftTokenModel[] | Nft[]
  loading: boolean
  // depositType: string
  setCheckedIndex: Function
  TypeKey: string
  onChange: Function
  checked: Array<string>
}
export default function NFTsList({ list, loading, onChange, TypeKey, checked, setCheckedIndex }: NFTsLisProps) {
  const [checkboxType, setCheckboxType] = useState<Array<string>>([])
  // const [nftName, setNftName] = useState<string>('')
  // const [image, setImage] = useState<string>('')
  const LoadingNftListSkeleton = useMemo(
    () => [0, 1, 2, 3, 4, 5].slice(0, 6).map((_collateral, index) => <NftListSkeleton key={`${TypeKey}-${index}`} />),
    [TypeKey]
  )
  useEffect(() => {
    setCheckboxType(checked)
    // if (list) {
    //   const listArray: any = list[0].tokenUri.gateway.split('json;utf8,')
    //   const listData: any = JSON.parse(listArray[1])
    //   const image = listData.image
    //   const name = listData.name
    //   setImage(image)
    //   setNftName(name)
    //   console.log(nftName)
    // }
  }, [checked, list])
  return (
    <>
      <ListBox>
        {loading ? (
          LoadingNftListSkeleton
        ) : (
          <>
            {list.map((el: NftTokenModel | Nft) => (
              <NftBox
                className={checkboxType.includes(el.tokenId) ? 'isCheck' : ' '}
                key={`nft${TypeKey}-${el.tokenId}`}
                onClick={() => {
                  if (checkboxType.length === 0) {
                    setCheckedIndex([])
                  }
                  if (!checkboxType.includes(el.tokenId)) {
                    if (el.contract.address === PUNKS_ADDRESS) {
                      setCheckboxType([el.tokenId])
                      onChange([el.tokenId])
                    } else {
                      onChange([...checkboxType, el.tokenId])
                      setCheckboxType([...checkboxType, el.tokenId])
                    }
                  } else {
                    if (el.contract.address === PUNKS_ADDRESS) {
                      onChange([])
                      setCheckboxType([])
                    } else {
                      onChange(checkboxType.filter((cel) => cel !== el.tokenId))
                      setCheckboxType(checkboxType.filter((cel) => cel !== el.tokenId))
                    }
                  }
                }}
              >
                <FlexBox>
                  {/* <StyledCheckbox
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
                  /> */}
                  <Box>
                    <Box sx={{ display: ' flex', alignItems: 'flex-start' }}>
                      <Image src={el.media[0]?.gateway || ''} alt={`nft-${el.title}`} />
                      <Typography ml={'12px'} variant="subtitle2" component="span" fontWeight="700" color="#14142A">
                        {el.title}
                      </Typography>
                    </Box>
                    {el.tokenType === 'ERC1155' && (
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
