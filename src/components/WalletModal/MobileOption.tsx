import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import mobileActive from 'assets/images/svg/common/mobileActive-icon.svg'
import theme from 'theme'

const OptionWrapper = styled(Box)`
  width: 100%;
  padding-left: 1.25rem;
  margin-bottom: 0.5rem;
  .none {
    display: none;
  }
  :active {
    background: #f7f7fc;
    border-radius: 0.5rem;
    .active {
      font-weight: 700;
      color: #7646ff;
    }
    .none {
      display: block;
    }
  }
`
const OptionCard = styled(Box)`
  color: ${theme.palette.common.white};
  height: 64px;
  align-items: center;
  img {
    border-radius: 6px;
  }
`

export default function MobileOption({
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
  const content = (
    <OptionWrapper onClick={onClickEvt}>
      <OptionCard display={'flex'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          <img src={icon} alt={'Icon'} />
          <Typography className="active" ml="1.25rem" variant="subtitle2" fontWeight="400" color="#262338">
            {header}
          </Typography>
        </Box>
        <Box className="none">
          <img src={mobileActive} alt="" />
        </Box>
      </OptionCard>
    </OptionWrapper>
  )
  return content
}
