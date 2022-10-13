import { Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import searchIcon from 'assets/images/svg/liquidation/search-icon.svg'

const Container = styled('div')`
  width: 100%;
  text-align: center;
  padding-top: 84px;
`

const SearchIcon = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

const Title = styled(Typography)`
  margin: 0 auto;
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 160%;
  /* identical to box height, or 32px */

  text-align: center;

  /* Cool Gray 800 */

  color: #14142a;
  margin-top: 14px;
  margin-bottom: 8px;
`

const Explainer = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 160%;
  /* or 22px */

  text-align: center;

  /* Cool Gray 400 */

  color: #a0a3bd;
  margin: 0 auto;
`

const ClearButton = styled(Button)`
  width: 172px;
  height: 48px;
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 7.5rem;
  border-radius: 31px;
`

const MobileEmptyState = ({
  searchTerm = [],
  onClear = () => {
    return null
  },
}: {
  searchTerm?: Array<string>
  onClear?: () => null
}) => {
  return (
    <Container>
      <SearchIcon>
        <img src={searchIcon} alt="" />
      </SearchIcon>
      <Title>No result found</Title>
      {searchTerm.length === 0 || searchTerm[0] === '' ? (
        <Explainer>Please reduce or reset your filters</Explainer>
      ) : (
        <>
          <Explainer>
            No results for{' '}
            <Typography variant="body1" color="#262338" fontWeight="600" component="span">
              &quot;{searchTerm[0]}&quot;
            </Typography>
            , please check your
          </Explainer>
          <Explainer> search or clear your search criteria.</Explainer>
        </>
      )}
      <ClearButton variant="contained" onClick={() => onClear()}>
        Clear Search
      </ClearButton>
    </Container>
  )
}

export default MobileEmptyState
