import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import theme from 'theme'

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
  const content = (
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
  )
  if (link) {
    return <a href={link}>{content}</a>
  }

  return content
}
