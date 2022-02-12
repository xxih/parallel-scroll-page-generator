import { useAppDispatch,useAppSelector } from '../../store/hooks';
import { PieceData, PieceType,  } from '../../store/editorSlice';
import { selectPaperHeight } from '../../store/globalParamSlice';
import './ThePreviewer.css'

export default function ThePreviewer() {
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
          return
        }
      })
    }
  }
  return (
  <div className="ps-layout-main-mid">
    <div className="editor-body">
      <div 
        className="editor-paper" 
        style={{
          height:paperHeight+'px'
        }}>
        {
          // renderList(piecesData)
        }
      </div>
    </div>
  </div>
  )}
