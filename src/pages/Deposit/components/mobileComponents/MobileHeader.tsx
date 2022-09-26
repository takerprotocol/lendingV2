import { Box, styled, Typography } from '@mui/material'
import { FlexBox, SpaceBetweenBox } from 'styleds'
import RewardAdd from 'assets/images/svg/deposit/Reward-add.svg'
import RewardRight from 'assets/images/svg/deposit/Reward-right.svg'
import { useMemo, useState } from 'react'
import { useCollections } from 'state/application/hooks'
import { useParams } from 'react-router-dom'
import { div, times } from 'utils'
import { useErc20ReserveData } from 'state/user/hooks'

const MainBox = styled(Box)`
  width: 100%;
  padding: 1rem 1rem 0.75rem 1rem;
  background: #ffffff;
  box-shadow: 0px 0.625rem 1.25rem rgba(218, 218, 238, 0.3);
  border-radius: 0.75rem;
`
const HeaderFlexBox = styled(FlexBox)`
  position: relative;
`
const ImgBox = styled(`img`)`
  width: 4rem;
  height: 4rem;
  border-radius: 0.25rem;
  z-index: 3;
`
const ImgBoxBorder = styled(Box)`
  position: absolute;
  width: 3.5rem;
  height: 3.5rem;
  left: 0.75rem;
  top: 0.25rem;
  background: #ffffff;
  border: 1px solid #d9dbe9;
  border-radius: 3px;
  z-index: 2;
`
const ImgBoxBorder1 = styled(Box)`
  position: absolute;
  width: 3rem;
  height: 3rem;
  left: 1.5rem;
  top: 0.5rem;
  background: #ffffff;
  opacity: 0.5;
  border: 1px solid #d9dbe9;
  border-radius: 2px;
  z-index: 1;
`
const TotalBox = styled(Box)`
  width: 100%;
  padding: 0.75rem 0.75rem 0.6875rem 0.75rem;
  background: #f7f7fc;
  margin-top: 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const FloorBox = styled(Box)`
  width: 100%;
  padding: 1rem 0rem 0rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const ShowDetailButton = styled(Box)`
  width: 7.4375rem;
  background: #f7f7fc;
  border-radius: 3.75rem;
  padding: 0.375rem 0.75rem 0.375rem 1rem;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`
const RewardBox = styled(Box)`
  background: #f7f7fc;
  margin-top: 1rem;
  border-radius: 0.625rem;
  padding: 1rem;
`
export default function MobileHeader() {
  const [details, setDetails] = useState<boolean>(false)
  const { id } = useParams()
  const erc20ReserveData = useErc20ReserveData()
  const collections = useCollections()
  const collection = useMemo(() => {
    if (collections && id) {
      return collections.find((el) => el.id.toLocaleLowerCase() === id.toLocaleLowerCase())
    } else {
      return null
    }
  }, [collections, id])
  return (
    <MainBox>
      <HeaderFlexBox>
        <ImgBox src={collection?.icon} alt=""></ImgBox>
        <Box ml="1.375rem">
          <Typography variant="subtitle1" lineHeight="1.375rem" fontWeight="700">
            {collection?.symbol}
          </Typography>
          <Typography mt="0.5rem" variant="body2" lineHeight="0.875rem" color="#A0A3BD">
            {collection?.stats?.countOwners} Active Users
          </Typography>
        </Box>
        <ImgBoxBorder></ImgBoxBorder>
        <ImgBoxBorder1></ImgBoxBorder1>
      </HeaderFlexBox>
      <TotalBox>
        <Box>
          <Typography variant="body2" color="#A0A3BD" lineHeight="0.75rem" fontWeight="500">
            Total Value Locked
          </Typography>
          <FlexBox mt="0.5rem">
            <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 9.21212L6.5 2L11 9.21212L6.5 16L2 9.21212Z"
                stroke="#4E4B66"
                strokeWidth="1.73684"
                strokeLinejoin="round"
              />
              <path d="M2 9L6.5 11.5L11 9" stroke="#4E4B66" strokeWidth="1.30263" strokeLinejoin="round" />
            </svg>
            <Typography ml="0.25rem" variant="subtitle1" color="#4E4B66" lineHeight="1.125rem">
              {collection?.stats?.volumeAll || 0}
            </Typography>
          </FlexBox>
        </Box>
        <Typography variant="body1" color="#A0A3BD" lineHeight="0.875rem" fontWeight="500">
          {collection?.stats?.totalSupply || 0} NFTs
        </Typography>
      </TotalBox>
      <FloorBox>
        <Box>
          <Typography variant="body2" color="#A0A3BD" lineHeight="0.75rem" fontWeight="500">
            Floor Price
          </Typography>
          <FlexBox>
            <Typography mt="0.5rem" mr="0.25rem" variant="subtitle1" color="#4E4B66" lineHeight="1.125rem">
              {collection?.stats?.floorPrice || 0}
            </Typography>
            <Typography mt="0.75rem" variant="body1" color="#4E4B66;" fontWeight="600" lineHeight="0.875rem">
              ETH
            </Typography>
          </FlexBox>
        </Box>
        <Box mr="2.875rem">
          <Typography variant="body2" color="#A0A3BD" lineHeight="0.75rem" fontWeight="500">
            {div(collection?.ltv, 100)}% Loan to Value
          </Typography>
          <FlexBox>
            <Typography
              mt="0.5rem"
              mr="0.25rem"
              variant="subtitle1"
              color="#7646FF"
              fontWeight="700"
              lineHeight="1.125rem"
            >
              {times(collection?.stats?.floorPrice || 0, div(collection?.ltv, 10000))}
            </Typography>
            <Typography mt="0.75rem" variant="body1" color="#7646FF" fontWeight="700" lineHeight="0.875rem">
              ETH
            </Typography>
          </FlexBox>
        </Box>
      </FloorBox>
      {details && (
        <Box mt="2rem">
          <SpaceBetweenBox m="0 0.75rem">
            <Typography variant="body2" color="#A0A3BD">
              Liquidation Threshold
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {div(collection.liqThreshold, 100)}%
            </Typography>
          </SpaceBetweenBox>
          <SpaceBetweenBox m="0 0.75rem" mt="0.5rem">
            <Typography variant="body2" color="#A0A3BD">
              Liquidation Threshold
            </Typography>
            <Typography variant="body2" fontWeight="600">
              70%
            </Typography>
          </SpaceBetweenBox>
          <RewardBox>
            <FlexBox>
              <Box width="3.3125rem">
                <Typography variant="subtitle2" color="#4BC8B1">
                  20%
                </Typography>
              </Box>
              <img src={RewardAdd} alt="" />
              <Box ml="1.3125rem" width="3.5625rem">
                <Typography variant="subtitle2" color="#6E7191">
                  {erc20ReserveData.depositRate}%
                </Typography>
              </Box>
              <img src={RewardRight} alt="" />
              <Box ml="1.3125rem">
                <Typography variant="subtitle2" color="#4E4B66">
                  {erc20ReserveData.depositRate}%
                </Typography>
              </Box>
            </FlexBox>
            <FlexBox>
              <Typography variant="body2" color="#A0A3BD">
                Reward APY
              </Typography>
              <Typography m="0 1.4375rem 0 1.8125rem" variant="body2" fontWeight="600" color="#A0A3BD">
                Borrow APY
              </Typography>
              <Typography variant="body2" fontWeight="600" color="#4E4B66">
                Net Borrow APY
              </Typography>
            </FlexBox>
          </RewardBox>
        </Box>
      )}
      <ShowDetailButton onClick={() => setDetails(!details)}>
        <Typography variant="body2" color="#A0A3BD" fontWeight="500">
          Show Details
        </Typography>
        {details ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5.875L9 12.5" stroke="#A0A3BD" strokeLinecap="round" />
            <path d="M12 8.49973L9 5.5L6 8.5" stroke="#A0A3BD" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12.125L9 5.5" stroke="#A0A3BD" strokeLinecap="round" />
            <path d="M12 9.50027L9 12.5L6 9.5" stroke="#A0A3BD" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </ShowDetailButton>
    </MainBox>
  )
}
