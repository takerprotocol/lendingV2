import BSCIcon from 'assets/images/svg/bsc_icon_logo.svg'
import ETHIcon from 'assets/images/svg/ethereum-eth.svg'
import PolygonIcon from 'assets/images/svg/polygon-matic-logo.svg'

export default function chainIcons(name: string) {
  const _name = name.toLowerCase()
  switch (_name) {
    case 'bsc':
      return BSCIcon
    case 'eth':
      return ETHIcon
    case 'polygon':
      return PolygonIcon
    default:
      return ''
  }
}