import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import theme from 'theme'
import { useAppDispatch } from 'state/hooks'
import mobileActive from 'assets/images/svg/common/mobileActive-icon.svg'
import { useAddress, useMobileType } from 'state/user/hooks'
import { FlexBox } from 'styleds'
import { setLoginWalletType, setMobileMenuType } from 'state/user/reducer'

const OptionWrapper = styled(Box)`
  width: 303px;
  padding-left: 24px;
  cursor: pointer;
  margin-bottom: 24px;
  :hover {
    background: #f7f7fc;
    border-radius: 6px;
  }
`
const MobileOptionWrapper = styled(Box)`
  width: 100%;
  margin-bottom: 0.5rem;
`
const OptionCard = styled(Box)`
  color: ${theme.palette.common.white};
  height: 64px;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
`
const MobileOptionCard = styled(Box)`
  height: 4rem;
  padding: 0.75rem 1.25rem;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 6px;
  }
  .none {
    display: none;
  }
  :active {
    background: #f7f7fc;
    border-radius: 8px;
    .active {
      font-weight: 700;
      color: #7646ff;
    }
    .none {
      display: block;
    }
  }
`

export default function Option({
  link = null,
  onClickEvt,
  header,
  icon,
}: {
  link?: string | null
  onClickEvt?: () => void
  header: React.ReactNode
  icon: string
}) {
  const mobile = useMobileType()
  const address = useAddress()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (address) {
      dispatch(setLoginWalletType(true))
      dispatch(setMobileMenuType(true))
    }
  }, [address, dispatch])
  const content = (
    <>
      {mobile ? (
        <OptionWrapper onClick={onClickEvt}>
          <OptionCard display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} alignItems={'center'}>
              <img src={icon} alt={'Icon'} />
              <Typography ml="16px" variant="subtitle2" fontWeight="600" color="#4E4B66" component="span">
                {header}
              </Typography>
            </Box>
          </OptionCard>
        </OptionWrapper>
      ) : (
        <MobileOptionWrapper onClick={onClickEvt}>
          <MobileOptionCard display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} alignItems={'center'}>
              <img src={icon} alt={'Icon'} />
              <Typography
                ml="1.125rem"
                className="active"
                variant="subtitle1"
                lineHeight="1.125rem"
                fontWeight="400"
                color="#262338"
              >
                {header}
              </Typography>
            </Box>
            <FlexBox className="none">
              <img src={mobileActive} alt="" />
            </FlexBox>
          </MobileOptionCard>
        </MobileOptionWrapper>
      )}
    </>
  )
  if (link) {
    return <a href={link}>{content}</a>
  }

  return content
}
