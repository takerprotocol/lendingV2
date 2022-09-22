import { Box, styled, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const PaginationContainer = styled('div')`
  display: flex;
  gap: 0.25rem;
  margin-top: 2.25rem;
  justify-content: center;
`

const PaginationButton = styled('div', {
  shouldForwardProp: (props) => true,
})<{ selected?: boolean }>(({ theme, selected }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '2.375rem',
  minHeight: '2.375rem',
  background: selected ? '#262338' : '#ffffff',
  borderRadius: '0.375rem',
  transition: 'all 0.25s ease',
  cursor: 'pointer',
  color: selected ? '#ffffff' : 'initial',
  '&:hover': {
    background: '#262338',
    color: '#ffffff',
  },
}))

const ResultsContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ResultsText = styled(Typography)`
  margin-top: 1.5rem;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  text-align: right;
  color: #a0a3bd;
  opacity: 0.8;
`

const MobileCollateralPagination = ({
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
    <Box>
      <PaginationContainer>
        <PaginationButton onClick={previousPage}>{'<'}</PaginationButton>
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
        <PaginationButton onClick={nextPage}>{'>'}</PaginationButton>
      </PaginationContainer>
      <ResultsContainer>
        <ResultsText>{collaterals.length} results in total</ResultsText>
      </ResultsContainer>
    </Box>
  )
}

export default MobileCollateralPagination
