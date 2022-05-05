import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AritclesService } from "../api/ArticlesService";
import { IRawArticle } from "../api/interfaces/IRawArticle";

import { RootState } from "./store";

const ARTICLES_PER_FETCH = 15;

interface IHomeViewSliceState {
  titleFilter: string;
  articles: IRawArticle[];
  currentPage: number;
  status: "loading" | "error" | "iddle" | "nothingToLoad";
}

const initialState: IHomeViewSliceState = {
  titleFilter: "",
  articles: [],
  currentPage: 0,
  status: "iddle",
};

// How make thunk without parameters in TS ???
export const fetchMoreArticles = createAsyncThunk<IRawArticle[]>(
  "homeViewSlice/fetchMoreArticles",
  async (_, { getState }) => {
    const { allArticles } = getState() as RootState;
    const { titleFilter, currentPage } = allArticles;
    const newArticles = await AritclesService.getArticles(
      ARTICLES_PER_FETCH,
      currentPage * ARTICLES_PER_FETCH,
      titleFilter
    );
    return newArticles;
  }
);

export const homeViewSlice = createSlice({
  name: "homeViewSlice",
  initialState,
  reducers: {
    setTitleFilter: (state, { payload }: PayloadAction<string>) => {
      if (payload.length < 2) return;

      state.titleFilter = payload;
      state.articles = [];
      state.currentPage = 0;
      state.status = "iddle";
    },
    clearArticles: (state, _: AnyAction) => {
      state.articles = [];
      state.currentPage = 0;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMoreArticles.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMoreArticles.fulfilled, (state, action) => {
      state.status = "iddle";
      state.currentPage += 1;
      state.articles = state.articles.concat(action.payload);
    });
    builder.addCase(fetchMoreArticles.rejected, (state) => {
      state.status = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const { setTitleFilter, clearArticles } = homeViewSlice.actions;

export default homeViewSlice.reducer;
