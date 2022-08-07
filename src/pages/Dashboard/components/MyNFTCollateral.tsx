import { Box, Button, styled, Tooltip, Typography } from '@mui/material'
import MyNFTCollateralBg from 'assets/images/svg/dashboard/MyNFTCollateralBg.svg'
import ButtonDeposit from 'assets/images/svg/dashboard/Buttom-Deposit.svg'
import { FlexBox, SpaceBetweenBox, SpaceBox } from 'styleds'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNftCollateral, useUserNftConfig } from 'state/user/hooks'
import { useCollections, useDepositedCollection } from 'state/application/hooks'
// import ERC721 from 'assets/images/png/collection/721.png'

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
  .left {
    margin-left: 8px;
  }
`
const BottomTopBox = styled(Box)`
  width: 290px;
  padding: 10px 8px;
  background: #f7f7fc;
  border-radius: 4px;
  margin-bottom: 31px;
`
const ImgBox = styled(Box)`
  width: 24px;
  height: 24px;
  margin-right: 4px;
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
interface MyNFTCollateralProps {
  type: number
  loading: boolean
}
export default function MyNFTCollateral({ type, loading }: MyNFTCollateralProps) {
  const navigate = useNavigate()
  const nftConfig = useUserNftConfig()
  const [dataType] = useState<boolean>(true)
  const collateral = useNftCollateral()
  const collections = useCollections()
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

  // const renderImg = (id: string) => {
  //   const item = collections.find((el) => el.id.toLocaleLowerCase() === id.toLocaleLowerCase())
  //   return item ? item.icon : ERC721
  // }
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
                        onClick={() => {
                          navigate(`/deposit/${el.id}`)
                        }}
                      >
                        {/* <img width="22px" height="22px" src={renderImg(el.id)} alt="" /> */}
                      </ImgBox>
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
            You have 7 NFTs can deposit
          </Typography>
          <FlexBox mt="12px">
            {collections &&
              collections.map((el: any) => {
                return (
                  <Tooltip key={`collections${el.id}`} title={el.symbol} arrow placement="top">
                    <ImgBox
                      onClick={() => {
                        navigate(`/deposit/${el.id}`)
                      }}
                    >
                      <img width="24px" height="24px" src={el.icon} alt="" />
                    </ImgBox>
                  </Tooltip>
                )
              })}
          </FlexBox>
        </NftListBox>
        <Button
          sx={{ width: '274px', marginLeft: '8px', height: '48px' }}
          variant="contained"
          onClick={() => navigate(`/deposit/${collections.length > 0 ? collections[0].id : ''}`)}
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
            <Typography variant="h5" component="span" mr="8px" fontWeight="600" color="#ffffff" lineHeight="22px">
              {collateral}
            </Typography>
            <Typography component="span" variant="subtitle1" fontWeight="700" color="#ffffff" lineHeight="18px">
              ETH
            </Typography>
          </Box>
          {dataType && (
            <ButtonBox>
              <TypographyButton>{nftConfig} NFTs</TypographyButton>
            </ButtonBox>
          )}
        </SpaceBox>
      </TopBox>
    </MyNFTCollateralBox>
  )
}
