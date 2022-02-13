import './TheOptionBar.css'
import { Input,message, Switch, Button } from 'antd';
import { changePaperHeight, selectPaperHeight, setPreviewMode } from '../../store/globalParamSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletePiece, setSelectedPiece } from '../../store/editorSlice';
import { useNavigate } from 'react-router-dom';

export default function TheOptionBar() {
  let navigate = useNavigate()
  let dispatch = useAppDispatch()
  let selectedPieceIndex = useAppSelector(state=>state.editor.selectedPieceIndex)
  let previewMode = useAppSelector(state=>state.globalParam.previewMode)
  
  let paperHight = useAppSelector(selectPaperHeight)

  
  function onHeightInputChange(e){
    if(parseInt((e.target as HTMLInputElement).value)>667&&parseInt((e.target as HTMLInputElement).value)<10000){
      dispatch(changePaperHeight({paperHeight:(e.target as HTMLInputElement).value}))
      message.success('页面尺寸修改成功！',1)
    }
    else{
      message.error('请输入667~10000范围内的数值',1)
    }
  }

  function delectClickHandler(e){
    if(selectedPieceIndex!==-1){
      
      dispatch(deletePiece({pieceIndex:selectedPieceIndex}))
      dispatch(setSelectedPiece({selectedPieceIndex:-1}))
      message.success('删除成功！',0.5)
    }
  }

  function changeHandler(checked,e){
    if(checked){
      navigate('/preview')
      dispatch(setPreviewMode({previewMode:true}))
    }
    else{
      navigate('/')
      dispatch(setPreviewMode({previewMode:false}))
    }
  }

  return(
  <div className='ps-layout-top ps-bar'>
    {/* <Button className='ps-bar-btn'>撤销</Button> */}
    <Button className='ps-bar-btn'>插入图片</Button>
    <Button className='ps-bar-btn'>保存</Button>
    <Button className='ps-bar-btn' danger onClick={delectClickHandler}>删除</Button>
    <span className='ps-bar-text'>页宽：375 px</span>
    <span className='ps-bar-text'>页高：</span>
    <Input 
      className='ps-bar-input' 
      placeholder='667~10000' 
      defaultValue={paperHight}
      onPressEnter={onHeightInputChange}
      disabled={previewMode?true:false}
    />
    <span className='ps-bar-text ps-bar-text-close'>px</span>
    <span className='ps-bar-text'>预览模式：</span>
    <Switch className='ps-bar-switch' onChange={changeHandler}/>
  </div>
  )}

  