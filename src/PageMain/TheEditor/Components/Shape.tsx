import { useRef } from "react"
import { useDispatch } from "react-redux"
import { setSelectedPiece, setShapeStyle, setShapeStylePayload } from "../../../store/editorSlice"


export default function Shape(props) {
  let { piecesElement, shapeStyle: { left, top }, bindKey:pieceIndex } = props
  const dispatch = useDispatch()

  function mouseDownHandler(e) {
    const initialOffsetLeft = e.target.offsetParent.offsetLeft
    const initialOffsetTop = e.target.offsetParent.offsetTop

    const startY = e.clientY
    const startX = e.clientX
    
    const move = (moveEvent) => {
      const currX = moveEvent.clientX
      const currY = moveEvent.clientY
      dispatch(setShapeStyle({
        pieceIndex:pieceIndex,
        shapeStyle:{
          left:currX-startX+initialOffsetLeft,
          top:currY-startY+initialOffsetTop
        }
      }))
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // function clickHandler(){
  //   dispatch(setSelectedPiece({pieceIndex}))
  // }

  return (
    <div
      style={{
        position: 'absolute',
        left: left + 'px',
        top: top + 'px'
      }}
      onMouseDown={mouseDownHandler}
      // onClick={clickHandler}
    >
      {
        piecesElement
      }
    </div>)
}
