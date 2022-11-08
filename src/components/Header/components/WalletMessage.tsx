import { Box, styled, Tooltip, Typography } from '@mui/material'
import Copy from 'components/Copy'
import { CenterBox, FlexBox, SpaceBetweenBox } from 'styleds'
import { desensitization } from 'utils'
import Logout from 'assets/images/svg/common/Logout.svg'
import mobileWalletETHIcon from 'assets/images/svg/common/mobileWalletETHIcon.svg'
import mobileNotice from 'assets/images/svg/common/mobileNotice-icon.svg'
import Nfts1 from 'assets/images/svg/common/Nfts1.svg'
import mobileEth from 'assets/images/svg/dashboard/mobileEth-icon.svg'
// import mobileWarning from 'assets/images/svg/common/mobileWarning-icon.svg'
// import mobileConfirm from 'assets/images/svg/common/mobileConfirm-icon.svg'
import Blockies from 'react-blockies'
import { useAddress, useWalletBalance } from 'state/user/hooks'
import { useAppDispatch } from 'state/hooks'
import { setAddress } from 'state/user/reducer'
import { useWeb3React } from '@web3-react/core'
import { useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails, TransactionType } from 'state/transactions/types'
import dayjs from 'dayjs'
const WalletMessageBox = styled(Box)`
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem 1rem 1.5rem 1rem;
  margin: 1rem 1rem 0 1rem;
`
const WalletBalanceBox = styled(Box)`
  background: #f7f7fc;
  border-radius: 6px;
  margin-bottom: 2.25rem;
  padding: 0.5rem;
`
const StyledBlockie = styled(Blockies)`
  border-radius: 50%;
`
const LogoutBox = styled(Box)`
  height: 1.625rem;
`
// const EditBox = styled(Box)`
//   background: #f7f7fc;
//   border-radius: 0.375rem;
//   padding: 0.125rem 0.75rem;
// `
const ImgBox = styled(Box)`
  border-radius: 0.25rem;
  margin: 0.5rem 0.25rem 0.5rem 0;
  width: 24px;
  height: 24px;
`
export default function WalletMessage() {
  const address = useAddress()
  const dispatch = useAppDispatch()
  const balance = useWalletBalance()
  const { deactivate } = useWeb3React()
  const transactions = useAllTransactions()
  const getNoticeTitle = (transaction: TransactionDetails) => {
    switch (transaction.info.type) {
      case TransactionType.APPROVAL:
        return 'Approval'
      case TransactionType.BORROW:
        return `Borrow ${transaction.info.amount} ETH`
      case TransactionType.REPAY:
        return `Repay ${transaction.info.amount} ETH`
      case TransactionType.DEPOSIT:
        return `Deposit ${transaction.info.amount} ETH`
      case TransactionType.WITHDRAW:
        return `Withdraw ${transaction.info.amount} ETH`
      default:
        return 'Approval'
    }
  }
  return (
    <WalletMessageBox>
      <WalletBalanceBox>
        <SpaceBetweenBox>
          <CenterBox>
            <StyledBlockie seed={address} size={12} scale={2} />
            <Typography variant="subtitle2" component="h1" ml="8px" mr="14px" color="#6E7191">
              {desensitization(address)}
            </Typography>
            <Copy text={address} />
          </CenterBox>
          <LogoutBox
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              dispatch(setAddress(''))
              deactivate()
            }}
          >
            <img src={Logout} alt="" />
          </LogoutBox>
        </SpaceBetweenBox>
        <CenterBox mt="1rem" mb="0.1875rem">
          <Typography variant="body1">Wallet Balance</Typography>
        </CenterBox>
        <CenterBox mb="0.5rem">
          <img src={mobileWalletETHIcon} alt="" />
          <Typography
            ml="0.25rem"
            component="span"
            fontSize="1.5rem"
            lineHeight="160%"
            fontWeight="700"
            color="#7646FF"
          >
            {balance}
          </Typography>
        </CenterBox>
      </WalletBalanceBox>
      <Box ml="0.5rem" mr="0.5rem">
        {/* <SpaceBetweenBox marginY="2rem">
          <Box>
            <FlexBox>
              <img src={mobileEmail} alt="" />
              <Typography ml="0.375rem" variant="body1" component="span" fontWeight="700">
                Email address
              </Typography>
            </FlexBox>
            <Typography mt="0.25rem" variant="subtitle2" color="#A0A3BD">
              Address123@gmail.com
            </Typography>
          </Box>
          <EditBox>
            <Typography variant="body1" fontWeight="600" color="#A0A3BD">
              Edit
            </Typography>
          </EditBox>
        </SpaceBetweenBox> */}
        <Box>
          <FlexBox>
            <img src={mobileNotice} alt="" />
            <Typography ml="0.375rem" variant="body1" fontWeight="700">
              Latest notifications
            </Typography>
          </FlexBox>
          {Object.keys(transactions).map((hash) => (
            <>
              <SpaceBetweenBox ml="1.5rem" mb="0.24rem" mt="1rem">
                <Typography variant="body2" lineHeight="0.75rem" color="#A0A3BD" fontWeight="500">
                  {dayjs(transactions[hash].addedTime).format('MMMM D, YYYY')}
                </Typography>
                <Typography variant="body2" lineHeight="0.75rem" color="#A0A3BD" fontWeight="500">
                  {dayjs(transactions[hash].addedTime).format('h:mm A')}
                </Typography>
              </SpaceBetweenBox>
              {/* <Box>
                <FlexBox>
                  <img src={mobileWarning} alt="" />
                  <Typography ml="0.375rem" variant="body1" fontWeight="700">
                    Deposit Failed
                  </Typography>
                </FlexBox>
                <Box ml="1.5rem">
                  <Typography variant="body2" color="#6E7191" fontWeight="500">
                    Here is the long text version of the failure reason, the text box is up to 251 pixels wide
                  </Typography>
                </Box>
                <SpaceBetweenBox m="1rem 0 0.24rem 1.5rem">
                  <Typography variant="body2" lineHeight="0.75rem" color="#A0A3BD" fontWeight="500">
                    Dec. 20, 2022
                  </Typography>
                  <Typography variant="body2" lineHeight="0.75rem" color="#A0A3BD" fontWeight="500">
                    9:36 PM
                  </Typography>
                </SpaceBetweenBox>
              </Box> */}
              {/* <Box>
                <FlexBox>
                  <img src={mobileConfirm} alt="" />
                  <Typography ml="0.375rem" variant="body1" fontWeight="700">
                    Withdraw 7 NFTs
                  </Typography>
                </FlexBox>
                <FlexBox mt="0.24rem" ml="1.5rem">
                  <Typography color="#4E4B66" variant="body2">
                    Txid
                  </Typography>
                  <Typography mx="0.5rem" color="#4E4B66" variant="body2">
                    0x5068L3NJSL58O932
                  </Typography>
                  <Copy text={address} />
                </FlexBox>
                <SpaceBetweenBox m="1rem 0 0.24rem 1.5rem">
                  <Typography variant="body2" lineHeight="0.75rem" color="#A0A3BD" fontWeight="500">
                    Dec. 20, 2022
                  </Typography>
                  <Typography variant="body2" lineHeight="0.75rem" color="#A0A3BD" fontWeight="500">
                    9:36 PM
                  </Typography>
                </SpaceBetweenBox>
              </Box> */}
              <Box>
                <FlexBox>
                  <img src={mobileEth} alt="" />
                  <Typography ml="0.375rem" variant="body1" fontWeight="700">
                    {getNoticeTitle(transactions[hash])}
                  </Typography>
                </FlexBox>
                <FlexBox ml="1.5rem">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                    return (
                      <ImgBox key={index}>
                        <Tooltip title={'123456'} arrow placement="top">
                          <img width="24px" height="24px" src={Nfts1} alt="" />
                        </Tooltip>
                      </ImgBox>
                    )
                  })}
                </FlexBox>
                <FlexBox ml="1.5rem">
                  <Typography color="#4E4B66" variant="body2">
                    Txid
                  </Typography>
                  <Typography mx="0.5rem" color="#4E4B66" variant="body2">
                    {desensitization(hash)}
                  </Typography>
                  <Copy color={'Txid'} text={hash} />
                </FlexBox>
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </WalletMessageBox>
  )
}
