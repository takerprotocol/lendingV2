import { Box, styled } from '@mui/material'
import { useMobileType } from 'state/user/hooks'

const ChangeNetWorkBox = styled(Box)`
  width: 100%;
  height: 48px;
  position: fixed;
  z-index: 10000;
  top: 0px;
  left: 0px;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #7646ff;
  span {
    font-weight: 600;
    font-size: 12px;
    text-decoration-line: underline;
    margin-left: 16px;
    cursor: pointer;
  }
`
const MobileChangeNetWorkBox = styled(Box)`
  width: 100%;
  height: 4.0625rem;
  position: fixed;
  z-index: 10000;
  top: 0px;
  left: 0px;
  padding: 0.75rem 0 0.75rem 0.9375rem;
  font-family: 'Quicksand';
  font-weight: 600;
  font-size: 14px;
  line-height: 150%;
  color: #ffffff;
  background: #7646ff;
  p {
    margin: 0.125rem 0 0 0;
    font-size: 12px;
    font-weight: 600;
    line-height: 150%;
    text-decoration-line: underline;
    color: #ffffff;
  }
`
export const ChangeNetWork = () => {
  const mobile = useMobileType()
  const change = async () => {
    if (window.ethereum) {
      try {
        await (window.ethereum as any).request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x5',
            },
          ],
        })
      } catch (e) {
        if ((e as any).code === 4902) {
          try {
            await (window.ethereum as any).request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x5',
                  chainName: 'Goerli',
                  nativeCurrency: {
                    name: 'Goerli',
                    symbol: 'GoerliETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://goerli.infura.io/v3/'],
                  blockExplorerUrls: ['https://goerli.etherscan.io'],
                },
              ],
            })
          } catch (ee) {
            //
          }
        }
      }
    }
  }
  return (
    <>
      {mobile ? (
        <ChangeNetWorkBox>
          Taker is currently only available on Ethereum Goerli Network
          <span onClick={() => change()}>{`Click here to change networks >>`}</span>
        </ChangeNetWorkBox>
      ) : (
        <MobileChangeNetWorkBox>
          Taker is currently only available on Ethereum
          <p onClick={() => change()}>{`Click here to change networks >>`}</p>
        </MobileChangeNetWorkBox>
      )}
    </>
  )
}
