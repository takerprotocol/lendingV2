import { Box, Button, Checkbox, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, FlexBox, FlexEndBox } from 'styleds'
import mobileNFT from 'assets/images/svg/liquidate/mobile-NFT.svg'
import { div } from 'utils'
import { useState } from 'react'

const MobileFooterBox = styled(Box)`
  position: fixed;
  bottom: 0rem;
  width: 100%;
  left: 0rem;
  background: #262338;
  padding: 1rem 1rem 2.25rem 1rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  box-shadow: 0rem 0.625rem 1.25rem rgba(38, 35, 56, 0.1);
  .MuiSvgIcon-root {
    display: none;
  }
  .MuiCheckbox-root {
    border: 1px solid #4e4b66;
    filter: drop-shadow(0px 4px 8px rgba(118, 70, 255, 0.1));
    border-radius: 4px;
  }
  .Mui-checked {
    width: 1.25rem;
    height: 1.25rem;
    .MuiSvgIcon-root {
      display: block;
      color: #7646ff;
    }
    &.MuiCheckbox-root {
      opacity: 1;
      background: #fff;
      border-radius: 4px;
    }
  }
`
const RadiusImg = styled(`img`)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.375
  border-radius: 100%;
`
const ImgBox = styled(`img`)`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  background: #a31;
  border-radius: 0.25rem;
`
export const EllipsisTypography = styled(Typography)`
  width: 8.6875rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
`
export const PriceTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  color: #a0a3bd;
`
export const PriceValueTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  /* identical to box height, or 26px */
  display: flex;
  align-items: center;
  text-align: right;
  /* Pure White */
  margin-left: 0.125rem;
  color: #ffffff;
`
export const ThroughTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  margin-right: 0.5625rem;
  /* or 22px */
  text-align: right;
  text-decoration-line: line-through;
  /* Cool Gray 400 */
  color: #a0a3bd;
`
const ListBox = styled(Box)`
  max-height: 12.5rem;
  background: #14142a;
  overflow: scroll;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
`
const PriceBox = styled(SpaceBetweenBox)`
  padding: 0 1rem 1rem 1rem;
`
const LiquidateButton = styled(Button)`
  background: linear-gradient(82.51deg, #884bff 0%, #6865ff 42.39%, #4785ff 74.2%, #2fc1ff 100%) !important;
  border-radius: 6px !important;
`
export default function MobileFooter() {
  const list: Array<number> = [1, 2, 3]
  const [details, setDetails] = useState<boolean>(false)
  return (
    <MobileFooterBox>
      {details && (
        <>
          <SpaceBetweenBox>
            <Typography variant="subtitle2" color="#EFF0F6">
              Price Details
            </Typography>
            <svg
              width="32"
              onClick={() => setDetails(false)}
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.1943 10.4171C23.6393 9.97216 23.6393 9.2507 23.1943 8.80571C22.7493 8.36073 22.0278 8.36073 21.5829 8.80571L16 14.3886L10.4171 8.80571C9.97216 8.36073 9.2507 8.36073 8.80571 8.80571C8.36073 9.2507 8.36073 9.97216 8.80571 10.4171L14.3886 16L8.80572 21.5829C8.36073 22.0278 8.36073 22.7493 8.80571 23.1943C9.2507 23.6393 9.97216 23.6393 10.4171 23.1943L16 17.6114L21.5829 23.1943C22.0278 23.6393 22.7493 23.6393 23.1943 23.1943C23.6393 22.7493 23.6393 22.0278 23.1943 21.5829L17.6114 16L23.1943 10.4171Z"
                fill="#A0A3BD"
              />
            </svg>
          </SpaceBetweenBox>
          <SpaceBetweenBox my="1rem">
            <Typography variant="subtitle2" color="#EFF0F6">
              18 NFT Collaterals
            </Typography>
            <Typography variant="body1" fontWeight="600" color="#6E7191">
              4 Collections
            </Typography>
          </SpaceBetweenBox>
          <ListBox>
            {list.map((el: any) => (
              <FlexBox mb={list.length === +div(el, 1) ? '0rem' : '1.25rem'} key={el}>
                <Checkbox color="primary" />
                <SpaceBetweenBox ml="1rem" width="100%">
                  <FlexBox>
                    <ImgBox></ImgBox>
                    <Box>
                      <FlexBox>
                        <RadiusImg src={mobileNFT} alt="" />
                        <Typography ml="0.375rem" color="#A0A3BD" fontWeight="500" variant="body2">
                          Cryptopunks
                        </Typography>
                      </FlexBox>
                      <EllipsisTypography mt="0.25rem" color="#D9DBE9" fontWeight="500" variant="body1">
                        CRYPTOPUNK #4728 1
                      </EllipsisTypography>
                    </Box>
                  </FlexBox>
                  <Box>
                    <FlexEndBox>
                      <Typography color="#A0A3BD" fontWeight="500" variant="body2">
                        x 1
                      </Typography>
                    </FlexEndBox>
                    <FlexBox>
                      <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                          <path
                            d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                            stroke="#D9DBE9"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path d="M4 11.5L8.5 14L13 11.5" stroke="#D9DBE9" strokeLinejoin="round" />
                        </g>
                      </svg>

                      <Typography ml="0.125rem" mt="0.0313rem" color="#D9DBE9" fontWeight="500" variant="body1">
                        7.2176
                      </Typography>
                    </FlexBox>
                  </Box>
                </SpaceBetweenBox>
              </FlexBox>
            ))}
          </ListBox>
          <PriceBox>
            <PriceTypography>NFT Price</PriceTypography>
            <FlexBox>
              <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path
                    d="M4 12.2121L8.5 5L13 12.2121L8.5 19L4 12.2121Z"
                    stroke="#D9DBE9"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M4 12L8.5 14.5L13 12" stroke="#D9DBE9" strokeLinejoin="round" />
                </g>
              </svg>
              <PriceValueTypography>36.2176</PriceValueTypography>
            </FlexBox>
          </PriceBox>
          <PriceBox>
            <PriceTypography>ETH Price</PriceTypography>
            <FlexBox>
              <ThroughTypography>16.27</ThroughTypography>
              <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path
                    d="M4 12.2121L8.5 5L13 12.2121L8.5 19L4 12.2121Z"
                    stroke="#D9DBE9"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M4 12L8.5 14.5L13 12" stroke="#D9DBE9" strokeLinejoin="round" />
                </g>
              </svg>
              <PriceValueTypography>36.2176</PriceValueTypography>
            </FlexBox>
          </PriceBox>
          <PriceBox>
            <PriceTypography>Total Price</PriceTypography>
            <FlexBox>
              <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path
                    d="M4 12.2121L8.5 5L13 12.2121L8.5 19L4 12.2121Z"
                    stroke="#D9DBE9"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M4 12L8.5 14.5L13 12" stroke="#D9DBE9" strokeLinejoin="round" />
                </g>
              </svg>
              <PriceValueTypography>36.2176</PriceValueTypography>
            </FlexBox>
          </PriceBox>
        </>
      )}
      <SpaceBetweenBox>
        <Box>
          <Typography mb="0.5rem" color="#EFF0F6" lineHeight="0.75rem" variant="body2">
            Total price
          </Typography>
          <FlexBox>
            <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                stroke="#D9DBE9"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M4 11.5L8.5 14L13 11.5" stroke="#D9DBE9" strokeLinejoin="round" />
            </svg>

            <Typography ml="0.125rem" color="#FFFFFF" fontWeight="700" lineHeight="1.375rem" variant="subtitle1">
              48.6176
            </Typography>
            <Typography
              onClick={() => setDetails(!details)}
              ml="0.5rem"
              color="#A87EFF"
              lineHeight="0.75rem"
              variant="body2"
            >
              Details
              {!details ? (
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4.875L8 11.5" stroke="#A87EFF" strokeLinecap="round" />
                  <path d="M11 7.49973L8 4.5L5 7.5" stroke="#A87EFF" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 11.125L8 4.5" stroke="#A87EFF" strokeLinecap="round" />
                  <path d="M11 8.50027L8 11.5L5 8.5" stroke="#A87EFF" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </Typography>
          </FlexBox>
        </Box>
        <Box>
          <LiquidateButton variant="contained" color="primary">
            LIQUIDATE
          </LiquidateButton>
        </Box>
      </SpaceBetweenBox>
    </MobileFooterBox>
  )
}
