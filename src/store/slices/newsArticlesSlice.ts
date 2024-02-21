import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Article } from '../../types/Article';
import { fetchNewsArticlesFromAPI } from '../../helpers/fetchNewArticlesFromAPI';

export const fetchNewsArticles = createAsyncThunk(
  'newsArticles/fetch',
  async (page: number, thunkAPI) => {
    try {
      const articles = await fetchNewsArticlesFromAPI(page);
      return articles;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export interface NewsArticlesState {
  newsArticles: Article[];
  page: number,
  isLoading: boolean,
  hasError: boolean;
}

const initialState: NewsArticlesState = {
  newsArticles: [],
  page: 1,
  isLoading: false,
  hasError: false,
};

export const newsArticlesSlice = createSlice({
  name: 'newsArticles',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },

    resetPage: (state) => {
      state.page = 1;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNewsArticles.pending, (state) => {
      state.isLoading = true;
      state.hasError = false;
    });

    builder.addCase(fetchNewsArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.newsArticles = [...state.newsArticles, ...action.payload];
    });

    builder.addCase(fetchNewsArticles.rejected, (state) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export const { setPage, resetPage } = newsArticlesSlice.actions;
export default newsArticlesSlice.reducer;

