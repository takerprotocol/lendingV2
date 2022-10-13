import { Button, Skeleton, styled, Typography } from '@mui/material'
import { useMemo } from 'react'

const Card = styled('div')(({ theme }) => ({
  background: '#ffffff',
  border: '1px solid #eff0f6',
  borderRadius: 12,
  width: '100%',
  padding: 24,
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  [theme.breakpoints.down('md')]: {
    gap: 20,
  },
}))

const DataItem = styled('div')`
  display: flex;
  flex-direction: column;
`

const CollectionDataItem = styled(DataItem)`
  width: 250px;
`

const StyledCollectionPlaceholder = styled(Skeleton)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: 4,
}))

const CollectionImageContainer = styled('div')`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`

const StyledSkeleton = styled(Skeleton)`
  width: 84px;
  height: 12px;
  margin-bottom: 10px;
  border-radius: 4px;
`

const CollateralItemSkeleton = () => {
  const Collections = useMemo(() => {
    return [1, 2, 3, 4, 5].map((collection: any) => (
      <StyledCollectionPlaceholder variant="rectangular" key={`collection-${JSON.stringify(collection)}`} />
    ))
  }, [])

  return (
    <Card>
      <DataItem>
        <StyledSkeleton variant="rectangular" />
        <StyledSkeleton width={129} height={24} variant="rectangular" />
      </DataItem>
      <DataItem>
        <StyledSkeleton variant="rectangular" />
        <StyledSkeleton width={66} height={24} variant="rectangular" />
      </DataItem>
      <CollectionDataItem>
        <StyledSkeleton variant="rectangular" />
        <Typography component="div">
          <CollectionImageContainer>{Collections}</CollectionImageContainer>
        </Typography>
      </CollectionDataItem>
      <DataItem>
        <StyledSkeleton variant="rectangular" />
        <StyledSkeleton width={66} height={24} variant="rectangular" />
      </DataItem>
      <DataItem>
        <StyledSkeleton variant="rectangular" />
        <StyledSkeleton width={66} height={24} variant="rectangular" />
      </DataItem>
      <Button disabled variant="contained" color="primary">
        Liquidate
      </Button>
    </Card>
  )
}

export default CollateralItemSkeleton
