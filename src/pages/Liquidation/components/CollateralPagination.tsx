import { styled, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const PaginationContainer = styled('div')`
  display: flex;
  gap: 6px;
  margin-top: 48px;
`

const PaginationButton = styled('div', {
  shouldForwardProp: (props) => true,
})<{ selected?: boolean }>(({ theme, selected }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: 48,
  minHeight: 48,
  background: selected ? '#262338' : '#ffffff',
  borderRadius: 6,
  transition: 'all 0.25s ease',
  cursor: 'pointer',
  color: selected ? '#ffffff' : 'initial',
  '&:hover': {
    background: '#262338',
    color: '#ffffff',
  },
}))

const ResultsContainer = styled('div')`
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ResultsText = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  text-align: right;

  /* Cool Gray 400 */

  color: #a0a3bd;
`

const CollateralPagination = ({
  collaterals,
  onPageSelect,
}: {
  collaterals: any[]
  onPageSelect: (page: number) => void
}) => {
  const pages = Math.ceil(collaterals.length / 16)
  const params = useParams()
  const navigate = useNavigate()
  const onSelect = (index: number) => {
    onPageSelect(index)
    navigate(`/liquidation/${index}`)
  }
  const nextPage = () => {
    if (params.page && Number(params.page) + 1 <= pages) {
      navigate(`/liquidation/${Number(params.page) + 1}`)
    } else {
      navigate(`/liquidation/${pages}`)
    }
  }
  const previousPage = () => {
    if (params.page && Number(params.page) - 1 > 0) {
      navigate(`/liquidation/${Number(params.page) - 1}`)
    } else {
      navigate(`/liquidation/1`)
    }
  }
  return (
    <PaginationContainer>
      <PaginationButton onClick={previousPage}>
        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.12069 8.752C7.02469 8.752 6.91802 8.72533 6.80069 8.672C6.69402 8.61867 6.57669 8.55467 6.44869 8.48L1.12069 5.376C0.992688 5.30133 0.896688 5.20533 0.832687 5.088C0.779354 4.96 0.752688 4.832 0.752688 4.704C0.752688 4.56533 0.784688 4.43733 0.848688 4.32C0.912688 4.192 1.00869 4.096 1.13669 4.032L6.43269 0.992C6.55002 0.917333 6.65669 0.863999 6.75269 0.832C6.85935 0.789333 6.96069 0.768 7.05669 0.768C7.23802 0.757333 7.40869 0.837333 7.56869 1.008C7.72869 1.17867 7.80869 1.36 7.80869 1.552C7.80869 1.65867 7.77669 1.76 7.71269 1.856C7.65935 1.94133 7.57935 2.016 7.47269 2.08L1.88869 5.28L1.80869 4.064L7.44069 7.376C7.57935 7.45067 7.67535 7.536 7.72869 7.632C7.78202 7.728 7.80869 7.83467 7.80869 7.952C7.80869 8.16533 7.73402 8.352 7.58469 8.512C7.43535 8.672 7.28069 8.752 7.12069 8.752Z"
            fill="currentColor"
          />
        </svg>
      </PaginationButton>
      {Array.from({ length: pages }).map((item: any, index: number) => {
        if (index < 3) {
          return (
            <PaginationButton
              selected={Number(params.page || 0) === index + 1}
              onClick={() => onSelect(index + 1)}
              key={`pagination-button-${index}`}
            >
              {index + 1}
            </PaginationButton>
          )
        } else {
          return null
        }
      })}
      {pages > 4 && (
        <>
          <PaginationButton>...</PaginationButton>
        </>
      )}
      {pages > 3 && (
        <PaginationButton selected={Number(params.page || 0) === pages} onClick={() => onSelect(pages)}>
          {pages}
        </PaginationButton>
      )}
      <PaginationButton onClick={nextPage}>
        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.89725 8.608C0.715917 8.608 0.54525 8.52267 0.38525 8.352C0.235917 8.17067 0.16125 7.98933 0.16125 7.808C0.16125 7.69067 0.187917 7.58933 0.24125 7.504C0.30525 7.41867 0.40125 7.33867 0.52925 7.264L6.11325 4.096L6.20925 5.296L0.51325 1.968C0.395917 1.904 0.310583 1.824 0.25725 1.728C0.214583 1.632 0.19325 1.52533 0.19325 1.408C0.19325 1.19467 0.267917 1.008 0.41725 0.848C0.566583 0.688 0.72125 0.608 0.88125 0.608C0.97725 0.608 1.07858 0.634666 1.18525 0.688C1.30258 0.741333 1.41992 0.805333 1.53725 0.879999L6.88125 3.968C7.00925 4.04267 7.10525 4.13867 7.16925 4.256C7.23325 4.37333 7.26525 4.50667 7.26525 4.656C7.26525 4.79467 7.23325 4.92267 7.16925 5.04C7.11592 5.15733 7.02525 5.25333 6.89725 5.328L1.52125 8.368C1.40392 8.432 1.29192 8.49067 1.18525 8.544C1.08925 8.58667 0.99325 8.608 0.89725 8.608Z"
            fill="currentColor"
          />
        </svg>
      </PaginationButton>
      <ResultsContainer>
        <ResultsText>{collaterals.length} results in total</ResultsText>
      </ResultsContainer>
    </PaginationContainer>
  )
}

export default CollateralPagination
