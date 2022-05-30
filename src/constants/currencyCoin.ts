import EURSvg from 'assets/images/svg/currency/eur.svg'
import CHFSvg from 'assets/images/svg/currency/chf.svg'
import GBPSvg from 'assets/images/svg/currency/gbp.svg'
import USDTSvg from 'assets/images/svg/currency/USDT.svg'

interface Coin {
  [key: string]: string
}
const COIN_MAP: Coin = {
  EUR: EURSvg,
  CHF: CHFSvg,
  GBP: GBPSvg,
  USDT: USDTSvg,
}

export default COIN_MAP
