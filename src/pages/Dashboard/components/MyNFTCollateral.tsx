import { Box, Button, styled, Tooltip, Typography } from '@mui/material'
import MyNFTCollateralBg from 'assets/images/svg/dashboard/MyNFTCollateralBg.svg'
import ButtonDeposit from 'assets/images/svg/dashboard/Buttom-Deposit.svg'
import more from 'assets/images/svg/dashboard/more-icon.svg'
import { SpaceBetweenBox, FlexBox, SpaceBox } from 'styleds'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccountNfts, useAddress, useUserValue } from 'state/user/hooks'
import { useCollections, useDepositedCollection } from 'state/application/hooks'
import ERC721 from 'assets/images/png/collection/721.png'
import { useActiveWeb3React } from 'hooks/web3'
import { getClient } from 'apollo/client'
import { User } from 'apollo/queries'
import { decimalFormat } from 'utils'

// import ILendingPoolAddressesProviderAbi from 'abis/MockERC721.json'
// import { useContract } from 'hooks/useContract'
// import { ERC721_ADDRESS } from 'config'

const MyNFTCollateralBox = styled(Box)`
  width: 322px;
  height: 333px;
  position: relative;
`
const TopBox = styled(Box)`
  width: 322px;
  padding: 24px 24px 22px 24px;
  height: 98px;
  position: absolute;
  top: 0px;
  background-image: url(${MyNFTCollateralBg});
  background-repeat: no-repeat;
`
const ButtonBox = styled(Box)`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  margin-top: 24px;
  height: 28px;
  padding: 8px;
  cursor: pointer;
`
const TypographyButton = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  color: #ffffff;
  opacity: 0.8;
`
const BottomBox = styled(Box)`
  padding: 36px 16px 24px 16px;
  width: 322px;
  top: 86px;
  height: 247px;
  position: absolute;
  background: linear-gradient(180deg, #ffffff 49.8%, rgba(255, 255, 255, 0) 100%);
  box-shadow: 0px 5px 10px #f8f8fd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  .left {
    margin-left: 8px;
  }
`
const BottomTopBox = styled(Box)`
  width: 290px;
  padding: 0 8px;
  background: #f7f7fc;
  border-radius: 4px;
  margin-bottom: 31px;
  height: 44px;
  display: flex;
`
const ImgBox = styled(`img`)`
  border-radius: 4px;
  cursor: pointer;
  :hover {
    transform: translateY(-4px);
    transition: all 0.25s ease-in;
  }
`
const RightImgBox = styled(`img`)`
  border-radius: 4px;
  z-index: 2;
  cursor: pointer;
  :hover {
    transform: translateY(-4px);
    transition: all 0.25s ease-in;
  }
`
const NftListBox = styled(Box)`
  margin-bottom: 16px;
  margin-left: 8px;
`
const FlexEndBox = styled(Box)`
  display: flex;
  align-items: flex-end;
`
export const EndBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
interface MyNFTCollateralProps {
  type: number
  loading: boolean
}
export default function MyNFTCollateral({ type, loading }: MyNFTCollateralProps) {
  const { chainId } = useActiveWeb3React()
  const address = useAddress()
  const [client, setClient] = useState<any>(null)
  useEffect(() => {
    if (chainId) {
      setClient(getClient()[chainId === 1 ? 5 : chainId === 4 ? 4 : chainId === 5 ? 5 : 5])
    }
  }, [chainId])
  const [nftCount, setNftCount] = useState(0)
  const [dataType] = useState<boolean>(true)
  const userValue = useUserValue()
  const collections = useCollections()
  const accountNfts = useAccountNfts()
  const depositedCollection = useDepositedCollection()
  // const address = useAddress()
  // const contract = useContract(ERC721_ADDRESS, ILendingPoolAddressesProviderAbi)
  // const a = () => {
  //   if (contract) {
  //     console.log(contract)
  //     contract.mint().then((res: any) => {
  //       console.log(res)
  //     })
  //   }
  // }
  const getUser = useCallback(async () => {
    if (client && address) {
      const userRes = await client.query({
        query: User(`${address}`),
      })
      let _nftCount = 0
      if (userRes.data && userRes.data.user && userRes.data.user.collections) {
        userRes.data.user.collections.forEach((cel: any) => {
          if (cel.tokens) {
            _nftCount += cel.tokens.length
          }
        })
      }
      setNftCount(_nftCount)
    }
  }, [client, address])
  useEffect(() => {
    getUser()
  }, [getUser])

  const renderImg = (id: string) => {
    const item = collections.find((el) => el.id.toLocaleLowerCase() === id.split('-')[1].toLocaleLowerCase())
    return item ? item.icon : ERC721
  }

  const supportNfts = useMemo(() => {
    return accountNfts.filter((el) =>
      collections.find((cel) => cel.id.toLocaleLowerCase() === el.contract.address.toLocaleLowerCase())
    )
  }, [accountNfts, collections])
  // console.log(supportNfts)
  const count = useMemo(() => {
    return depositedCollection.length >= 4
  }, [depositedCollection.length])
  return (
    <MyNFTCollateralBox>
      <BottomBox>
        <BottomTopBox>
          {dataType ? (
            <SpaceBetweenBox width="100%">
              <Box>
                <Typography variant="body1" fontWeight="700" color="#6E7191">
                  My Deposited Collections
                </Typography>
              </Box>
              <EndBox>
                {depositedCollection &&
                  depositedCollection.map((el: any, index: number) => {
                    return (
                      <ImgBox
                        key={`Img-Box-Deposited-Collection-${el.userNftCollection.id}-${el.index}`}
                        src={renderImg(el.userNftCollection.id)}
                        alt=""
                        sx={{
                          zIndex: index,
                          height: `${count ? '28px' : '24px'}`,
                          width: `${count ? '26px' : '24px'}`,
                          marginLeft: `${count ? '0px' : '4px'}`,
                          marginRight: `${count && depositedCollection.length > index + 1 ? '-6px' : '0'}`,
                          borderLeft: `${count ? '2px solid #F3F3F9' : '0'}`,
                          borderTop: `${count ? '2px solid  #F3F3F9' : '0'}`,
                          borderBottom: `${count ? '2px solid #F3F3F9' : '0'}`,
                        }}
                        onClick={() => {
                          if (el.userNftCollection && el.userNftCollection.id) {
                            window.location.href = `/deposit/${el.userNftCollection.id.split('-')[1]}`
                          }
                        }}
                      ></ImgBox>
                    )
                  })}
              </EndBox>
            </SpaceBetweenBox>
          ) : (
            <Typography variant="body1" fontWeight="700" color="#6E7191">
              You haven{`'`}t deposit any collections.
            </Typography>
          )}
        </BottomTopBox>
        <NftListBox>
          <Typography variant="body2" lineHeight="12px" fontWeight="600" color="#A0A3BD">
            {supportNfts.length > 0 ? (
              <>You have {supportNfts.length} NFTs can deposit</>
            ) : (
              <>We support these collections</>
            )}
          </Typography>
          {supportNfts.length > 0 ? (
            <SpaceBetweenBox
              height={`${supportNfts.length > 10 ? '28px' : '24px'}`}
              mt={`${supportNfts.length > 10 ? '8px' : '12px'}`}
            >
              <FlexBox>
                {supportNfts &&
                  supportNfts.slice(0, 13).map((el: any, index: number) => {
                    return (
                      <Tooltip
                        key={`support_collections_${el.contract.address}_${el.tokenId}`}
                        title={el.title || ''}
                        arrow
                        placement="top"
                      >
                        <RightImgBox
                          src={el.media[0]?.gateway || ''}
                          alt=""
                          sx={{
                            zIndex: index,
                            height: `${supportNfts.length > 10 ? '28px' : '24px'}`,
                            width: `${supportNfts.length > 10 ? '26px' : '24px'}`,
                            marginRight: `${supportNfts.length > 10 ? '0px' : '4px'}`,
                            marginLeft: `${supportNfts.length > 10 && index > 0 ? '-8px' : '0'}`,
                            borderLeft: `${supportNfts.length > 10 ? '2px solid #ffffff' : '0'}`,
                            borderTop: `${supportNfts.length > 10 ? '2px solid #ffffff' : '0'}`,
                            borderBottom: `${supportNfts.length > 10 ? '2px solid #ffffff' : '0'}`,
                          }}
                          onClick={() => {
                            window.location.href = `/deposit/${el.contract.address}`
                          }}
                        ></RightImgBox>
                      </Tooltip>
                    )
                  })}
              </FlexBox>
              {supportNfts.length > 10 && (
                <Box width="24px" sx={{ cursor: 'pointer' }} height="24px">
                  <img width="24px" height="24px" src={more} alt="" />
                </Box>
              )}
            </SpaceBetweenBox>
          ) : (
            <SpaceBetweenBox
              height={`${collections.length > 10 ? '28px' : '24px'}`}
              mt={`${collections.length > 10 ? '8px' : '12px'}`}
            >
              <FlexBox>
                {collections &&
                  collections.map((el: any, index: number) => {
                    return (
                      <Tooltip key={`collections_${el.id}`} title={el.name || ''} arrow placement="top">
                        <RightImgBox
                          src={el.icon || ''}
                          alt=""
                          sx={{
                            zIndex: index,
                            height: `${collections.length > 10 ? '28px' : '24px'}`,
                            width: `${collections.length > 10 ? '26px' : '24px'}`,
                            marginRight: `${collections.length > 10 ? '0px' : '4px'}`,
                            marginLeft: `${collections.length > 10 && index > 0 ? '-8px' : '0'}`,
                            borderLeft: `${collections.length > 10 ? '2px solid #ffffff' : '0'}`,
                            borderTop: `${collections.length > 10 ? '2px solid #ffffff' : '0'}`,
                            borderBottom: `${collections.length > 10 ? '2px solid #ffffff' : '0'}`,
                          }}
                          onClick={() => {
                            window.location.href = `/deposit/${el.id}`
                          }}
                        ></RightImgBox>
                      </Tooltip>
                    )
                  })}
              </FlexBox>
              {collections.length > 10 && (
                <Box width="24px" sx={{ cursor: 'pointer' }} height="24px">
                  <img width="24px" height="24px" src={more} alt="" />
                </Box>
              )}
            </SpaceBetweenBox>
          )}
        </NftListBox>
        <Button
          sx={{ width: '274px', marginLeft: '8px', height: '48px' }}
          variant="contained"
          onClick={() => {
            window.scrollTo({
              top: 800,
              behavior: 'smooth',
            })
          }}
        >
          Deposit
          <img className="left" src={ButtonDeposit} alt="" />
        </Button>
      </BottomBox>
      <TopBox>
        <SpaceBox>
          <Box>
            <Typography mb="12px" variant="body1" color=" rgba(255, 255, 255, 0.7)" lineHeight="14px">
              My NFT Collateral
            </Typography>
            <FlexEndBox height={24}>
              <Typography variant="h5" mr="8px" fontWeight="600" color="#ffffff" lineHeight="22px">
                {decimalFormat(userValue.NFTLiquidity, 0)}
              </Typography>
              <Typography variant="subtitle1" fontWeight="700" color="#ffffff" lineHeight="18px">
                ETH
              </Typography>
            </FlexEndBox>
          </Box>
          {dataType && (
            <ButtonBox>
              <TypographyButton>{nftCount} NFTs</TypographyButton>
            </ButtonBox>
          )}
        </SpaceBox>
      </TopBox>
    </MyNFTCollateralBox>
  )
}
