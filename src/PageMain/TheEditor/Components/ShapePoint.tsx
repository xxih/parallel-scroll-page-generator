import { setShapeStyle } from "../../../store/editorSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"


export default function ShapePoint(props) {
  const dispatch = useAppDispatch()
  let selectedPieceIndex = useAppSelector(state=>state.editor.selectedPieceIndex)
  const {pointStyle, pointType} = props
  let piecesData = useAppSelector(state=>state.editor.piecesData)
  let {top,left,width,height} = piecesData[selectedPieceIndex].shapeStyle
  
  function getCursor(){
    switch(pointType){
      case 'lt':
        return 'nwse-resize'
      case 'rt':
        return 'nesw-resize'
      case 'rb':
        return 'nwse-resize'
      case 'lb':
        return 'nesw-resize'
    }
  }

  function mouseDownHandler(e){
    e.stopPropagation()
    const heightVal = parseInt(height)
    const widthVal = parseInt(width)
    const topVal = parseInt(top)
    const leftVal = parseInt(left)
    const startX = e.pageX
    const startY = e.pageY
    function move(moveEvent){

      let currX = moveEvent.pageX
      let currY = moveEvent.pageY
      // disY 是正数表示向下
      let disY = currY - startY
      //disX 是正数 表示 向右
      let disX = currX - startX
    
      switch(pointType){
        case 'lt':
          dispatch(setShapeStyle({
            pieceIndex:selectedPieceIndex,
            shapeStyle:{
              // 对上面的点 右边的点
              height:(heightVal-disY)>=0?heightVal-disY+'px':'0px',//y
              width:(widthVal-disX)>=0?widthVal-disX+'px':'0px',//y
              top:(heightVal-disY)>=0?topVal+disY+'px':topVal+heightVal+'px',//y
              left:(widthVal-disX)>=0?leftVal+disX+'px':leftVal+widthVal+'px'//y
            }
          }))
          break
          case 'rt':
            dispatch(setShapeStyle({
              pieceIndex:selectedPieceIndex,
              shapeStyle:{
                // 对上面的点来说，-disY 是
                height:(heightVal-disY)>=0?heightVal-disY+'px':'0px', //y
                width:(widthVal-disX)>=0?widthVal+disX+'px':'0px', //
                top:(heightVal-disY)>=0?topVal+disY+'px':topVal+heightVal+'px', //y
              }
            }))
            break
          case 'rb':
            dispatch(setShapeStyle({
              pieceIndex:selectedPieceIndex,
              shapeStyle:{
                // 对上面的点来说，-disY 是
                height:(heightVal+disY)>=0?heightVal+disY+'px':'0px',
                width:(widthVal+disX)>=0?widthVal+disX+'px':'0px', //
                // top:(heightVal-disY)>=0?topVal+disY+'px':heightVal+'px',
                // left:(widthVal-disX)>=0?leftVal+disX+'px':widthVal+'px'
              }
            }))
            break
          case 'lb':
            dispatch(setShapeStyle({
              pieceIndex:selectedPieceIndex,
              shapeStyle:{
                // 对上面的点来说，-disY 是
                height:(heightVal+disY)>=0?heightVal+disY+'px':'0px',
                width:(widthVal+disX)>=0?widthVal-disX+'px':'0px', //
                // top:(heightVal-disY)>=0?topVal+disY+'px':heightVal+'px',
                left:(widthVal-disX)>=0?leftVal+disX+'px':leftVal+widthVal+'px'
              }
            }))
            break
      }
      
      // const newHeight = height + (hasT? -disY : hasB? disY : 0)
      // const newWidth = width + (hasL? -disX : hasR? disX : 0)
      // pos.height = newHeight > 0? newHeight : 0
      // pos.width = newWidth > 0? newWidth : 0
      // pos.left = left + (hasL? disX : 0)
      // pos.top = top + (hasT? disY : 0)
      // this.$store.commit('setShapeStyle', pos)
    }
    function up(e){
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  return (
    <div
    className="ps-shape-point"
    onMouseDown={mouseDownHandler}
    style={{
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      backgroundColor: 'white',
      border:'1px solid var(--primary-color)',
      position: 'absolute',
      ...pointStyle,
      cursor: getCursor()
    }} />
  )
}
