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
import { useNavigate } from 'react-router-dom'
import CollectionSkeleton from './DashboardSkeleton/CollectionSkeleton'
import { decimalFormat, div, times } from 'utils'
import { OwnedNft } from '@alch/alchemy-sdk'
import { fromWei } from 'web3-utils'

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

const LabelBox = styled(Box)`
  padding: 2px 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #6e7191;
  margin-right: 8px;
  margin-top: 5px;
  background: #eff0f6;
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
  const navigate = useNavigate()
  const poolValues = usePoolValues()
  const decimal = useDecimal()
  const depositedCollection = useDepositedCollection()
  const nftConfig = useUserNftConfig()
  const list = useAccountNfts()
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
              <Box sx={{ width: '248px' }}>
                <TitleTypography> Loan to value </TitleTypography>
              </Box>
              {/* <Box sx={{ width: '246px' }}>
                <TitleTypography>Total Value Locked</TitleTypography>
              </Box> */}
              <Box sx={{ width: '248px' }}>
                <TitleTypography>Active user</TitleTypography>
              </Box>
              <Box>
                <TitleTypography>Token reward</TitleTypography>
              </Box>
            </CollectionFlexBox>
          </CollectionHeader>
          {collection.map((el: any) => (
            <CollectionBox key={`${el.id}collection`} className={el === check ? 'open' : ''}>
              <Box padding="24px 24px 24px 24px">
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
                      <Typography component="span" variant="body1" fontWeight="700">
                        {el?.name}
                      </Typography>
                      <FlexBox>
                        {nftBalance(el.id) > 0 && <LabelBox>Can Deposit</LabelBox>}
                        {deposited(el.id) > 0 && <LabelBox>Deposited</LabelBox>}
                      </FlexBox>
                    </Box>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '124px' }}>
                    <img src={minMyCollateralIcon} alt="" />
                    <Typography ml="2px" component="span" variant="body1" fontWeight="700">
                      {fromWei(el?.floorPrice || 0)}
                    </Typography>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '248px' }}>
                    <img src={minMyCollateralIcon} alt="" />
                    <Typography ml="2px" mr="8px" component="span" variant="body1" fontWeight="700">
                      {times(fromWei(el?.floorPrice || 0), div(el.ltv, 10000))}
                    </Typography>
                    <TitleTypography>{div(el.ltv, 100)}%</TitleTypography>
                  </CollectionFlexBox>
                  {/* <CollectionFlexBox sx={{ width: '246px' }}>
                    <img src={minMyCollateralIcon} alt="" />
                    <Typography ml="2px" mr="8px" component="span" variant="body1" fontWeight="700">
                      {el.totalValue}
                    </Typography>
                    <TitleTypography>0 NFTs</TitleTypography>
                  </CollectionFlexBox> */}
                  <CollectionFlexBox sx={{ width: '248px' }}>
                    <Typography component="span" variant="body1" fontWeight="700">
                      {el?.stats?.countOwners || '0'}
                    </Typography>
                  </CollectionFlexBox>
                  <CollectionFlexBox sx={{ width: '172px' }}>
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
                          {deposited(el.id)}
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
                          {nftBalance(el.id)} NTFs
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
