import { Box, styled, Typography } from '@mui/material'
import Taker from 'assets/images/svg/common/Taker.svg'
import menu from 'assets/images/svg/common/menu.svg'
import X from 'assets/images/svg/common/X-icon.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'state'
import { useMobileMenuType, useMobileSecondHeaderName } from 'state/user/hooks'
import { setLoginWalletType, setMobileMenuType } from 'state/user/reducer'
import { FlexBox } from 'styleds'
const MobileHerderBox = styled(Box, {
  shouldForwardProp: (prop) => true,
})<{}>(({ theme }) => ({
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '3.125rem',
  padding: '0 1rem 0 1.25rem',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(25px)',
  zIndex: 10,
}))
const DepositRoLiquidateBox = styled(FlexBox)`
  padding: 0 4rem 0 1rem;
  position: fixed;
  width: 100%;
  z-index: 10;
`
const NameTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  margin: auto;
  line-height: 20px;
  text-align: center;
`
export default function MobileHeader() {
  const menuType = useMobileMenuType()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const name = useMobileSecondHeaderName()
  const lightBackground = location.pathname.includes('/deposit') || location.pathname.includes('/liquidate')
  const deposit = location.pathname.includes('/deposit')
  return (
    <>
      {lightBackground ? (
        <>
          <DepositRoLiquidateBox sx={{ background: `${deposit ? '#ffffff' : '#262338'}` }}>
            <svg
              width="48"
              onClick={() => {
                if (deposit) {
                  navigate('/')
                } else {
                  navigate('/liquidation')
                }
              }}
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 17L17 24L25 31"
                stroke={deposit ? '#14142A' : '#A0A3BD'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 24H31"
                stroke={deposit ? '#14142A' : '#A0A3BD'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <NameTypography color={deposit ? '#14142A' : '#A0A3BD'}>{deposit ? name : 'LIQUIDATE'}</NameTypography>
          </DepositRoLiquidateBox>
        </>
      ) : (
        <MobileHerderBox>
          <Box
            height="1rem"
            onClick={() => {
              navigate('/')
            }}
          >
            <img src={Taker} alt="" />
          </Box>
          <img
            src={menuType ? menu : X}
            alt=""
            onClick={() => {
              dispatch(setMobileMenuType(!menuType))
              dispatch(setLoginWalletType(true))
            }}
          />
        </MobileHerderBox>
      )}
    </>
  )
}
