import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox } from 'styleds'
import DepositBefore from 'assets/images/svg/deposit/Deposit-before.svg'
import MobileDeposit from './MobileDeposit'
import MobileWithdraw from './MobileWithdraw'
import { NftTokenModel } from 'services/type/nft'
import { Nft } from '@alch/alchemy-sdk'

const MainBox = styled(SpaceBetweenBox)`
  width: 100%;
  background: #eff0f6;
  border-radius: 40px;
  padding: 0.25rem;
  margin-top: 1rem;
`
const DepositBox = styled(Box)`
  padding: 0.5625rem 2.9063rem 0.5625rem 2.6563rem;
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
  border-radius: 1.5625rem;
  &.open {
    background: linear-gradient(180deg, #2d2d50 0%, #14142a 100%);
    box-shadow: 0px 5px 10px rgba(110, 113, 145, 0.05), inset 0px 2px 2px rgba(255, 255, 255, 0.2);
    border-radius: 1.5625rem;
  }
`
const WithdrawBox = styled(Box)`
  padding: 0.5rem 2.4688rem 0.5rem 2.2188rem;
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: inset 0px 0.125rem 0.125rem rgba(255, 255, 255, 0.1);
  border-radius: 1.5625rem;
  &.open {
    background: linear-gradient(180deg, #2d2d50 0%, #14142a 100%);
    box-shadow: 0px 5px 10px rgba(110, 113, 145, 0.05), inset 0px 2px 2px rgba(255, 255, 255, 0.2);
    border-radius: 1.5625rem;
  }
`
const BeforeImg = styled(`img`)`
  position: absolute;
  top: calc(100% - 13px);
  left: calc(50% - 19px);
`
interface MobileDepositRoWithdrawProps {
  setType: Function
  type: number
  TestWithdrawList: Array<Nft>
  withdrawList: NftTokenModel[]
  depositedList: NftTokenModel[]
  mobileWithdrawCheckedIndex: Array<string>
  mobileDepositCheckedIndex: Array<string>
  setMobileWithdrawCheckedIndex: Function
  setMobileDepositCheckedIndex: Function
}
export default function MobileDepositRoWithdraw({
  setType,
  type,
  withdrawList,
  TestWithdrawList,
  depositedList,
  mobileWithdrawCheckedIndex,
  mobileDepositCheckedIndex,
  setMobileWithdrawCheckedIndex,
  setMobileDepositCheckedIndex,
}: MobileDepositRoWithdrawProps) {
  return (
    <>
      <MainBox>
        <DepositBox
          className={type === 1 ? 'open' : ''}
          onClick={() => {
            if (type !== 1) {
              setType(1)
            }
          }}
        >
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.5 12.5V15.1667C4.5 15.6269 4.8731 16 5.33333 16H15.5C16.0523 16 16.5 15.5523 16.5 15V12.5"
              stroke={type === 1 ? 'white' : '#14142A'}
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 10V4"
              stroke={type === 1 ? 'white' : '#14142A'}
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.8896 10C8.53634 10 8.34335 10.412 8.56951 10.6834L10.1799 12.6159C10.3465 12.8158 10.6535 12.8158 10.8201 12.6159L12.4305 10.6834C12.6566 10.412 12.4637 10 12.1104 10L8.8896 10Z"
              fill={type === 1 ? 'white' : '#14142A'}
            />
          </svg>
          <Typography ml="0.25rem" variant="body1" fontWeight="600" color={type === 2 ? '#14142A' : '#ffffff'}>
            Deposit
          </Typography>
          {type === 1 && <BeforeImg src={DepositBefore} alt=""></BeforeImg>}
        </DepositBox>
        <WithdrawBox
          className={type === 2 ? 'open' : ''}
          onClick={() => {
            if (type !== 2) {
              setType(2)
            }
          }}
        >
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.5 12.5V15.1667C4.5 15.6269 4.8731 16 5.33333 16H15.5C16.0523 16 16.5 15.5523 16.5 15V12.5"
              stroke={type === 2 ? 'white' : '#14142A'}
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 13C10 10 11 7.5 14.5 6.5"
              stroke={type === 2 ? 'white' : '#14142A'}
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.3669 5.11127C13.2449 4.77975 13.5649 4.45633 13.8977 4.57483L16.2675 5.41865C16.5126 5.50594 16.6186 5.79407 16.4886 6.01944L15.2312 8.1982C15.0547 8.50417 14.6014 8.46538 14.4793 8.13385L13.3669 5.11127Z"
              fill={type === 2 ? 'white' : '#14142A'}
            />
          </svg>
          <Typography ml="0.25rem" variant="body1" fontWeight="600" color={type === 1 ? '#14142A' : '#ffffff'}>
            Withdraw
          </Typography>
          {type === 2 && <BeforeImg src={DepositBefore} alt=""></BeforeImg>}
        </WithdrawBox>
      </MainBox>
      {type === 1 ? (
        <MobileDeposit
          depositedList={depositedList}
          mobileDepositCheckedIndex={mobileDepositCheckedIndex}
          setMobileDepositCheckedIndex={setMobileDepositCheckedIndex}
          onChange={(data: Array<string>) => {
            setMobileDepositCheckedIndex(data)
          }}
        ></MobileDeposit>
      ) : (
        <MobileWithdraw
          mobileWithdrawCheckedIndex={mobileWithdrawCheckedIndex}
          setMobileWithdrawCheckedIndex={setMobileWithdrawCheckedIndex}
          list={withdrawList}
          TestWithdrawList={TestWithdrawList}
          onChange={(data: Array<string>) => {
            setMobileWithdrawCheckedIndex(data)
          }}
        ></MobileWithdraw>
      )}
    </>
  )
}
