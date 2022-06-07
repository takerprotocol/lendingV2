import { Typography, Box, styled } from '@mui/material'
import promptIcon from 'assets/images/svg/dashboard/prompt-icon.svg'
import minMyCollateralIcon from 'assets/images/svg/dashboard/minMyCollateral-icon.svg'
import purpleETHpool from 'assets/images/svg/dashboard/purpleETHpool.svg'
import { useState } from 'react'
const ETHpoolBox = styled(Box)`
  width: 642px;
  height: 285px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
const ETHpoolFlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
const ETHpooLeftBox = styled(Box)`
  width: 224px;
  height: 168px;
  background: linear-gradient(
      61.18deg,
      rgba(102, 166, 232, 0) 0%,
      rgba(135, 143, 248, 0.147) 51.07%,
      rgba(105, 165, 233, 0.3) 97.23%
    ),
    linear-gradient(180deg, #463d5e 0%, #262338 83.56%);
  box-shadow: 0px 10px 20px rgba(75, 75, 122, 0.2);
  border-radius: 10px;
  padding: 43px 24px;
`

export default function ETHpool() {
  const [ETHpoolcheck] = useState<number | null>(2)
  return (
    <ETHpoolBox>
      <Typography component="h1" variant="h4" color="#14142A">
        ETH Pool
      </Typography>
      <ETHpoolFlexBox mt="24px">
        {ETHpoolcheck === 1 ? (
          <ETHpooLeftBox>
            <ETHpoolFlexBox>
              <Typography component="span" variant="subtitle2" color="#FFFFFF" mr="6px">
                Liquidity
              </Typography>
              <img src={promptIcon} alt="" />
            </ETHpoolFlexBox>
            <ETHpoolFlexBox mt="10px">
              <img height="30px" src={minMyCollateralIcon} alt="" />
              <Typography component="span" variant="h4" fontWeight="600" color="#FFFFFF" ml="9px">
                98,189.50
              </Typography>
            </ETHpoolFlexBox>
          </ETHpooLeftBox>
        ) : (
          <ETHpooLeftBox sx={{ boxShadow: '0', background: '#F7F7FC' }}>
            <ETHpoolFlexBox>
              <Typography component="span" variant="subtitle2" color="#14142A" mr="6px">
                Liquidity
              </Typography>
              <img src={promptIcon} alt="" />
            </ETHpoolFlexBox>
            <ETHpoolFlexBox mt="10px">
              <img height="30px" src={purpleETHpool} alt="" />
              <Typography component="span" variant="h4" fontWeight="600" color="#7646FF" ml="9px">
                98,189.50
              </Typography>
            </ETHpoolFlexBox>
          </ETHpooLeftBox>
        )}
        <Box ml="48px">
          <ETHpoolFlexBox>
            <Typography component="span" variant="body1" fontWeight="700" color="#14142A" mr="6px">
              Net Supply APY
            </Typography>
            <img src={promptIcon} alt="" />
          </ETHpoolFlexBox>
          <ETHpoolFlexBox mt="4px">
            <Typography component="span" variant="h4" color="#14142A">
              15%
            </Typography>
          </ETHpoolFlexBox>
          <ETHpoolFlexBox mt="8px">
            <Box>
              <Typography component="p" variant="subtitle2" lineHeight="22px" color="#A0A3BD">
                Supply APY
              </Typography>
              <Typography mt="4px" component="p" variant="subtitle2" lineHeight="22px" color="#A0A3BD">
                Reward APY
              </Typography>
            </Box>
            <Box ml="8px">
              <Typography component="p" variant="subtitle2" lineHeight="22px" color="#6E7191">
                5%
              </Typography>
              <Typography mt="4px" component="p" variant="subtitle2" fontWeight="700" lineHeight="22px" color="#4BC8B1">
                15%
              </Typography>
            </Box>
          </ETHpoolFlexBox>
        </Box>
        <Box ml="24px">
          <ETHpoolFlexBox>
            <Typography component="span" variant="body1" fontWeight="700" color="#14142A" mr="6px">
              Borrow APY
            </Typography>
            <img src={promptIcon} alt="" />
          </ETHpoolFlexBox>
          <ETHpoolFlexBox mt="4px">
            <Typography component="span" variant="h4" color="#14142A">
              10%
            </Typography>
          </ETHpoolFlexBox>
          <ETHpoolFlexBox mt="8px">
            <Box>
              <Typography component="p" variant="subtitle2" lineHeight="22px" color="#A0A3BD">
                Supply APY
              </Typography>
              <Typography mt="4px" component="p" variant="subtitle2" lineHeight="22px" color="#A0A3BD">
                Reward APY
              </Typography>
            </Box>
            <Box ml="8px">
              <Typography component="p" variant="subtitle2" lineHeight="22px" color="#6E7191">
                -10%
              </Typography>
              <Typography mt="4px" component="p" variant="subtitle2" fontWeight="700" lineHeight="22px" color="#4BC8B1">
                20%
              </Typography>
            </Box>
          </ETHpoolFlexBox>
        </Box>
      </ETHpoolFlexBox>
    </ETHpoolBox>
  )
}
