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
  parallelVertical:'垂直视差',
  parallelHorizontal:'水平视差',
  none:'无效果'
}

let parallelVertical = {
  // 这是给界面用的
  scope:[-2,2],
  bindedEvent:'scroll',
  // 这是用来绑定的函数
  func(element:HTMLElement,param:number,){
    // let initLeft = element.style.left
    let initTop  = element.style.top
    let bound = Math.floor(parseInt(initTop)/667)*667
    return function(scrollTop:number){
      // element.style.left = parseInt(initLeft)-scrollTop*param+'px'
      // element.style.top = scrollTop>bound ? parseInt(initTop)-(scrollTop-bound)*param+'px': initTop
      
      element.style.transform = 'translateY('+(scrollTop-bound)*param+'px)'
    }
  }
}

let parallelHorizontal = {
  scope:[-2,2],
  bindedEvent:'scroll',
  // 这是用来绑定的函数
  
  func(element:HTMLElement,param:number,){
    // let initLeft = element.style.left
    
    let initTop  = element.style.top
    let bound = Math.floor(parseInt(initTop)/667)*667
    // let initTop  = element.style.top
    return function(scrollTop:number){
      // element.style.left = scrollTop>bound ? parseInt(initLeft)-(scrollTop-bound)*param+'px':initLeft
      // element.style.top = parseInt(initTop)-scrollTop*param+'px'
      element.style.transform = 'translateX('+(scrollTop-bound)*param+'px)'
    }
  }
}


export default { parallelVertical, parallelHorizontal }