import { PieceType } from '../../store/editorSlice';
import './TheMenu.css'
export default function TheMenu() {

  function dragStartHandler(e:React.DragEvent,type:PieceType){
    e.dataTransfer.setData('type',type)
  }
  return (
  <div className="ps-layout-main-left ps-menu">
    <div className="ps-menu-item" draggable onDragStart={(e)=>{dragStartHandler(e,'text')}}>文字</div>
    <div className="ps-menu-item ps-menu-item-img" draggable onDragStart={(e)=>{dragStartHandler(e,'image')}}>图片（敬请期待）</div>
  </div>

)}
