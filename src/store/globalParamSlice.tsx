import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type globalState = {
  paperHeight:number,
  previewMode:boolean
}

export const slice = createSlice({
  name: 'globalParam',
  initialState: {
    paperHeight:667,
    previewMode:false
  },
  reducers: {
    changePaperHeight:(state,action) =>{
      state.paperHeight = action.payload.paperHeight
    },
    setPreviewMode:(state,action:PayloadAction<{
      previewMode:boolean
    }>)=>{
      state.previewMode = action.payload.previewMode
    }
  },
});

export const { changePaperHeight, setPreviewMode } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default slice.reducer;
