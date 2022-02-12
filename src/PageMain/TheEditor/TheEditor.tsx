import { useDispatch, useSelector } from 'react-redux';
import { addPiece, selectPiecesData, type pieceData } from '../../store/editorSlice';
import { selectPaperHeight } from '../../store/globalParamSlice';
import './TheEditor.css'
import Text from './Components/VText';
import Shape from './Components/Shape';

export default function TheEditor() {
  const dispatch = useDispatch()

  let paperHeight = useSelector(selectPaperHeight)
  let piecesData = useSelector(selectPiecesData)

  // 负责处理整个渲染流程
  function renderList(piecesData:Array<pieceData>){
    if(piecesData.length!==0){
      return Array.from(piecesData).map((item)=>{
        if(item===null){
          
        }
        else if(item.type==='text'){
          return(
          <Shape 
            key={item.pieceIndex}
            bindKey={item.pieceIndex}
            piecesElement={<Text text="请输入文字"/>} 
            shapeStyle={item.shapeStyle}
          />)
        }
      })
    }
  }
  
  function dropHandler(e:React.DragEvent){
    // drop 得 dragOver preventDefault 才能成功
    const type = e.dataTransfer.getData('type')
    const { offsetX,offsetY } = e.nativeEvent
    let transferObj = {
      type,
      shapeStyle:{
        left:offsetX,
        top:offsetY
      }
    }
    dispatch(addPiece(transferObj))
  }

  return (
  <div className="ps-layout-main-mid">
    <div className="editor-body">
      <div 
        className="editor-paper" 
        style={{
          height:paperHeight+'px'
        }}
        onDragOver={(e)=>{e.preventDefault()}} 
        onDrop={(e)=>{dropHandler(e)}}>
        {
          renderList(piecesData)
        }
      </div>
    </div>
  </div>
  )}
