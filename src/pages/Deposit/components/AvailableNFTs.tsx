import styled from '@emotion/styled'
import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import Rectangle from 'assets/images/svg/deposit/Rectangle 853.svg'
import XIcon from 'assets/images/svg/common/close.svg'
import RefreshIcon from 'assets/images/svg/common/refresh.svg'
import RefreshIcon2 from 'assets/images/svg/common/refresh2.svg'
import pageRight from 'assets/images/svg/common/pageRight.svg'
import hoverPageRight from 'assets/images/svg/common/hoverPageRight.svg'
import { useState } from 'react'
import SureModal from './SureModal'
import NFTsSelectedModal from './NFTsSelectedModal'

const AvailableNFTsBox = styled(Box)`
  width: 1012px;
  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 33.61%);
  border-radius: 12px;
  padding: 24px 0 0 24px;
  margin-top: 24px;
  margin-bottom: 42px;
`
const AvailableNFTsStyleBox = styled(Box)`
  .opacity {
    opacity: '0.7';
  }
  .MuiOutlinedInput-notchedOutline {
    border: 0px;
  }
  .MuiOutlinedInput-root .MuiInputBase-input {
    height: 22px;
    width: 70px;
    padding: 0px;
    top: 0px;
  }
  .MuiOutlinedInput-root {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    color: #4e4b66;
  }
  .MuiCheckbox-root {
    color: #4e4b66;
  }
`
const RightPageBox = styled(Box)`
  position: absolute;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: #ffffff;
  border: 1px solid #f7f7fc;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 100px;
  background-image: url(${pageRight});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  cursor: pointer;
  :hover {
    background-color: rgba(78, 75, 102, 1);
    background-image: url(${hoverPageRight});
    background-position: 50% 50%;
    background-repeat: no-repeat;
    box-shadow: 0px 10px 20px rgba(78, 75, 102, 0.15);
  }
`
const DepositedNFTsBox = styled(Box)`
  width: 1012px;
  background: linear-gradient(180deg, rgba(217, 219, 233, 0.3) 17.89%, rgba(217, 219, 233, 0) 33.61%);
  border-radius: 12px;
  padding: 24px 0 0 24px;
  margin-bottom: 42px;
`
const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ButtonBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
`
const BgBox = styled(Box)`
  width: 305px;
  height: 144px;
  border-radius: 10px;
  margin-right: 24px;
  margin-bottom: 24px;
  background: rgba(217, 219, 233, 0.1);
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
  const [check1, setCheck1] = useState<number>(1)
  const [check2, setCheck2] = useState<number>(1)
  const [list] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [open, handle] = useState<boolean>(false)
  const [open1, handle1] = useState<boolean>(false)
  return (
    <AvailableNFTsStyleBox>
      <AvailableNFTsBox sx={{ position: 'relative' }}>
        <RightPageBox
          sx={{ left: '-48px', top: '50%', transform: 'rotate(180deg)' }}
          className={check2 === 1 ? 'none' : ''}
          onClick={() => {
            if (check2 > 1) {
              // const count = check2 - 1
              setCheck2(() => {
                return check2 - 1
              })
            }
          }}
        ></RightPageBox>
        <RightPageBox
          className={check === 4 ? 'none' : ''}
          sx={{ right: '-48px', top: '50%' }}
          onClick={() => {
            if (check2 < 4) {
              setCheck2(() => {
                return check2 + 1
              })
            }
          }}
        ></RightPageBox>
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
                className={check1 === 1 ? '' : 'opacity'}
                variant="contained"
                onClick={() => {
                  if (1 === check) {
                    if (check1 === 1) {
                      setCheck(2)
                    }
                  }
                }}
              >
                Deposit
              </Button>
            ) : (
              <Box>
                <FlexBox width={'268px'}>
                  <ButtonBox
                    sx={{ padding: '15px', background: '#eff0f7', width: '44px', height: '44px', borderRadius: '100%' }}
                    onClick={() => {
                      handle(true)
                    }}
                  >
                    <img width={'14px'} height={'14px'} src={XIcon} alt="" />
                  </ButtonBox>
                  <ButtonBox
                    sx={{ background: '#eff0f7', width: '44px', height: '44px', borderRadius: '100%' }}
                    onClick={() => {
                      if (2 === check) {
                        setCheck(1)
                      }
                    }}
                  >
                    <img src={RefreshIcon} alt="" />
                  </ButtonBox>
                  <ButtonBox
                    sx={{
                      padding: '13px 22px',
                      width: '148px',
                      height: '48px',
                      borderRadius: '24px',
                      background: '#eff0f7',
                    }}
                    onClick={() => {
                      handle1(true)
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
            {list.map((list) => (
              <BgBox key={`${list} NFTs`}>
                <ImgBox className={check1 === 1 ? '' : 'opacity'}>
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
            ))}
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
          </Box>
        )}
        <Box sx={{ height: '6px', display: 'flex', justifyContent: 'center', mt: '12px' }}>
          <Box
            width={check2 === 1 ? '24px' : '6px'}
            sx={{ height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
          <Box
            width={check2 === 2 ? '24px' : '6px'}
            sx={{ height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
          <Box
            width={check2 === 3 ? '24px' : '6px'}
            sx={{ height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
          <Box
            width={check2 === 4 ? '24px' : '6px'}
            sx={{ height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
        </Box>
      </AvailableNFTsBox>
      <DepositedNFTsBox sx={{ position: 'relative' }}>
        <RightPageBox sx={{ left: '-48px', top: '50%', transform: 'rotate(180deg)' }}></RightPageBox>
        <RightPageBox sx={{ right: '-48px', top: '50%' }}></RightPageBox>
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
          {check1 === 1 ? (
            <Box mr="24px">
              {check === 1 ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (1 === check) {
                      setCheck1(2)
                    }
                  }}
                >
                  Withdraw
                </Button>
              ) : (
                <Button
                  sx={{ opacity: '0.7' }}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    if (1 === check) {
                      setCheck1(2)
                    }
                  }}
                >
                  Withdraw
                </Button>
              )}
            </Box>
          ) : (
            <Box mr={'24px'}>
              <FlexBox width={'268px'}>
                <ButtonBox
                  sx={{ padding: '15px', width: '44px', height: '44px', background: '#E1E3EE', borderRadius: '100%' }}
                  onClick={() => {
                    handle(true)
                  }}
                >
                  <img width={'14px'} height={'14px'} src={XIcon} alt="" />
                </ButtonBox>
                <ButtonBox sx={{ background: '#E1E3EE', borderRadius: '100%' }}>
                  <img src={RefreshIcon2} alt="" />
                </ButtonBox>
                <ButtonBox
                  sx={{
                    padding: '13px 22px',
                    height: '48px',
                    borderRadius: '24px',
                    background: '#E1E3EE',
                  }}
                  onClick={() => {
                    setCheck1(1)
                  }}
                >
                  <Typography variant="body1" component="h1" fontWeight="700" color="#14142A">
                    Withdraw 6 NFTs
                  </Typography>
                </ButtonBox>
              </FlexBox>
            </Box>
          )}
        </FlexBox>
        {check1 === 1 ? (
          <Box
            sx={{
              display: ' flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              mt: '36px',
              justifyContent: 'flex-start',
            }}
          >
            {list.map((item) => (
              <BgBox key={`${item} NFTs`}>
                <ImgBox className={check === 1 ? '' : 'opacity'}>
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
            ))}
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
          </Box>
        )}
        <Box sx={{ height: '6px', display: 'flex', justifyContent: 'center', mt: '12px' }}>
          <Box
            sx={{ width: '6px', height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
          <Box
            sx={{ width: '24px', height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
          <Box
            sx={{ width: '6px', height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
          <Box
            sx={{ width: '6px', height: '6px', background: '#D9DBE9', opacity: '0.7', borderRadius: '3px', ml: '8px' }}
          ></Box>
        </Box>
      </DepositedNFTsBox>
      <SureModal open={open} handle={handle}></SureModal>
      <NFTsSelectedModal open1={open1} handle1={handle1}></NFTsSelectedModal>
    </AvailableNFTsStyleBox>
  )
}
