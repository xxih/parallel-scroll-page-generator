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
    let initTop  = element.style.top
    let bound = Math.floor(parseInt(initTop)/667)*667
    return function(scrollTop:number){
      element.style.transform = 'translateY('+(scrollTop>bound?(scrollTop-bound)*param:0)+'px)'
    }
  }
}

let parallelHorizontal = {
  scope:[-2,2],
  bindedEvent:'scroll',
  // 这是用来绑定的函数
  
  func(element:HTMLElement,param:number,){
    let initTop  = element.style.top
    let bound = Math.floor(parseInt(initTop)/667)*667
    return function(scrollTop:number){
      element.style.transform = 'translateX('+ (scrollTop>bound?(scrollTop-bound)*param:0)+'px)'
    }
  }
}


export default { parallelVertical, parallelHorizontal }