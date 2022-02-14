import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeEffectItem,TypeEffectItemName } from '../effects/effects';

export {type PieceType,type PieceData}

type EditorState = {
  piecesData:Array<PieceData>,
  countPieceIndex:number,
  selectedPieceIndex:number,
}

type PieceData = {
  type:PieceType,
  shapeStyle:ShapeStyle,
  pieceIndex:number,
  effects:Array<TypeEffectItem>
}

type PieceType = 'text'|'image'



const initialState:EditorState = {
  piecesData:[],
  countPieceIndex:0,
  selectedPieceIndex:-1,
}

type ShapeStyle = {
  left?:string,
  top?:string,
  width?:string,
  height?:string
}

export const slice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addPiece:(state,action:PayloadAction<{
      type:'image'|'text',
      shapeStyle:ShapeStyle
    }>) =>{
      let payload:PieceData = {
        ...action.payload,
        pieceIndex:state.countPieceIndex,
        effects:[]
      }
      state.piecesData[state.countPieceIndex]=payload
      state.countPieceIndex++
    },
    deletePiece:(state,action:PayloadAction<{
      pieceIndex:number
    }>)=>{
      state.piecesData[action.payload.pieceIndex] = null
    },
    setShapeStyle:(state,action:PayloadAction<{
      pieceIndex:number,
      shapeStyle:ShapeStyle
    }>)=>{
      state.piecesData[action.payload.pieceIndex].shapeStyle = {
        ...state.piecesData[action.payload.pieceIndex].shapeStyle,
        ...action.payload.shapeStyle
      }
    },
    setSelectedPiece:(state,action:PayloadAction<{
      selectedPieceIndex:number
    }>)=>{
      state.selectedPieceIndex = action.payload.selectedPieceIndex
    },
    addEffectToSelectedPiece:(state,action)=>{
      state.piecesData[state.selectedPieceIndex].effects.push({
        effectName:'none',
        param:0
      })
    },
    setSelectedEffectItem:(state,action:PayloadAction<{
      effectIndex:number,
      TypeEffectItem:TypeEffectItem
    }>)=>{
      state.piecesData[state.selectedPieceIndex].effects[action.payload.effectIndex] = {
        ...state.piecesData[state.selectedPieceIndex].effects[action.payload.effectIndex],
        ...action.payload.TypeEffectItem
      }
    }
    // setSelectedParallelEffect:(state,action:PayloadAction<{
    //   parallelEffect:TypeEffectAttrParallel
    // }>)=>{
      // state.piecesData[state.selectedPieceIndex].effects.parallelEffect = {
      //   ...state.piecesData[state.selectedPieceIndex].effects.parallelEffect,
      //   ...action.payload.parallelEffect
      }
    // }
    // setSelectedVisualEffect:(state,action:PayloadAction<{
    //   pieceIndex:number,

    //   typeEffect:TypeEffectAttrParallel
    // }>)=>{

    // }
  // },
});



export const { addPiece,
  deletePiece,
  setShapeStyle,
  setSelectedPiece,
  setSelectedEffectItem,
  addEffectToSelectedPiece
} = slice.actions;


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default slice.reducer;
