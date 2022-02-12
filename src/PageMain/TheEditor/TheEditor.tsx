import { useAppDispatch,useAppSelector } from '../../store/hooks';
import { addPiece, PieceData, PieceType, setSelectedPiece } from '../../store/editorSlice';
import { selectPaperHeight } from '../../store/globalParamSlice';
import './TheEditor.css'
import Text from './Components/VText';
import Shape from './Components/Shape';

export default function TheEditor() {
  const dispatch = useAppDispatch()

  let paperHeight = useAppSelector(selectPaperHeight)
  let piecesData = useAppSelector(state=>state.editor.piecesData)

  // 负责处理整个渲染流程
  function renderList(piecesData:Array<PieceData>){
    if(piecesData.length!==0){
      return piecesData.map((item)=>{
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
    const type  = e.dataTransfer.getData('type') as PieceType
    const { offsetX,offsetY } = e.nativeEvent
    let transferObj = {
      type,
      shapeStyle:{
        left:offsetX+'px',
        top:offsetY+'px',
        width:72+'px',
        height:24+'px'
      }
    }
    dispatch(addPiece(transferObj))
  }
  function clickHandler(e){
    if(e.currentTarget===e.target){

      dispatch(setSelectedPiece({selectedPieceIndex:-1}))
    }
    
    // if(e.target===)
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
        onClick={clickHandler}
        onDrop={(e)=>{dropHandler(e)}}>
        {
          renderList(piecesData)
        }
      </div>
    </div>
  </div>
  )}
