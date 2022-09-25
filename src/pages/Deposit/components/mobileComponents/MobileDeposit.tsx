import { Box, styled, Typography, Checkbox, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import { Nft } from '@alch/alchemy-sdk'
import { SpaceBetweenBox, FlexBox, CenterBox } from 'styleds'
import { NftTokenModel } from 'services/type/nft'
import BigNumber from 'bignumber.js'

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
const MaxBox = styled(Box)`
  background: #4e4b66;
  padding: 0.25rem 0.75rem;
  border-radius: 23px;
`
const InputBox = styled(FlexBox)`
  width: 7.9375rem;
  height: 1.875rem;
  padding: 0.25rem 0.5rem;
  margin-right: 0.75rem;
  border-radius: 6px;
  background: #eff0f6;
`
interface MobileDepositProps {
  depositedList: NftTokenModel[]
  mobileDepositCheckedIndex: Array<string>
  setMobileDepositCheckedIndex: Function
}
export default function MobileDeposit({
  depositedList,
  mobileDepositCheckedIndex,
  setMobileDepositCheckedIndex,
}: MobileDepositProps) {
  const [TypeKey] = useState<string>('mobileDeposit')
  const amount = useMemo(() => {
    return depositedList.reduce((total: string, current: NftTokenModel) => {
      return new BigNumber(total).plus(current.balance || '0').toString()
    }, '0')
  }, [depositedList])
  return (
    <DepositBox>
      <SpaceBetweenBox>
        <Typography variant="subtitle2">You Can Deposit</Typography>
        <Typography display={depositedList.length === 0 ? 'none' : ''} variant="body2" fontWeight="600" color="#a0a3bd">
          {depositedList.length} NFTs / {amount} ETH
        </Typography>
      </SpaceBetweenBox>
      {depositedList.length !== 0 ? (
        <>
          {depositedList.map((el: NftTokenModel | Nft) => (
            <CardBox
              className={mobileDepositCheckedIndex.includes(el.tokenId) ? 'isCheck' : ' '}
              key={`nft${TypeKey}-${el.tokenId}`}
            >
              <FlexBox>
                <Checkbox
                  checked={mobileDepositCheckedIndex.includes(el.tokenId)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      setMobileDepositCheckedIndex([...mobileDepositCheckedIndex, el.tokenId])
                    } else {
                      setMobileDepositCheckedIndex(mobileDepositCheckedIndex.filter((cel) => cel !== el.tokenId))
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
                  {el.tokenType === 'ERC1155' && (
                    <FlexBox mt="1rem">
                      <InputBox>
                        <TextField variant="outlined" />
                        <Typography ml="6px" component="span" variant="body1" color="#A0A3BD">
                          NTFs
                        </Typography>
                      </InputBox>
                      <MaxBox>
                        <Typography variant="body1" color="#F7F7FC">
                          Max 15
                        </Typography>
                      </MaxBox>
                    </FlexBox>
                  )}
                </Box>
              </FlexBox>
            </CardBox>
          ))}
        </>
      ) : (
        <>
          <CenterBox mt="1.5rem">
            <Typography variant="subtitle2">0 NFTs</Typography>
          </CenterBox>
          <CenterBox mt="0.5rem" mb="1.25rem">
            <Typography display={depositedList ? 'none' : ''} variant="body2" fontWeight="600" color="#a0a3bd">
              You have no NFTs in this collection to deposit
            </Typography>
          </CenterBox>
        </>
      )}
    </DepositBox>
  )
}
