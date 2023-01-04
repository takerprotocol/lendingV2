import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, CenterBox, FlexBox } from 'styleds'
import mobileMore from 'assets/images/svg/liquidation/mobileMore-icon.svg'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ERC721 from 'assets/images/png/collection/721.png'
import Azuki from 'assets/images/png/collection/azuki.png'
import Bayc from 'assets/images/png/collection/bayc.png'
import Mayc from 'assets/images/png/collection/mayc.png'
import { abbrevAddress } from 'utils/abbrevAddres'
import Copy from 'components/Copy'
import { fixedFormat } from 'utils'

const CardBox = styled(Box)`
  background: #ffffff;
  border: 0.0625rem solid #eff0f6;
  border-radius: 0.625rem;
  margin: 0 1rem;
  padding: 0.9375rem 0.9375rem 0.8125rem 0.9375rem;
  margin-top: 1rem;
  .Img-Box {
    padding-left: 0.375rem;
    .more {
      margin-left: -0.375rem;
      border-radius: 0.25rem;
      margin-top: 0.0625rem;
      border-top: 0.125rem white solid;
      border-left: 0.125rem white solid;
      border-bottom: 0.125rem white solid;
    }
  }
  .noMore {
    margin-top: 0.0625rem;
    margin-right: 0.25rem;
  }
`
const ImgBox = styled(FlexBox)`
  height: 1.625rem;
`
const Img = styled(`img`)`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 4px;
`
interface MobileCollateralListProps {
  address: string
  collateral: string
  collections: any
  debt: string
  riskPercentage: string
  riskLevel: string
  riskLevelTag?: string
  nfts: number
}
export default function MobileCollateralList({
  address,
  collateral,
  collections,
  debt,
  riskPercentage,
  riskLevelTag,
  riskLevel,
  nfts = 0,
}: MobileCollateralListProps) {
  const renderImg = (symbol?: string) => {
    if (symbol) {
      if (symbol.toLocaleLowerCase().indexOf('mayc') > -1) {
        return Mayc
      } else if (symbol.toLocaleLowerCase().indexOf('azuki') > -1) {
        return Azuki
      } else if (symbol.toLocaleLowerCase().indexOf('bayc') > -1) {
        return Bayc
      }
    }
    return ERC721
  }
  // const spotPosition = useMemo(() => {
  //   if (debt.indexOf('.') === -1) {
  //     return 0
  //   } else {
  //     return debt.indexOf('.') > 5 ? 0 : 5 - debt.indexOf('.')
  //   }
  // }, [debt])
  // console.log('@@@', spotPosition)
  const navigate = useNavigate()
  const CollateralList = useMemo(() => {
    if (collections.length > 10) {
      return collections
        .slice(0, 9)
        .map((el: any) => (
          <Img
            className={collections.length > 7 ? 'more' : 'noMore'}
            key={el.id}
            src={renderImg(el.collection.symbol)}
            alt="collection"
          />
        ))
    } else if (collections.length > 0) {
      return collections.map((el: any) => (
        <Img
          className={el.length > 7 ? 'more' : 'noMore'}
          key={el.id}
          src={renderImg(el.collection.symbol)}
          alt="collection"
        />
      ))
    } else {
      return (
        <Typography variant="body1" fontWeight="700" my="0.125rem" color="#898994">
          No NFT collateral
        </Typography>
      )
    }
  }, [collections])

  return (
    <CardBox>
      <SpaceBetweenBox>
        <CenterBox>
          <Typography
            mr="0.375rem"
            variant="subtitle2"
            fontWeight={+riskPercentage > 120 ? '600' : '700'}
            color={+riskPercentage > 120 ? '#6E7191' : ''}
          >
            {abbrevAddress(address)}
          </Typography>
          <Copy text={address} />
        </CenterBox>
        <Typography
          onClick={() => {
            if (!(+riskPercentage > 120)) {
              navigate(`/liquidate/${address}`)
            }
          }}
          fontWeight={+riskPercentage > 120 ? '600' : '700'}
          variant="body1"
          color={+riskPercentage > 120 ? 'rgba(160, 163, 189, 0.8)' : '#7646FF'}
        >
          LIQUIDATE {'>'}
        </Typography>
      </SpaceBetweenBox>
      <SpaceBetweenBox mt="1.5rem">
        <Typography variant="body2" fontWeight="600" lineHeight="0.75rem" color="#A0A3BD">
          {collections?.length || 0} Collections {`${collections?.length === 0 ? '' : `/ ${nfts} NFTs`}`}
        </Typography>
        <Typography variant="body2" fontWeight="600" lineHeight="0.75rem" color="#A0A3BD">
          Total Debt
        </Typography>
      </SpaceBetweenBox>
      <SpaceBetweenBox mt="0.5rem">
        <ImgBox className={collections.length > 7 ? 'Img-Box' : ''}>
          {CollateralList}
          <FlexBox display={collections.length > 10 ? 'flex' : 'none !important'} ml="0.25rem">
            <img src={mobileMore} alt="" />
          </FlexBox>
        </ImgBox>
        <FlexBox my="0.125rem">
          <svg width="17" height="22" viewBox="0 0 17 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 10.6667L8.5 5L12 10.6667L8.5 16L5 10.6667Z"
              stroke="#14142A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M5 10L8.5 12L12 10" stroke="#14142A" strokeLinejoin="round" />
          </svg>
          <Typography variant="body1" fontWeight="700">
            {fixedFormat(debt)}
          </Typography>
        </FlexBox>
      </SpaceBetweenBox>
    </CardBox>
  )
}
