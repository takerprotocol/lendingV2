import { styled, Box, Modal, Typography } from '@mui/material'
import { useMemo } from 'react'
import { CollateralModel } from 'services/type/nft'
import { useCollections } from 'state/application/hooks'
import { FlexBox, SpaceBetweenBox, CenterBox } from 'styleds'
const style = {
  position: 'absolute',
  bottom: '0rem',
  width: '100%',
  maxHeight: '32.0625rem',
  left: '0rem',
  padding: '1.375rem 1.5rem 0rem 1.5rem',
  background: '#FFFFFF',
  borderRadius: '0.75rem',
  overflow: 'scroll',
}
const FilterTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.875rem;
  display: flex;
  align-items: center;
  color: #14142a;
`
const TitleTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
  color: #a0a3bd;
`
const CollectionsItem = styled(FlexBox)`
  width: 9.9375rem;
  height: 3rem;
  padding: 0 0.75rem 0 0.5rem;
  background: #f7f7fc;
  border-radius: 0.25rem;
`
const CollectionsBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.5rem;
`
const NftImg = styled(`img`)`
  width: 1rem;
  height: 1rem;
  margin-right: 0.375rem;
  border-radius: 100%;
`
const AllCollectionsBox = styled(Box)`
  font-family: 'Quicksand';
  font-style: normal;
  font-size: 14px;
  line-height: 27px;
  display: flex;
  padding-left: 1rem;
  align-items: center;
  width: 9.9375rem;
  height: 3rem;
  background: #f7f7fc;
  border-radius: 0.25rem;
`
const FooterBox = styled(SpaceBetweenBox)`
  position: fixed;
  width: 100%;
  bottom: 0rem;
  left: 0rem;
  padding: 1rem 1.5rem 2.25rem 1.5rem;
  background: #ffffff;
  box-shadow: 0px -0.5rem 1rem rgba(220, 220, 234, 0.3);
`
const ClearAllBox = styled(CenterBox)`
  background: #f7f7fc;
  width: 50%;
  height: 3rem;
  margin-right: 0.5rem;
  mix-blend-mode: normal;
  border-radius: 0.375rem;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  text-align: center;
  color: #373737;
`
const ResultsBox = styled(CenterBox)`
  background: linear-gradient(
      61.18deg,
      rgba(102, 166, 232, 0) 0%,
      rgba(135, 143, 248, 0.098) 51.07%,
      rgba(105, 165, 233, 0.2) 97.23%
    ),
    #262338;
  box-shadow: 0px 4px 8px rgba(75, 75, 122, 0.1), inset 0px 2px 2px rgba(75, 86, 132, 0.5);
  width: 50%;
  height: 3rem;
  mix-blend-mode: normal;
  border-radius: 0.375rem;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  text-align: center;
  color: #ffffff;
`
const NameTypography = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-size: 14px;
  width: 7.375rem;
  line-height: 120%;
  color: #14142a;
  overflow: hidden;
  text-overflow: ellipsis;
`
interface MobileFilterProps {
  openFilter: boolean
  setOpenFilter: Function
  setCollectionFilter: Function
  collectionFilter: number
  setDebtFilter: Function
  debtFilter: number
  collaterals: Array<CollateralModel>
}
export default function MobileFilterModal({
  openFilter,
  setOpenFilter,
  setCollectionFilter,
  collectionFilter,
  setDebtFilter,
  debtFilter,
  collaterals,
}: MobileFilterProps) {
  const handleClose = () => setOpenFilter(false)
  const collection = useCollections()
  const debtFilters = useMemo(() => {
    return [
      {
        value: 0,
        name: 'All Debts',
      },
      {
        value: 1,
        name: '< 10 ETH',
      },
      {
        value: 2,
        name: '10 ETH - 30 ETH',
      },
      {
        value: 3,
        name: '30 ETH - 50 ETH',
      },
      {
        value: 4,
        name: '> 50 ETH',
      },
    ]
  }, [])
  return (
    <Modal
      keepMounted
      open={openFilter}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <SpaceBetweenBox mb="1rem">
          <FilterTypography>Filter</FilterTypography>
          <svg
            width="24"
            onClick={() => {
              setOpenFilter(false)
            }}
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.1943 6.41714C19.6393 5.97216 19.6393 5.2507 19.1943 4.80571C18.7493 4.36073 18.0278 4.36073 17.5829 4.80571L12 10.3886L6.41714 4.80571C5.97216 4.36073 5.2507 4.36073 4.80571 4.80571C4.36073 5.2507 4.36073 5.97216 4.80571 6.41714L10.3886 12L4.80572 17.5829C4.36073 18.0278 4.36073 18.7493 4.80571 19.1943C5.2507 19.6393 5.97216 19.6393 6.41714 19.1943L12 13.6114L17.5829 19.1943C18.0278 19.6393 18.7493 19.6393 19.1943 19.1943C19.6393 18.7493 19.6393 18.0278 19.1943 17.5829L13.6114 12L19.1943 6.41714Z"
              fill="#14142A"
            />
          </svg>
        </SpaceBetweenBox>
        <TitleTypography>Collections</TitleTypography>
        <CollectionsBox>
          <AllCollectionsBox
            onClick={() => {
              setCollectionFilter(0)
            }}
            sx={{
              fontWeight: collectionFilter === 0 ? '600' : '500',
              border: collectionFilter === 0 ? '1px solid #7646ff' : '',
              color: collectionFilter === 0 ? '#7646ff' : '',
            }}
          >
            {' '}
            All Collections
          </AllCollectionsBox>
          {collection.map((el: any, index: number) => (
            <CollectionsItem
              sx={{
                border: collectionFilter - 1 === index ? '1px solid #7646ff' : '',
              }}
              onClick={() => {
                setCollectionFilter(index + 1)
              }}
              key={`MobileCollections-${el.id}`}
            >
              <NftImg alt={el.name} src={el.icon} />
              <FlexBox height="100%" width="7.375rem">
                <NameTypography
                  fontWeight={collectionFilter - 1 === index ? '600' : '500'}
                  sx={{ color: collectionFilter - 1 === index ? '#7646ff' : '' }}
                >
                  {el.name}
                </NameTypography>
              </FlexBox>
            </CollectionsItem>
          ))}
        </CollectionsBox>
        <TitleTypography mt="1.5rem">Debt</TitleTypography>
        <CollectionsBox mb="6.25rem">
          {debtFilters.map((el: any, index: number) => (
            <AllCollectionsBox
              sx={{
                fontWeight: debtFilter === el.value ? '600' : '500',
                border: debtFilter === el.value ? '1px solid #7646ff' : '',
                color: debtFilter === el.value ? '#7646ff' : '',
              }}
              onClick={() => {
                setDebtFilter(el.value)
              }}
              key={`MobileDebt-${index}`}
            >
              {el.name}
            </AllCollectionsBox>
          ))}
        </CollectionsBox>
        <FooterBox>
          <ClearAllBox
            onClick={() => {
              setCollectionFilter(0)
              setDebtFilter(0)
              setOpenFilter(false)
            }}
          >
            <Box mr="0.375rem">
              <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 12C4.42299 12 1.92857 9.53757 1.92857 6.5C1.92857 4.65977 2.84408 3.03062 4.25 2.03221L1 2.83333M7.5 1C10.577 1 13.0714 3.46243 13.0714 6.5C13.0714 8.34023 12.1559 9.96938 10.75 10.9678L14 10.1667"
                  stroke="#A0A3BD"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
            Clear All
          </ClearAllBox>
          <ResultsBox
            onClick={() => {
              setOpenFilter(false)
            }}
          >
            {collaterals.length} Results
          </ResultsBox>
        </FooterBox>
      </Box>
    </Modal>
  )
}
