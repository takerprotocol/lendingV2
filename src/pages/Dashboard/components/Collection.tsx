import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import NFT1 from 'assets/images/svg/dashboard/NFT1.svg'
import ButtonUp from 'assets/images/svg/dashboard/button-up.svg'
import ButtonDown from 'assets/images/svg/dashboard/button-down.svg'
import minMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import { useState } from 'react'
const CollectionBox = styled(Box)`
  width: 1160px;
  border-radius: 12px;
  &.open {
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
    border-radius: 12px;
  }
`
const CollectionHeader = styled(Box)`
  padding: 28px 24px 24px 24px;
  background: linear-gradient(180deg, #eff0f6 0%, rgba(239, 240, 246, 0) 79.43%);
  border-radius: 12px;
`
const CollectionFlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  img {
    cursor: pointer;
  }
`
const CollectionUpBox = styled(Box)``
export default function Collection() {
  const [check, setCheck] = useState<number | null>(1)
  const [list] = useState([1, 2])
  return (
    <Box mt="24px">
      <CollectionHeader>
        <CollectionFlexBox mb="24px">
          <Box sx={{ width: '272px' }}>
            <Typography component="span" variant="body1" color="#A0A3BD">
              Collection
            </Typography>
          </Box>
          <Box sx={{ width: '124px' }}>
            <Typography component="span" variant="body1" color="#A0A3BD">
              Floor Price{' '}
            </Typography>
          </Box>
          <Box sx={{ width: '148px' }}>
            <Typography component="span" variant="body1" color="#A0A3BD">
              Loan to value{' '}
            </Typography>
          </Box>
          <Box sx={{ width: '246px' }}>
            <Typography component="span" variant="body1" color="#A0A3BD">
              Total Value Locked{' '}
            </Typography>
          </Box>
          <Box sx={{ width: '148px' }}>
            <Typography component="span" variant="body1" color="#A0A3BD">
              Active user
            </Typography>
          </Box>
          <Box sx={{ width: '174px' }}>
            <Typography component="span" variant="body1" color="#A0A3BD">
              Token reward
            </Typography>
          </Box>
        </CollectionFlexBox>
      </CollectionHeader>
      {list.map((el) => (
        <CollectionBox key={`${el}collection`} className={el === check ? 'open' : ''}>
          <Box padding="28px 24px 24px 24px">
            <CollectionFlexBox>
              <CollectionFlexBox sx={{ width: '272px' }}>
                <img src={NFT1} alt="" />
                <Typography ml="10px" component="span" variant="body1" fontWeight="700" color="#14142A">
                  Bored Ape Yacht Club
                </Typography>
              </CollectionFlexBox>
              <CollectionFlexBox sx={{ width: '124px' }}>
                <img src={minMyCollateralIcon} alt="" />
                <Typography ml="6px" component="span" variant="body1" fontWeight="700" color="#14142A">
                  96.90
                </Typography>
              </CollectionFlexBox>
              <CollectionFlexBox sx={{ width: '148px' }}>
                <img src={minMyCollateralIcon} alt="" />
                <Typography ml="6px" mr="8px" component="span" variant="body1" fontWeight="700" color="#14142A">
                  67.83
                </Typography>
                <Typography component="span" variant="body1" color="#A0A3BD">
                  70%
                </Typography>
              </CollectionFlexBox>
              <CollectionFlexBox sx={{ width: '246px' }}>
                <img src={minMyCollateralIcon} alt="" />
                <Typography ml="6px" mr="8px" component="span" variant="body1" fontWeight="700" color="#14142A">
                  10,287.00
                </Typography>
                <Typography component="span" variant="body1" color="#A0A3BD">
                  21,001 NFTs
                </Typography>
              </CollectionFlexBox>
              <CollectionFlexBox sx={{ width: '148px' }}>
                <Typography component="span" variant="body1" fontWeight="700" color="#14142A">
                  60
                </Typography>
              </CollectionFlexBox>
              <CollectionFlexBox sx={{ width: '126px' }}>
                <Typography component="span" variant="body1" fontWeight="700" color="#4BC8B1">
                  30%
                </Typography>
              </CollectionFlexBox>
              <CollectionFlexBox sx={{ width: '48px' }}>
                <img
                  src={el === check ? ButtonUp : ButtonDown}
                  alt=""
                  onClick={() => {
                    if (el === check) {
                      setCheck(null)
                    } else {
                      setCheck(el)
                    }
                  }}
                />
              </CollectionFlexBox>
            </CollectionFlexBox>
            {el === check && (
              <CollectionUpBox>
                <CollectionFlexBox m="48px 0 0 24px">
                  <Box width="125px">
                    <Typography component="p" variant="subtitle1" color="#14142A">
                      10%
                    </Typography>
                    <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                      Net Borrow APY
                    </Typography>
                  </Box>
                  <CollectionFlexBox width="173px">
                    <Box>
                      <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                        Borrow APY
                      </Typography>
                      <Typography mt="6px" component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                        Token Reward
                      </Typography>
                    </Box>
                    <Box ml="8px">
                      <Typography component="p" variant="body1" fontWeight="600" color="#6E7191">
                        -10%
                      </Typography>
                      <Typography mt="6px" component="p" variant="body1" fontWeight="700" color="#4BC8B1">
                        20%
                      </Typography>
                    </Box>
                  </CollectionFlexBox>
                  <Box width="172px">
                    <Typography component="p" variant="subtitle1" color="#14142A">
                      70%
                    </Typography>
                    <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                      Liquidation Threshold
                    </Typography>
                  </Box>
                  <Box width="171px">
                    <Typography component="p" variant="subtitle1" color="#14142A">
                      70%
                    </Typography>
                    <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                      Liquidation Profit
                    </Typography>
                  </Box>
                  <Box height="36px" border="1px solid #EFF0F6"></Box>
                  <Box ml="50px" width="148px">
                    <Typography component="span" variant="subtitle1" fontWeight="700" color="#7646FF">
                      20{' '}
                    </Typography>
                    <Typography component="span" variant="body1" fontWeight="700" color="#7646FF">
                      NTFs
                    </Typography>
                    <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                      My Deposited
                    </Typography>
                  </Box>
                  <Box width="130px">
                    <Typography component="span" variant="subtitle1" fontWeight="700" color="#7646FF">
                      10{' '}
                    </Typography>
                    <Typography component="span" variant="body1" fontWeight="700" color="#7646FF">
                      NTFs
                    </Typography>
                    <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                      My Balance
                    </Typography>
                  </Box>
                  <Box>
                    <Button variant="contained">Borrow</Button>
                  </Box>
                </CollectionFlexBox>
              </CollectionUpBox>
            )}
          </Box>
        </CollectionBox>
      ))}
    </Box>
  )
}
