import React, { useEffect } from "react"
import { setSelectedPiece, setShapeStyle } from "../../../store/editorSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import './Shape.css'
export default function Shape(props) {
  let { piecesElement, shapeStyle, bindKey: pieceIndex } = props
  let selectedPieceIndex = useAppSelector(state => state.editor.selectedPieceIndex)
  const dispatch = useAppDispatch()

  return (
    <div
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        ...shapeStyle
      }}
      className='ps-shape'
    >
      {
        piecesElement
      }
    </div>)
}

