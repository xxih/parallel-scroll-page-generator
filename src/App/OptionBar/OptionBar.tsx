import React from 'react';
import './OptionBar.css'
import { Button } from 'antd/lib/radio';

export default function OptionBar() {
  return(
  <div className='ps-bar'>
    <Button className='ps-bar-btn'>撤销</Button>
    <Button className='ps-bar-btn'>插入图片</Button>
    <Button className='ps-bar-btn'>预览</Button>
    <Button className='ps-bar-btn'>保存</Button>
    <span className='ps-bar-text'>页码</span>
  </div>  
  )}
