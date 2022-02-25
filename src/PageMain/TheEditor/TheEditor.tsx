import { useAppDispatch,useAppSelector } from '../../store/hooks';
import { addPiece, PieceData, PieceType, setSelectedPiece } from '../../store/editorSlice';
import { selectPaperHeight } from '../../store/globalParamSlice';
import './TheEditor.css'
import VText from './Components/VText';
import Shape from './Components/Shape';

export default function TheEditor() {
  const dispatch = useAppDispatch()

  let paperHeight = useAppSelector(selectPaperHeight)
  let piecesData = useAppSelector(state=>state.editor.piecesData)

  // 负责渲染所有 pieces
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
            piecesElement={<VText text={item.param.text?item.param.text:'请输入文本'}/>} 
            shapeStyle={item.shapeStyle}
          />)
        }
      })
    }
  }
  
  function dropHandler(e:React.DragEvent){
    // drop 得 dragOver preventDefault 才能成功，暂时不知道为什么，待查
    const type  = e.dataTransfer.getData('type') as PieceType
    const { offsetX,offsetY } = e.nativeEvent
    let transferObj = {
      type,
      shapeStyle:{
        left:offsetX+'px',
        top:offsetY+'px',
        width:73+'px',
        height:24+'px'
      }
    }
    dispatch(addPiece(transferObj))
  }
  // 事件委托 哈我觉得这里很好玩。之前好像没怎么利用过 target 和 currentTarget
  function clickHandler(e){
    if(e.currentTarget===e.target){
      dispatch(setSelectedPiece({selectedPieceIndex:-1}))
    }
  }

  function renderLine(){
    let pageCount = paperHeight/667
    let lineTopArr = []
    for(let n = 0;n<pageCount;n++){
      lineTopArr.push((n+1)*667)
    }
    return lineTopArr.map((item,index)=>
      <div 
        key={index} 
        style={{
        width:'100%',
        height:'1px',
        position:'absolute',
        top:item+'px',
        backgroundColor:'red'
      }}></div>
    )

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
        {
          renderLine()
        }
      </div>
    </div>
  </div>
  )}
