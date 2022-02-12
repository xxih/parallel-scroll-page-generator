import { createSlice } from '@reduxjs/toolkit';

export type pieceData = {
  type:string,
  shapeStyle:shapeStyle,
  pieceIndex:number
}

export type shapeStyle = {
  top?:number,
  left?:number,
}

export type setShapeStylePayload = {
  pieceIndex:number,
  xMove,
  yMove,
}

export const slice = createSlice({
  name: 'editor',
  initialState: {
    piecesData:[],
    pieceIndex:0,
    selectedPieceIndex:undefined
  },
  reducers: {
    addPiece:(state,action) =>{
      let payload = {
        ...action.payload,
        pieceIndex:state.pieceIndex
      }
      state.piecesData[state.pieceIndex]=payload
      state.pieceIndex++
    },
    deletePiece:(state,action)=>{
      state.piecesData[action.payload.pieceIndex] = null
    },
    setShapeStyle:(state,action)=>{
      // for (const key in action.payload.shapeStyle) {
      //   state.piecesData[action.payload.pieceIndex].shapeStyle[key] = action.payload.shapeStyle[key]
      // }
      state.piecesData[action.payload.pieceIndex].shapeStyle = {
        ...state.piecesData[action.payload.pieceIndex].shapeStyle,
        ...action.payload.shapeStyle
      }
    },
    setSelectedPiece:(state,action)=>{
      state.selectedPieceIndex = action.payload.selectedPieceIndex
    }
  },
});

export const { addPiece,deletePiece,setShapeStyle,setSelectedPiece } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPiecesData = state => state.editor.piecesData;

export default slice.reducer;
