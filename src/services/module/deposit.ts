import { chainIdList } from 'constants/chains'
import usePrevious from 'hooks/usePrevious'
import { useEffect, useState } from 'react'
import { getNFTs } from 'utils/alchemyApi'

export function useOwnerNft(address: string) {
  const [list, setList] = useState<any>([])
  const previousBanners = usePrevious(list)
  useEffect(() => {
    if (previousBanners) {
      getNFTs(address, chainIdList.Ethereum).then((res: any) => {
        if (res) {
          setList(res.ownedNfts)
        }
      })
    }
  }, [previousBanners, address])
  return list
}
