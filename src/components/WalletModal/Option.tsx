import React from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, Button, Divider } from '@mui/material'
import theme from 'theme'

const OptionWrapper = styled(Box)`
  padding: 0 56px;
`
const OptionCard = styled(Box)`
  color: ${theme.palette.common.white};
  height: 152px;
  align-items: center;
  img {
    width: 52px;
    height: 52px;
    margin-right: 16px;
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
          <Typography flex="1" variant="h4">
            {header}
          </Typography>
        </Box>
        <Button size="medium">Connect</Button>
      </OptionCard>
      {header !== 'WalletConnect' && <Divider />}
    </OptionWrapper>
  )
  if (link) {
    return <a href={link}>{content}</a>
  }

  return content
}
