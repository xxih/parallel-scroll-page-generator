import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export {type PieceType,type PieceData}

type EditorState = {
  piecesData:Array<PieceData>,
  countPieceIndex:number,
  selectedPieceIndex:number
}

type PieceType = 'text'|'image'

type PieceData = {
  type:PieceType,
  shapeStyle:ShapeStyle,
  pieceIndex:number
}

const initialState:EditorState = {
  piecesData:[],
  countPieceIndex:0,
  selectedPieceIndex:-1
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
      let payload = {
        ...action.payload,
        pieceIndex:state.countPieceIndex
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
    }
  },
});



export const { addPiece,
  deletePiece,
  setShapeStyle,
  setSelectedPiece
} = slice.actions;


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default slice.reducer;
