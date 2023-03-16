/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, styled } from '@mui/material'
import CustomizedSelect from 'components/Select'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useContract } from 'hooks/useContract'
import MockMAYC_ABI from 'abis/MockMAYC.json'
import { useMemo, useState } from 'react'
import { useCollections } from 'state/application/hooks'
import { hexToNumberString } from 'web3-utils'
// import { RetryableError } from 'utils/retry'
// import { Box, styled } from '@mui/material'
// import { useState } from 'react'
const TestBox = styled(Box)`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
`
const TitleBox = styled(Box)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  margin-top: 8px;
  line-height: 160%;
  color: #1f1d23;
  align-items: center;
`
const ValueBox = styled(Box)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  margin-left: 8px;
  line-height: 160%;
  color: #1f1d23;
`
const CollectionSortItem = styled(Box)`
  display: flex;
  gap: 6px;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #7646ff;
    object-fit: cover;
  }
`
export default function Mint() {
  const collection = useCollections()
  const [valueIndex, setValueIndex] = useState<number>(0)
  const useMockMAYCContract = useContract(collection[valueIndex - 1]?.id, MockMAYC_ABI)
  const { library: provider } = useActiveWeb3React()
  const allFilterType = 0
  const [result, setResult] = useState<Array<any>>([])
  // const res = useMemo(() => {
  //   return [...result]
  // }, [result])
  const collectionOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Collections',
      },
      ...collection.map((collection: any, index: number) => ({
        value: index + 1,
        name: (
          <CollectionSortItem>
            <img alt={collection.name} src={collection.icon} />
            {collection.name}
          </CollectionSortItem>
        ),
      })),
    ]
  }, [collection])
  return (
    <TestBox>
      <TitleBox mb="16px">请使用goerli网络</TitleBox>
      <CustomizedSelect
        options={collectionOptions}
        startAdornment={
          <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="11" width="12" height="8" stroke="#6E7191" strokeLinejoin="round" />
            <path d="M7 8H17" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 5H16" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
        labelId="collateral-filter"
        id="collateral-filter"
        filter={0}
        valueIndex={valueIndex}
        allFilterType={allFilterType}
        setValueIndex={setValueIndex}
      />
      {collection[valueIndex - 1]?.id && (
        <TitleBox>
          id:
          <ValueBox>{collection[valueIndex - 1]?.id}</ValueBox>{' '}
        </TitleBox>
      )}
      {result.slice(0, 5).map((el: any) => (
        <Box key={el?.hash}>
          <Box>
            <TitleBox>
              tokenId:
              <ValueBox>{el?.tokenId}</ValueBox>{' '}
            </TitleBox>
            <TitleBox>
              form:
              <ValueBox>{el?.form}</ValueBox>{' '}
            </TitleBox>
            <TitleBox>
              hash:
              <ValueBox>{el?.hash}</ValueBox>{' '}
            </TitleBox>
          </Box>
        </Box>
      ))}
      <Button
        variant="contained"
        sx={{ marginTop: '16px' }}
        onClick={() => {
          useMockMAYCContract?.mint().then((res: any) => {
            const calculagraph = setInterval(() => {
              provider.getTransactionReceipt(res.hash).then((receipt: any) => {
                if (receipt === null) {
                } else {
                  clearInterval(calculagraph)
                  setResult((result) => [
                    {
                      tokenId: hexToNumberString(receipt.logs[0].topics[3]),
                      form: hexToNumberString(receipt.logs[0].topics[2]),
                      hash: res.hash,
                    },
                    ...result,
                  ])
                }
              })
            }, 3000)
          })
        }}
      >
        生成
      </Button>
    </TestBox>
  )
}
