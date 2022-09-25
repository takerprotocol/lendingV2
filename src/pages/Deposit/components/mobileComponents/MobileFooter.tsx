import { Box, Button, styled, Typography } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import { NftTokenModel } from 'services/type/nft'

const FooterBox = styled(Box)`
  margin-top: 1rem;
  background: #ffffff;
  border: 1px solid #eff0f6;
  padding: 0 -1rem;
  padding: 1rem 1rem 2.25rem 1.5rem;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
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
const MobileAbsolute = styled(FlexBox)`
  padding: 8px 8px 8px 16px;
  background: rgba(225, 83, 108, 0.1);
  backdrop-filter: blur(30px);
  position: absolute;
  border-radius: 4px;
  bottom: 1rem;
  right: 1rem;
  left: 1rem;
`
interface MobileFooterProps {
  type: number
  depositedList: NftTokenModel[]
  withdrawList: NftTokenModel[]
  withdrawLargeAmount: boolean
  mobileWithdrawCheckedIndex: Array<string>
  mobileDepositCheckedIndex: Array<string>
}
export default function MobileFooter({
  type,
  depositedList,
  withdrawList,
  withdrawLargeAmount,
  mobileWithdrawCheckedIndex,
  mobileDepositCheckedIndex,
}: MobileFooterProps) {
  return (
    <FooterBox
      display={type === 1 ? (depositedList.length === 0 ? 'none' : '') : withdrawList.length === 0 ? 'none' : ''}
    >
      <MobileAbsolute display={type === 2 && withdrawLargeAmount ? '' : 'none'}>
        <Typography variant="body2" fontWeight="600" mr="0.5rem" color="#E1536C">
          The amount of withdraw is too large and it is easy to be liquidated
        </Typography>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.4964 6.51071C14.7745 6.2326 14.7745 5.78169 14.4964 5.50357C14.2183 5.22546 13.7674 5.22546 13.4893 5.50357L10 8.99286L6.51071 5.50357C6.2326 5.22546 5.78169 5.22546 5.50357 5.50357C5.22546 5.78169 5.22546 6.2326 5.50357 6.51071L8.99286 10L5.50357 13.4893C5.22546 13.7674 5.22546 14.2183 5.50357 14.4964C5.78169 14.7745 6.2326 14.7745 6.51071 14.4964L10 11.0071L13.4893 14.4964C13.7674 14.7745 14.2183 14.7745 14.4964 14.4964C14.7745 14.2183 14.7745 13.7674 14.4964 13.4893L11.0071 10L14.4964 6.51071Z"
            fill="#E1536C"
          />
        </svg>
      </MobileAbsolute>
      <SpaceBetweenBox>
        <ResetButton>
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
          <Typography ml="0.5rem" variant="body1" fontWeight="600">
            Redo
          </Typography>
        </ResetButton>
        {type === 1 ? (
          <Button variant="contained">Deposit {mobileDepositCheckedIndex.length || 0} NFTs</Button>
        ) : (
          <>
            {withdrawLargeAmount ? (
              <WithdrawButton>
                <Typography variant="body1" fontWeight="700" color="#E1536C">
                  Withdraw {mobileWithdrawCheckedIndex.length || 0} NFT
                </Typography>
              </WithdrawButton>
            ) : (
              <Button variant="contained">Withdraw {mobileWithdrawCheckedIndex.length || 0} NFT</Button>
            )}
          </>
        )}
      </SpaceBetweenBox>
    </FooterBox>
  )
}
