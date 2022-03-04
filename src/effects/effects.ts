export type TypeEffectItemName = 'parralelVertical'|'parallelHorizontal'|'none'

export type TypeEffectItem = TypeEffectItemParallelHorizontal|TypeEffectItemNone|TypeEffectItemParralelVertical
// 这里我把问号都写上了，所以添加新的效果暂时不会有报错。其实不太好，还得改改
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

let generateEffect =   function(element,effects){
  let mergedEffect = []
  // #region 对 mergeEffect 数据结构的说明
  // 为了合并各个 effect 的效果，我设计了一个这样的数据结构
  // let mergedEffectItem = {
  //   start:800,
  //   end:1000,
  //   coefficeients:{
  //     transitionX:0.25,
  //     transitionY:0.1,
  //     opacity:0.2
  //   }
  // }
  // #endregion
  effects.forEach((item)=>{
    // 这里对每一个 effect 生成一个 mergedEffectItem，然后插入到 mergedEffect 中
    // 然后这里如何根据 item 来生成一个 mergedEffectItem 就可以封装到每一个效果对应的对象里面了。
    // 这里的插入不是简单的插入，而是要去遍历 mergedEffect，进行区间的划分和系数的合并。这里的逻辑可能会比较复杂！
    // 复杂度是 O(n)
  })
  return function(scrollTop){
    // 根据产生的最终的 mergedEffect 执行改变元素样式的副作用。这个函数将作为给 addEventListener 的参数

    // 所以这一整个函数的流程是这样的：
    // 1. 接收 element 以获取初始数据，接收 effects 用于生成计算改变元素样式需要的系数，
    // 2. 然后利用闭包的机制，返回一个接收 scrollTop 的函数。
    // 3. 这个函数比之前的提高了一层，不再是对每个 effect 去生成一个函数，而是每个 piece 的 effect 合并成一个函数！

    // 沃日，不愧是我
  }
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
      // 哈哈哈下面已经是过时的想法了。
      // 赣，不能这么写，transform 只能写在一个里面，后面的会覆盖前面的。如果要用 transform 应该得再创建一个闭包 用数组保存所有的 transform 项然后拼接字符串。然后在这里只负责把 transform 项 push 进数组
      // element.style.transform = 'translateY('+(scrollTop>bound?(scrollTop-bound)*param:0)+'px)'
      if(scrollTop>bound){
        element.style.top = parseInt(initTop)-(scrollTop-bound)*param+'px'
      }
      
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
      if(scrollTop>bound){
        element.style.left =parseInt(initLeft)-(scrollTop-bound)*param+'px'
      }
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