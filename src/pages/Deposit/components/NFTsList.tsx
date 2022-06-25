import styled from '@emotion/styled'
import { Box, Checkbox, TextField, Typography } from '@mui/material'
import Rectangle from 'assets/images/svg/deposit/Rectangle 853.svg'
import { useMemo, useState } from 'react'
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
interface NFTsLisProps {
  list: any[]
  loading: boolean
  depositType: string
  TypeKey: string
  onChange: Function
}
export default function NFTsList({ list, loading, depositType, onChange, TypeKey }: NFTsLisProps) {
  const [type] = useState<string>('721')
  const [checkboxType, setCheckboxType] = useState<Array<number>>([])
  const LoadingNftListSkeleton = useMemo(
    () => [0, 1, 2, 3, 4, 5].slice(0, 6).map((_collateral, index) => <NftListSkeleton key={`${TypeKey}-${index}`} />),
    [TypeKey]
  )
  // debugger
  return (
    <>
      <ListBox>
        {loading ? (
          LoadingNftListSkeleton
        ) : (
          <>
            {list.slice(1, 10).map((el: any, index: number) => (
              <NftBox className={checkboxType.includes(index) ? 'isCheck' : ' '} key={`nft${TypeKey}-${index}`}>
                <FlexBox>
                  <StyledCheckbox
                    checked={checkboxType.includes(index)}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.checked) {
                        onChange([...checkboxType, index])
                        setCheckboxType([...checkboxType, index])
                      } else {
                        onChange(checkboxType.filter((el) => el !== index))
                        setCheckboxType(checkboxType.filter((el) => el !== index))
                      }
                    }}
                    sx={{ display: `${depositType === 'open' ? '' : 'none'}` }}
                    color="default"
                  />
                  <Box ml="10px">
                    <Box sx={{ display: ' flex', alignItems: 'flex-start' }}>
                      <img width={'74px'} height={'74px'} src={Rectangle} alt="" />
                      <Typography ml={'10px'} variant="subtitle2" component="span" fontWeight="700" color="#14142A">
                        {el.metadata.description}
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
