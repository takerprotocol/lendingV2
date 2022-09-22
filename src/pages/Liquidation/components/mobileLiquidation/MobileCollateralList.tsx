import { Box, styled, Typography } from '@mui/material'
import { SpaceBetweenBox, CenterBox, FlexBox } from 'styleds'
import CollectionNft from 'assets/images/svg/liquidation/mobileCollection-nft.svg'
import mobileMore from 'assets/images/svg/liquidation/mobileMore-icon.svg'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CardBox = styled(Box)`
  background: #ffffff;
  border: 0.0625rem solid #eff0f6;
  border-radius: 0.625rem;
  margin: 0 1rem;
  padding: 1rem 1rem 0.875rem 1rem;
  margin-top: 1rem;
  .Img-Box {
    padding-left: 0.375rem;
    .more {
      margin-left: -0.375rem;
      border-radius: 0.25rem;
      border-top: 0.125rem white solid;
      border-left: 0.125rem white solid;
      border-bottom: 0.125rem white solid;
    }
  }
  .noMore {
    margin-right: 0.25rem;
  }
`
const ImgBox = styled(FlexBox)`
  height: 1.75rem;
`
export default function MobileCollateralList() {
  const [list] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 10, 11])
  const navigate = useNavigate()
  const CollateralList = useMemo(() => {
    if (list.length > 10) {
      return list
        .slice(0, 9)
        .map((el: any) => <img className={list.length > 7 ? 'more' : 'noMore'} key={el} src={CollectionNft} alt="" />)
    } else if (list.length > 0) {
      return list.map((el: any) => (
        <img className={list.length > 7 ? 'more' : 'noMore'} key={el} src={CollectionNft} alt="" />
      ))
    } else {
      return (
        <Typography variant="body1" fontWeight="700" my="0.125rem" color="#898994">
          No NFT collateral
        </Typography>
      )
    }
  }, [list])
  return (
    <CardBox>
      <SpaceBetweenBox>
        <CenterBox>
          <Typography mr="0.375rem" variant="subtitle2" color="#6E7191">
            EA12567J...36YU
          </Typography>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.5 7.3125H8.4375C7.81618 7.3125 7.3125 7.81618 7.3125 8.4375V13.5C7.3125 14.1213 7.81618 14.625 8.4375 14.625H13.5C14.1213 14.625 14.625 14.1213 14.625 13.5V8.4375C14.625 7.81618 14.1213 7.3125 13.5 7.3125Z"
              stroke="#6E7191"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.0625 10.6875H4.5C4.20163 10.6875 3.91548 10.569 3.7045 10.358C3.49353 10.147 3.375 9.86087 3.375 9.5625V4.5C3.375 4.20163 3.49353 3.91548 3.7045 3.7045C3.91548 3.49353 4.20163 3.375 4.5 3.375H9.5625C9.86087 3.375 10.147 3.49353 10.358 3.7045C10.569 3.91548 10.6875 4.20163 10.6875 4.5V5.0625"
              stroke="#6E7191"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CenterBox>
        <Typography
          onClick={() => navigate('/liquidate')}
          mr="0.375rem"
          variant="body1"
          fontWeight="600"
          color="#7646FF"
        >
          LIQUIDATE {'>'}
        </Typography>
      </SpaceBetweenBox>
      <SpaceBetweenBox mt="1.5rem">
        <Typography variant="body2" fontWeight="600" lineHeight="0.75rem" color="#A0A3BD">
          11 Collections / 12 NFTs
        </Typography>
        <Typography variant="body2" fontWeight="600" lineHeight="0.75rem" color="#A0A3BD">
          Total Debt
        </Typography>
      </SpaceBetweenBox>
      <SpaceBetweenBox mt="0.5rem">
        <ImgBox className={list.length > 7 ? 'Img-Box' : ''}>
          {CollateralList}
          <FlexBox display={list.length > 10 ? 'flex' : 'none !important'} ml="0.25rem">
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
            169.86
          </Typography>
        </FlexBox>
      </SpaceBetweenBox>
    </CardBox>
  )
}
