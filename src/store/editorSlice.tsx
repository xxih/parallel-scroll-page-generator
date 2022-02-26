import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeEffectItem, TypeEffectItemName } from '../effects/effects';

export { type PieceType, type PieceData }

type EditorState = {
  piecesData: Array<PieceData>,
  countPieceIndex: number,
  selectedPieceIndex: number,
}

type PieceData = {
  type: PieceType,
  shapeStyle: ShapeStyle,
  pieceIndex: number,
  effects: Array<TypeEffectItem>,
  param: {
    text?: string,
  }
}

type PieceType = 'text' | 'image'



const initialState: EditorState = {
  piecesData: [],
  countPieceIndex: 0,
  selectedPieceIndex: -1,
}

type ShapeStyle = {
  left?: string,
  top?: string,
  width?: string,
  height?: string
}

export const slice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // 向 editor 里添加 piece
    addPiece: (state, action: PayloadAction<{
      type: 'image' | 'text',
      shapeStyle: ShapeStyle
    }>) => {
      let payload: PieceData = {
        ...action.payload,
        pieceIndex: state.countPieceIndex,
        effects: [],
        param: {
          text: '搞多点文字测试效果明显搞多点文字测试效果明显搞多点文字测试效果明显'
        }
      }
      state.piecesData[state.countPieceIndex] = payload
      state.countPieceIndex++
    },
    // 删除 piece
    deletePiece: (state, action: PayloadAction<{
      pieceIndex: number
    }>) => {
      state.piecesData[action.payload.pieceIndex] = null
    },
    // piece 在 editor 中是由一个 Shape 再套一个其他组件组成的
    // 这里可以设置它的 style
    setShapeStyle: (state, action: PayloadAction<{
      pieceIndex: number,
      shapeStyle: ShapeStyle
    }>) => {
      state.piecesData[action.payload.pieceIndex].shapeStyle = {
        ...state.piecesData[action.payload.pieceIndex].shapeStyle,
        ...action.payload.shapeStyle
      }
    },
    // 当前选中的 piece
    setSelectedPiece: (state, action: PayloadAction<{
      selectedPieceIndex: number
    }>) => {
      state.selectedPieceIndex = action.payload.selectedPieceIndex
    },
    // 给当前选中的 piece 添加一个效果项
    addEffectToSelectedPiece: (state, action) => {
      state.piecesData[state.selectedPieceIndex].effects.push({
        effectName: 'none',
        param: 0
      })
    },
    // 设置效果项
    setSelectedEffectItem: (state, action: PayloadAction<{
      effectIndex: number,
      TypeEffectItem: TypeEffectItem
    }>) => {
      state.piecesData[state.selectedPieceIndex].effects[action.payload.effectIndex] = {
        ...state.piecesData[state.selectedPieceIndex].effects[action.payload.effectIndex],
        ...action.payload.TypeEffectItem
      }
    },
    setSelectedText:(state, action: PayloadAction<{
      text:string
    }>)=>{
      state.piecesData[state.selectedPieceIndex].param.text=action.payload.text
    }
  }
});



export const { addPiece,
  deletePiece,
  setShapeStyle,
  setSelectedPiece,
  setSelectedEffectItem,
  addEffectToSelectedPiece,
  setSelectedText
} = slice.actions;


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export default slice.reducer;
