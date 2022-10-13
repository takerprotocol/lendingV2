import { Box, Typography, styled } from '@mui/material'
// import mobileNft from 'assets/images/svg/dashboard/mobileNft.svg'
import mobileBlackEthLogo2 from 'assets/images/svg/dashboard/mobileBlackEthLogo2.svg'
import mobileCollateralRight from 'assets/images/svg/dashboard/mobileCollateralRight.svg'
import mobileCollateralRight2 from 'assets/images/svg/dashboard/mobileCollateralRight2.svg'
import mobileCollateralDown from 'assets/images/svg/dashboard/mobileCollateralDown.svg'
import mobileCollateralUp from 'assets/images/svg/dashboard/mobileCollateralUp.svg'
import { CenterBox, FlexBox, SpaceBetweenBox } from 'styleds'
import { useState } from 'react'
import { fromWei } from 'web3-utils'
import { useNavigate } from 'react-router-dom'
import { useCollections, useDepositedCollection, useLoading } from 'state/application/hooks'
import { div, times } from 'utils'
import { useAddress } from 'state/user/hooks'
import MobileCollectionSkeleton from '../mobileDashboardSkeleton/MobileCollectionSkeleton'
const Collection = styled(Box)`
  background: linear-gradient(180deg, #9574f5 0%, #857dfc 100%);
  width: 100%;
  padding: 1.3125rem 1rem 2rem 1rem;
  border-radius: 12px;
  transform: matrix(1, 0, 0, -1, 0, 0);
`
const CollectionBgBox = styled(Box)`
  background: linear-gradient(180deg, #857dfc 0%, #f7f7fc 100%);
  padding: 0 1rem;
  transform: matrix(1, 0, 0, -1, 0, 0);
`
const NftBox = styled(Box)`
  background: #ffffff;
  width: 100%;
  padding: 1rem;
  margin-bottom: -1rem;
  border-radius: 0.5rem;
  position: relative;
  z-index: 5;
`
const LabelBox = styled(Box)`
  padding: 0.3125rem 0.625rem 0.4375rem 0.625rem;
  background: linear-gradient(180deg, #ff8a48 0%, #fa785c 100%);
  box-shadow: 0px 0.25rem 0.5rem rgba(252, 128, 84, 0.2);
  border-radius: 0.9375rem 0.125rem 0.125rem 0.9375rem;
  position: absolute;
  top: 1rem;
  right: -0.25rem;
`
const CardBox = styled(Box)`
  width: 100%;
  margin-top: 1rem;
`
const ImgBox = styled(`img`)`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.25rem;
`
const MyDepositedBox = styled(Box)`
  width: 100%;
  background: #e6e5fa;
  border-radius: 6px;
  margin: 0.5rem 0 0.5rem 0;
  padding: 0.5rem 1rem;
`
const NftFooterBox = styled(Box)`
  width: 100%;
  padding: 1.5rem 1rem 0.5rem 1rem;
  background: #eeedff;
  border-radius: 8px;
  box-shadow: 0px 10px 20px rgba(106, 99, 223, 0.5);
`
export default function MobileCollection() {
  const [type, setType] = useState<number | null>(1)
  const collection = useCollections()
  const address = useAddress()
  const loading = useLoading()
  const navigate = useNavigate()
  const depositedCollection = useDepositedCollection()
  const deposited = (id: string) => {
    if (depositedCollection) {
      const item = depositedCollection.find(
        (el) => el.userNftCollection.id.split('-')[1].toLocaleLowerCase() === id.toLocaleLowerCase()
      )
      return item ? item.userNftCollection.tokens.length : '0'
    }
    return '0'
  }
  return (
    <CollectionBgBox display={collection.length === 0 ? 'none' : ''}>
      {loading ? (
        <MobileCollectionSkeleton></MobileCollectionSkeleton>
      ) : (
        <>
          <Collection>
            <Typography variant="subtitle2" fontWeight="700" color="#ffffff">
              Collection Supported
            </Typography>
            <Typography mt="0.125rem" variant="body2" component="span" fontWeight="600" color="#C8B9FA">
              Deposit NFTs to earn{' '}
              <Typography variant="body2" component="span" fontWeight="700" color="#ffffff">
                +20{' '}
              </Typography>
              borrow reward
            </Typography>
            {collection.map((el: any) => (
              <CardBox key={`${el.id}collection`}>
                <NftBox>
                  <LabelBox display={type ? '' : 'none'}>
                    <Typography variant="body1" color="#ffffff" lineHeight="150%" fontWeight="700">
                      Can Deposit
                    </Typography>
                  </LabelBox>
                  <FlexBox>
                    <ImgBox src={el.icon} alt="" />
                    <Box ml="0.5rem">
                      <Typography variant="body1" lineHeight="1.125rem" fontWeight="700">
                        {el?.name}
                      </Typography>
                      <FlexBox>
                        <Typography variant="body2" lineHeight="1.125rem" color="#A0A3BD">
                          60 Users
                        </Typography>
                        <Typography ml={'0.5rem'} variant="body2" lineHeight="1.125rem" color="#A0A3BD">
                          230 NFTs
                        </Typography>
                      </FlexBox>
                    </Box>
                  </FlexBox>
                  <SpaceBetweenBox mt="1rem">
                    <FlexBox>
                      <Box>
                        <Typography variant="body2" color="#A0A3BD">
                          Floor Price
                        </Typography>
                        <FlexBox mt="0.125rem">
                          <img src={mobileBlackEthLogo2} alt="" />
                          <Typography ml="0.3125rem" variant="body1" fontWeight="700" lineHeight="1.25rem">
                            {fromWei(el?.floorPrice || 0)}
                          </Typography>
                        </FlexBox>
                      </Box>
                      <Box ml="1.94rem">
                        <Typography variant="body2" color="#A0A3BD">
                          Loan to value
                        </Typography>
                        <FlexBox mt="0.125rem">
                          <img src={mobileBlackEthLogo2} alt="" />
                          <Typography ml="0.3125rem" variant="body1" fontWeight="700" lineHeight="1.25rem">
                            {times(fromWei(el?.floorPrice || 0), div(el.ltv, 10000))}
                          </Typography>
                          <Typography
                            ml="0.25rem"
                            variant="body1"
                            color="#A0A3BD"
                            fontWeight="700"
                            lineHeight="1.25rem"
                          >
                            {div(el.ltv, 100)}%
                          </Typography>
                        </FlexBox>
                      </Box>
                    </FlexBox>
                    <img
                      src={address ? mobileCollateralRight : mobileCollateralRight2}
                      alt=""
                      onClick={() => {
                        navigate(`/deposit/${el.id}`)
                      }}
                    />
                  </SpaceBetweenBox>
                </NftBox>
                <NftFooterBox>
                  {el === type && (
                    <Box>
                      <SpaceBetweenBox marginY="0.5rem">
                        <Typography variant="body2" color="#A0A3BD">
                          Liquidation Threshold
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          {div(el.liqThreshold, 100)}%
                        </Typography>
                      </SpaceBetweenBox>
                      <SpaceBetweenBox>
                        <Typography variant="body2" color="#A0A3BD">
                          Liquidation Profit
                        </Typography>
                        <Typography variant="body2" fontWeight="600">
                          20%
                        </Typography>
                      </SpaceBetweenBox>
                      <MyDepositedBox>
                        <SpaceBetweenBox>
                          <Box>
                            <Typography variant="body1" color="#7646FF" fontWeight="700">
                              {deposited(el.id)}
                            </Typography>
                            <Typography variant="body2" color="#A0A3BD">
                              My Deposited
                            </Typography>
                          </Box>
                          <Box mr="2.75rem">
                            <Typography variant="body1" color="#7646FF" fontWeight="700">
                              10 NFTs
                            </Typography>
                            <Typography variant="body2" color="#A0A3BD">
                              I Can Deposit
                            </Typography>
                          </Box>
                        </SpaceBetweenBox>
                      </MyDepositedBox>
                    </Box>
                  )}
                  <CenterBox
                    onClick={() => {
                      if (el === type) {
                        setType(null)
                      } else {
                        setType(el)
                      }
                    }}
                  >
                    <Typography variant="body2" color="#A7A5D1">
                      Show Details
                    </Typography>
                    <img src={type ? mobileCollateralUp : mobileCollateralDown} alt="" />
                  </CenterBox>
                </NftFooterBox>
              </CardBox>
            ))}
          </Collection>
        </>
      )}
    </CollectionBgBox>
  )
}
