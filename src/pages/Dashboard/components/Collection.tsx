import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import NFT1 from 'assets/images/svg/dashboard/NFT1.svg'
import ButtonUp from 'assets/images/svg/dashboard/button-up.svg'
import ButtonDown from 'assets/images/svg/dashboard/button-down.svg'
import minMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import { useState } from 'react'
import { useAddress, useWalletModalToggle } from 'state/application/hooks'
import { useNavigate } from 'react-router-dom'
import CollectionSkeleton from './DashboardSkeleton/CollectionSkeleton'
const CollectionBox = styled(Box)`
  width: 1160px;
  border-radius: 12px;
  &.open {
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
    border-radius: 12px;
  }
  .none {
    display: none;
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
const TitleTypography = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #a0a3bd;
`
const CollectionUpBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
interface CollectionType {
  type: number
  loading: boolean
}
export default function Collection({ type, loading }: CollectionType) {
  const [check, setCheck] = useState<number | null>(1)
  const [list] = useState([1, 2])
  const address = useAddress()
  const toggleModal = useWalletModalToggle()
  const navigate = useNavigate()
  return (
    <Box mt="24px">
      {loading ? (
        <CollectionSkeleton />
      ) : (
        <>
          <CollectionHeader>
            <CollectionFlexBox mb="24px">
              <Box sx={{ width: '272px' }}>
                <TitleTypography>Collection</TitleTypography>
              </Box>
              <Box sx={{ width: '124px' }}>
                <TitleTypography>Floor Price</TitleTypography>
              </Box>
              <Box sx={{ width: '148px' }}>
                <TitleTypography> Loan to value </TitleTypography>
              </Box>
              <Box sx={{ width: '246px' }}>
                <TitleTypography>Total Value Locked</TitleTypography>
              </Box>
              <Box sx={{ width: '148px' }}>
                <TitleTypography>Active user</TitleTypography>
              </Box>
              <Box sx={{ width: '174px' }}>
                <TitleTypography>Token reward</TitleTypography>
              </Box>
            </CollectionFlexBox>
          </CollectionHeader>
          {list.map((el) => (
            <CollectionBox key={`${el}collection`} className={el === check ? 'open' : ''}>
              <Box padding="28px 24px 24px 24px">
                <CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '272px' }}>
                    <img src={NFT1} alt="" />
                    <Typography ml="10px" component="span" variant="body1" fontWeight="700">
                      Bored Ape Yacht Club
                    </Typography>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '124px' }}>
                    <img src={minMyCollateralIcon} alt="" />
                    <Typography ml="6px" component="span" variant="body1" fontWeight="700">
                      96.90
                    </Typography>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '148px' }}>
                    <img src={minMyCollateralIcon} alt="" />
                    <Typography ml="6px" mr="8px" component="span" variant="body1" fontWeight="700">
                      67.83
                    </Typography>
                    <TitleTypography>70%</TitleTypography>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '246px' }}>
                    <img src={minMyCollateralIcon} alt="" />
                    <Typography ml="6px" mr="8px" component="span" variant="body1" fontWeight="700">
                      10,287.00
                    </Typography>
                    <TitleTypography>21,001 NFTs</TitleTypography>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '148px' }}>
                    <Typography component="span" variant="body1" fontWeight="700">
                      60
                    </Typography>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '126px' }}>
                    <Typography component="span" variant="subtitle2" fontWeight="700" color="#4BC8B1">
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
                        <Typography component="p" variant="subtitle1">
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
                        <Typography component="p" variant="subtitle1">
                          70%
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                          Liquidation Threshold
                        </Typography>
                      </Box>
                      <Box width="171px">
                        <Typography component="p" variant="subtitle1">
                          70%
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                          Liquidation Profit
                        </Typography>
                      </Box>
                      <Box className={address ? '' : 'none'} height="36px" width="0px" border="1px solid #EFF0F6"></Box>
                      <Box className={address ? '' : 'none'} ml="50px" width="148px">
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
                      <Box className={address ? '' : 'none'} width="130px">
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
                    </CollectionFlexBox>
                    {address ? (
                      <Box mt="48px">
                        {type === 1 ? (
                          <Button onClick={() => navigate('/deposit')} variant="contained">
                            Deposit
                          </Button>
                        ) : (
                          <Button variant="contained" color="success">
                            Deposit
                          </Button>
                        )}
                      </Box>
                    ) : (
                      <Box mt="48px">
                        {type === 1 ? (
                          <Button
                            variant="contained"
                            onClick={() => {
                              toggleModal()
                            }}
                          >
                            Connect Wallet
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              toggleModal()
                            }}
                          >
                            Connect Wallet
                          </Button>
                        )}
                      </Box>
                    )}
                  </CollectionUpBox>
                )}
              </Box>
            </CollectionBox>
          ))}
        </>
      )}
    </Box>
  )
}
