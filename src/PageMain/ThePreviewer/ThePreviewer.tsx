import { useAppDispatch,useAppSelector } from '../../store/hooks';
import { PieceData, PieceType,  } from '../../store/editorSlice';
import { selectPaperHeight } from '../../store/globalParamSlice';
import './ThePreviewer.css'
import PText from './Components/PText';
import PShape from './Components/PShape';
import { useEffect, useRef } from 'react';
import effectsParallel from '../../effects/effects';

export default function ThePreviewer() {
  // const dispatch = useAppDispatch()
  let ref = useRef()

  let paperHeight = useAppSelector(selectPaperHeight)
  let piecesData = useAppSelector(state=>state.editor.piecesData)


// 负责绑定事件
  useEffect(()=>{
    // 需要调用的视差代码
    let funcArrayParallel = []
    // 需要调用的视觉代码
    let funcArrayVisual = []

    // 遍历 pieces 得到两个 func 数组
    // piecesData.forEach((cur)=>{
    //   if(cur){
    //     let element = document.getElementById('shape'+cur.pieceIndex)
    //     let initLeft = cur.shapeStyle.left
    //     let initTop = cur.shapeStyle.top
    //     let func
    //     if(cur.effects.parallelEffect.typeEffect!=='none'){
    //       func = effectsParallel[cur.effects.parallelEffect.typeEffect].func(element)
    //     }
    //     funcArrayParallel.push(func)
    //   }
    // },[])

    // piecesData.forEach((cur)=>{
    //   // 遍历 cur.Effects 根据 cur 和 effects
    // })

    // let bodyElement = document.getElementById('editor-body')
    // bodyElement.addEventListener('scroll',function(e){
    //   let scrollTop = (e.target as any).scrollTop
    //   funcArrayParallel.forEach((item)=>{
    //     item(scrollTop)
    //   })
    // })

    // return ()=>{
    // }
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
            piecesElement={<PText text="请输入文字"/>} 
            shapeStyle={item.shapeStyle}
          />
        }
        else{
          return null
        }
      })
    }
  }

  function scrollHandler(e){
    // console.log(elementNames);
    
    // console.log(e);
    
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
