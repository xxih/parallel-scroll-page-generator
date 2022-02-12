import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './editorSlice';
import globalParamSlice from './globalParamSlice';


export const store = configureStore({
  reducer: {
    globalParam:globalParamSlice,
    editor: editorReducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch