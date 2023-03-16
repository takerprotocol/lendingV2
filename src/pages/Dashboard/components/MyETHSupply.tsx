import { Box, Button, styled, Typography } from '@mui/material'
import MyETHSupplyBg from 'assets/images/svg/dashboard/MyETHSupplyBg.svg'
import rightBox from 'assets/images/svg/dashboard/rightBox.svg'
import MySupplySwitchUnableOffModal from './MySupplySwitchUnableOffModal'
import addBox from 'assets/images/svg/dashboard/addBox.svg'
// import ButtonSupply from 'assets/images/svg/dashboard/Button-Supply.svg'
import switchIcon from 'assets/images/svg/dashboard/Switch-icon.svg'
import { FlexBox, SpaceBetweenBox, SpaceBox } from 'styleds'
import { useEffect, useMemo, useState } from 'react'
import MySupplyModal from './MySupplyModal'
import MySupplySwitchModal from './MySupplySwitchModal'
import {
  // useBorrowLimit,
  useErc20ReserveData,
  useEthCollateral,
  useEthDebt,
  useEthLiquidity,
  // useHeath,
  // useNftCollateral,
  useUsedCollateral,
  useUserValue,
} from 'state/user/hooks'
import { useLendingPool } from 'hooks/useLendingPool'
// import { toast } from 'react-toastify'
import { getWETH } from 'config'
import { useAppDispatch } from 'state'
// import { setUsedCollateral } from 'state/user/reducer'
import { decimalFormat, fixedFormat } from 'utils'
// import TipsTooltip from './TipsTooltip'
import { useActiveWeb3React } from 'hooks/web3'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { setUsedCollateral } from 'state/user/reducer'
// import { useWalletBalance } from 'state/user/hooks'

const MyETHSupplyBox = styled(Box)`
  width: 322px;
  height: 333px;
  margin-left: 24px;
  position: relative;
  .open {
    width: 48px;
    background: linear-gradient(261.55deg, #6aa1f0 6.23%, #6e9df3 95.09%) !important;
    .MuiSwitch-thumb {
      background-color: '' !important;
      background-image: url(${switchIcon}) !important;
      background-repeat: no-repeat !important;
      background-position: center center !important;
    }
  }
`
const TopBox = styled(Box)`
  width: 322px;
  padding: 24px 24px 22px 24px;
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
  margin-top: 24px;
`
const TypographyButton = styled(Typography)`
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  color: #ffffff;
  opacity: 0.8;
`
const BottomBox = styled(Box)`
  padding: 36px 16px 24px 16px;
  width: 322px;
  top: 86px;
  height: 247px;
  position: absolute;
  background: linear-gradient(180deg, #ffffff 49.8%, rgba(255, 255, 255, 0) 100%);
  box-shadow: 0px 5px 10px #f8f8fd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  .left {
    margin-left: 8px;
  }
`
const BottomTopBox = styled(Box)`
  width: 290px;
  padding: 8px;
  background: #f7f7fc;
  border-radius: 4px;
  margin-bottom: 34px;
`
const RewardAPYBox = styled(Box)`
  width: 274px;
  height: 45px;
  margin-bottom: 16px;
  margin-left: 8px;
`
const ImgBox = styled('img')`
  width: 18px;
  height: 18px;
`
const FlexEndBox = styled(Box)`
  display: flex;
  align-items: flex-end;
`
interface MyETHSupplyProps {
  type: number
  loading: boolean
}
export default function MyETHSupply({ type, loading }: MyETHSupplyProps) {
  const { chainId } = useActiveWeb3React()
  const [switchUnableOffModal, setSwitchUnableOffModal] = useState<boolean>(false)
  const [openMySupplyModal, setOpenMySupplyModal] = useState(false)
  const [dataType] = useState<boolean>(true)
  const [typeModal, setTypeModal] = useState<number>(1) // MySupplyModal State Supply(1) ro Withdraw(0)
  const [openMySupplySwitchModal, setOpenMySupplySwitchModal] = useState<boolean>(false)
  const [switchType] = useState<number>(0) // SwitchModal 关->开 ro 开->关
  const erc20ReserveData = useErc20ReserveData()
  const contract = useLendingPool()
  const ethDebt = useEthDebt()
  const addTransaction = useTransactionAdder()
  // const heath = useHeath()
  const ethCollateral = useEthCollateral()
  const ethLiquidity = useEthLiquidity()
  // const nftCollateral = useNftCollateral()
  const userValue = useUserValue()
  const usedCollateral = useUsedCollateral()
  const dispatch = useAppDispatch()
  // const timesEthBorrowLimit = useBorrowLimit(times(ethCollateral, -1))
  const transactions = useAllTransactions()

  const flag = useMemo(() => {
    return Object.keys(transactions).filter((hash) => {
      const tx = transactions[hash]
      return tx && tx.receipt && tx.info.type === TransactionType.USE_COLLATERAL && isTransactionRecent(tx)
    }).length
  }, [transactions])
  useEffect(() => {
    if (flag) {
      dispatch(setUsedCollateral(!usedCollateral))
    }
  }, [dispatch, flag, usedCollateral])
  const loanType = useMemo(() => {
    return +ethDebt === 0
  }, [ethDebt])
  const changeUsedAsCollateral = () => {
    if (contract) {
      contract.setUserUsingAsCollateral(getWETH(chainId), !usedCollateral).then((res: any) => {
        addTransaction(res, {
          type: TransactionType.USE_COLLATERAL,
          value: !usedCollateral,
        })
        // toast.success('success')
        // dispatch(setUsedCollateral(!usedCollateral))
      })
    }
  }
  return (
    <MyETHSupplyBox>
      <BottomBox>
        <BottomTopBox>
          <SpaceBetweenBox px="4px">
            {/*<FlexBox>
               <Typography variant="body1" mr="8px" fontWeight="700" color="#6E7191">
                Used as Collateral
              </Typography>
              <TipsTooltip size="14" grey="grey" value={'1111111'}></TipsTooltip> 
            </FlexBox>
            <Switch
              className={usedCollateral ? 'open' : ''}
              disabled={!dataType}
              checked={usedCollateral}
              onClick={() => {
                if (!usedCollateral) {
                  setSwitchType(1)
                  setOpenMySupplySwitchModal(true)
                } else {
                  // if (!loanType && (+nftCollateral === 0 || new BigNumber(heath).lte(150))) {
                  if (!loanType && (+userValue.NFTLiquidity === 0 || new BigNumber(timesEthBorrowLimit).lt(ethDebt))) {
                    setSwitchUnableOffModal(true)
                  } else {
                    setSwitchType(0)
                    setOpenMySupplySwitchModal(true)
                  }
                }
              }}
            /> */}
            <Typography variant="body1" my="3px" fontWeight="600" color="#6E7191">
              Withdraw my Supply
            </Typography>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_11036_18939)">
                <path
                  d="M7.00016 4L11.9997 9L6.99972 14"
                  stroke="#4E4B66"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_11036_18939">
                  <rect width="18" height="18" fill="white" transform="translate(0 18) rotate(-90)" />
                </clipPath>
              </defs>
            </svg>
          </SpaceBetweenBox>
        </BottomTopBox>
        <RewardAPYBox>
          <FlexBox>
            <Box width="55px">
              <Typography variant="subtitle2" color="#4BC8B1">
                0%
              </Typography>
            </Box>
            <ImgBox src={addBox} alt="" />
            <Box ml="22px" overflow="hidden" width="51px">
              <Typography variant="subtitle2" color="#6E7191">
                {erc20ReserveData.depositRate}%
              </Typography>
            </Box>
            <ImgBox src={rightBox} alt="" />
            <Box>
              <Typography ml="22px" variant="subtitle2" color="#4E4B66">
                {erc20ReserveData.depositRate}%
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
          {/* <img className="left" src={ButtonSupply} alt="" /> */}
        </Button>
      </BottomBox>
      <TopBox>
        <SpaceBox>
          <Box>
            <Typography mb="12px" variant="body1" color=" rgba(255, 255, 255, 0.7)" lineHeight="14px">
              My ETH Supply
            </Typography>
            <FlexEndBox height={24}>
              <Typography variant="h5" mr="8px" fontWeight="600" color="#ffffff" lineHeight="22px">
                {fixedFormat(ethLiquidity)}
              </Typography>
              <Typography variant="subtitle1" fontWeight="700" color="#ffffff" lineHeight="18px">
                {' '}
                ETH
              </Typography>
            </FlexEndBox>
          </Box>
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
        </SpaceBox>
      </TopBox>
      <MySupplyModal
        openMySupplyModal={openMySupplyModal}
        setOpenMySupplyModal={setOpenMySupplyModal}
        type={typeModal}
        mySupply={decimalFormat(ethLiquidity.replace(/,/g, ''), 0)}
      ></MySupplyModal>
      <MySupplySwitchModal
        loanType={loanType}
        ETHCollateralType={ethCollateral}
        NFTCollateralType={userValue.NFTLiquidity}
        switchType={switchType}
        openMySupplySwitchModal={openMySupplySwitchModal}
        handle={(type: string) => {
          setOpenMySupplySwitchModal(!openMySupplySwitchModal)
          if (type === 'enable') {
            changeUsedAsCollateral()
          }
        }}
      ></MySupplySwitchModal>
      <MySupplySwitchUnableOffModal
        switchUnableOffModal={switchUnableOffModal}
        NFTCollateralType={userValue.NFTLiquidity}
        setSwitchUnableOffModal={setSwitchUnableOffModal}
      ></MySupplySwitchUnableOffModal>
    </MyETHSupplyBox>
  )
}
