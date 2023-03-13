import { Box, styled, Typography, Button, Checkbox } from '@mui/material'
import mobileButtonRight from 'assets/images/svg/dashboard/mobileButtonRight.svg'
import mobileMyETHCollateralPrompt from 'assets/images/svg/dashboard/mobileMyETHCollateralPrompt.svg'
import mobileChecked from 'assets/images/svg/dashboard/mobileChecked-Icon.svg'
import mobileChecked2 from 'assets/images/svg/dashboard/mobileChecked2-Icon.svg'
import { useMemo, useState } from 'react'
import {
  useBorrowLimit,
  useEthCollateral,
  useEthDebt,
  useEthLiquidity,
  useUsedCollateral,
  useUserValue,
} from 'state/user/hooks'
import { fixedFormat, times } from 'utils'
import { toast } from 'react-toastify'
import BigNumber from 'bignumber.js'
import { getWETH } from 'config'
import MobileMySupplySwitchModal from './MobileMySupplySwitchModal'
import { useActiveWeb3React } from 'hooks/web3'
import { useLendingPool } from 'hooks/useLendingPool'
import { useAppDispatch } from 'state/hooks'
import { setUsedCollateral } from 'state/user/reducer'
import MobileMySupplySwitchUnableOffModal from './MobileMySupplySwitchUnableOffModal'
import { SpaceBetweenBox, SpaceBox } from 'styleds'

const MyETHCollateralBox = styled(Box)`
  background: linear-gradient(249.47deg, #6aa2f7 0%, #627eea 100%);
  box-shadow: 0 0.5rem 1rem rgba(128, 139, 238, 0.3), inset 0 0.0625rem 0.1875rem rgba(170, 189, 255, 0.7);
  border-radius: 0.5rem;
  padding: 1rem 1rem 0.75rem 1rem;
  margin-top: 1rem;
  .Padding-button {
    min-width: 5.75rem;
    height: 2.25rem;
    padding: 0.5625rem 0.875rem 0.5625rem;
  }
  .MuiCheckbox-root {
    height: 1rem;
    width: 1rem;
    padding: 0;
    margin: 0;
  }
`
const FlexEndBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const NFTsBox = styled(Box)`
  width: 5.0625rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
`
const MyETHRightBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const NetSupplyAPYBox = styled(Box)`
  background: rgba(217, 217, 217, 0.1);
  width: 56.272%;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-end;
  padding: 0.375rem 0.5rem 0.375rem 0.6875rem;
  margin-top: 0.625rem;
  ::before {
    content: '';
    display: block;
    position: absolute;
    right: calc(50% - 2.2813rem);
    bottom: calc(100%);
    border-width: 0.375rem 0.3125rem;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent rgba(217, 217, 217, 0.1) transparent;
  }
`
const NetSupplyBox = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.375rem 0.5rem 0.375rem 0.6875rem;
  margin-top: 0.25rem;
`
const CheckboxImg = styled(`img`)``
interface MobileMyETHCollateralProps {
  setOpenMySupplyModal: Function
  setTypeModal: Function
}
export default function MobileMyETHCollateral({ setOpenMySupplyModal, setTypeModal }: MobileMyETHCollateralProps) {
  const ethCollateral = useEthCollateral()
  const ethLiquidity = useEthLiquidity()
  const usedCollateral = useUsedCollateral()
  const [switchUnableOffModal, setSwitchUnableOffModal] = useState<boolean>(false)
  const [openMySupplySwitchModal, setOpenMySupplySwitchModal] = useState<boolean>(false)
  const { chainId } = useActiveWeb3React()
  const ethDebt = useEthDebt()
  const contract = useLendingPool()
  const [dataType] = useState<boolean>(true)
  const userValue = useUserValue()
  const dispatch = useAppDispatch()
  const timesEthBorrowLimit = useBorrowLimit(times(ethCollateral, -1))
  const [switchType, setSwitchType] = useState<number>(0) // SwitchModal 关->开 ro 开->关
  const loanType = useMemo(() => {
    return +ethDebt === 0
  }, [ethDebt])
  const changeUsedAsCollateral = () => {
    if (contract) {
      contract.setUserUsingAsCollateral(getWETH(chainId), !usedCollateral).then(() => {
        toast.success('success')
        dispatch(setUsedCollateral(!usedCollateral))
      })
    }
  }
  return (
    <MyETHCollateralBox>
      <Box>
        <SpaceBetweenBox>
          <Typography variant="body2" color="#ffffff">
            My ETH Collateral
          </Typography>
          <FlexEndBox>
            {usedCollateral ? (
              <Typography mt="-0.3125rem" mr="0.5rem" variant="body2" fontWeight="700" color="#ffffff">
                Used as Collateral
              </Typography>
            ) : (
              <Typography
                mr="0.5rem"
                variant="body2"
                fontWeight="700"
                color="
              rgba(255, 255, 255, 0.7)"
              >
                Use as Collateral
              </Typography>
            )}
            <Checkbox
              sx={{ width: '1rem', height: '1rem' }}
              disabled={!dataType}
              icon={<CheckboxImg src={mobileChecked2} alt="" />}
              checkedIcon={<CheckboxImg src={mobileChecked} alt="" />}
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
            />
          </FlexEndBox>
        </SpaceBetweenBox>
        <Typography
          sx={{ textOverflow: 'ellipsis', maxWidth: '17.625rem', overflow: 'hidden' }}
          mt="0.25rem"
          variant="subtitle1"
          fontWeight="700"
          color="#ffffff"
        >
          {fixedFormat(ethLiquidity)}{' '}
          <Typography variant="body1" component="span" fontWeight="700" color="#ffffff">
            ETH
          </Typography>
        </Typography>
        <SpaceBox>
          {!usedCollateral ? (
            <NetSupplyBox>
              <Typography
                mr="0.5rem"
                variant="body2"
                component="span"
                lineHeight="0.75rem"
                fontWeight="600"
                color="#ffffff"
              >
                30%{' '}
                <Typography lineHeight="0.75rem" variant="body2" color="#ffffff" component="span">
                  Net Supply APY
                </Typography>
              </Typography>
              <img src={mobileMyETHCollateralPrompt} alt="" />
            </NetSupplyBox>
          ) : (
            <NFTsBox
              onClick={() => {
                setOpenMySupplyModal(true)
                setTypeModal(2)
              }}
            >
              <Typography variant="body2" fontWeight="600" lineHeight="0.75rem" color="#ffffff">
                Withdraw {'>'}
              </Typography>
            </NFTsBox>
          )}
          <MyETHRightBox>
            <FlexEndBox mb={!usedCollateral ? '0.25rem' : '0'}>
              <Button
                onClick={() => {
                  setOpenMySupplyModal(true)
                  setTypeModal(1)
                }}
                className="Padding-button"
                variant="contained"
                color="secondary"
              >
                <Typography variant="body2" ml="0.375rem" component="span" fontWeight="700" color="#578AEB">
                  Supply
                </Typography>
                <img src={mobileButtonRight} alt="" />
              </Button>
            </FlexEndBox>
          </MyETHRightBox>
        </SpaceBox>
      </Box>
      {usedCollateral && (
        <FlexEndBox>
          <NetSupplyAPYBox>
            <Typography
              mr="0.5rem"
              variant="body2"
              component="span"
              lineHeight="0.75rem"
              fontWeight="600"
              color="#ffffff"
            >
              30%{' '}
              <Typography lineHeight="0.75rem" variant="body2" color="#ffffff" component="span">
                Net Supply APY
              </Typography>
            </Typography>
            <img src={mobileMyETHCollateralPrompt} alt="" />
          </NetSupplyAPYBox>
        </FlexEndBox>
      )}
      <MobileMySupplySwitchModal
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
      ></MobileMySupplySwitchModal>
      <MobileMySupplySwitchUnableOffModal
        switchUnableOffModal={switchUnableOffModal}
        NFTCollateralType={userValue.NFTLiquidity}
        setSwitchUnableOffModal={setSwitchUnableOffModal}
      ></MobileMySupplySwitchUnableOffModal>
    </MyETHCollateralBox>
  )
}
