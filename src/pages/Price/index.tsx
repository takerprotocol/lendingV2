/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Input, styled } from '@mui/material'
import CustomizedSelect from 'components/Select'
import { useContract } from 'hooks/useContract'
import Aggregator_ABI from 'abis/Aggregator.json'
import { useEffect, useMemo, useState } from 'react'
import { toWei } from 'web3-utils'
import { LendingPool } from 'apollo/queries'
import { getClient } from 'apollo/client'
import { useLendingPool } from 'hooks/useLendingPool'
import { renderCollectionName } from 'utils'
import { useWeb3React } from '@web3-react/core'

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

  const { account, chainId } = useWeb3React()

  const blueChipClient = getClient(1)[5];
  const growthClient = getClient(0)[5];
  const blueChipContract = useLendingPool('bluechip');
  const growthContract = useLendingPool('growth');
  const [allCollections, setAllCollections] = useState<Array<{name: string, id: string}>>([]);

  useEffect(() => {
    console.log("try: ", blueChipClient, growthClient, growthContract, blueChipContract)
    if(blueChipClient && growthClient && growthContract && blueChipContract){
      console.log('loading...')
      let nftList: Array<{name: string, id: string}> = [];
      Promise.all([blueChipClient.query({
          query: LendingPool(blueChipContract.address)
        }),
        growthClient.query({
          query: LendingPool(growthContract.address)
        }),
      ]).then(([blueChipRes, growthRes]) => {
        blueChipRes.data.lendingPools[0].nfts.forEach((el: any) => {
          nftList = [...nftList, {id: el.id, name: renderCollectionName(el.name)}];
        });
        growthRes.data.lendingPools[0].nfts.forEach((el: any) => {
          nftList = [...nftList, {id: el.id, name: renderCollectionName(el.name)}];
        });
        setAllCollections(nftList);
      })
    }
  }, [blueChipClient, growthClient, growthContract, blueChipContract])
  
  const Aggregator = useContract('0xC38aEbC20feD1571E2eab066C06ACe699a428510', Aggregator_ABI)
  const collectionOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Collections',
      },
      ...allCollections.map((collection: any, index: number) => ({
        value: index + 1,
        name: (
          <CollectionSortItem>
            {/* <img alt={collection.name} src={collection.icon} /> */}
            {collection.name}
          </CollectionSortItem>
        ),
      })),
    ]
  }, [allCollections])
  return (
    <TestBox>
      <TitleBox mb="16px">Please switch to Ethereum Goerli Network</TitleBox>
      {!!!account && <TitleBox mb="16px">Please connect wallet</TitleBox>}

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
      {allCollections[valueIndex - 1]?.id && (
        <TitleBox>
          id:
          <ValueBox>{allCollections[valueIndex - 1]?.id}</ValueBox>{' '}
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
          Aggregator?.setNFTPrice(allCollections[valueIndex - 1]?.id, toWei(value), {
            gasLimit: 210000,
          })
        }}
      >
        update
      </Button>
    </TestBox>
  )
}
