import { Box, styled, Typography, Checkbox } from '@mui/material'
import { useMemo, useState } from 'react'
import { SpaceBetweenBox, FlexBox, CenterBox } from 'styleds'
import { NftTokenModel } from 'services/type/nft'
import BigNumber from 'bignumber.js'
import { Nft } from '@alch/alchemy-sdk'
const DepositBox = styled(Box)`
  background: #ffffff;
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
const NameBox = styled(Box)`
  display: flex;
  align-items: flex-start;
`
const ImgBox = styled(`img`)`
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
`
interface MobileWithdrawProps {
  list: any[]
  TestWithdrawList: Array<Nft>
  setMobileWithdrawCheckedIndex: Function
  onChange: Function
  mobileWithdrawCheckedIndex: Array<string>
}
export default function MobileWithdraw({
  list,
  TestWithdrawList,
  setMobileWithdrawCheckedIndex,
  mobileWithdrawCheckedIndex,
  onChange,
}: MobileWithdrawProps) {
  const [TypeKey] = useState<string>('mobileWithdraw')
  const amount = useMemo(() => {
    return list.reduce((total: string, current: any) => {
      return new BigNumber(total).plus(current.amount || '0').toString()
    }, '0')
  }, [list])
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
                <Checkbox
                  checked={mobileWithdrawCheckedIndex.includes(el.tokenId)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      setMobileWithdrawCheckedIndex([...mobileWithdrawCheckedIndex, el.tokenId])
                    } else {
                      setMobileWithdrawCheckedIndex(mobileWithdrawCheckedIndex.filter((cel) => cel !== el.tokenId))
                    }
                  }}
                ></Checkbox>
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
    </DepositBox>
  )
}
