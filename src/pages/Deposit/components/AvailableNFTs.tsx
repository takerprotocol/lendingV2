import styled from '@emotion/styled'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import Rectangle from 'assets/images/svg/deposit/Rectangle 853.svg'
import XIcon from 'assets/images/svg/common/close.svg'
import RefreshIcon from 'assets/images/svg/common/refresh.svg'
import { useState } from 'react'
const AvailableNFTsBox = styled(Box)`
  width: 1012px;
  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 63.61%);
  border-radius: 12px;
  padding: 24px 0 24px 24px;
  margin-top: 24px;
  .MuiOutlinedInput-notchedOutline {
    border: 0px;
  }
  .MuiOutlinedInput-root .MuiInputBase-input {
    height: 22px;
    width: 70px;
    padding: 0px;
    top: 0px;
  }
  .css-9xuzcv-MuiButtonBase-root-MuiCheckbox-root {
    color: #4e4b66;
  }
`
const DepositedNFTsBox = styled(Box)`
  width: 1012px;
  background: linear-gradient(180deg, rgba(217, 219, 233, 0.3) 17.89%, rgba(217, 219, 233, 0) 100%);
  border-radius: 12px;
  padding: 24px 0 24px 24px;
  margin-top: 24px;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ButtonBox = styled(Box)`
  background: #eff0f7;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const BgBox = styled(Box)`
  width: 305px;
  height: 144px;
  background: #d9dbe9;
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
`
const ImgBox = styled(Box)`
  width: 305px;
  height: 144px;
  padding: 12px;
  background: #ffffff;
  border: 1px solid #f7f7fc;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 10px;
`
export default function AvailableNFTs() {
  const [check, setCheck] = useState<number>(1)
  return (
    <Box>
      <AvailableNFTsBox>
        <FlexBox>
          <Box>
            <Typography
              component="span"
              variant="h1"
              fontWeight="700"
              fontSize=" 24px"
              lineHeight="38px"
              color="#14142A"
            >
              60 Available NFTs
            </Typography>
            <Typography
              ml={'16px'}
              component="span"
              variant="h1"
              fontWeight="600"
              fontSize=" 18px"
              lineHeight="18px"
              color="#6E7191"
            >
              253.57 ETH
            </Typography>
          </Box>
          <Box mr="24px">
            {check === 1 ? (
              <Button
                variant="contained"
                onClick={() => {
                  if (1 === check) {
                    setCheck(2)
                  }
                }}
              >
                Deposit
              </Button>
            ) : (
              <Box>
                <FlexBox width={'268px'}>
                  <ButtonBox sx={{ padding: '15px', width: '44px', height: '44px', borderRadius: '100%' }}>
                    <img width={'14px'} height={'14px'} src={XIcon} alt="" />
                  </ButtonBox>
                  <ButtonBox borderRadius="100%">
                    <img src={RefreshIcon} alt="" />
                  </ButtonBox>
                  <ButtonBox
                    sx={{
                      padding: '13px 22px',
                      width: '148px',
                      height: '48px',
                      borderRadius: '24px',
                    }}
                    onClick={() => {
                      if (2 === check) {
                        setCheck(1)
                      }
                    }}
                  >
                    <Typography variant="body1" component="h1" fontWeight="700" color="#14142A">
                      Deposit 6 NFTs
                    </Typography>
                  </ButtonBox>
                </FlexBox>
              </Box>
            )}
          </Box>
        </FlexBox>
        <Box
          sx={{
            display: ' flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            mt: '31px',
            justifyContent: 'flex-start',
          }}
        >
          {check === 1 ? (
            <BgBox>
              <ImgBox>
                <Box sx={{ display: ' flex', alignItems: 'flex-start' }}>
                  <img width={'74px'} height={'74px'} src={Rectangle} alt="" />
                  <Typography ml={'12px'} variant="subtitle2" component="span" fontWeight="700" color="#14142A">
                    CRYPTOPUNK #4728
                  </Typography>
                </Box>
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
              </ImgBox>
            </BgBox>
          ) : (
            <BgBox>
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
                        <TextField id="outlined-basic" variant="outlined" />
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
                        <Typography
                          variant="body1"
                          component="span"
                          fontWeight="600"
                          fontStyle="normal"
                          color="#F7F7FC"
                        >
                          Max 15
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </FlexBox>
              </ImgBox>
            </BgBox>
          )}
          <BgBox></BgBox>
        </Box>
      </AvailableNFTsBox>
      <DepositedNFTsBox>
        <FlexBox>
          <Box>
            <Typography
              component="span"
              variant="h1"
              fontWeight="700"
              fontSize=" 24px"
              lineHeight="38px"
              color="#14142A"
            >
              105 Deposited NFTs
            </Typography>
            <Typography
              ml={'16px'}
              component="span"
              variant="h1"
              fontWeight="600"
              fontSize=" 18px"
              lineHeight="18px"
              color="#6E7191"
            >
              358.48 ETH
            </Typography>
          </Box>
          <Box mr="24px">
            <Button variant="contained" color="secondary">
              Withdraw
            </Button>
          </Box>
        </FlexBox>
        <Box
          sx={{
            display: ' flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            mt: '31px',
            justifyContent: 'flex-start',
          }}
        >
          <BgBox>
            <ImgBox>
              <Box sx={{ display: ' flex', alignItems: 'flex-start' }}>
                <img width={'74px'} height={'74px'} src={Rectangle} alt="" />
                <Typography ml={'12px'} variant="subtitle2" component="span" fontWeight="700" color="#14142A">
                  CRYPTOPUNK #4728
                </Typography>
              </Box>
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
                    x 15 NFTs
                  </Typography>
                </Box>
              </Box>
            </ImgBox>
          </BgBox>
          <BgBox></BgBox>
        </Box>
      </DepositedNFTsBox>
    </Box>
  )
}
