import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'
import tokenUp from 'assets/images/svg/dashboard/tokenUp.svg'
import ButtonUp from 'assets/images/svg/dashboard/button-up.svg'
import ButtonDown from 'assets/images/svg/dashboard/button-down.svg'
import minMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import { useCallback, useState } from 'react'
import { SpaceBetweenBox, FlexBox } from 'styleds'
import { useAccountNfts, useAddress, useDecimal, useUserNftConfig } from 'state/user/hooks'
import { useCollections, useDepositedCollection, usePoolValues, useWalletModalToggle } from 'state/application/hooks'
import CollectionSkeleton from './DashboardSkeleton/CollectionSkeleton'
// import { decimalFormat, div, fixedFormat } from 'utils'
import { decimalFormat, div, fixedFormat, times } from 'utils'
import { OwnedNft } from '@alch/alchemy-sdk'
import { fromWei } from 'web3-utils'
import orderBy from 'lodash/orderBy'
import { useNavigate } from 'react-router-dom'
// import BigNumber from 'bignumber.js'

// import { gasLimit } from 'config'

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
  /* background: linear-gradient(180deg, #eff0f6 0%, rgba(239, 240, 246, 0) 79.43%); */
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
const AlignEndBox = styled(Box)`
  display: flex;
  align-items: flex-end;
`
const BgBox = styled(Box)`
  background: linear-gradient(180deg, rgba(239, 240, 246, 0.5) 0%, rgba(239, 240, 246, 0) 79.43%);
  background-size: 100% 170px;
  background-repeat: no-repeat;
  border-radius: 12px;
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
  width: 346px;
  height: 50px;
  background: #f7f7fc;
  opacity: 0.7;
  border-radius: 6px;
  margin-right: 148px;
`
const TokenUpBox = styled(Box)`
  width: 35px;
  height: 35px;
`

const LabelBox = styled(Box)`
  padding: 2px 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #7646ff;
  margin-right: 8px;
  margin-top: 5px;
  background: rgba(118, 70, 255, 0.1);
  border-radius: 4px;
`
interface CollectionType {
  type: number
  loading: boolean
}
export default function Collection({ type, loading }: CollectionType) {
  const [check, setCheck] = useState<number | null>(1)
  const [dataType] = useState<boolean>(true) //有没有数据
  const collection = useCollections()
  const address = useAddress()
  const toggleModal = useWalletModalToggle()
  const poolValues = usePoolValues()
  const decimal = useDecimal()
  const depositedCollection = useDepositedCollection()
  const nftConfig = useUserNftConfig()
  const list = useAccountNfts()
  const navigate = useNavigate()
  const deposited = (id: string) => {
    if (depositedCollection) {
      const item = depositedCollection.find(
        (el) => el.userNftCollection.id.split('-')[1].toLocaleLowerCase() === id.toLocaleLowerCase()
      )
      return item ? item.userNftCollection.tokens.length : '0'
    }
    return '0'
  }

  // const nftBalance = (id: string) => {

  // }
  // useEffect(() => {
  //   //
  // }, [collection])
  const nftBalance = useCallback(
    (id: string) => {
      if (list) {
        const item = list.filter((el: OwnedNft) => el.contract.address.toLocaleLowerCase() === id.toLocaleLowerCase())
        return item ? item.length : '0'
      }
      return '0'
    },
    [list]
  )
  return (
    <Box ml="24px" width="1160px">
      {loading ? (
        <CollectionSkeleton />
      ) : (
        <>
          <SpaceBetweenBox>
            <Box m="36px 0px 16px 24px">
              <Typography variant="h4">Collection Supported</Typography>
              <Box mt="8px" display={dataType ? 'none' : ''}>
                <Typography mr="16px" fontWeight="500" component="span" color="#6E7191" variant="subtitle2">
                  {nftConfig} NFT Collaterals
                </Typography>
                <Typography fontWeight="500" component="span" color="#6E7191" variant="subtitle2">
                  {decimalFormat(poolValues[1].toString(), decimal)} ETH Total value
                </Typography>
              </Box>
            </Box>
            <Box display={dataType ? 'none' : ''}>
              <FlexBox>
                <TokenUpBox mr="24px">
                  <img src={tokenUp} alt="" />
                </TokenUpBox>
                <Box>
                  <Typography mr="8px" component="span" fontSize="24px" lineHeight="38px" color="#4BC8B1" variant="h5">
                    +0%
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
          <BgBox>
            <CollectionHeader>
              <CollectionFlexBox>
                <Box sx={{ width: '272px' }}>
                  <TitleTypography>Collection</TitleTypography>
                </Box>
                <Box sx={{ width: '222px' }}>
                  <TitleTypography>Floor Price</TitleTypography>
                </Box>
                <Box sx={{ width: '222px' }}>
                  <TitleTypography> Loan to Value </TitleTypography>
                </Box>
                <Box sx={{ width: '222px' }}>
                  <TitleTypography>Deposit</TitleTypography>
                </Box>
                <Box>
                  <TitleTypography>Token reward</TitleTypography>
                </Box>
              </CollectionFlexBox>
            </CollectionHeader>
            {collection &&
              orderBy(
                collection,
                function (o) {
                  return Number(o.floorPrice)
                },
                ['desc']
              ).map((el: any) => (
                <CollectionBox key={`${el.id}collection`} className={el === check ? 'open' : ''}>
                  <Box padding="24px 24px 21px 24px">
                    <CollectionFlexBox>
                      <CollectionFlexBox sx={{ width: '272px' }}>
                        <img
                          src={el.icon}
                          alt=""
                          style={{
                            width: '48px',
                            borderRadius: '6px',
                          }}
                        />
                        <Box ml="10px">
                          <Typography lineHeight="150%" variant="body1" fontWeight="700">
                            {el?.name}
                          </Typography>
                          <FlexBox>
                            {nftBalance(el.id) > 0 && <LabelBox>Available</LabelBox>}
                            {deposited(el.id) > 0 && <LabelBox>Deposited</LabelBox>}
                          </FlexBox>
                        </Box>
                      </CollectionFlexBox>
                      <CollectionFlexBox sx={{ width: '222px' }}>
                        <img src={minMyCollateralIcon} alt="" />
                        <Typography ml="2px" component="span" variant="body1" fontWeight="700">
                          {fixedFormat(fromWei(el?.floorPrice || 0))}
                        </Typography>
                      </CollectionFlexBox>
                      <CollectionFlexBox sx={{ width: '222px' }}>
                        <Box>
                          <Typography ml="2px" mr="8px" component="span" variant="body1" fontWeight="700">
                            {div(el.ltv, 100)}%
                          </Typography>
                          <TitleTypography>
                            {times(el?.floorPrice || 0, div(el.ltv, 10000)).includes('.')
                              ? 0
                              : fixedFormat(fromWei(times(el?.floorPrice || 0, div(el.ltv, 10000))))}{' '}
                            ETH/NFT
                          </TitleTypography>
                        </Box>
                      </CollectionFlexBox>
                      <CollectionFlexBox sx={{ width: '222px' }}>
                        <Typography component="span" variant="body1" fontWeight="700">
                          {el?.activeUser}
                        </Typography>
                      </CollectionFlexBox>
                      <CollectionFlexBox sx={{ width: '122px' }}>
                        <Typography component="span" variant="subtitle2" fontWeight="700" color="#4BC8B1">
                          0
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
                          </LiquidationBox>
                          <Box className={address ? '' : 'none'} width="222px">
                            <AlignEndBox>
                              <Typography
                                variant="subtitle1"
                                fontWeight="700"
                                color={+deposited(el.id) !== 0 ? '#7646FF' : '#A0A3BD'}
                              >
                                {deposited(el.id)}&nbsp;
                              </Typography>
                              <Typography
                                fontWeight="700"
                                lineHeight="160%"
                                fontSize={+deposited(el.id) !== 0 ? '18px' : '14px'}
                                color={+deposited(el.id) !== 0 ? '#7646FF' : '#A0A3BD'}
                              >
                                NTFs
                              </Typography>
                            </AlignEndBox>
                            <Typography mt="2px" variant="body1" fontWeight="600" color="#A0A3BD">
                              My Deposited
                            </Typography>
                          </Box>
                          <Box className={address ? '' : 'none'} width="130px">
                            <AlignEndBox>
                              <Typography
                                variant="subtitle1"
                                fontWeight="700"
                                color={nftBalance(el.id) !== 0 ? '#7646FF' : '#A0A3BD'}
                              >
                                {nftBalance(el.id)}&nbsp;
                              </Typography>
                              <Typography
                                lineHeight="160%"
                                fontSize={nftBalance(el.id) !== 0 ? '18px' : '14px'}
                                fontWeight="700"
                                color={nftBalance(el.id) !== 0 ? '#7646FF' : '#A0A3BD'}
                              >
                                NTFs
                              </Typography>
                            </AlignEndBox>
                            <Typography mt="2px" variant="body1" fontWeight="600" color="#A0A3BD">
                              My Balance
                            </Typography>
                          </Box>
                        </CollectionFlexBox>
                        {address ? (
                          <Box mt="50px">
                            <Button onClick={() => navigate(`/deposit/${el.id}`)} variant="contained">
                              Deposit
                            </Button>
                          </Box>
                        ) : (
                          <Box mt="50px">
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
          </BgBox>
        </>
      )}
    </Box>
  )
}
