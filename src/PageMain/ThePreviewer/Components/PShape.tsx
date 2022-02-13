import React, { useEffect } from "react"
import { setSelectedPiece, setShapeStyle } from "../../../store/editorSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import './PShape.css'
export default function PreviewShape(props) {
  let { piecesElement, shapeStyle, bindKey: pieceIndex } = props
  // let selectedPieceIndex = useAppSelector(state => state.editor.selectedPieceIndex)
  // const dispatch = useAppDispatch()
  // dadRef.addEventListener('scroll',function(e){
  //   console.log(e);
  // })

  return (
    <div
      id={'shape'+pieceIndex}
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        ...shapeStyle
      }}
      className='ps-pshape'
    >
      {
        piecesElement
      }
    </div>)
}

