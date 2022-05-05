import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import FavouriteArticlesService from "../db/FavouriteArticlesService";
import { IArticle } from "../db/Interfaces/IArticle";

import { RootState } from "./store";

const ARTICLES_PER_FETCH = 15;

export interface ILocalArticlesFilter {
  title: string;
  newsSite: string[];
}

interface ILocalFavArticles {
  filters: ILocalArticlesFilter;
  articles: IArticle[];
  currentPage: number;
  status: "loading" | "error" | "iddle" | "nothingToLoad";
}

const initialState: ILocalFavArticles = {
  filters: {
    newsSite: [],
    title: "",
  },
  articles: [],
  currentPage: 0,
  status: "iddle",
};

// How make thunk without parameters in TS ???
export const fetchMoreLocalArticles = createAsyncThunk<IArticle[]>(
  "localFavArticles/fetchMoreLocalArticles",
  async (_, { getState, rejectWithValue }) => {
    const { localFavArticles } = getState() as RootState;
    const { filters, currentPage, status } = localFavArticles;

    if (status == "loading") rejectWithValue("Articles already loading");

    const newArticles = await FavouriteArticlesService.getArticles(
      ARTICLES_PER_FETCH,
      currentPage * ARTICLES_PER_FETCH,
      filters.title,
      filters.newsSite
    );
    return newArticles;
  }
);

export const LocalFavArticlesSlice = createSlice({
  name: "localFavArticles",
  initialState,
  reducers: {
    setLocalArticlesFilters: (
      state,
      { payload }: PayloadAction<ILocalArticlesFilter>
    ) => {
      state.filters = payload;
    },
    clearArticles: (state) => {
      state.articles = [];
      state.currentPage = 0;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMoreLocalArticles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMoreLocalArticles.fulfilled, (state, action) => {
      state.status = "iddle";
      state.currentPage += 1;
      state.articles = state.articles.concat(action.payload);
      if (action.payload.length <= ARTICLES_PER_FETCH) state.status = "nothingToLoad";
    });
    builder.addCase(fetchMoreLocalArticles.rejected, (state) => {
      state.status = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const { setLocalArticlesFilters, clearArticles } =
  LocalFavArticlesSlice.actions;

export default LocalFavArticlesSlice.reducer;
