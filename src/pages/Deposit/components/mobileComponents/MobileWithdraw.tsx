import { Box, styled, Typography, Checkbox } from '@mui/material'
import { useMemo, useState } from 'react'
import { SpaceBetweenBox, FlexBox, CenterBox } from 'styleds'
import { NftTokenModel } from 'services/type/nft'
import BigNumber from 'bignumber.js'
import { Nft } from '@alch/alchemy-sdk'
import depositNotChecked_Icon from 'assets/images/svg/deposit/depositNotChecked_Icon.svg'
import depositChecked_Icon from 'assets/images/svg/deposit/depositChecked_Icon.svg'
import { fromWei } from 'web3-utils'

const DepositBox = styled(Box)`
  background: #ffffff;
  position: relative;
  box-shadow: 0px 0.625rem 1.25rem rgba(218, 218, 238, 0.3);
  border-radius: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
`
const CardBox = styled(Box)`
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem 0 0.875rem 0.8125rem;
  &.isCheck {
    background: #f7f7fc;
  }
`
const DepositCheckbox = styled(Checkbox)`
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.375rem;
  margin-right: 0.8125rem;
`
const NameBox = styled(Box)`
  display: flex;
  align-items: flex-start;
`
const ImgBox = styled(`img`)`
  width: 3rem;
  height: 3rem;
  margin-bottom: 0.125rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
`
const MobileAbsolute = styled(FlexBox)`
  padding: 8px 8px 8px 16px;
  background: rgba(225, 83, 108, 0.1);
  backdrop-filter: blur(30px);
  position: absolute;
  border-radius: 4px;
  bottom: 0;
  right: 0;
  display: none;
`
interface MobileWithdrawProps {
  list: any[]
  TestWithdrawList: Array<Nft>
  setMobileWithdrawCheckedIndex: Function
  onChange: Function
  floorPrice: string
  mobileWithdrawCheckedIndex: Array<string>
}
export default function MobileWithdraw({
  list,
  floorPrice,
  TestWithdrawList,
  setMobileWithdrawCheckedIndex,
  mobileWithdrawCheckedIndex,
  onChange,
}: MobileWithdrawProps) {
  const [TypeKey] = useState<string>('mobileWithdraw')
  const amount = useMemo(() => {
    return list.reduce((total: string, current: any) => {
      return new BigNumber(total).plus(fromWei(floorPrice || '0')).toString()
    }, '0')
  }, [floorPrice, list])
  return (
    <DepositBox>
      <SpaceBetweenBox>
        <Typography variant="subtitle2">You Can Withdraw</Typography>
        <Typography variant="body2" display={list.length === 0 ? 'none' : ''} fontWeight="600" color="#a0a3bd">
          {list.length} NFTs / {amount} ETH
        </Typography>
      </SpaceBetweenBox>
      {TestWithdrawList.length !== 0 ? (
        <>
          {TestWithdrawList.map((el: NftTokenModel | Nft) => (
            <CardBox
              className={mobileWithdrawCheckedIndex.includes(el.tokenId) ? 'isCheck' : ' '}
              key={`nft${TypeKey}-${el.tokenId}`}
            >
              <FlexBox>
                <DepositCheckbox
                  sx={{ marginTop: `${mobileWithdrawCheckedIndex.includes(el.tokenId) ? '0.375rem' : '0'}` }}
                  checkedIcon={<img src={depositChecked_Icon} alt="" />}
                  icon={<img src={depositNotChecked_Icon} alt="" />}
                  checked={mobileWithdrawCheckedIndex.includes(el.tokenId)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      setMobileWithdrawCheckedIndex([...mobileWithdrawCheckedIndex, el.tokenId])
                    } else {
                      setMobileWithdrawCheckedIndex(mobileWithdrawCheckedIndex.filter((cel) => cel !== el.tokenId))
                    }
                  }}
                />
                <Box>
                  <NameBox>
                    <ImgBox src={el.media[0]?.gateway || ''} alt={`nft-${el.title}`}></ImgBox>
                    <Typography fontWeight="700" variant="body1">
                      {el.title}
                    </Typography>
                  </NameBox>
                </Box>
              </FlexBox>
            </CardBox>
          ))}{' '}
        </>
      ) : (
        <>
          <CenterBox mt="1.5rem">
            <Typography variant="subtitle2">0 NFTs</Typography>
          </CenterBox>
          <CenterBox mt="0.5rem" mb="1.25rem">
            <Typography variant="body2" fontWeight="600" color="#a0a3bd">
              You have no NFTs in this collection to withdraw
            </Typography>
          </CenterBox>
        </>
      )}
      <MobileAbsolute
      // display={type === 2 && withdrawLargeAmount ? '' : 'none'}
      >
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
    </DepositBox>
  )
}
