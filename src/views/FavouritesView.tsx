import { Box, CircularProgress, Fab } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IRawArticle } from "../api/interfaces/IRawArticle";
import ArticleFiltersPopup, {
  IArticleFilters,
} from "../components/ArticleFiltersPopup";
import ArticleGrid from "../components/ArticleGrid";
import FavouriteArticlesService from "../db/FavouriteArticlesService";

const ARTICLES_PER_REQUEST = 20;

export default function FavouritesView() {
  const [articles, setArticles] = useState<IRawArticle[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isFiltersPopupVisable, setFiltersPoipupVisible] = useState(false);
  const [filters, setFilters] = useState<IArticleFilters | undefined>();

  async function loadMoreArticles() {
    const new_articles = await FavouriteArticlesService.getArticles(
      articles.length,
      ARTICLES_PER_REQUEST,
      filters?.title,
      filters?.newsSite
    );

    const articles_count = await FavouriteArticlesService.getArticleCount();
    if (articles_count <= articles.length + new_articles.length) {
      setHasMoreData(false);
    }
    setArticles(articles.concat(new_articles));
  }

  function onFiltersApply(filters: IArticleFilters) {
    setFilters(filters);
    setArticles([]);
  }

  useEffect(() => {
    loadMoreArticles();
  }, [setArticles, filters]);

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
          setFiltersPoipupVisible(false);
        }}
        onFiltersChange={onFiltersApply}
      />
      <Fab
        onClick={() => setFiltersPoipupVisible(true)}
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
        hasMore={hasMoreData}
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
