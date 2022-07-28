import { styled } from '@mui/system'
import { useCallback, useState } from 'react'

const Container = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  cursor: pointer;
`

const Copy = ({ text = '', color = '#6E7191' }: { text: string; color?: string }) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(text)
        setCopied(!copied)
      }
    } catch (error: any) {
      console.log(`Couldn't copy text ${text}`)
      console.error(error)
    }
  }, [copied, text])
  return (
    <Container>
      {copied ? (
        <svg
          onClick={handleCopy}
          width="14"
          height="13"
          style={{ marginBottom: 5 }}
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4L3.76364 7L9 1"
            stroke="#4BC8B1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          onClick={handleCopy}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 7.3125H8.4375C7.81618 7.3125 7.3125 7.81618 7.3125 8.4375V13.5C7.3125 14.1213 7.81618 14.625 8.4375 14.625H13.5C14.1213 14.625 14.625 14.1213 14.625 13.5V8.4375C14.625 7.81618 14.1213 7.3125 13.5 7.3125Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.0625 10.6875H4.5C4.20163 10.6875 3.91548 10.569 3.7045 10.358C3.49353 10.147 3.375 9.86087 3.375 9.5625V4.5C3.375 4.20163 3.49353 3.91548 3.7045 3.7045C3.91548 3.49353 4.20163 3.375 4.5 3.375H9.5625C9.86087 3.375 10.147 3.49353 10.358 3.7045C10.569 3.91548 10.6875 4.20163 10.6875 4.5V5.0625"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Container>
  )
}

export default Copy
