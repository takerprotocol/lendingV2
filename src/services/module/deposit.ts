import { getNftsForOwner, OwnedNftsResponse } from '@alch/alchemy-sdk'
import alchemy from 'constants/alchemy'
import { useCallback, useEffect, useState } from 'react'

export function useDepositableNfts(address: string) {
  // TODO check if NFT wasn't deposited yet
  const [list, setList] = useState<OwnedNftsResponse | any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const getList = useCallback(async () => {
    try {
      const response = await getNftsForOwner(alchemy, address)
      setList(response.ownedNfts)
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      console.error(`Error fetching nfts for ${address}`)
    }
  }, [address])
  useEffect(() => {
    if (address) {
      getList()
    }
  }, [address, getList])
  return { loading, list }
}
