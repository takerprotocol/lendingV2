export const getPricesFromCoingecko = async () => {
  const coins: any = {
    dai: 'dai',
    'usd-coin': 'usdc',
    'wrapped-bitcoin': 'wbtc',
    bitcoin: 'btc',
    ethereum: 'eth',
    weth: 'weth',
    sushi: 'sushi',
  }
  const result = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=dai,bitcoin,ethereum,usd-coin,weth,wrapped-bitcoin,sushi,divergence-protocol&vs_currencies=usd'
  )
    .then((res) => res.json())
    .then((res) => {
      const prices = Object.keys(res).map((key) => {
        return {
          symbol: coins[key],
          price: res[key].usd,
        }
      })
      return prices
    })
    .catch((err) => {
      return []
    })
  return result
}
