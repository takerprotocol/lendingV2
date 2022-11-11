import { Box, Button, styled, Typography } from '@mui/material'
import mobileButtonDown from 'assets/images/svg/dashboard/mobileButtonDown.svg'
import { useMemo } from 'react'
import { useCollections } from 'state/application/hooks'
import { useAccountNfts, useUserNftConfig, useUserValue } from 'state/user/hooks'
import { SpaceBox, FlexBox } from 'styleds'
import { fixedFormat } from 'utils'
const MyNFTCollateralBox = styled(Box)`
  background: linear-gradient(249.47deg, #7a82ff 0%, #9574f5 100%);
  box-shadow: 0 0.5rem 1rem rgba(128, 139, 238, 0.3), inset 0 0.0625rem 0.1875rem rgba(170, 189, 255, 0.7);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 1rem;
  .Padding-button {
    min-width: 5.75rem;
    height: 2.25rem;
    padding: 0.5625rem 0.75rem 0.5625rem 1.0625rem;
  }
`
const NFTsBox = styled(FlexBox)`
  background: rgba(255, 255, 255, 0.1);
  opacity: 0.6;
  border-radius: 4px;
  padding: 0.375rem 0.5rem;
  margin-top: 0.5rem;
`
interface MobileMyNFTCollateralProps {
  myLoanType: boolean
}
export default function MobileMyNFTCollateral({ myLoanType }: MobileMyNFTCollateralProps) {
  const userValue = useUserValue()
  const nftConfig = useUserNftConfig()
  const collections = useCollections()
  const accountNfts = useAccountNfts()
  const supportNfts = useMemo(() => {
    return accountNfts.filter((el) =>
      collections.find((cel) => cel.id.toLocaleLowerCase() === el.contract.address.toLocaleLowerCase())
    )
  }, [accountNfts, collections])
  return (
    <MyNFTCollateralBox>
      <SpaceBox>
        <Box>
          <Typography mb={'0.25rem'} variant="body2" color="#ffffff">
            My NFT Collateral
          </Typography>
          <Typography variant="subtitle1" component="span" fontWeight="700" color="#ffffff">
            {fixedFormat(userValue.NFTLiquidity)}{' '}
            <Typography variant="body1" component="span" fontWeight="700" color="#ffffff">
              ETH
            </Typography>
          </Typography>
          <FlexBox>
            <NFTsBox>
              <Typography variant="body2" lineHeight="0.75rem" color="#ffffff">
                {+nftConfig} NFTs
              </Typography>
              {+nftConfig !== 0 && (
                <Typography variant="body2" lineHeight="0.75rem" color="#ffffff">
                  &nbsp;· {supportNfts.length} collections
                </Typography>
              )}
            </NFTsBox>
          </FlexBox>
        </Box>
        <Box mt="48px">
          <Button
            onClick={() => {
              if (myLoanType) {
                window.scrollTo({
                  top: 710,
                  behavior: 'smooth',
                })
              } else {
                window.scrollTo({
                  top: 1010,
                  behavior: 'smooth',
                })
              }
            }}
            className="Padding-button"
            variant="contained"
            color="secondary"
          >
            <Typography variant="body2" component="span" fontWeight="700" color=" #716CF8">
              Deposit
            </Typography>
            <img src={mobileButtonDown} alt="" />
          </Button>
        </Box>
      </SpaceBox>
    </MyNFTCollateralBox>
  )
}
