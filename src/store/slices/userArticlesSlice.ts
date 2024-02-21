import { createSlice } from '@reduxjs/toolkit';
import { Article } from '../../types/Article';
import { localStorageService } from '../../helpers/localStorageService';

const key = 'userArticles';

export interface  UserArticlesState {
  userArticles: Article[];
  query: string;
  pinnedArticle: Article | null;
}

const initialState: UserArticlesState = {
  userArticles: [],
  query: '',
  pinnedArticle: null
};

export const userArticlesSlice = createSlice({
  name: key,
  initialState,
  reducers: {
    initUserArticles: (state) => {
      state.userArticles = localStorageService.getLocalStorageData<Article>(key);
      state.pinnedArticle = localStorageService.getLocalStorageData<Article>('pinnedArticle')[0];
    },

    setQuery: (state, action) => {
      state.query = action.payload;
    },

    addArticle: (state, action) => {
      const newArticle = { ...action.payload, publishedAt: new Date().toString() };

      state.userArticles.push(newArticle);

      localStorageService.setLocalStorageData(key,  state.userArticles);
    },

    removeArticle: (state, action) => {
      state.userArticles = state.userArticles.filter((article) => (
        article.publishedAt !== action.payload
      ));

      localStorageService.setLocalStorageData(key,  state.userArticles);
    },

    pinArticle: (state, action) => {
      const articleToPin = state.userArticles.find(article => article.publishedAt === action.payload);

      if (articleToPin) {
        state.userArticles = state.userArticles.filter(article => article.publishedAt !== action.payload);

        state.userArticles.unshift(articleToPin);

        state.pinnedArticle = articleToPin;

        localStorageService.setLocalStorageData(key, state.userArticles);
        localStorageService.setLocalStorageData<Article>('pinnedArticle', [articleToPin]);
      }
    },

    unpinArticle: (state) => {
      state.pinnedArticle = null;
    }
  },
});

export const { 
  setQuery, initUserArticles, addArticle, removeArticle, pinArticle, unpinArticle
} = userArticlesSlice.actions;
export default userArticlesSlice.reducer;