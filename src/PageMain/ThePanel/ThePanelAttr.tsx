import { Input } from "antd";
import { useAppSelector } from "../../store/hooks";
export default function ThePanelAttr() {
  let piecesData = useAppSelector(state=>state.editor.piecesData)
  let selectedPieceIndex = useAppSelector(state=>state.editor.selectedPieceIndex)
  return <div>
    {
      Object.entries(piecesData[selectedPieceIndex].shapeStyle).map(([key,value])=>{
        return <div key={key}>{key+' '+value}</div>
      })
    }
  </div>;
}
