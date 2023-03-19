import { Box, styled, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
// import SortIcon from 'assets/images/svg/liquidation/mobileSort-icon.svg'
// import mobileNFT from 'assets/images/svg/liquidate/mobile-NFT.svg'
// import FilterIcon from 'assets/images/svg/liquidation/mobileFilter-icon.svg'
// import nftListCheckbox from 'assets/images/svg/liquidate/nftListCheckbox.svg'
import MobileNFTCollateralsSkeleton from '../mobileLiquidateSkeleton/MobileNFTCollateralsSkeleton'
import MobileCollateralsSortModal from './MobileCollateralsSortModal'
import MobileFilterModal from './MobileFilterModal'
// import depositNotChecked_Icon from 'assets/images/svg/deposit/depositNotChecked_Icon.svg'
// import depositChecked_Icon from 'assets/images/svg/deposit/depositChecked_Icon.svg'
import { CollateralModel } from 'services/type/nft'
import MobileNFTItem from './MobileNFTItem'

const MobileNFTCollateralsBox = styled(Box)`
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(218, 218, 238, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin: 0 1rem;
  .MuiSvgIcon-root {
    display: none;
  }
  .MuiCheckbox-root {
    opacity: 0.5;
    border: 1px solid #a0a3bd;
    border-radius: 4px;
  }
  .isCheck {
    .MuiSvgIcon-root {
      display: block;
    }
    .MuiCheckbox-root {
      opacity: 1;
      border: 0px solid #a0a3bd;
      border-radius: 4px;
    }
  }
`
interface MobileNFTCollateralsProps {
  loading: boolean
  collaterals: CollateralModel | null
  tokenChecked: string
  setTokenChecked: Function
  setValue: Function
}
export default function MobileNFTCollaterals({
  loading,
  collaterals,
  setTokenChecked,
  tokenChecked,
  setValue,
}: MobileNFTCollateralsProps) {
  const [openFilter, setOpenFilter] = useState(false)
  const [collectionFilter, setCollectionFilter] = useState(0)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [sort, setSort] = useState<number>(0)
  const open = Boolean(anchorEl)
  // const handleClick = (event: any) => {
  //   setAnchorEl(event.currentTarget)
  // }
  // const sortValue = useMemo(() => {
  //   switch (sort) {
  //     case 1:
  //       return 'Heath Level: Low to High'
  //     case 2:
  //       return 'Heath Level: High to Low'
  //     default:
  //       return 'Default Sort'
  //   }
  // }, [sort])
  const Collaterals = useMemo(() => {
    if (collaterals) {
      const items: Array<JSX.Element> = []
      collaterals.collections.forEach((collection) => {
        collection.tokens.forEach((token) => {
          items.push(
            <MobileNFTItem
              handle={(checked: boolean) => {
                if (checked) {
                  setTokenChecked(token.id)
                } else {
                  setTokenChecked('')
                }
              }}
              setValue={setValue}
              tokenChecked={tokenChecked}
              setTokenChecked={setTokenChecked}
              token={token.id}
              key={`collateral-${collection.id}-${token.id}`}
            />
          )
        })
      })
      return items
    }
    return []
  }, [collaterals, setTokenChecked, setValue, tokenChecked])
  return (
    <MobileNFTCollateralsBox>
      {loading ? (
        <MobileNFTCollateralsSkeleton></MobileNFTCollateralsSkeleton>
      ) : (
        <>
          <Typography mb={Collaterals.length !== 0 ? '1rem' : '0'} variant="subtitle2">
            {Collaterals.length || 0} NFT Collaterals
          </Typography>
          {/* {list.length > 9 && (
            <SortAndFilterBox>
              <FlexBox
                onClick={(event: any) => {
                  // if (!AllFilterType) {
                  handleClick(event)
                  // }
                }}
              >
                <img src={SortIcon} alt="" />
                <FlexBox>
                  <SortTypography ml="0.25rem">{sortValue}</SortTypography>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d={!open ? 'M16 10L11.5 15L7 10' : 'M16 15L11.5 10L7 15'}
                      stroke={'#14142A'}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </FlexBox>
              </FlexBox>
              <FlexBox>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 0.5V23.5" stroke="#D9DBE9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <FlexBox
                  onClick={() => {
                    setOpenFilter(true)
                  }}
                >
                  <FlexBox sx={{ opacity: `${AllFilterType ? '0.5' : '1'}` }}> 
                  <SortTypography color="#14142A" ml="1rem">
                    Filter
                  </SortTypography>
                  {FilterCount === 2 ? (
                  <SortTypography ml="0.25rem" color="#7646FF">
                    ({FilterCount})
                  </SortTypography>
                ) : FilterCount === 1 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14 18V11L17 7H7L10 11V16"
                      stroke="#7646FF"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <img src={FilterIcon} alt="" />
                )} 
                  <img src={FilterIcon} alt="" />
                </FlexBox>
              </FlexBox>
            </SortAndFilterBox>
          )} */}
          {Collaterals}
        </>
      )}
      <MobileCollateralsSortModal
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setSort={setSort}
        sort={sort}
      ></MobileCollateralsSortModal>
      <MobileFilterModal
        openFilter={openFilter}
        setOpenFilter={setOpenFilter}
        setCollectionFilter={setCollectionFilter}
        collectionFilter={collectionFilter}
      ></MobileFilterModal>
    </MobileNFTCollateralsBox>
  )
}
