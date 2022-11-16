import { Box, styled, Typography, Checkbox } from '@mui/material'
import { useState } from 'react'
import mobileNFT from 'assets/images/svg/liquidate/mobile-NFT.svg'
// import nftListCheckbox from 'assets/images/svg/liquidate/nftListCheckbox.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import MobileNFTCollateralsSkeleton from '../mobileLiquidateSkeleton/MobileNFTCollateralsSkeleton'

const MobileNFTCollateralsBox = styled(Box)`
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin: 0 1rem;
  .MuiSvgIcon-root {
    display: none;
  }
  .MuiCheckbox-root {
    opacity: 0.5;
    border: 1px solid #a0a3bd;
    border-radius: 4px;
  }
  .isCheck {
    .MuiSvgIcon-root {
      display: block;
    }
    .MuiCheckbox-root {
      opacity: 1;
      border: 0px solid #a0a3bd;
      border-radius: 4px;
    }
  }
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
  height: 1.875rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.75rem;
  background: #f7f7fc;
  border-radius: 6px;
`
const StyleCheckbox = styled(Checkbox)`
  width: 1.25rem;
  height: 1.25rem;
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
interface MobileNFTCollateralsProps {
  loading: boolean
}
export default function MobileNFTCollaterals({ loading }: MobileNFTCollateralsProps) {
  const [checkboxType, setCheckboxType] = useState<Array<string>>([])
  const [NftType] = useState<string>('ERC721')
  return (
    <MobileNFTCollateralsBox>
      {loading ? (
        <MobileNFTCollateralsSkeleton></MobileNFTCollateralsSkeleton>
      ) : (
        <>
          <Typography variant="subtitle2">37 NFT Collaterals</Typography>
          {[1, 2, 3, 4, 5, 6].map((el: any, index: number) => (
            <CardBox className={checkboxType.includes(el) ? 'isCheck' : ' '} key={index}>
              <FlexBox>
                <StyleCheckbox
                  checked={checkboxType.includes(el)}
                  // checkedIcon={<img src={nftListCheckbox} alt="" />}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      setCheckboxType([...checkboxType, el])
                    } else {
                      setCheckboxType(checkboxType.filter((cel) => cel !== el))
                    }
                  }}
                ></StyleCheckbox>
                <Box ml="0.8125rem" width="100%">
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
                      <Typography my="0.25rem" variant="body1" color="#A0A3BD">
                        Floor Price
                      </Typography>
                    )}
                    <FlexBox>
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
        </>
      )}
    </MobileNFTCollateralsBox>
  )
}
