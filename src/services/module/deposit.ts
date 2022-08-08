import { getNftsForOwner, OwnedNftsResponse, getNftMetadata, NftTokenType } from '@alch/alchemy-sdk'
import alchemy from 'constants/alchemy'
import { useCallback, useEffect, useState } from 'react'

export function useDepositableNfts(address: string, id?: string) {
  // TODO check if NFT wasn't deposited yet
  const [list, setList] = useState<OwnedNftsResponse | any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const getList = useCallback(async () => {
    try {
      const response = await getNftsForOwner(alchemy, address)
      if (id) {
        setList(response.ownedNfts.filter((el) => el.contract.address === id))
      } else {
        setList(response.ownedNfts)
      }
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      console.error(`Error fetching nfts for ${address}`)
    }
  }, [address, id])
  useEffect(() => {
    if (address) {
      getList()
    }
  }, [address, getList, id])
  return { loading, list }
}

export async function getAlchemyNftMetadata(collection: string, tokenId: string) {
  return await getNftMetadata(alchemy, {
    tokenId,
    tokenType: NftTokenType.ERC721,
    contract: {
      address: collection,
    },
  })
}
