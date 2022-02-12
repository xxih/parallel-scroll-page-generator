import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './editorSlice';
import globalParamSlice from './globalParamSlice';


export default configureStore({
  reducer: {
    globalParam:globalParamSlice,
    editor: editorReducer,
  },
});
