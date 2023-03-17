/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Input, styled } from '@mui/material'
import CustomizedSelect from 'components/Select'
import { useContract } from 'hooks/useContract'
import Aggregator_ABI from 'abis/Aggregator.json'
import { useMemo, useState } from 'react'
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
export default function Price() {
  const [valueIndex, setValueIndex] = useState<number>(0)
  const allFilterType = 0
  const [value, setValue] = useState<string>('')
  const collections = useMemo(() => {
    return [
      {
        id: '0xe383f37741bbCBAc2eE420f24b62D48EeF494398',
        name: 'azuki',
      },
      {
        id: '0x3F1B63d1122b28764Ef22Aa2A9D74Efb6196A3C4',
        name: 'mayc',
      },
      {
        id: '0xdB86784AAF350Df8b9BE32D920881770FAd4C951',
        name: 'bayc',
      },
      {
        id: '0xa6942fa0Dbc52fE611048b8e35cDC21009F08547',
        name: 'doodles',
      },
      {
        id: '0x1B001F68BaB3A4f60323A39A266860Ad4769aeD2',
        name: 'clonex',
      },
      {
        id: '0x563CcBC82B150d8d52D8BC1C51F704Bc172b48c5',
        name: 'cool_cats',
      },
      {
        id: '0x70D591b6f85F819876828BE97a04421B55Be0d42',
        name: 'world_of_women',
      },
    ]
  }, [])
  const Aggregator = useContract(collections[valueIndex - 1]?.id, Aggregator_ABI)
  const collectionOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Collections',
      },
      ...collections.map((collection: any, index: number) => ({
        value: index + 1,
        name: (
          <CollectionSortItem>
            {/* <img alt={collection.name} src={collection.icon} /> */}
            {collection.name}
          </CollectionSortItem>
        ),
      })),
    ]
  }, [collections])
  return (
    <TestBox>
      <TitleBox mb="16px">Please switch to Ethereum Goerli Network</TitleBox>
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
      <Input
        sx={{ width: '300px' }}
        value={value}
        onChange={(el) => {
          setValue(el.target.value)
        }}
      />
      {collections[valueIndex - 1]?.id && (
        <TitleBox>
          id:
          <ValueBox>{collections[valueIndex - 1]?.id}</ValueBox>{' '}
        </TitleBox>
      )}
      {/* {result.slice(0, 5).map((el: any) => (
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
      ))} */}
      <Button
        variant="contained"
        sx={{ marginTop: '16px' }}
        onClick={() => {
          Aggregator?.setPrice(value)
        }}
      >
        update
      </Button>
    </TestBox>
  )
}
