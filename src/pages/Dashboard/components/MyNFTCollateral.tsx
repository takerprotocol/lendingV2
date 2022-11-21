import { Box, Button, styled, Tooltip, Typography } from '@mui/material'
import MyNFTCollateralBg from 'assets/images/svg/dashboard/MyNFTCollateralBg.svg'
import ButtonDeposit from 'assets/images/svg/dashboard/Buttom-Deposit.svg'
import { FlexBox, SpaceBetweenBox, SpaceBox } from 'styleds'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccountNfts, useAddress, useUserValue } from 'state/user/hooks'
import { useCollections, useDepositedCollection } from 'state/application/hooks'
import ERC721 from 'assets/images/png/collection/721.png'
import { useActiveWeb3React } from 'hooks/web3'
import { getClient } from 'apollo/client'
import { User } from 'apollo/queries'

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
  align-items: center;
`
const ImgBox = styled(`img`)`
  width: 24px;
  height: 24px;
  margin-left: 4px;
  border-radius: 4px;
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
  const navigate = useNavigate()
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
  return (
    <MyNFTCollateralBox>
      <BottomBox>
        <BottomTopBox>
          {dataType ? (
            <SpaceBetweenBox>
              <Box>
                <Typography variant="body1" fontWeight="700" color="#6E7191">
                  My Deposited Collections
                </Typography>
              </Box>
              <FlexBox>
                {depositedCollection &&
                  depositedCollection.map((el: any) => {
                    return (
                      <ImgBox
                        key={`ImgBoxDepositedCollection${el.id}`}
                        src={renderImg(el.userNftCollection.id)}
                        alt=""
                        onClick={() => {
                          navigate(`/deposit/${el.id}`)
                        }}
                      ></ImgBox>
                    )
                  })}
              </FlexBox>
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
            <FlexBox mt="12px">
              {supportNfts &&
                supportNfts.map((el: any) => {
                  return (
                    <Tooltip
                      key={`support_collections_${el.contract.address}_${el.tokenId}`}
                      title={el.title || ''}
                      arrow
                      placement="top"
                    >
                      <ImgBox
                        src={el.media[0]?.gateway || ''}
                        alt=""
                        onClick={() => {
                          navigate(`/deposit/${el.contract.address}`)
                        }}
                      ></ImgBox>
                    </Tooltip>
                  )
                })}
            </FlexBox>
          ) : (
            <FlexBox mt="12px">
              {collections &&
                collections.map((el: any) => {
                  return (
                    <Tooltip key={`collections_${el.id}`} title={el.name || ''} arrow placement="top">
                      <ImgBox
                        src={el.icon || ''}
                        alt=""
                        onClick={() => {
                          navigate(`/deposit/${el.id}`)
                        }}
                      ></ImgBox>
                    </Tooltip>
                  )
                })}
            </FlexBox>
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
                {userValue.NFTLiquidity}
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
