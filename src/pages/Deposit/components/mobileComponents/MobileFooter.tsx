import { Box, Button, styled, Typography } from '@mui/material'
import { SpaceBetweenBox } from 'styleds'
import { NftTokenModel } from 'services/type/nft'
import { Nft } from '@alch/alchemy-sdk'
import MobileWithdrawSelectedModal from './MobileWithdrawSelectedModal'
import { useMemo, useState } from 'react'
import MobileSureModal from './MobileSureModal'

const FooterBox = styled(Box)`
  margin-top: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #eff0f6;
  padding: 0 -1rem;
  padding: 0 1rem 0 1.5rem;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
  transition: height 0.75s;
`
const ResetButton = styled(Box)`
  display: flex;
  align-items: center;
`
const WithdrawButton = styled(Box)`
  padding: 13px 16px;
  background: rgba(225, 83, 108, 0.1);
  border-radius: 6px;
`
interface MobileFooterProps {
  type: number
  depositedList: NftTokenModel[]
  withdrawList: NftTokenModel[]
  withdrawAmount: string
  TestWithdrawList: Array<Nft>
  setMobileDepositCheckedIndex: Function
  setMobileWithdrawCheckedIndex: Function
  withdrawLargeAmount: boolean
  mobileWithdrawCheckedIndex: Array<string>
  mobileDepositCheckedIndex: Array<string>
}
export default function MobileFooter({
  type,
  depositedList,
  withdrawAmount,
  setMobileWithdrawCheckedIndex,
  setMobileDepositCheckedIndex,
  TestWithdrawList,
  withdrawList,
  withdrawLargeAmount,
  mobileWithdrawCheckedIndex,
  mobileDepositCheckedIndex,
}: MobileFooterProps) {
  const [openSelect, setOpenSelect] = useState<boolean>(false)
  const [openSureModal, setOpenSureModal] = useState<boolean>(false)
  const modalType = useMemo(() => {
    return type === 1 ? 'deposit' : 'withdraw'
  }, [type])
  return (
    <FooterBox
      sx={{
        height: `${
          mobileWithdrawCheckedIndex.length !== 0 || mobileDepositCheckedIndex.length !== 0 ? '101px' : '0px'
        }`,
      }}
      display={type === 1 ? (depositedList.length === 0 ? 'none' : '') : withdrawList.length === 0 ? 'none' : ''}
    >
      <SpaceBetweenBox m="1rem 0 2.25rem 0">
        <ResetButton
          onClick={() => {
            setOpenSureModal(true)
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="30" height="30" rx="15" fill="#EFF0F6" />
            <path
              d="M11.0225 11.0225C10.0046 12.0404 9.375 13.4467 9.375 15C9.375 18.1066 11.8934 20.625 15 20.625C18.1066 20.625 20.625 18.1066 20.625 15C20.625 11.8934 18.1066 9.375 15 9.375"
              stroke="#A0A3BD"
              strokeWidth="1.36364"
              strokeLinecap="round"
            />
            <path
              d="M16.3349 11.8859L14.407 9.09577L17.354 7.41733"
              stroke="#A0A3BD"
              strokeWidth="1.36364"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography ml="0.5rem" color="#A0A3BD" variant="body1" fontWeight="600">
            Redo
          </Typography>
        </ResetButton>
        {type === 1 ? (
          <Button
            onClick={() => {
              setOpenSelect(true)
            }}
            variant="contained"
          >
            Deposit {mobileDepositCheckedIndex.length || 0} NFTs
          </Button>
        ) : (
          <>
            {withdrawLargeAmount ? (
              <WithdrawButton>
                <Typography
                  onClick={() => {
                    setOpenSelect(true)
                  }}
                  variant="body1"
                  fontWeight="700"
                  color="#E1536C"
                >
                  Withdraw {mobileWithdrawCheckedIndex.length || 0} NFT
                </Typography>
              </WithdrawButton>
            ) : (
              <Button
                onClick={() => {
                  setOpenSelect(true)
                }}
                variant="contained"
              >
                Withdraw {mobileWithdrawCheckedIndex.length || 0} NFT
              </Button>
            )}
          </>
        )}
      </SpaceBetweenBox>
      <MobileWithdrawSelectedModal
        type={modalType}
        checkedIndex={type === 1 ? mobileDepositCheckedIndex : mobileWithdrawCheckedIndex}
        amount={withdrawAmount}
        amountList={withdrawList.filter((el) => mobileWithdrawCheckedIndex.includes(el.id.split('-')[2]))}
        data={TestWithdrawList.filter((el) => mobileWithdrawCheckedIndex.includes(el.tokenId))}
        depositData={depositedList.filter((el) => mobileDepositCheckedIndex.includes(el.tokenId))}
        open={openSelect}
        close={setOpenSelect}
      ></MobileWithdrawSelectedModal>
      <MobileSureModal
        type={modalType}
        setOpenSureModal={setOpenSureModal}
        openSureModal={openSureModal}
        setMobileWithdrawCheckedIndex={setMobileWithdrawCheckedIndex}
        setMobileDepositCheckedIndex={setMobileDepositCheckedIndex}
      ></MobileSureModal>
    </FooterBox>
  )
}
