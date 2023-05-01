import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store: any = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
