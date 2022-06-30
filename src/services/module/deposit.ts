import { getNftsForOwner, OwnedNftsResponse } from '@alch/alchemy-sdk'
import alchemy from 'constants/alchemy'
import { useCallback, useEffect, useState } from 'react'

export function useDepositableNfts(address: string) {
  // TODO check if NFT wasn't deposited yet
  const [list, setList] = useState<OwnedNftsResponse | any>([])
  const getList = useCallback(async () => {
    try {
      const response = await getNftsForOwner(alchemy, address)
      setList(response.ownedNfts)
    } catch (e: any) {
      console.error(`Error fetching nfts for ${address}`)
    }
  }, [address])
  useEffect(() => {
    getList()
  }, [address, getList])
  return list
}
