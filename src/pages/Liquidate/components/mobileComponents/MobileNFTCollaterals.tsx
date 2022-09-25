import { Box, Checkbox, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import mobileNFT from 'assets/images/svg/liquidate/mobile-NFT.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds'

const MobileNFTCollateralsBox = styled(Box)`
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin: 0 1rem;
`
const CardBox = styled(Box)`
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem 1rem 0.875rem 0.8125rem;
  &.isCheck {
    background: #f7f7fc;
  }
`
const ImgBox = styled(`img`)`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  background: #a31;
  border-radius: 0.25rem;
`
const RadiusImg = styled(`img`)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.375
  border-radius: 100%;
`
const InputBox = styled(FlexBox)`
  width: 7.9375rem;
  height: 1.875rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.75rem;
  border-radius: 6px;
  background: #eff0f6;
`
export default function MobileNFTCollaterals() {
  const [checkboxType, setCheckboxType] = useState<Array<string>>([])
  return (
    <MobileNFTCollateralsBox>
      <Typography variant="subtitle2">37 NFT Collaterals</Typography>
      {[1, 2, 3, 4, 5, 6].map((el: any, index: number) => (
        <CardBox className={checkboxType.includes(el) ? 'isCheck' : ' '} key={index}>
          <FlexBox>
            <Checkbox
              checked={checkboxType.includes(el)}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.checked) {
                  setCheckboxType([...checkboxType, el])
                } else {
                  setCheckboxType(checkboxType.filter((cel) => cel !== el))
                }
              }}
            ></Checkbox>
            <Box>
              <FlexBox>
                <ImgBox></ImgBox>
                <Box>
                  <FlexBox>
                    <RadiusImg src={mobileNFT} alt="" />
                    <Typography ml="0.375rem" fontWeight="700" variant="body2">
                      Cryptopunks
                    </Typography>
                  </FlexBox>
                  <Typography mt="0.25rem" fontWeight="700" variant="body1">
                    CRYPTOPUNK #4728
                  </Typography>
                </Box>
              </FlexBox>
              <SpaceBetweenBox mt="1rem">
                <InputBox>
                  <TextField variant="outlined" />
                  <Typography ml="6px" component="span" variant="body1" color="#A0A3BD">
                    NTFs
                  </Typography>
                </InputBox>
                <FlexBox ml="3.5625rem">
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
                  <Typography ml="0.125rem" fontWeight="700" variant="subtitle2" color="#7646FF">
                    7.2176
                  </Typography>
                </FlexBox>
              </SpaceBetweenBox>
            </Box>
          </FlexBox>
        </CardBox>
      ))}
    </MobileNFTCollateralsBox>
  )
}
