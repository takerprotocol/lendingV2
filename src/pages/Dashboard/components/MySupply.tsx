import { Typography, Button, Box, styled, Switch } from '@mui/material'
import mySupplyIcon from 'assets/images/svg/dashboard/MySupply.svg'
import MySupplyModal from './MySupplyModal'
import { useState } from 'react'
import { useAddress, useWalletModalToggle } from 'state/application/hooks'
import MySupplySwitchModal from './MySupplySwitchModal'
const MySupplyBox = styled(Box)`
  width: 494px;
  height: 285px;
  padding: 24px;
  background: linear-gradient(82.46deg, #6994e4 1.88%, #878df8 51.18%, #9378df 100.62%);
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
`
const MySupplyFlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const MyETHBox = styled(Box)`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 77px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
`

export default function MySupply() {
  const [open, handle] = useState<boolean>(false)
  const [open1, handle1] = useState<boolean>(false)
  const [type, setType] = useState<number>(1)
  const toggleModal = useWalletModalToggle()
  const address = useAddress()
  return (
    <MySupplyBox>
      <MySupplyFlexBox>
        <Box>
          <Typography component="span" variant="h1" fontWeight="600" fontSize=" 28px" lineHeight="45px" color="#FFFFFF">
            My Supply
          </Typography>
        </Box>
        {address ? (
          <MySupplyFlexBox sx={{ justifyContent: 'flex-start' }}>
            <Typography
              component="span"
              variant="h1"
              fontWeight="600"
              fontSize=" 14px"
              lineHeight="22px"
              color="#FFFFFF"
            >
              Used as Collateral
            </Typography>
            <Box ml="6px" width="14px" mb="5px" height="14px" mr="12px">
              <img src={mySupplyIcon} alt="" />
            </Box>
            <Switch
              onClick={() => {
                handle1(true)
              }}
              defaultChecked
            />
          </MySupplyFlexBox>
        ) : (
          <Box></Box>
        )}
      </MySupplyFlexBox>
      <MyETHBox>
        {address ? (
          <Typography sx={{ opacity: 1 }} component="span" variant="h4" fontWeight="600" color="#FFFFFF">
            10.06 ETH
          </Typography>
        ) : (
          <Typography sx={{ opacity: 1 }} component="span" variant="subtitle2" color="#FFFFFF">
            Please connect wallet to view details
          </Typography>
        )}
      </MyETHBox>
      <MySupplyFlexBox mt="26px">
        {address ? (
          <Box>
            <Box>
              <Typography
                sx={{ opacity: 0.7 }}
                component="p"
                variant="h1"
                fontWeight="600"
                fontSize=" 14px"
                lineHeight="22px"
                color="#FFFFFF"
              >
                My Balance
              </Typography>
            </Box>
            <Box mt="2px">
              <Typography
                component="p"
                variant="h1"
                fontWeight="600"
                fontSize=" 18px"
                lineHeight="29px"
                color="#FFFFFF"
              >
                6.97 ETH
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
        {address ? (
          <Box>
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setType(2)
                handle1(true)
              }}
            >
              Withdraw
            </Button>
            <Button
              sx={{ ml: '12px' }}
              variant="contained"
              color="info"
              onClick={() => {
                setType(1)
                handle(true)
              }}
            >
              Supply
            </Button>
          </Box>
        ) : (
          <Button
            sx={{ width: ' 174px', height: '48px' }}
            variant="contained"
            color="info"
            onClick={() => {
              toggleModal()
            }}
          >
            Connect Wallet
          </Button>
        )}
      </MySupplyFlexBox>
      <MySupplyModal open={open} type={type} handle={handle}></MySupplyModal>
      <MySupplySwitchModal open1={open1} handle1={handle1}></MySupplySwitchModal>
    </MySupplyBox>
  )
}
