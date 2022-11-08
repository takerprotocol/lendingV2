import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox } from 'styleds'
import mobileMenu from 'assets/images/svg/common/mobileMenu.svg'
import mobileBlueChipIcon from 'assets/images/svg/common/mobileBlueChipIcon.svg'
import mobileGrowthIcon from 'assets/images/svg/common/mobileGrowthIcon.svg'
import theme from 'theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'state'
import { setDashboardType, setMobileMenuType } from 'state/user/reducer'
import { useMobileMenuType } from 'state/user/hooks'
const MobileMenuBox = styled(Box)`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem 1rem;
  margin: 0 1rem;
`
const ButtonBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 6px;
  padding: 0.8125rem 0.75rem 0.8125rem 0.75rem;
  display: flex;
  align-items: center;
`
export default function MobileMenu() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const menuType = useMobileMenuType()
  return (
    <MobileMenuBox>
      <SpaceBetweenBox
        onClick={() => {
          navigate('/')
          dispatch(setMobileMenuType(!menuType))
        }}
      >
        <Typography
          variant="subtitle2"
          lineHeight="150%"
          fontWeight="700"
          color={String(location.pathname === '/' ? theme.palette.primary.main : theme.palette.text)}
        >
          Dashboard
        </Typography>
        <img src={mobileMenu} alt="" />
      </SpaceBetweenBox>
      <SpaceBetweenBox mt="1rem" mb="2.25rem">
        <ButtonBox
          onClick={() => {
            dispatch(setDashboardType(1))
            navigate('/dashboard')
            dispatch(setMobileMenuType(!menuType))
          }}
        >
          <img src={mobileBlueChipIcon} alt="" />
          <Typography ml="0.25rem" variant="body1" fontWeight="600">
            Blue Chip NFTs
          </Typography>
        </ButtonBox>
        <ButtonBox
          onClick={() => {
            dispatch(setDashboardType(2))
            navigate('/dashboard')
            dispatch(setMobileMenuType(!menuType))
          }}
        >
          <img src={mobileGrowthIcon} alt="" />
          <Typography ml="0.25rem" mr="0.75rem" variant="body1" fontWeight="600">
            Growth NFTs
          </Typography>
        </ButtonBox>
      </SpaceBetweenBox>
      <SpaceBetweenBox
        onClick={() => {
          navigate('/liquidation')
          dispatch(setMobileMenuType(!menuType))
        }}
      >
        <Typography
          variant="subtitle2"
          lineHeight="150%"
          fontWeight="600"
          color={String(location.pathname === '/liquidation' ? theme.palette.primary.main : theme.palette.text)}
        >
          Liquidation
        </Typography>
        <img src={mobileMenu} alt="" />
      </SpaceBetweenBox>
      <SpaceBetweenBox mt="2.25rem">
        <Typography variant="subtitle2" lineHeight="150%" fontWeight="600">
          FAQs
        </Typography>
        <img src={mobileMenu} alt="" />
      </SpaceBetweenBox>
    </MobileMenuBox>
  )
}
