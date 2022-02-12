import { setSelectedPiece, setShapeStyle } from "../../../store/editorSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import './Shape.css'
export default function Shape(props) {
  let { piecesElement, shapeStyle: { left, top }, bindKey:pieceIndex } = props
  let selectedPieceIndex = useAppSelector(state=>state.editor.selectedPieceIndex)
  const dispatch = useAppDispatch()

  function mouseDownHandler(e) {
    console.log(selectedPieceIndex,pieceIndex);
    dispatch(setSelectedPiece({selectedPieceIndex:pieceIndex}))

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

    const up = (e) => {
      e.stopImmediatePropagation()
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }


  return (
    <div
      style={{
        boxSizing:'border-box',
        position: 'absolute',
        left: left + 'px',
        top: top + 'px'
      }}
      className={['ps-shape',selectedPieceIndex===pieceIndex?'active':''].join(' ')}
      onMouseDown={mouseDownHandler}
    >
      {
        piecesElement
      }
    </div>)
}
