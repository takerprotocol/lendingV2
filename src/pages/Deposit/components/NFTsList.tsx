import styled from '@emotion/styled'
import { Box, Checkbox, TextField, Typography } from '@mui/material'
import Rectangle from 'assets/images/svg/deposit/Rectangle 853.svg'
import { useState } from 'react'

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
// const BgBox = styled(Box)`
//   width: 305px;
//   height: 144px;
//   border-radius: 10px;
//   margin-right: 24px;
//   margin-bottom: 24px;
//   background: rgba(217, 219, 233, 0.1);
// `
const ImgBox = styled(Box)`
  width: 305px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #f7f7fc;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 10px;
`
export default function NFTsList({ check, check1 }: { check: number; check1: number }) {
  const [check2] = useState<number>(1)
  return (
    <Box>
      {check === 1 ? (
        <Box
          sx={{
            display: ' flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            mt: '36px',
            justifyContent: 'flex-start',
          }}
        >
          <ImgBox className={check1 === 1 ? '' : 'opacity'}>
            <Box sx={{ display: ' flex', alignItems: 'flex-start' }}>
              <img width={'74px'} height={'74px'} src={Rectangle} alt="" />
              <Typography ml={'12px'} variant="subtitle2" component="span" fontWeight="700" color="#14142A">
                CRYPTOPUNK #4728
              </Typography>
            </Box>
            {check2 === 1 ? (
              ''
            ) : (
              <Box mt={'16px'} display="flex" justifyContent="flex-start">
                <Box
                  sx={{
                    height: '30px',
                    padding: '4px 8px 4px 8px',
                    marginRight: '12px',
                    background: '#F7F7FC',
                  }}
                >
                  <Typography variant="body1" component="span" color="#A0A3BD">
                    ERC-1155
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: '30px',
                    padding: '4px 8px 4px 8px',
                    marginRight: '12px',
                    background: '#F7F7FC',
                  }}
                >
                  <Typography variant="body1" component="span" fontWeight="600" color="#4E4B66">
                    x 5 NFTs
                  </Typography>
                </Box>
              </Box>
            )}
          </ImgBox>
        </Box>
      ) : (
        <Box
          sx={{
            display: ' flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            mt: '36px',
            justifyContent: 'flex-start',
          }}
        >
          <ImgBox>
            <FlexBox>
              <FlexBox sx={{ width: '20px', height: '20px', background: ' #EFF0F6', borderRadius: '4px' }}>
                <Checkbox
                  sx={{
                    width: '20px',
                    height: '20px',
                  }}
                  defaultChecked
                  color="default"
                />
              </FlexBox>
              <Box ml="10px">
                <Box sx={{ display: ' flex', alignItems: 'flex-start' }}>
                  <img width={'74px'} height={'74px'} src={Rectangle} alt="" />
                  <Typography ml={'10px'} variant="subtitle2" component="span" fontWeight="700" color="#14142A">
                    CRYPTOPUNK #4728
                  </Typography>
                </Box>
                {check2 === 1 ? (
                  ''
                ) : (
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
                    <Box
                      sx={{
                        width: '69px',
                        height: '30px',
                        background: '#4E4B66',
                        borderRadius: '23px',
                        cursor: 'pointer',
                        padding: '4px 10px',
                      }}
                    >
                      <Typography variant="body1" component="span" fontWeight="600" fontStyle="normal" color="#F7F7FC">
                        Max 15
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </FlexBox>
          </ImgBox>
        </Box>
      )}
    </Box>
  )
}
