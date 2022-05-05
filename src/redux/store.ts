import { configureStore } from "@reduxjs/toolkit";
import homeViewReducer from "../redux/HomeViewSlice";
import LocalFavArticlesSlice from "../redux/LocalFavArticlesSlice";

const store = configureStore({
  reducer: {
    allArticles: homeViewReducer,
    localFavArticles: LocalFavArticlesSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
