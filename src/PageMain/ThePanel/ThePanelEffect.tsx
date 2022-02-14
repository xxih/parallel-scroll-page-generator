import { addEffectToSelectedPiece, PieceData, setSelectedEffectItem } from "../../store/editorSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Select, Slider, Button } from "antd"
import { mapNameEffect } from "../../effects/effects"
import effectsInfo from "../../effects/effects"
import './ThePanelEffect.css'
const {Option} = Select



export default function ThePanelEffect() {
  const dispatch = useAppDispatch()
  let piecesData = useAppSelector(state=>state.editor.piecesData)
  let selectedPieceIndex = useAppSelector(state=>state.editor.selectedPieceIndex)
  let pieceEffects = piecesData[selectedPieceIndex].effects

  function clickAddEffectHandler(){
    dispatch(addEffectToSelectedPiece(undefined))
  }

  function changeSelectHandler(index:number,value){
    dispatch(setSelectedEffectItem({
      effectIndex:index,
      TypeEffectItem:{
        effectName:value
      }
    }))
  }

  function changeSliderHandler(index:number,value){
    dispatch(setSelectedEffectItem({
      effectIndex:index,
      TypeEffectItem:{
        param:value
      }
    }))
  }

  return (
  <div className="ps-panel-effect-container">
    {      
      pieceEffects.map((item,index)=>{
        return (
          <div key={index} className='ps-panel-effect-container-item'>
            <div>效果{index+''}</div>
            <div>类型：</div>
            <Select 
              value={item.effectName} 
              onChange={(value)=>{changeSelectHandler(index,value)}}
              style={{ width: '100%',marginTop:5 }}
            >
              {
                Object.entries(mapNameEffect).map(([key,value])=>{
                  return <Option key={key}>{value}</Option>
                })
              }
            </Select>
            {
              // 这里需要 给 Slider 绑定
              item.effectName==='none'?<></>:
              <Slider 
                value={item.param}
                min={effectsInfo[item.effectName].scope[0]} 
                max={effectsInfo[item.effectName].scope[1]}
                onChange={(value)=>{changeSliderHandler(index,value)}}
              />
            }
          </div>
        )
      })
    }
    <Button onClick={clickAddEffectHandler} className='ps-panel-effect-button'>添加效果</Button>
  </div>
    
  )
}

