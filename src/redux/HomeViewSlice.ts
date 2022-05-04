import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AritclesService } from "../api/ArticlesService";
import { IRawArticle } from "../api/interfaces/IRawArticle";
import FavouriteArticlesService from "../db/FavouriteArticlesService";

import { RootState } from "./store";

const ARTICLES_PER_FETCH = 15;

interface IArticleCardData extends IRawArticle {
  isLiked: boolean;
}

interface IHomeViewSliceState {
  titleFilter: string;
  articles: IArticleCardData[];
  currentPage: number;
  status: "loading" | "error" | "iddle" | "nothingToLoad";
}

const initialState: IHomeViewSliceState = {
  titleFilter: "",
  articles: [],
  currentPage: 0,
  status: "iddle",
};

export const fetchMoreArticles = createAsyncThunk<IArticleCardData[]>(
  "homeViewSlice/fetchMoreArticles",
  async (_, { getState }) => {
    const { homeViewReducer } = getState() as RootState;
    const { titleFilter, currentPage } = homeViewReducer;
    const newArticles = await AritclesService.getArticles(
      ARTICLES_PER_FETCH,
      currentPage * ARTICLES_PER_FETCH,
      titleFilter
    );

    return Promise.all(
      newArticles.map(async (article) => {
        const isLiked = await FavouriteArticlesService.containsArticle(
          article.id
        );
        return {
          ...article,
          isLiked,
        };
      })
    );
  }
);

export const likeArticle = createAsyncThunk(
  "homeViewSlice/likeArticle",
  async (articleId: number, { getState }) => {
    const { homeViewReducer } = getState() as RootState;
    const { articles } = homeViewReducer;
    const articleToLike = articles.find((article) => article.id == articleId);

    if (articleToLike == null) return null;

    await FavouriteArticlesService.addArticle(articleToLike);

    return articleId;
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
    builder.addCase(likeArticle.fulfilled, ({ articles }, action) => {
      const articleId = action.payload;

      if (articleId == null) return;

      const articleIndex = articles.findIndex(
        (article) => article.id == articleId
      );
      // is it safe to mutate it here ???
      articles[articleIndex].isLiked = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setTitleFilter } = homeViewSlice.actions;

export default homeViewSlice.reducer;
