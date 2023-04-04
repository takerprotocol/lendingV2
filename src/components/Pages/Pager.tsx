import { Box, styled } from '@mui/material'
import { useMemo } from 'react'
import pageRight from 'assets/images/svg/common/pageRight.svg'
import hoverPageRight from 'assets/images/svg/common/hoverPageRight.svg'
import { minus } from 'utils'
const PageBox = styled(Box)`
  position: absolute;
  width: 3rem;
  height: 3rem;
  background: #ffffff;
  border: 1px solid #f7f7fc;
  box-shadow: 0rem 0.625rem 1.25rem rgba(218, 218, 238, 0.3);
  border-radius: 6.25rem;
  background-image: url(${pageRight});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  top: 50%;
  cursor: pointer;
  :hover {
    background-color: rgba(78, 75, 102, 1);
    background-image: url(${hoverPageRight});
    box-shadow: 0rem 0.625rem 1.25rem rgba(78, 75, 102, 0.15);
  }
`
const PagerBox = styled(Box)`
  height: 6px;
  display: flex;
  justify-content: center;
  margin: 12px;
`
interface NFTsListType {
  list: any[]
  TypeKey?: string
  pageType: number
  setPageType: Function
}
export default function Pager({ pageType, setPageType, list, TypeKey }: NFTsListType) {
  console.log('🚀 ~ file: Pager.tsx:37 ~ Pager ~ pageType:', pageType)
  const totalPage = useMemo(() => Math.ceil(list.length / 9), [list])
  return (
    <Box display={list.length > 9 ? '' : 'none'}>
      <PagerBox>
        <PageBox
          sx={{ left: `${TypeKey === 'Liquidate' ? '-48px' : '-72px'}`, transform: 'rotate(180deg)' }}
          className={pageType === 1 ? 'none' : ''}
          onClick={() => {
            if (pageType > 1) {
              setPageType(() => {
                return pageType - 1
              })
            }
          }}
        ></PageBox>
        <PageBox
          sx={{ right: `${TypeKey === 'Liquidate' ? '-48px' : '-72px'}` }}
          onClick={() => {
            if (pageType < totalPage) {
              setPageType(() => pageType + 1)
            }
          }}
        ></PageBox>
        {list.slice(0, totalPage).map((el: any, index: number) => (
          <Box
            key={`pager${TypeKey}-${index}`}
            width={+minus(pageType, 1) === index ? '1.5rem' : '.375rem'}
            sx={{ height: '.375rem', background: '#D9DBE9', opacity: '0.7', borderRadius: '.1875rem', ml: '.5rem' }}
          ></Box>
        ))}
      </PagerBox>
    </Box>
  )
}
