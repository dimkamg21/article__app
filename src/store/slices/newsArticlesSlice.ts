import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Article } from '../../types/Article';
import { limitStringLength } from '../../helpers/limitTextLength';

const API_KEY = 'ee10448230dc480e879d39e5b76aa37c';

export const fetchNewsArticles = createAsyncThunk(
  'newsArticles/fetch',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=usa&pageSize=10&page=${page}&apiKey=${API_KEY}`);
      const data = await response.json();

      const articlesWithLimitedText = data.articles.map((article: Article) => ({
        ...article,
        description: limitStringLength(article.description, 100),
        title: limitStringLength(article.title, 55),
      }));

      return articlesWithLimitedText;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export interface NewsArticlesState {
  newsArticles: Article[];
  isLoading: boolean,
  hasError: boolean;
}

const initialState: NewsArticlesState = {
  newsArticles: [],
  isLoading: false,
  hasError: false,
};

export const newsArticlesSlice = createSlice({
  name: 'newsArticles',
  initialState,
  reducers: {},
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

export default newsArticlesSlice.reducer;

