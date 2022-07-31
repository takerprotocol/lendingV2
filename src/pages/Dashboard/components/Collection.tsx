import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import NFT1 from 'assets/images/svg/dashboard/NFT1.svg'
import tokenUp from 'assets/images/svg/dashboard/tokenUp.svg'
import ButtonUp from 'assets/images/svg/dashboard/button-up.svg'
import ButtonDown from 'assets/images/svg/dashboard/button-down.svg'
import minMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import { useState, useEffect, useCallback } from 'react'
import { SpaceBetweenBox, FlexBox } from 'styleds'
import { useAddress } from 'state/user/hooks'
import { useWalletModalToggle } from 'state/application/hooks'
import { useNavigate } from 'react-router-dom'
import { LendingPool } from 'apollo/queries'
import { getClient } from 'apollo/client'
import { SupportedChainId } from 'constants/chains'
import CollectionSkeleton from './DashboardSkeleton/CollectionSkeleton'
import { div } from 'utils'

const CollectionBox = styled(Box)`
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
const LiquidationBox = styled(Box)`
  display: flex;
  align-items: center;
  width: 568px;
  height: 50px;
  background: #f7f7fc;
  opacity: 0.7;
  border-radius: 6px;
  margin-right: 108px;
`
const TokenUpBox = styled(Box)`
  width: 35px;
  height: 35px;
`
interface CollectionType {
  type: number
  loading: boolean
}
export default function Collection({ type, loading }: CollectionType) {
  const [check, setCheck] = useState<number | null>(1)
  const [dataType] = useState<boolean>(true) //有没有数据
  const [collection, setCollection] = useState([])
  const address = useAddress()
  const toggleModal = useWalletModalToggle()
  const client = getClient()[SupportedChainId.MAINNET]
  const navigate = useNavigate()

  const getCollection = useCallback(async () => {
    if (client && address) {
      const lendingPoolRes = await client.query({
        query: LendingPool('0x64d25dd7239e50c727ddaf67fc64ccdbe12548d3'),
      })
      if (lendingPoolRes.data && lendingPoolRes.data.lendingPool) {
        setCollection(lendingPoolRes.data.lendingPool.nfts)
        // const nftRes = await client.query({
        //   query: UserNftCollection(
        //     `${address}-${lendingPoolRes.data.lendingPool.nfts[0].id}-${lendingPoolRes.data.lendingPool.nfts[0].tNFT}`
        //   ),
        // })
        // console.log(nftRes)
      }
    }
  }, [client, address])

  useEffect(() => {
    getCollection()
  }, [getCollection])

  return (
    <Box ml="24px" width="1160px">
      {loading ? (
        <CollectionSkeleton />
      ) : (
        <>
          <SpaceBetweenBox>
            <Box m="36px 0px 16px 24px">
              <Typography mb="8px" variant="h4">
                Collection Supported
              </Typography>
              <Box display={dataType ? '' : 'none'}>
                <Typography mr="16px" fontWeight="500" component="span" color="#6E7191" variant="subtitle2">
                  30,291 NFT Collaterals
                </Typography>
                <Typography fontWeight="500" component="span" color="#6E7191" variant="subtitle2">
                  76,046.50 ETH Total value
                </Typography>
              </Box>
            </Box>
            <Box display={dataType ? '' : 'none'}>
              <FlexBox>
                <TokenUpBox mr="24px">
                  <img src={tokenUp} alt="" />
                </TokenUpBox>
                <Box>
                  <Typography mr="8px" component="span" fontSize="24px" lineHeight="38px" color="#4BC8B1" variant="h5">
                    +20%
                  </Typography>
                  <Typography component="span" variant="subtitle2" fontWeight="700">
                    Token Reward !
                  </Typography>
                  <Typography variant="body2" fontWeight="600" color="#A0A3BD">
                    Deposit NFTs to earn some borrow reward
                  </Typography>
                </Box>
              </FlexBox>
            </Box>
          </SpaceBetweenBox>
          <CollectionHeader>
            <CollectionFlexBox>
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
              <Box>
                <TitleTypography>Token reward</TitleTypography>
              </Box>
            </CollectionFlexBox>
          </CollectionHeader>
          {collection.map((el: any) => (
            <CollectionBox key={`${el.id}collection`} className={el === check ? 'open' : ''}>
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
                    <TitleTypography>{div(el.ltv, 100)}%</TitleTypography>
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
                    <CollectionFlexBox m="48px 0 0 0">
                      <LiquidationBox>
                        <Typography ml="58px" fontWeight="600" color="#A0A3BD" variant="body1">
                          Liquidation Threshold
                        </Typography>
                        <Typography ml="24px" variant="subtitle2">
                          {div(el.liqThreshold, 100)}%
                        </Typography>
                        <Typography ml="63px" fontWeight="600" color="#A0A3BD" variant="body1">
                          Liquidation Profit
                        </Typography>
                        <Typography ml="24px" variant="subtitle2">
                          20%
                        </Typography>
                      </LiquidationBox>
                      <Box className={address ? '' : 'none'} width="148px">
                        <Typography
                          component="span"
                          variant="subtitle1"
                          fontWeight="700"
                          color={dataType ? '#7646FF' : '#A0A3BD'}
                        >
                          20 NTFs
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                          My Deposited
                        </Typography>
                      </Box>
                      <Box className={address ? '' : 'none'} width="130px">
                        <Typography
                          component="span"
                          variant="subtitle1"
                          fontWeight="700"
                          color={dataType ? '#7646FF' : '#A0A3BD'}
                        >
                          10 NTFs
                        </Typography>
                        <Typography component="p" variant="body1" fontWeight="600" color="#A0A3BD">
                          My Balance
                        </Typography>
                      </Box>
                    </CollectionFlexBox>
                    {address ? (
                      <Box mt="48px">
                        <Button onClick={() => navigate(`/deposit/${el.id}`)} variant="contained">
                          Deposit
                        </Button>
                      </Box>
                    ) : (
                      <Box mt="48px">
                        <Button
                          variant="contained"
                          onClick={() => {
                            toggleModal()
                          }}
                        >
                          Connect Wallet
                        </Button>
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
