import { Input } from "antd";
import { setSelectedText } from "../../store/editorSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import './ThePanelAttr.css'
export default function ThePanelAttr() {
  let piecesData = useAppSelector(state=>state.editor.piecesData)
  let selectedPieceIndex = useAppSelector(state=>state.editor.selectedPieceIndex)
  const dispatch = useAppDispatch()
  function pressEnterHandler(e){
    console.log(1);
    
    dispatch(setSelectedText({text:e.target.value}))
  }
  return <div className="panel-attr">
    {
      Object.entries(piecesData[selectedPieceIndex].shapeStyle).map(([key,value])=>{
        return <div key={key}>{key+' '+value}</div>
      })
    }

    {
      piecesData[selectedPieceIndex].type==='text'?
      <Input 
        defaultValue={piecesData[selectedPieceIndex].param.text}
        onPressEnter={pressEnterHandler}
      />
      :null
    }
  </div>;
}
