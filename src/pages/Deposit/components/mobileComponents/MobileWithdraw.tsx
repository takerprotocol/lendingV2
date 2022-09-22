import { Box, styled, Typography, Checkbox } from '@mui/material'
import { useState } from 'react'
import { SpaceBetweenBox, FlexBox, CenterBox } from 'styleds'

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
  background: #a31;
  border-radius: 0.25rem;
`
export default function MobileWithdraw() {
  const [checkboxType, setCheckboxType] = useState<Array<string>>([])
  const [list] = useState<boolean>(false)
  console.log(checkboxType)
  return (
    <DepositBox>
      <SpaceBetweenBox>
        <Typography variant="subtitle2">You Can Withdraw</Typography>
        <Typography variant="body2" display={list ? '' : 'none'} fontWeight="600" color="#a0a3bd">
          4 NFTs / 153.57 ETH
        </Typography>
      </SpaceBetweenBox>
      {list ? (
        <>
          {[1, 2, 3, 4, 5, 6].map((el: any, index: number) => (
            <CardBox className={checkboxType.includes(el) ? 'isCheck' : ' '} key={index}>
              <FlexBox>
                <Checkbox
                  checked={checkboxType.includes(el)}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.checked) {
                      setCheckboxType([...checkboxType, el])
                    } else {
                      setCheckboxType(checkboxType.filter((cel) => cel !== el))
                    }
                  }}
                ></Checkbox>
                <Box>
                  <NameBox>
                    <ImgBox></ImgBox>
                    <Typography fontWeight="700" variant="body1">
                      CRYPTOPUNK #4728
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
            <Typography display={list ? 'none' : ''} variant="body2" fontWeight="600" color="#a0a3bd">
              You have no NFTs in this collection to withdraw
            </Typography>
          </CenterBox>
        </>
      )}
    </DepositBox>
  )
}
