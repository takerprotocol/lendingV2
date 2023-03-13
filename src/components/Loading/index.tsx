import { Box, styled } from '@mui/material'

const LoadingBox = styled(Box)`
  margin-right: 8px;
  width: 18px;
  height: 18px;
  svg {
    -webkit-animation: myRotate 3s linear infinite;
    animation: myRotate 3s linear infinite;
    @-webkit-keyframes myRotate {
      0% {
        -webkit-transform: rotate(0deg);
      }
      50% {
        -webkit-transform: rotate(180deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
    @keyframes myRotate {
      0% {
        -webkit-transform: rotate(0deg);
      }
      50% {
        -webkit-transform: rotate(180deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
  }
`
export const Loading = () => {
  return (
    <LoadingBox>
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.5 8C1.5 11.866 4.63401 15 8.5 15C12.366 15 15.5 11.866 15.5 8C15.5 4.13401 12.366 1 8.5 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </LoadingBox>
  )
}
