import { Button, Typography } from '@mui/material'
import { styled } from '@mui/system'

const Container = styled('div')`
  text-align: center;
  padding-top: 100px;
`

const SearchIcon = styled('div')`
  width: 62px;
  height: 62px;
  background: linear-gradient(
      61.18deg,
      rgba(102, 166, 232, 0) 0%,
      rgba(135, 143, 248, 0.098) 51.07%,
      rgba(105, 165, 233, 0.2) 97.23%
    ),
    #262338;
  box-shadow: 0px 4px 8px rgba(75, 75, 122, 0.1), inset 0px 2px 2px rgba(75, 86, 132, 0.5);
  border-radius: 6px;
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
  font-size: 28px;
  line-height: 160%;
  /* identical to box height, or 45px */

  text-align: center;

  /* Cool Gray 800 */

  color: #14142a;
  margin-top: 10px;
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
  margin-top: 10px;
`

const ClearButton = styled(Button)`
  background: linear-gradient(
      61.18deg,
      rgba(102, 166, 232, 0) 0%,
      rgba(135, 143, 248, 0.098) 51.07%,
      rgba(105, 165, 233, 0.2) 97.23%
    ),
    #262338;
  box-shadow: 0px 4px 8px rgba(75, 75, 122, 0.1), inset 0px 2px 2px rgba(75, 86, 132, 0.5);
  border-radius: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 10px;
`

const EmptyState = ({
  searchTerm = '',
  onClear = () => {
    return null
  },
}: {
  searchTerm?: string
  onClear?: () => null
}) => {
  return (
    <Container>
      <SearchIcon>
        <svg width="45" height="49" viewBox="0 0 45 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.9994 7.67944C19.6955 3.81345 28.2577 6.1077 32.1237 12.8038C35.4747 18.6079 34.1974 25.8141 29.4368 30.1487L34.0974 38.2224C34.6497 39.179 34.322 40.4021 33.3654 40.9544L31.6333 41.9544C30.6767 42.5067 29.4536 42.179 28.9013 41.2224L24.2405 33.149C18.1061 35.1051 11.2262 32.6082 7.875 26.8038C4.00901 20.1077 6.30326 11.5454 12.9994 7.67944Z"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M26.9994 31.9282C33.6955 28.0622 35.9897 19.4999 32.1237 12.8038C28.2577 6.1077 19.6955 3.81345 12.9994 7.67944C6.30326 11.5454 4.00901 20.1077 7.875 26.8038C11.741 33.4999 20.3033 35.7941 26.9994 31.9282Z"
            stroke="white"
            strokeWidth="2"
          />
          <path
            d="M24.3819 11.941C23.3407 11.362 22.1945 10.9954 21.0152 10.8606C19.1661 10.6492 17.2356 11.0075 15.5 12.0095M28.7603 17.73C28.5631 16.8987 28.2433 16.0816 27.7942 15.3037L28.7603 17.73Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SearchIcon>
      <Title>No result found</Title>
      <Explainer>No results for {searchTerm}, please check your search or clear your search criteria.</Explainer>
      <ClearButton onClick={() => onClear()}>Clear Search</ClearButton>
    </Container>
  )
}

export default EmptyState
