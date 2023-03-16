import { Box, styled } from '@mui/material'

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
export const ChangeNetWork = () => {
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
    <ChangeNetWorkBox>
      Taker is currently only available on Ethereum Goerli Network
      <span onClick={() => change()}>{`Click here to change networks >>`}</span>
    </ChangeNetWorkBox>
  )
}
