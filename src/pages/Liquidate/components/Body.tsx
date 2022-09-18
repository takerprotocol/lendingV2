import { Box, styled, Typography } from '@mui/material'
import Pager from 'components/Pages/Pager'
import CustomizedSelect from 'components/Select'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlexBox } from 'styleds'
import Collection1 from 'assets/images/png/liquidation/example/1.png'
import Collection2 from 'assets/images/png/liquidation/example/2.png'
import Collection3 from 'assets/images/png/liquidation/example/3.png'
// import EthCollateral from './EthCollateral'
import LiquidationBar from './LiquidationBar'
import NFTItem from './NFTItem'
import NFTItemSkeleton from './NftItemSkeleton'
import { CollateralModel, TokenModel } from 'services/type/nft'
import BigNumber from 'bignumber.js'
import { useLendingPool } from 'hooks/useLendingPool'
import { desensitization, plus } from 'utils'
import { gasLimit, getWETH } from 'config'
import { toast } from 'react-toastify'
import { TransactionType } from 'state/transactions/types'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useParams } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'

const Container = styled('div')`
  width: 1012px;
  margin: 0 auto;
  position: relative;
  border-radius: 12px;
  min-height: 300px;
  margin-top: 16px;
  padding: 25px 0px 36px 0px;
  z-index: 1;
`
const ContainerBg = styled('div')`
  position: absolute;
  width: 1012px;
  height: 347px;
  background: linear-gradient(180deg, #ffffff 12.77%, rgba(255, 255, 255, 0) 63.61%);
  border-radius: 12px;
  z-index: -1;
  left: 0px;
  top: 0px;
`

const Title = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 160%;
  color: #14142a;
`

const SubTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;

  color: #a0a3bd;
`

const TitleRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TotalLiqudationContainer = styled('div')`
  display: flex;
  margin-top: 2px;
  align-items: center;
  gap: 2px;
  justify-content: flex-end;
`

const TotalLiquidation = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 160%;
  color: #14142a;
`

const NFTRow = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const NFTRowTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 160%;
  color: #14142a;
`

const NFTCollaterals = styled('div')`
  display: grid;
  position: relative;
  grid-template-columns: repeat(auto-fit, minmax(305px, 1fr));
  grid-gap: 24px;
`
//------css--------//

const CollectionSortItem = styled('div')`
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
const PaddingBox = styled(Box)`
  padding: 0px 24px 0px 25px;
`
//-------css-------//
const LiquidateBody = ({
  total,
  collaterals,
  loading,
  totalDebt,
}: {
  total: string
  collaterals: CollateralModel | null
  loading: boolean
  totalDebt: string
}) => {
  const { address } = useParams()
  const contract = useLendingPool()
  const [tokenChecked, setTokenChecked] = useState<Array<string>>([])
  const [ethValue, setEthValue] = useState('0')
  const addTransaction = useTransactionAdder()
  const { chainId } = useActiveWeb3React()

  useEffect(() => {
    if (contract) {
      // contract.getUserState(address).then((res: Array<BigNumber>) => {
      //   console.log('1111', res)
      // })
      // contract.getUserValues(address).then((res: Array<BigNumber>) => {
      //   console.log('11122', res)
      // })
    }
  }, [contract])
  const Collaterals = useMemo(() => {
    if (collaterals) {
      const items: Array<JSX.Element> = []
      collaterals.collections.forEach((collection) => {
        collection.tokens.forEach((token) => {
          items.push(
            <NFTItem
              handle={(checked: boolean) => {
                if (checked) {
                  setTokenChecked([...tokenChecked, token.id])
                } else {
                  setTokenChecked(tokenChecked.filter((tc: string) => tc !== token.id))
                }
              }}
              token={token.id}
              key={`collateral-${collection.id}-${token.id}`}
            />
          )
        })
      })
      return items
    }
    return []
  }, [collaterals, tokenChecked])

  const nfts = useMemo(() => {
    const _nfts: Array<TokenModel> = []
    if (collaterals) {
      collaterals.collections.forEach((collection) => {
        collection.tokens.forEach((token) => {
          _nfts.push(token)
        })
      })
    }
    return _nfts
  }, [collaterals])

  const nftAmount = useMemo(() => {
    let amount = '0'
    nfts
      .filter((nft) => tokenChecked.includes(nft.id))
      .forEach((el) => {
        amount = new BigNumber(el.amount).plus(amount).toString()
      })
    return amount
  }, [nfts, tokenChecked])
  const LoadingCollaterals = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .slice(0, 9)
        .map((_collateral, index) => <NFTItemSkeleton key={`collateral-${index}`} />),
    []
  )
  //--------js--------//
  const testCollaterals = useMemo(
    () => [
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 120,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
        ],
        debt: 50,
        riskPercentage: 105,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 2,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
        ],
        debt: 2,
        riskPercentage: 90,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 50,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
        ],
        debt: 398,
        riskPercentage: 0,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 20,
        collections: [
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(2),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
        ],
        debt: 60,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 0.1,
        collections: [
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(2),
          },
        ],
        debt: 20,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
      {
        address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        collateral: 60,
        collections: [
          {
            name: 'Cryptopunks',
            image: Collection1,
            nfts: new Array(2),
          },
          {
            name: 'NFTrees',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(2),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(2),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(5),
          },
          {
            name: 'Jadu Hoverboard',
            image: Collection3,
            nfts: new Array(5),
          },
          {
            name: 'Bored Ape Yacht Club',
            image: Collection2,
            nfts: new Array(3),
          },
        ],
        debt: 35,
        riskPercentage: 110,
        riskLevel: 'Liquidation',
      },
    ],
    []
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const multipleCollaterals = [
    ...testCollaterals,
    ...testCollaterals,
    ...testCollaterals,
    ...testCollaterals,
    ...testCollaterals,
  ]
  const [collectionFilter, setCollectionFilter] = useState(0)
  const handleCollectionFilterChange = useCallback(
    (event: any) => setCollectionFilter(event.target.value as number),
    []
  )
  const NftCollections = useMemo(
    () => multipleCollaterals.map((collateral: any) => collateral.collections).flat(),
    [multipleCollaterals]
  )
  const uniqueCollections: any = useMemo(
    () => [...new Set(NftCollections.map((collection: any) => collection.name))],
    [NftCollections]
  )
  const collectionOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Collections',
      },
      ...uniqueCollections.map((collection: any, index: number) => ({
        value: index + 1,
        name: (
          <CollectionSortItem>
            <img
              alt={collection}
              src={NftCollections.find((findCollection: any) => findCollection.name === collection).image}
            />
            {collection}
          </CollectionSortItem>
        ),
      })),
    ]
  }, [uniqueCollections, NftCollections])

  const [sort, setSort] = useState(0)
  const handleSortUpdate = useCallback((event: any) => setSort(event.target.value as number), [])
  const sortOptions = useMemo(() => {
    return [
      {
        value: 0,
        name: 'Default Sort',
      },
      {
        value: 1,
        name: 'Collateral ↓',
      },
      {
        value: 2,
        name: 'Collateral ↑',
      },
      {
        value: 3,
        name: 'Total Debt ↓',
      },
      {
        value: 4,
        name: 'Total Debt ↑',
      },
      {
        value: 5,
        name: 'Risk Level: Low to High',
      },
      {
        value: 6,
        name: 'Risk Level: High to Low',
      },
    ]
  }, [])

  const submit = () => {
    if (contract) {
      const collections: Array<string> = []
      const tokenIds: Array<string> = []
      const amounts: Array<string> = []
      nfts
        .filter((nft) => tokenChecked.includes(nft.id))
        .forEach((el) => {
          collections.push(el.id.split('-')[1])
          tokenIds.push(el.id.split('-')[2])
          amounts.push(el.amount)
        })
      contract
        .liquidate(collections, tokenIds, amounts, getWETH(chainId), address, true, {
          gasLimit,
        })
        .then((res: any) => {
          addTransaction(res, {
            type: TransactionType.LIQUIDATE,
            amount: plus(nftAmount, ethValue || '0'),
          })
          toast.success(desensitization(res.hash))
          setEthValue('')
        })
        .catch((error: any) => {
          toast.error(error.message)
        })
    }
  }
  //-------js---------//
  return (
    <Container>
      <PaddingBox>
        <ContainerBg></ContainerBg>
        <TitleRow>
          <Title>Liquidate</Title>
          <div>
            <SubTitle>Collaterals</SubTitle>
            <TotalLiqudationContainer>
              <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                  stroke="#14142A"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M4 11.5L8.5 14L13 11.5" stroke="#14142A" strokeLinejoin="round" />
              </svg>
              <TotalLiquidation>{total}</TotalLiquidation>
            </TotalLiqudationContainer>
          </div>
        </TitleRow>
        <NFTRow
          marginTop={Collaterals.length > 9 ? '28px' : '35px'}
          marginBottom={Collaterals.length > 9 ? '24px' : '30px'}
        >
          <NFTRowTitle>{Collaterals.length || 0} NFT Collaterals</NFTRowTitle>
          {Collaterals.length > 9 && (
            <FlexBox>
              <CustomizedSelect
                value={collectionFilter}
                options={collectionOptions}
                onChange={handleCollectionFilterChange}
                startAdornment={
                  <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="11" width="12" height="8" stroke="#6E7191" strokeLinejoin="round" />
                    <path d="M7 8H17" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 5H16" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                labelId="collateral-filter"
                id="collateral-filter"
              />
              <Box width="36px"></Box>
              <CustomizedSelect
                value={sort}
                options={sortOptions}
                onChange={handleSortUpdate}
                startAdornment={
                  <svg width="35" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 18.5V5.5L5.5 8.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14.5 5.5V18.5L17.5 15.5" stroke="#6E7191" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
                labelId="collateral-sort"
                id="collateral-sort"
              />
            </FlexBox>
          )}
        </NFTRow>
        <NFTCollaterals>
          {loading ? LoadingCollaterals : Collaterals}
          <Pager TypeKey={'liquidate'} list={loading ? [] : Collaterals}></Pager>
        </NFTCollaterals>
        {/* <EthCollateral
          handleAmount={(value: string) => {
            setEthValue(value)
          }}
          max={times(totalDebt || '0', 0.5)}
          potentialProfit={3.6}
          subtotal={41.4}
          label="Profitable"
        /> */}
      </PaddingBox>
      <LiquidationBar
        total={plus(nftAmount, ethValue || '0')}
        nfts={tokenChecked.length}
        nftsValue={nftAmount}
        ethValue={ethValue}
        submit={() => {
          submit()
        }}
      />
    </Container>
  )
}

export default LiquidateBody