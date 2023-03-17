import { getNftsForOwner, OwnedNftsResponse, getNftMetadata, NftTokenType, Alchemy } from '@alch/alchemy-sdk'
import { useAlchemy } from 'hooks/useAlchemy'
import { useCallback, useEffect, useState } from 'react'

export function useDepositableNfts(address: string, contractAddresses: string, id?: string, depositFlag?: number) {
  // TODO check if NFT wasn't deposited yet
  const [list, setList] = useState<OwnedNftsResponse | any>([])
  const [loading, setLoading] = useState<boolean>(true)
  const alchemy = useAlchemy()
  const getList = useCallback(async () => {
    if (alchemy && contractAddresses.length > 0) {
      try {
        const response = await getNftsForOwner(alchemy, address, {
          contractAddresses: contractAddresses.split(','),
        })
        if (id) {
          setList(response.ownedNfts.filter((el) => el.contract.address.toLocaleLowerCase() === id.toLocaleLowerCase()))
        } else {
          setList(response.ownedNfts)
        }
        setLoading(false)
      } catch (e: any) {
        setLoading(false)
        console.error(`Error fetching nfts for ${address}`)
      }
    }
  }, [alchemy, contractAddresses, address, id])
  useEffect(() => {
    if (address) {
      getList()
    }
  }, [address, getList, id, depositFlag])
  return { loading, list }
}

export async function getAlchemyNftMetadata(collection: string, tokenId: string, alchemy: Alchemy) {
  return await getNftMetadata(alchemy, {
    tokenId,
    tokenType: NftTokenType.ERC721,
    contract: {
      address: collection,
    },
  })
}
