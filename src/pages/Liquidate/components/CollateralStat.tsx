import { styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { div, fixedFormat, times } from 'utils'

const CollateralStatContainer = styled('div')`
  flex: 1;
  background: #322f46;
  border-radius: 10px;
  padding-top: 26px;
  padding-bottom: 20px;
  padding-left: 16px;
  padding-right: 24px;
  margin-top: 24px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`

const StatTitle = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  color: #ffffff;
`

const CollateralStatValue = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 160%;
  color: #ffffff;
`

const CollateralStatValueContainer = styled('div')`
  display: flex;
  gap: 4px;
  width: 172px;
  align-items: center;
  margin-top: 8px;
`

// const SplitStatContainer = styled('div')`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   flex: 1.5;
// `

// const SplitContainer = styled('div')`
//   display: flex;
//   gap: 24px;
// `

// const SplitTitleContainer = styled('div')`
//   display: flex;
//   align-items: center;
//   gap: 4px;
//   flex-direction: row;
// `

// const Split1Title = styled(Typography)`
//   font-family: 'Quicksand';
//   font-style: normal;
//   font-weight: 500;
//   font-size: 12px;
//   line-height: 160%;
//   color: #ffffff;
//   opacity: 0.5;
// `

// const Split = styled('div')`
//   display: flex;
//   flex-direction: column;
//   gap: 2px;
// `

// const SplitValue = styled('div')`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   gap: 2px;
//   margin-left: 8px;
//   flex-direction: row;
//   color: white;
// `

const CollateralInfoContainer = styled('div')`
  flex: 1;
`

// const LineIndicatorContainer = styled('div')`
//   display: flex;
//   width: 100%;
// `

// const LineIndicator = styled('div', { shouldForwardProp: (prop) => true })<{ width: string | number }>(
//   ({ theme, color, width }) => ({
//     backgroundColor: color,
//     height: 2,
//     borderRadius: 2,
//     width,
//     transition: 'width 1s;',
//     transitionDelay: '0.5s',
//   })
// )

// const IndicatorColor = styled('div', { shouldForwardProp: (prop) => true })(({ theme, color }) => ({
//   width: 4,
//   height: 4,
//   borderRadius: '50%',
//   backgroundColor: color,
// }))

type CollateralStatType = {
  title: string
  total: string
  split1Title: string
  split1: string
  split2Title: string
  split2: string
}

const CollateralStat = ({ title, total, split1Title, split1, split2Title, split2 }: CollateralStatType) => {
  const [, setSplit1LineLength] = useState('0%')
  // const [split1LineLength, setSplit1LineLength] = useState('0%')
  // const [split2LineLength, setSplit2LineLength] = useState('0%')
  const [, setSplit2LineLength] = useState('0%')
  useEffect(() => {
    setSplit1LineLength(`${div(times(100, split1), total)}%`)
    setSplit2LineLength(`${div(times(100, split2), total)}%`)
  }, [total, split1, split2])
  return (
    <CollateralStatContainer>
      <CollateralInfoContainer>
        <StatTitle>{title}</StatTitle>
        <CollateralStatValueContainer>
          <svg width="17" height="38" viewBox="0 0 17 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 19.7576L8.5 11L14 19.7576L8.5 28L3 19.7576Z"
              stroke="#A0A3BD"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path d="M3 19.5L8.5 23L14 19.5" stroke="#A0A3BD" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <CollateralStatValue>{fixedFormat(total)}</CollateralStatValue>
        </CollateralStatValueContainer>
      </CollateralInfoContainer>
      {/* <SplitStatContainer>
        <SplitContainer>
          <Split>
            <SplitTitleContainer>
              <IndicatorColor color="#BB77FF" />
              <Split1Title>{split1Title}</Split1Title>
            </SplitTitleContainer>
            <SplitValue>
              <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                  <path
                    d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path d="M4 11.5L8.5 14L13 11.5" stroke="white" strokeLinejoin="round" />
                </g>
              </svg>
              {fixedFormat(split1)}
            </SplitValue>
          </Split>
          {split2Title && (
            <Split>
              <SplitTitleContainer>
                <IndicatorColor color="#72AAFF" />
                <Split1Title>{split2Title}</Split1Title>
              </SplitTitleContainer>
              <SplitValue>
                <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.5">
                    <path
                      d="M4 11.7121L8.5 4.5L13 11.7121L8.5 18.5L4 11.7121Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M4 11.5L8.5 14L13 11.5" stroke="white" strokeLinejoin="round" />
                  </g>
                </svg>
                {fixedFormat(split2)}
              </SplitValue>
            </Split>
          )}
        </SplitContainer>
        <LineIndicatorContainer>
          <LineIndicator width={split1LineLength} color="#BB77FF" />
          <LineIndicator margin-left="1px" width={split2LineLength} color="#72AAFF" />
        </LineIndicatorContainer>
      </SplitStatContainer> */}
    </CollateralStatContainer>
  )
}

export default CollateralStat
