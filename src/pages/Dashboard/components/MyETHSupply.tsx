import { Box, Button, styled, Switch, Typography } from '@mui/material'
import greyPrompt from 'assets/images/svg/common/greyPrompt.svg'
import MyETHSupplyBg from 'assets/images/svg/dashboard/MyETHSupplyBg.svg'
import rightBox from 'assets/images/svg/dashboard/rightBox.svg'
import addBox from 'assets/images/svg/dashboard/addBox.svg'
import ButtonSupply from 'assets/images/svg/dashboard/Button-Supply.svg'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import { useMemo, useState } from 'react'
import MySupplyModal from './MySupplyModal'
import MySupplySwitchModal from './MySupplySwitchModal'
import {
  useErc20ReserveData,
  useEthCollateral,
  useEthDebt,
  useNftCollateral,
  useUsedCollateral,
} from 'state/user/hooks'
import { useLendingPool } from 'hooks/useLendingPool'
import { toast } from 'react-toastify'
import { ERC20_ADDRESS, gasLimit } from 'config'
import { useAppDispatch } from 'state'
import { setUsedCollateral } from 'state/user/reducer'
import { fixedFormat } from 'utils'
// import { useWalletBalance } from 'state/user/hooks'

const MyETHSupplyBox = styled(Box)`
  width: 322px;
  height: 333px;
  margin-left: 24px;
  position: relative;
`
const TopBox = styled(Box)`
  width: 322px;
  padding: 24px 24px;
  height: 98px;
  top: 0px;
  position: absolute;
  background-image: url(${MyETHSupplyBg});
  background-repeat: no-repeat;
`
const ButtonBox = styled(Box)`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  height: 28px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`
const TypographyButton = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  color: #ffffff;
  opacity: 0.8;
`
const BottomBox = styled(Box)`
  padding: 36px 16px;
  width: 322px;
  top: 86px;
  height: 247px;
  position: absolute;
  background: linear-gradient(180deg, #ffffff 49.8%, rgba(255, 255, 255, 0) 100%);
  box-shadow: 0px 5px 10px #f8f8fd;
  .left {
    margin-left: 8px;
  }
`
const BottomTopBox = styled(Box)`
  width: 290px;
  padding: 3px 10px 3px 8px;
  background: #f7f7fc;
  border-radius: 4px;
  margin-bottom: 34px;
`
const RewardAPYBox = styled(Box)`
  width: 274px;
  height: 48px;
  margin-bottom: 16px;
  margin-left: 8px;
`
const ImgBox = styled('img')`
  width: 18px;
  height: 18px;
`
interface MyETHSupplyProps {
  type: number
  loading: boolean
}
export default function MyETHSupply({ type, loading }: MyETHSupplyProps) {
  const [openMySupplyModal, setOpenMySupplyModal] = useState(false)
  const [dataType] = useState<boolean>(true)
  const [typeModal, setTypeModal] = useState<number>(1) // MySupplyModal State Supply(1) ro Withdraw(0)
  const [openMySupplySwitchModal, setOpenMySupplySwitchModal] = useState<boolean>(false)
  const [switchType, setSwitchType] = useState<number>(0) // SwitchModal 关->开 ro 开->关
  const erc20ReserveData = useErc20ReserveData()
  const contract = useLendingPool()
  const ethDebt = useEthDebt()
  const ethCollateral = useEthCollateral()
  const nftCollateral = useNftCollateral()
  const usedCollateral = useUsedCollateral()
  const dispatch = useAppDispatch()
  const loanType = useMemo(() => {
    return +ethDebt === 0
  }, [ethDebt])
  const changeUsedAsCollateral = () => {
    if (contract) {
      contract.setUserUsingAsCollateral(ERC20_ADDRESS, !usedCollateral, { gasLimit }).then(() => {
        toast.success('success')
        dispatch(setUsedCollateral(!usedCollateral))
      })
    }
  }
  return (
    <MyETHSupplyBox>
      <BottomBox>
        <BottomTopBox>
          <SpaceBetweenBox>
            <FlexBox>
              <Typography variant="body1" mr="8px" fontWeight="700" color="#6E7191">
                Used as Collateral
              </Typography>
              <img width="14px" height="14px" src={greyPrompt} alt="" />
            </FlexBox>
            <Switch
              disabled={!dataType}
              checked={usedCollateral}
              onClick={(event: any) => {
                if (event.target.checked) {
                  setOpenMySupplySwitchModal(true)
                  setSwitchType(1)
                } else {
                  setOpenMySupplySwitchModal(true)
                  setSwitchType(0)
                }
              }}
            />
          </SpaceBetweenBox>
        </BottomTopBox>
        <RewardAPYBox>
          <FlexBox>
            <Box width="55px">
              <Typography variant="subtitle2" color="#4BC8B1">
                20%
              </Typography>
            </Box>
            <ImgBox src={addBox} alt="" />
            <Box ml="22px" width="51px">
              <Typography variant="subtitle2" color="#6E7191">
                {erc20ReserveData.depositRate}%
              </Typography>
            </Box>
            <ImgBox src={rightBox} alt="" />
            <Box>
              <Typography ml="22px" variant="subtitle2" color="#4E4B66">
                30%
              </Typography>
            </Box>
          </FlexBox>
          <FlexBox>
            <Box width="95px">
              <Typography variant="body2" color=" #A0A3BD">
                Reward APY
              </Typography>
            </Box>
            <Box width="91px">
              <Typography variant="body2" fontWeight="600" color=" #A0A3BD">
                Supply APY
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="600" color="#4E4B66">
                Net Supply APY
              </Typography>
            </Box>
          </FlexBox>
        </RewardAPYBox>
        <Button
          sx={{ width: '274px', marginLeft: '8px', height: '48px' }}
          variant="contained"
          onClick={() => {
            setTypeModal(1)
            setOpenMySupplyModal(true)
          }}
        >
          Supply
          <img className="left" src={ButtonSupply} alt="" />
        </Button>
      </BottomBox>
      <TopBox>
        <Typography mb="12px" variant="body1" color=" rgba(255, 255, 255, 0.7)" lineHeight="14px">
          My ETH Supply
        </Typography>
        <SpaceBetweenBox>
          <FlexBox>
            <Typography variant="h5" fontWeight="600" color="#ffffff" lineHeight="22px">
              {fixedFormat(ethCollateral)}
            </Typography>
            <Typography ml="8px" variant="subtitle1" fontWeight="700" color="#ffffff" lineHeight="18px">
              ETH
            </Typography>
          </FlexBox>
          {dataType && (
            <ButtonBox
              onClick={() => {
                setTypeModal(2)
                setOpenMySupplyModal(true)
              }}
            >
              <TypographyButton>Withdraw</TypographyButton>
            </ButtonBox>
          )}
        </SpaceBetweenBox>
      </TopBox>
      <MySupplyModal
        openMySupplyModal={openMySupplyModal}
        setOpenMySupplyModal={setOpenMySupplyModal}
        type={typeModal}
        mySupply={ethCollateral.replace(/,/g, '')}
      ></MySupplyModal>
      <MySupplySwitchModal
        loanType={loanType}
        ETHCollateralType={ethCollateral}
        NFTCollateralType={nftCollateral}
        switchType={switchType}
        openMySupplySwitchModal={openMySupplySwitchModal}
        handle={(type: string) => {
          setOpenMySupplySwitchModal(!openMySupplySwitchModal)
          if (type === 'enable') {
            changeUsedAsCollateral()
          }
        }}
      ></MySupplySwitchModal>
    </MyETHSupplyBox>
  )
}
