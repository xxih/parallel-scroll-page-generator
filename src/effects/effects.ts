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
// export type TypeEffectItem = {
//   param?:number,
//   effectName?:TypeEffectItemName
// }

let parallelVertical = {
  // 这是给界面用的
  scope:[-2,2],
  bindedEvent:'scroll',
  // 这是用来绑定的函数
  func(initLeft:string,initTop:string,speed:number,element:HTMLElement){
    return function(scrollTop:number){
      element.style.left = parseInt(initLeft)-scrollTop*speed+'px'
      element.style.top = parseInt(initTop)-scrollTop*speed+'px'
    }
  }
}

let parallelHorizontal = {
  scope:[-2,2],
  bindedEvent:'scroll',
  // 这是用来绑定的函数
  func(initLeft:string,initTop:string,speed:number,element:HTMLElement){
    return function(scrollTop:number){
      element.style.left= parseInt(initLeft)-scrollTop*speed+'px'
      element.style.top= parseInt(initTop)-scrollTop*speed+'px'
    }
  },
}


export default { parallelVertical, parallelHorizontal }