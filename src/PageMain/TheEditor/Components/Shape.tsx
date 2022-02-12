import React, { useEffect } from "react"
import { transform } from "typescript"
import { setSelectedPiece, setShapeStyle } from "../../../store/editorSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import './Shape.css'
import ShapePoint from "./ShapePoint"
export default function Shape(props) {
  let { piecesElement, shapeStyle, bindKey: pieceIndex } = props
  let selectedPieceIndex = useAppSelector(state => state.editor.selectedPieceIndex)
  const dispatch = useAppDispatch()

  const pointList = ['lt', 'rt', 'lb', 'rb']
  // 控制移动的逻辑
  function mouseDownHandler(e) {
    dispatch(setSelectedPiece({ selectedPieceIndex: pieceIndex }))

    const initialOffsetLeft = e.currentTarget.offsetLeft
    const initialOffsetTop = e.currentTarget.offsetTop
    const startY = e.pageY
    const startX = e.pageX


    const move = (moveEvent) => {
      const currX = moveEvent.pageX
      const currY = moveEvent.pageY
      let computedLeft = currX - startX + initialOffsetLeft
      let computedTop = currY - startY + initialOffsetTop

      dispatch(setShapeStyle({
        pieceIndex: pieceIndex,
        shapeStyle: {
          left: computedLeft+'px',
          top: computedTop+'px'
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

  // 遍历渲染所有 piece
  function renderPoint(pointList) {
    
    function getPointStyle(point) {
      let baseStyle = {
        left: undefined,
        top: undefined,
        right: undefined,
        bottom: undefined,
        transform:undefined
      }

      switch (point) {
        case 'lt':
          baseStyle.left = 0
          baseStyle.top = 0
          baseStyle.transform = 'translate(-50%,-50%)'
          return baseStyle
        case 'rt':
          baseStyle.right = 0
          baseStyle.top = 0
          baseStyle.transform = 'translate(50%,-50%)'
          return baseStyle
        case 'rb':
          baseStyle.right = 0
          baseStyle.bottom = 0
          baseStyle.transform = 'translate(50%,50%)'
          return baseStyle
        case 'lb':
          baseStyle.left = 0
          baseStyle.bottom = 0
          baseStyle.transform = 'translate(-50%,50%)'
          return baseStyle
      }
    }
    if (pointList.length !== 0) {
      return pointList.map(item => {
        console.log(item);
        
        let style = getPointStyle(item)
        return (
          // <div
          //   key={item}
          
          //   style={{
          //     width: '6px',
          //     height: '6px',
          //     borderRadius: '50%',
          //     backgroundColor: 'white',
          //     border:'1px solid var(--primary-color)',
          //     position: 'absolute',
          //     ...style
          //   }} />
            
            <ShapePoint
              pointType={item}
              key={item}
              pointStyle={style}
            />)
      })
    }
  }

  return (
    <div
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        ...shapeStyle
      }}
      className={['ps-shape', selectedPieceIndex === pieceIndex ? 'active' : ''].join(' ')}
      onMouseDown={mouseDownHandler}
    >
      {
        renderPoint(selectedPieceIndex === pieceIndex ? pointList : [])
      }
      {
        piecesElement
      }
    </div>)
}

