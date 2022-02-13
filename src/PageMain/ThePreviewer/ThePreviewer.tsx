import { useAppDispatch,useAppSelector } from '../../store/hooks';
import { PieceData, PieceType,  } from '../../store/editorSlice';
import { selectPaperHeight } from '../../store/globalParamSlice';
import './ThePreviewer.css'
import PText from './Components/PText';
import PShape from './Components/PShape';
import { useEffect, useRef } from 'react';

export default function ThePreviewer() {
  // const dispatch = useAppDispatch()
  let ref = useRef()

  let paperHeight = useAppSelector(selectPaperHeight)
  let piecesData = useAppSelector(state=>state.editor.piecesData)



  useEffect(()=>{
    console.log(1);
    
    let all = piecesData.reduce((allData,cur)=>{
      if(cur){
        let element = document.getElementById('shape'+cur.pieceIndex)
        let initLeft = cur.shapeStyle.left
        let initTop = cur.shapeStyle.top
        function func(scrollTop){
          element.style.left= parseInt(initLeft)-scrollTop*0.5+'px'
          element.style.top= parseInt(initTop)-scrollTop*0.5+'px'
        }
        allData.push(func)
        return allData
      }
    },[])
    let bodyElement = document.getElementById('editor-body')
    bodyElement.addEventListener('scroll',function(e){
      let scrollTop = (e.target as any).scrollTop
      all.forEach((item)=>{
        item(scrollTop)
      })
    })

    return ()=>{
      console.log(2);
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
