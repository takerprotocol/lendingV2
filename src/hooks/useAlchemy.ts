import { useEffect, useState } from 'react'
import { useActiveWeb3React } from './web3'
import { Alchemy, initializeAlchemy } from '@alch/alchemy-sdk'
import { chainAlchemyApiKey, chainAlchemyNetwork } from 'constants/chains'

export function useAlchemy() {
  const { chainId } = useActiveWeb3React()
  const [alchemy, setAlchemy] = useState<Alchemy | null>(null)
  useEffect(() => {
    if (chainId) {
      setAlchemy(
        initializeAlchemy({
          apiKey: chainAlchemyApiKey[chainId],
          network: chainAlchemyNetwork[chainId],
          maxRetries: 10,
        })
      )
    }
  }, [chainId])
  return alchemy
}
