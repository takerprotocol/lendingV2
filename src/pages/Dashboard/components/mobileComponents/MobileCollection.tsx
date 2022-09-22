import { Box, Typography, styled } from '@mui/material'
import mobileNft from 'assets/images/svg/dashboard/mobileNft.svg'
import mobileBlackEthLogo2 from 'assets/images/svg/dashboard/mobileBlackEthLogo2.svg'
import mobileCollateralRight from 'assets/images/svg/dashboard/mobileCollateralRight.svg'
import mobileCollateralRight2 from 'assets/images/svg/dashboard/mobileCollateralRight2.svg'
import mobileCollateralDown from 'assets/images/svg/dashboard/mobileCollateralDown.svg'
import mobileCollateralUp from 'assets/images/svg/dashboard/mobileCollateralUp.svg'
import { CenterBox, FlexBox, SpaceBetweenBox } from 'styleds'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Collection = styled(Box)`
  background: linear-gradient(180deg, #9574f5 0%, #857dfc 100%);
  width: 100%;
  margin-top: 1rem;
  padding: 1.3125rem 1rem 2rem 1rem;
  border-radius: 12px;
`
const NftBox = styled(Box)`
  background: #ffffff;
  width: 100%;
  padding: 1rem;
  margin-bottom: -1rem;
  border-radius: 0.5rem;
  position: relative;
  z-index: 5;
`
const LabelBox = styled(Box)`
  padding: 0.3125rem 0.625rem 0.4375rem 0.625rem;
  background: linear-gradient(180deg, #ff8a48 0%, #fa785c 100%);
  box-shadow: 0px 0.25rem 0.5rem rgba(252, 128, 84, 0.2);
  border-radius: 0.9375rem 0.125rem 0.125rem 0.9375rem;
  position: absolute;
  top: 1rem;
  right: -0.25rem;
`
const CardBox = styled(Box)`
  width: 100%;
  margin-top: 1rem;
`
const MyDepositedBox = styled(Box)`
  width: 100%;
  background: #e6e5fa;
  border-radius: 6px;
  margin: 0.5rem 0 0.5rem 0;
  padding: 0.5rem 1rem;
`
const NftFooterBox = styled(Box)`
  width: 100%;
  padding: 1.5rem 1rem 0.5rem 1rem;
  background: #eeedff;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(106, 99, 223, 0.5);
`
export default function MobileCollection() {
  const [type, setType] = useState<boolean>(false)
  const navigate = useNavigate()
  return (
    <Collection>
      <Typography variant="subtitle2" fontWeight="700" color="#ffffff">
        Collection Supported
      </Typography>
      <Typography mt="0.125rem" variant="body2" component="span" fontWeight="600" color="#C8B9FA">
        Deposit NFTs to earn{' '}
        <Typography variant="body2" component="span" fontWeight="700" color="#ffffff">
          +20{' '}
        </Typography>
        borrow reward
      </Typography>
      <CardBox>
        <NftBox>
          <LabelBox display={type ? '' : 'none'}>
            <Typography variant="body1" color="#ffffff" lineHeight="150%" fontWeight="700">
              Can Deposit
            </Typography>
          </LabelBox>
          <FlexBox>
            <img src={mobileNft} alt="" />
            <Box ml="0.5rem">
              <Typography variant="body1" lineHeight="1.125rem" fontWeight="700">
                CRYPTOPUNKS
              </Typography>
              <FlexBox>
                <Typography variant="body2" lineHeight="1.125rem" color="#A0A3BD">
                  60 Users
                </Typography>
                <Typography ml={'0.5rem'} variant="body2" lineHeight="1.125rem" color="#A0A3BD">
                  230 NFTs
                </Typography>
              </FlexBox>
            </Box>
          </FlexBox>
          <SpaceBetweenBox mt="1rem">
            <FlexBox>
              <Box>
                <Typography variant="body2" color="#A0A3BD">
                  Floor Price
                </Typography>
                <FlexBox mt="0.125rem">
                  <img src={mobileBlackEthLogo2} alt="" />
                  <Typography ml="0.3125rem" variant="body1" fontWeight="700" lineHeight="1.25rem">
                    96.90
                  </Typography>
                </FlexBox>
              </Box>
              <Box ml="1.94rem">
                <Typography variant="body2" color="#A0A3BD">
                  Loan to value
                </Typography>
                <FlexBox mt="0.125rem">
                  <img src={mobileBlackEthLogo2} alt="" />
                  <Typography ml="0.3125rem" variant="body1" fontWeight="700" lineHeight="1.25rem">
                    96.90
                  </Typography>
                  <Typography ml="0.25rem" variant="body1" color="#A0A3BD" fontWeight="700" lineHeight="1.25rem">
                    70%
                  </Typography>
                </FlexBox>
              </Box>
            </FlexBox>
            <img
              src={type ? mobileCollateralRight2 : mobileCollateralRight}
              alt=""
              onClick={() => {
                navigate('/deposit')
              }}
            />
          </SpaceBetweenBox>
        </NftBox>
        <NftFooterBox>
          {type && (
            <Box>
              <SpaceBetweenBox marginY="0.5rem">
                <Typography variant="body2" color="#A0A3BD">
                  Liquidation Threshold
                </Typography>
                <Typography variant="body2" fontWeight="600">
                  70%
                </Typography>
              </SpaceBetweenBox>
              <SpaceBetweenBox>
                <Typography variant="body2" color="#A0A3BD">
                  Liquidation Profit
                </Typography>
                <Typography variant="body2" fontWeight="600">
                  20%
                </Typography>
              </SpaceBetweenBox>
              <MyDepositedBox>
                <SpaceBetweenBox>
                  <Box>
                    <Typography variant="body1" color="#7646FF" fontWeight="700">
                      20 NFTs
                    </Typography>
                    <Typography variant="body2" color="#A0A3BD">
                      My Deposited
                    </Typography>
                  </Box>
                  <Box mr="2.75rem">
                    <Typography variant="body1" color="#7646FF" fontWeight="700">
                      10 NFTs
                    </Typography>
                    <Typography variant="body2" color="#A0A3BD">
                      I Can Deposit
                    </Typography>
                  </Box>
                </SpaceBetweenBox>
              </MyDepositedBox>
            </Box>
          )}
          <CenterBox
            onClick={() => {
              setType(!type)
            }}
          >
            <Typography variant="body2" color="#A7A5D1">
              Show Details
            </Typography>
            <img src={type ? mobileCollateralUp : mobileCollateralDown} alt="" />
          </CenterBox>
        </NftFooterBox>
      </CardBox>
    </Collection>
  )
}
