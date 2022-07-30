import { SpaceBetweenBox, CenterBox, FlexBox } from 'styleds'
import { Box, styled, Fade, Popper, Typography } from '@mui/material'
import { desensitization } from 'utils'
import Logout from 'assets/images/svg/common/Logout.svg'
import notice from 'assets/images/svg/common/notice.svg'
import purpleETH from 'assets/images/svg/common/purpleETH.svg'
import BoxETH from 'assets/images/svg/wallet/BoxETH.svg'
import NFT1 from 'assets/images/svg/wallet/NFT1.svg'
import NFT2 from 'assets/images/svg/wallet/NFT2.svg'
import NFT3 from 'assets/images/svg/wallet/NFT3.svg'
import NFT4 from 'assets/images/svg/wallet/NFT4.svg'
import NFT5 from 'assets/images/svg/wallet/NFT5.svg'
import NFT6 from 'assets/images/svg/wallet/NFT6.svg'
import NFT7 from 'assets/images/svg/wallet/NFT7.svg'
import NFT8 from 'assets/images/svg/wallet/NFT8.svg'
import NFT9 from 'assets/images/svg/wallet/NFT9.svg'
import NFT10 from 'assets/images/svg/wallet/NFT10.svg'
import { useAddress, useWalletBalance } from 'state/user/hooks'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state/hooks'
import { setAddress } from 'state/user/reducer'
import Copy from 'components/Copy'
import Blockies from 'react-blockies'

const PopperBox = styled(Box)`
  z-index: 4;
  align-items: flex-end;
  padding: 16px 16px 24px;
  width: 358px;
  background: #ffffff;
  border: 1px solid #eff0f6;
  box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.05);
  border-radius: 12px;
  right: 24px;
  position: relative;
  top: 24px;
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: 267px;
    top: -30px;
    border-width: 15px 10px;
    border-style: dashed solid dashed dashed;
    border-color: transparent transparent #ffffff transparent;
  }
`
const LogoutBox = styled(Box)`
  width: 326px;
  background: #f7f7fc;
  border-radius: 6px;
  padding: 9px 12px 8px;
`

const StyledPopper = styled(Popper)`
  z-index: 10;
`

const StyledBlockie = styled(Blockies)`
  border-radius: 50%;
`
interface HeaderPopperProps {
  open: boolean
  anchorEl: any
  placement: any
  setOpen: Function
}
export default function HeaderPopper({ open, anchorEl, placement, setOpen }: HeaderPopperProps) {
  const address = useAddress()
  const balance = useWalletBalance()
  const dispatch = useAppDispatch()
  const { deactivate } = useWeb3React()
  //  useEffect(() => {if (library) {
  //     // const web3 = new Web3(library.provider)
  //     // console.log(web3)
  //  }}, [library])
  //   }

  return (
    <StyledPopper
      open={open}
      onMouseLeave={() => {
        setOpen(false)
      }}
      onMouseOver={() => {
        setOpen(true)
      }}
      anchorEl={anchorEl}
      placement={placement}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <PopperBox>
            <LogoutBox>
              <SpaceBetweenBox>
                <CenterBox>
                  <StyledBlockie seed={address} size={12} scale={2} />
                  <Typography
                    variant="subtitle2"
                    component="h1"
                    ml="8px"
                    mr="14px"
                    color="#6E7191"
                    sx={{ textDecorationLine: 'underline' }}
                  >
                    {desensitization(address)}
                  </Typography>
                  <Copy text={address} />
                </CenterBox>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    dispatch(setAddress(''))
                    deactivate()
                  }}
                >
                  <img src={Logout} alt="" />
                </Box>
              </SpaceBetweenBox>
              <CenterBox sx={{ flexDirection: 'column', marginTop: '24px' }}>
                <Typography variant="body1" component="h1" fontWeight="600">
                  Wallet Balance
                </Typography>
                <CenterBox mt="3px">
                  <img src={purpleETH} alt="" />
                  <Typography mr="7px" variant="h5" component="span" color="#7646FF">
                    {balance}
                  </Typography>
                </CenterBox>
              </CenterBox>
            </LogoutBox>
            <FlexBox ml="10px" mt="36px">
              <img src={notice} alt="" />
              <Typography ml="6px" variant="body1" component="h1" fontWeight="700">
                Latest notifications
              </Typography>
            </FlexBox>
            <SpaceBetweenBox m="16px 0px 4px 34px">
              <Typography variant="body2" component="h1" color="#A0A3BD" lineHeight="12px">
                Dec. 19, 2022
              </Typography>
              <Typography variant="body2" component="h1" color="#A0A3BD" lineHeight="12px">
                12:36 PM
              </Typography>
            </SpaceBetweenBox>
            <FlexBox ml="10px">
              <img src={BoxETH} alt="" />
              <Typography ml="8px" variant="body1" component="h1" fontWeight="600" color="#4E4B66">
                You have 10 NFTs were liquidated
              </Typography>
            </FlexBox>
            <FlexBox m="8px 0px 8px 32px">
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT1} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT2} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT3} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT4} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT5} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT6} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT7} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT8} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT9} alt="" />
              </Box>
              <Box mr="4px" sx={{ width: '24px', height: '24px', border: '2px solid #FFFFFF', borderRadius: '4px' }}>
                <img width="24px" height="24px" src={NFT10} alt="" />
              </Box>
            </FlexBox>
            <FlexBox ml="34px">
              <Typography variant="body2" component="h1" color="#4E4B66">
                Txid
              </Typography>
              <Typography
                marginX="8px"
                variant="body2"
                component="h1"
                color="#4E4B66"
                sx={{ textDecorationLine: 'underline' }}
              >
                0x5068L3NJSL58O932
              </Typography>
              <Copy text="0x5068L3NJSL58O932" />
            </FlexBox>
          </PopperBox>
        </Fade>
      )}
    </StyledPopper>
  )
}
