import { Menu } from "antd";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import ThePanelAttr from "./ThePanelAttr";
export default function ThePanel() {
  let selectedPieceIndex = useAppSelector(state=>state.editor.selectedPieceIndex)
  let [currentPanel,setCurrentPanel] = useState('attr')

  function clickHandler(e){
    setCurrentPanel(e.key)
  }

  function renderPanel(){
    if(selectedPieceIndex===-1){
      return <div style={{margin:'20px'}}>请选择组件</div>
    }
    else{
      if(currentPanel==='attr'){
        return <ThePanelAttr/>
      }
      else if(currentPanel==='effect'){
        return 
      }
    }
  }

  return <div className="ps-layout-main-right">
    <Menu 
      mode="horizontal" 
      selectedKeys={[currentPanel]}
      onClick={clickHandler}
    >
      <Menu.Item key='attr' >属性</Menu.Item>
      <Menu.Item key='effect'>效果</Menu.Item>
    </Menu>
    {
      renderPanel()
    }

  </div>;
}
