import { useAppSelector } from '../../store/hooks';
import { PieceData  } from '../../store/editorSlice';
import './ThePreviewer.css'
import PText from './Components/PText';
import PShape from './Components/PShape';
import { useEffect } from 'react';
import effects from '../../effects/effects';

export default function ThePreviewer() {

  let paperHeight = useAppSelector(state=>state.globalParam.paperHeight)
  let piecesData = useAppSelector(state=>state.editor.piecesData)


  // 页面渲染完成后，绑定事件
  useEffect(()=>{
    // 其实这里的逻辑好像也能分离到 effects.ts 去。包装成一个函数，接收 piecesData 返回 func Array
    // 收集需要调用的视差代码
    let funcArray = []

    // 遍历 pieces 得到 funcArray 收集到了所有需要在滚动时触发的代码。
    piecesData.forEach((cur)=>{
      if(cur){
        let element = document.getElementById('shape'+cur.pieceIndex)
        cur.effects.forEach((item)=>{
          if(item.effectName==='none'){}
          else{
            // 这里每个对每个 effects 都能进行统一的处理，因为我对每个函数的格式进行了统一。
            funcArray.push(effects[item.effectName].func(element,item.param))
          }
        })
      }
    },[piecesData])

    let scrollHandler = function(e){
      let scrollTop = (e.target as any).scrollTop
      funcArray.forEach((func)=>{
        // 在这里接住 scrollTop
        func(scrollTop)
      })
    }
    
    let bodyElement = document.getElementById('editor-body')
    
    bodyElement.addEventListener('scroll',scrollHandler)
    
    return()=>{
      console.log('销毁');
      
      bodyElement.removeEventListener('scroll',scrollHandler)
    }
  },[])

  // 负责处理整个渲染流程
  function renderList(piecesData:Array<PieceData>){
    if(piecesData.length!==0){
      return piecesData.map((item)=>{
        if(item===null){
          return null
        }
        else if(item.type==='text'){
          
          return <PShape
            key={item.pieceIndex}
            bindKey={item.pieceIndex}
            piecesElement={<PText text={item.param.text}/>} 
            shapeStyle={item.shapeStyle}
          />
        }
        else{
          return null
        }
      })
    }
  }

  return (
  <div className="ps-layout-main-mid">
    <div id='editor-body' className="editor-body" >
      <div 
        className="editor-paper" 
        style={{
          height:paperHeight+'px'
        }}>
        {
          renderList(piecesData)
        }
      </div>
    </div>
  </div>
  )}
