import { Box, styled, Popover, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FlexBox } from 'styleds/index'
const PopperBox = styled(Box)`
  align-items: flex-end;
  width: 200px;
  position: relative;
  z-index: 4;
  max-height: 236px;
  padding: 16px 16px 0 16px;
  background: #14142a;
  border: 1px solid #eff0f6;
  box-shadow: 0px 10px 20px rgba(20, 20, 42, 0.05);
  border-radius: 12px;
  overflow: scroll;
`
// const HeaderBox = styled(Box, {
//   shouldForwardProp: (prop) => true,
// })<{ lightBackground?: boolean }>(({ theme, lightBackground }) => ({
//   display: 'flex',
//   position: 'fixed',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   height: 70,
//   padding: '0 30px',
//   width: '100vw',
//   background: lightBackground ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.03)',
//   backdropFilter: 'blur(50px)',
//   zIndex: 100,
// }))
const BeforeBox = styled(Box)`
  position: relative;
  ::before {
    content: '';
    display: block;
    position: absolute;
    left: 90px;
    bottom: -25px;
    z-index: 10;
    border-width: 15px 10px;
    border-style: dashed solid dashed dashed;
    border-color: #14142a transparent transparent transparent;
  }
`
const TitleTypography = styled(Typography)`
  text-overflow: ellipsis;
  max-width: 120px;
  overflow: hidden;
`
const RImg = styled(`img`)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`
const ListPopover = styled(Popover)`
  box-shadow: none !important;
  background: transparent;
`
const RFlexBox = styled(FlexBox)`
  cursor: pointer;
`
interface NFTListPopperProps {
  open: boolean
  anchorEl: any
  list: Array<object>
  setAnchorEl: Function
  id: any
}
export default function NFTListPopover({ list, open, anchorEl, id, setAnchorEl }: NFTListPopperProps) {
  const navigate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <ListPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <BeforeBox>
        <PopperBox>
          {list.map((el: any, index: number) => (
            <RFlexBox
              onClick={() => {
                navigate(`/deposit/${el.contract.address}`)
              }}
              key={`${el.contract.address}-${index}`}
              mb="16px"
            >
              <RImg src={el.media ? el.media[0]?.gateway : el.gateway} alt="" />
              <TitleTypography ml="8px" variant="body2" color="#ffffff">
                {el.title}
              </TitleTypography>
            </RFlexBox>
          ))}
        </PopperBox>
      </BeforeBox>
    </ListPopover>
  )
}
