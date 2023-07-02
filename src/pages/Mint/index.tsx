/* eslint-disable react-hooks/rules-of-hooks */
import { Box, styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import CustomizedSelect from 'components/Select'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useContract } from 'hooks/useContract'
import MockMAYC_ABI from 'abis/MockMAYC.json'
import cryptoPunks_ABI from 'abis/cryptoPunks.json'
import { useEffect, useMemo, useState } from 'react'
// import { useCollections } from 'state/application/hooks'
import { hexToNumberString } from 'web3-utils'
import { LendingPool } from 'apollo/queries'
import { getClient } from 'apollo/client'
import { useLendingPool } from 'hooks/useLendingPool'
import { renderCollectionName } from 'utils'
import { PUNKS_ADDRESS, wPunksAddrUnwrap } from 'config';
// import { renderCollectionName } from 'utils'
// import { RetryableError } from 'utils/retry'
// import { Box, styled } from '@mui/material'
// import { useState } from 'react'
const MintBox = styled(Box)`
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
  // const collection = useCollections()
  const [valueIndex, setValueIndex] = useState<number>(0)
  const { library: provider } = useActiveWeb3React()
  const allFilterType = 0
  const [result, setResult] = useState<Array<any>>([])
  const [minting, setMinting] = useState(false)

  const blueChipClient = getClient(1)[5];
  const growthClient = getClient(0)[5];
  const blueChipContract = useLendingPool('bluechip');
  const growthContract = useLendingPool('growth');

  const [allCollections, setAllCollections] = useState<Array<{name: string, id: string}>>([]);

  useEffect(() => {
    if(blueChipClient && growthClient && growthContract && blueChipContract){
      let nftList: Array<{name: string, id: string}> = [];
      Promise.all([blueChipClient.query({
          query: LendingPool(blueChipContract.address)
        }),
        growthClient.query({
          query: LendingPool(growthContract.address)
        }),
      ]).then(([blueChipRes, growthRes]) => {
        blueChipRes.data.lendingPools[0].nfts.forEach((el: any) => {
          nftList = [...nftList, {id: wPunksAddrUnwrap(el.id), name: renderCollectionName(el.name)}];
        });
        growthRes.data.lendingPools[0].nfts.forEach((el: any) => {
          nftList = [...nftList, {id: el.id, name: renderCollectionName(el.name)}];
        });
        setAllCollections(nftList);
      })
    }
  }, [blueChipClient, growthClient, growthContract, blueChipContract])

  const useMockMAYCContract = useContract(allCollections[valueIndex - 1]?.id, MockMAYC_ABI);
  const PunkContract = useContract(allCollections[valueIndex - 1]?.id, cryptoPunks_ABI);

  const collectionOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'Select Collection',
      }
    , ...allCollections.map((col, index: number) => 
    ({ 
      value: index + 1, 
      name:<CollectionSortItem>{col.name}</CollectionSortItem>
    }))]
  }, [allCollections])
  return (
    <MintBox>
      <img src="/ImageUrl/0x77a136db5131bd2a547e56aad40b4e8fbec6e3b7/2" alt="" />
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
      {allCollections[valueIndex - 1]?.id && (
        <TitleBox>
          id:
          <ValueBox>{allCollections[valueIndex - 1]?.id}</ValueBox>{' '}
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
      <LoadingButton
        variant="contained"
        disabled={!valueIndex}
        loading={minting}
        sx={{ marginTop: '16px' }}
        onClick={() => {
          if(!valueIndex) return;
          setMinting(true);
          (allCollections[valueIndex - 1]?.id === PUNKS_ADDRESS
            ? PunkContract && PunkContract.getPunk()
            : useMockMAYCContract?.mint()
          ).then((res: any) => {
            const calculagraph = setInterval(() => {
              provider.getTransactionReceipt(res.hash).then((receipt: any) => {
                if (receipt === null) {
                } else {
                  clearInterval(calculagraph)
                  setMinting(false);
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
          }).catch((err: any) => {
            setMinting(false);
          })
        }}
      >
        Generate
      </LoadingButton>
    </MintBox>
  )
}
