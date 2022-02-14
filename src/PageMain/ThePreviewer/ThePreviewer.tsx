import { useAppDispatch,useAppSelector } from '../../store/hooks';
import { PieceData, PieceType,  } from '../../store/editorSlice';
import { selectPaperHeight } from '../../store/globalParamSlice';
import './ThePreviewer.css'
import PText from './Components/PText';
import PShape from './Components/PShape';
import { useEffect, useRef } from 'react';
import effects from '../../effects/effects';

export default function ThePreviewer() {
  // const dispatch = useAppDispatch()
  let ref = useRef()

  let paperHeight = useAppSelector(selectPaperHeight)
  let piecesData = useAppSelector(state=>state.editor.piecesData)


// 负责绑定事件
  useEffect(()=>{
    // 需要调用的视差代码
    let funcArray = []

    // 遍历 pieces 得到两个 func 数组
    piecesData.forEach((cur)=>{
      if(cur){
        let element = document.getElementById('shape'+cur.pieceIndex)
        cur.effects.forEach((item)=>{
          if(item.effectName==='none'){}
          else{
            funcArray.push(effects[item.effectName].func(element,item.param))
          }
        })
      }

      // if(cur){
      //   let element = document.getElementById('shape'+cur.pieceIndex)
      //   let initLeft = cur.shapeStyle.left
      //   let initTop = cur.shapeStyle.top
      //   let func
      //   if(cur.effects.parallelEffect.typeEffect!=='none'){
      //     func = effectsParallel[cur.effects].func(element)
      //   }
      //   funcArrayParallel.push(func)
      // }
    },[])

    // piecesData.forEach((cur)=>{
    //   // 遍历 cur.Effects 根据 cur 和 effects
    // })

    let bodyElement = document.getElementById('editor-body')
    bodyElement.addEventListener('scroll',function(e){
      let scrollTop = (e.target as any).scrollTop
      funcArray.forEach((item)=>{
        // 这个函数，需要 piece 的 Dom 实例。
        // 需要参数
        // 必须在这里接住 scrollTop
        item(scrollTop)
      })
    })

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
