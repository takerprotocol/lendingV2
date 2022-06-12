import { styled, Typography } from '@mui/material'

const CollateralStatContainer = styled('div')`
  flex: 1;
  background: #322f46;
  border-radius: 10px;
  padding-top: 26px;
  padding-bottom: 26px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 32px;
  display: flex;
  gap: 10px;
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
  gap: 10px;
  align-items: center;
  margin-top: 8px;
`

const SplitContainer = styled('div')`
  display: flex;
  gap: 24px;
`

const Split1Title = styled(Typography)`
  font-family: 'Quicksand';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 160%;
  color: #ffffff;
  opacity: 0.5;
`

const Split = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3px;
`

const SplitValue = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-direction: row;
  color: white;
`

type CollateralStatType = {
  title: string
  total: number
  split1Title: string
  split1: number
  split2Title: string
  split2: number
}

const CollateralStat = ({ title, total, split1Title, split1, split2Title, split2 }: CollateralStatType) => {
  return (
    <CollateralStatContainer>
      <div>
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
          <CollateralStatValue>{total}</CollateralStatValue>
        </CollateralStatValueContainer>
      </div>
      <SplitContainer>
        <Split>
          <Split1Title>{split1Title}</Split1Title>
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
            {split1}
          </SplitValue>
        </Split>
        <Split>
          <Split1Title>{split2Title}</Split1Title>
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
            {split2}
          </SplitValue>
        </Split>
      </SplitContainer>
    </CollateralStatContainer>
  )
}

export default CollateralStat
