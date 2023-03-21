import { Box, Button, styled, Typography } from '@mui/material'
import LogoIcon from 'assets/images/svg/logo.svg'
import AddressIcon from 'assets/images/svg/wallet/address.svg'
import WalletModal from 'components/WalletModal'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useShowChangeNetWork, useToggleModal } from 'state/application/hooks'
import { useAddress, useMobileType } from 'state/user/hooks'
import { ApplicationModal } from 'state/application/reducer'
import { FlexBox } from 'styleds'
import { desensitization } from 'utils'
import * as React from 'react'
import { PopperPlacementType } from '@mui/material/Popper'
import HeaderPopper from './components/HeaderPopper'
import theme from 'theme'
import DashboardPopper from './components/DashboardPopper'
import MobileHeader from './MobileHeader'
import { ChangeNetWork } from 'components/ChangeNetWork'
import { useTransactionPending } from 'state/transactions/hooks'
import { Loading } from 'components/Loading'
import { useCallback, useEffect, useState } from 'react'
import { setDashboardType } from 'state/user/reducer'
import { useAppDispatch } from 'state'

const HeaderBox = styled(Box, {
  shouldForwardProp: (prop) => true,
})<{ lightBackground?: boolean }>(({ theme, lightBackground }) => ({
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 70,
  padding: '0 30px',
  width: '100vw',
  background: lightBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(50px)',
  zIndex: 10,
}))

const AddressBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 15px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #6e7191;
  background: rgba(160, 163, 189, 0.1);
  border-radius: 4px;
  img {
    margin-right: 12px;
  }
`
const WalletButton = styled(Button)`
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 5px 10px rgba(18, 55, 92, 0.04);
  border-radius: 32px;
  height: 48px !important;
  border: none !important;
  padding: 0 18.5px;
  .MuiTypography-root {
    font-weight: 700;
    font-size: 16px;
    background: linear-gradient(95.08deg, #7646ff 2.49%, #297ac9 49.84%, #00dfd2 97.19%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const HeaderLogo = styled('img')`
  cursor: pointer;
`

const PendingBox = styled(Box)`
  background: #7646ff;
  border-radius: 37px;
  height: 48px;
  width: 155px;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`

const StyledLinkText = styled(Typography, { shouldForwardProp: (prop) => true })<{ color: string }>(({ color }) => ({
  color,
}))

export const Header = () => {
  const toggleModal = useToggleModal(ApplicationModal.WALLET)
  const address = useAddress()
  const showChangeNetWork = useShowChangeNetWork()
  const transactionPending = useTransactionPending()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const [placement, setPlacement] = React.useState<PopperPlacementType>()
  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }
  const [dashboardOpen, setDashboardOpen] = React.useState(false)
  const dashboardHandleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
    setDashboardOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }
  const navigate = useNavigate()
  const location = useLocation()
  const mobile = useMobileType()
  const dispatch = useAppDispatch()
  const lightBackground = location.pathname.includes('/deposit') || location.pathname.includes('/liquidate')
  const [scrollTop, setScrollTop] = useState(0)
  const bindHandleScroll = useCallback(() => {
    let scrollTop = 0
    if (document?.documentElement && document?.documentElement?.scrollTop) {
      scrollTop = document?.documentElement.scrollTop
    } else if (document?.body) {
      scrollTop = document?.body.scrollTop
    }
    setScrollTop(scrollTop)
  }, [])
  useEffect(() => {
    window.addEventListener('scroll', bindHandleScroll)
    return () => {
      window.removeEventListener('scroll', bindHandleScroll)
    }
  }, [bindHandleScroll])
  return (
    <>
      {mobile ? (
        <>
          {showChangeNetWork && <ChangeNetWork></ChangeNetWork>}
          <HeaderBox
            sx={{
              top: showChangeNetWork ? '48px' : scrollTop > 70 ? 0 : 'unset',
            }}
            lightBackground={lightBackground}
          >
            <HeaderLogo onClick={() => navigate('/')} alt="logo" src={LogoIcon} />
            <FlexBox>
              {/* <Link to="/">
          <StyledLinkText
            color={String(location.pathname === '/' ? theme.palette.primary.main : theme.palette.text)}
            variant="button"
            marginRight="49px"
          >
            Home
          </StyledLinkText>
        </Link> */}
              <Link to="/dashboard" onClick={() => dispatch(setDashboardType(1))}>
                <StyledLinkText
                  color={String(location.pathname === '/dashboard' ? theme.palette.primary.main : theme.palette.text)}
                  variant="button"
                  marginRight="49px"
                  onMouseLeave={dashboardHandleClick('bottom')}
                  onMouseOver={dashboardHandleClick('bottom')}
                >
                  Dashboard
                </StyledLinkText>
              </Link>
              <Link onClick={() => dispatch(setDashboardType(1))} to="/liquidation">
                <StyledLinkText
                  color={String(location.pathname === '/liquidation' ? theme.palette.primary.main : theme.palette.text)}
                  variant="button"
                  marginRight="49px"
                >
                  Liquidation
                </StyledLinkText>
              </Link>
              {/* <Link to="/faqs">
                <StyledLinkText
                  color={String(location.pathname === '/faqs' ? theme.palette.primary.main : theme.palette.text)}
                  variant="button"
                  marginRight="49px"
                >
                  FAQs
                </StyledLinkText>
              </Link> */}
              {!address ? (
                <WalletButton
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    toggleModal()
                  }}
                >
                  <Typography>Connect Wallet</Typography>
                </WalletButton>
              ) : (
                <>
                  {transactionPending.length > 0 ? (
                    <PendingBox onMouseLeave={handleClick('bottom')} onMouseOver={handleClick('bottom')}>
                      <Loading></Loading>
                      Pending...
                    </PendingBox>
                  ) : (
                    <AddressBox onMouseLeave={handleClick('bottom')} onMouseOver={handleClick('bottom')}>
                      <img alt="" src={AddressIcon}></img>
                      {desensitization(address)}
                    </AddressBox>
                  )}
                </>
              )}
            </FlexBox>
            <WalletModal></WalletModal>
            <DashboardPopper
              open={dashboardOpen}
              anchorEl={anchorEl}
              placement={placement}
              setDashboardOpen={setDashboardOpen}
            ></DashboardPopper>
            <HeaderPopper open={open} anchorEl={anchorEl} placement={placement} setOpen={setOpen}></HeaderPopper>
          </HeaderBox>
        </>
      ) : (
        <MobileHeader></MobileHeader>
      )}
    </>
  )
}
