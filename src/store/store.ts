import { configureStore } from '@reduxjs/toolkit';
import userArticlesReducer from './slices/userArticlesSlice';
import newsArticlesReducer from './slices/newsArticlesSlice';

const store = configureStore({
  reducer: {
    userArticles: userArticlesReducer,
    newsArticles: newsArticlesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
