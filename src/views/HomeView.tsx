import React, { useEffect } from "react";

import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../redux/store";
import {
  fetchMoreArticles,
  setTitleFilter,
  clearArticles,
} from "../redux/HomeViewSlice";
import ArticleGrid from "../components/ArticleGrid";
import SearchInput from "../components/SearchInput";

export default function HomeView() {
  const { articles, titleFilter, status } = useSelector(
    (state: RootState) => state.allArticles
  );
  const dispatch: AppDispatch = useDispatch();

  function loadMoreArticles() {
    if (status == "loading") return;
    dispatch(fetchMoreArticles());
  }

  function handleSearchForArticlesClick(titleSearchText: string) {
    dispatch(setTitleFilter(titleSearchText));
    dispatch(fetchMoreArticles());
  }

  useEffect(() => {
    loadMoreArticles();
    return () => {
      dispatch(clearArticles());
    };
  }, [dispatch, titleFilter]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        minHeight: "100vh",
        padding: "8px",
        pb: "50px",
      }}
    >
      <SearchInput onSearchClick={handleSearchForArticlesClick} />
      <InfiniteScroll
        dataLength={articles.length}
        next={loadMoreArticles}
        hasMore={status != "nothingToLoad"}
        loader={
          <Box position={"relative"} margin={"20vh auto"} width={"fit-content"}>
            <CircularProgress />
          </Box>
        }
      >
        <ArticleGrid articles={articles} />
      </InfiniteScroll>
    </Box>
  );
}
