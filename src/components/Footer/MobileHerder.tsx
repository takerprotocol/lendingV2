import { Box, styled } from '@mui/material'
import Taker from 'assets/images/svg/common/Taker.svg'
import menu from 'assets/images/svg/common/menu.svg'
import X from 'assets/images/svg/common/X-icon.svg'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from 'state'
import { useMobileMenuType } from 'state/user/hooks'
import { setMobileMenuType } from 'state/user/reducer'
const MobileHerderBox = styled(Box, {
  shouldForwardProp: (prop) => true,
})<{ lightBackground?: boolean }>(({ theme, lightBackground }) => ({
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '5.875rem',
  padding: '0 1rem 0 1.25rem',
  width: '100%',
  background: lightBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(50px)',
  zIndex: 10,
}))
export default function MobileHerder() {
  const menuType = useMobileMenuType()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const lightBackground = ['/deposit', '/liquidate'].includes(location.pathname)
  return (
    <MobileHerderBox lightBackground={lightBackground}>
      <Box>
        <img src={Taker} alt="" />
      </Box>
      <Box>
        <img
          src={menuType ? menu : X}
          alt=""
          onClick={() => {
            dispatch(setMobileMenuType(!menuType))
          }}
        />
      </Box>
    </MobileHerderBox>
  )
}
