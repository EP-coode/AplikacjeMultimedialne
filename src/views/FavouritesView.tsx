import { Box, CircularProgress, Fab } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleGrid from "../components/ArticleGrid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchMoreLocalArticles,
  ILocalArticlesFilter,
  setLocalArticlesFilters,
  clearArticles,
} from "../redux/LocalFavArticlesSlice";
import ArticleFiltersPopup from "../components/ArticleFiltersPopup";

export default function FavouritesView() {
  const { articles, status, filters } = useSelector(
    (state: RootState) => state.localFavArticles
  );
  const dispatch: AppDispatch = useDispatch();
  const [isFiltersPopupVisable, setIsFiltersPopupVisavle] = useState(false);

  function loadMoreArticles() {
    if (status == "loading") return;
    dispatch(fetchMoreLocalArticles());
  }

  function onFiltersApply(filters: ILocalArticlesFilter) {
    filters;
    dispatch(setLocalArticlesFilters(filters));
  }

  useEffect(() => {
    loadMoreArticles();
    return () => {
      dispatch(clearArticles());
    };
  }, [dispatch, filters]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        minHeight: "100vh",
        padding: "8px",
        pb: "50px",
      }}
    >
      <ArticleFiltersPopup
        filters={filters}
        isOpen={isFiltersPopupVisable}
        onClose={() => {
          setIsFiltersPopupVisavle(false);
        }}
        onFiltersChange={onFiltersApply}
      />
      <Fab
        onClick={() => setIsFiltersPopupVisavle(true)}
        color="primary"
        aria-label="edit"
        sx={{
          position: "fixed",
          bottom: "80px",
          right: "16px",
        }}
      >
        <SearchIcon />
      </Fab>
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
