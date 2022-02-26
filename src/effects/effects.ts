export type TypeEffectItemName = 'parralelVertical'|'parallelHorizontal'|'none'

export type TypeEffectItem = TypeEffectItemParallelHorizontal|TypeEffectItemNone|TypeEffectItemParralelVertical
type TypeEffectItemParralelVertical = {
  param?:number,
  effectName?:'parralelVertical'
}
type TypeEffectItemParallelHorizontal = {
  param?:number,
  effectName?:'parallelHorizontal'
}
type TypeEffectItemNone = {
  param?:number,
  effectName?:'none'
}

export let mapNameEffect = {
  preParallelVertical:'进入前垂直视差',
  preParallelHorizontal:'进入前水平视差',
  parallelVertical:'垂直视差',
  parallelHorizontal:'水平视差',
  fadeIn:'渐显',
  none:'无效果'
}

let parallelVertical = {
  // 这是给界面用的
  scope:[-2,2],
  bindedEvent:'scroll',
  // 这是用来绑定的函数
  func(element:HTMLElement,param:number,){
    let initTop  = element.style.top
    let bound = Math.floor(parseInt(initTop)/667)*667
    return function(scrollTop:number){
      // 赣，不能这么写，transform 只能写在一个里面，后面的会覆盖前面的。如果要用 transform 应该得再创建一个闭包 用数组保存所有的 transform 项然后拼接字符串。然后在这里只负责把 transform 项 push 进数组
      // element.style.transform = 'translateY('+(scrollTop>bound?(scrollTop-bound)*param:0)+'px)'
      element.style.top = scrollTop>bound ? parseInt(initTop)-(scrollTop-bound)*param+'px': initTop
    }
  }
}

let parallelHorizontal = {
  scope:[-2,2],
  bindedEvent:'scroll',
  func(element:HTMLElement,param:number,){
    let initLeft = element.style.left
    let initTop  = element.style.top
    let bound = Math.floor(parseInt(initTop)/667)*667
    return function(scrollTop:number){
      // element.style.transform = 'translateX('+ (scrollTop>bound?(scrollTop-bound)*param:0)+'px)'
      element.style.left = scrollTop>bound ? parseInt(initLeft)-(scrollTop-bound)*param+'px':initLeft
    }
  }
}
let preParallelHorizontal = {
  scope:[-2,2],
  bindedEvent:'scroll',
  func(element:HTMLElement,param:number,){
    let initTop  = element.style.top
    let initLeft = element.style.left
    let bound = Math.floor(parseInt(initTop)/667)*667
    return function(scrollTop:number){
      // 这么写条件可以防止在屏幕外不可见还一直触发。不过屏幕外可能不影响渲染？
      if(scrollTop<=bound){
        // element.style.transform = 'translateX('+ (scrollTop<=bound?(bound-scrollTop)*param:0)+'px)'
        element.style.left =parseInt(initLeft)-(bound-scrollTop)*param+'px'
      }
    }
  }
}

let preParallelVertical = {
  scope:[-2,2],
  bindedEvent:'scroll',
  func(element:HTMLElement,param:number,){
    let initTop  = element.style.top
    let initLeft = element.style.left
    let bound = Math.floor(parseInt(initTop)/667)*667
    return function(scrollTop:number){
      if(scrollTop<=bound){
        // element.style.transform = 'translateY('+(scrollTop<=bound?(bound-scrollTop)*param:0)+'px) opacity('+(bound-scrollTop)/200+ ')'
        element.style.top = parseInt(initTop)-(bound-scrollTop)*param+'px'
      }
    }
  }
}
let fadeIn = {
  scope:[0,400],
  bindedEvent:'scroll',
  func(element:HTMLElement,param:number,){
    let initTop  = element.style.top
    let bound = Math.floor(parseInt(initTop)/667)*667
    let opacityBound = bound-param
    return function(scrollTop:number){
      if(scrollTop<opacityBound||(scrollTop-opacityBound)/param<0.1){
        element.style.opacity = '0'
      }
      if(scrollTop<=bound&&scrollTop>=opacityBound){
        element.style.opacity = (scrollTop-opacityBound)/param+''
      }
    }
  }
}




export default { parallelVertical, parallelHorizontal,preParallelHorizontal, preParallelVertical, fadeIn }