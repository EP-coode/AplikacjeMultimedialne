import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IArticle } from "../api/interfaces/IArticle";
import ArticleGrid from "../components/ArticleGrid";
import FavouriteArticlesService from "../storeServices/FavouriteArticlesService";

const ARTICLES_PER_REQUEST = 20;

export default function FavouritesView() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  async function loadMoreArticles() {
    const new_articles = await FavouriteArticlesService.getArticles(
      articles.length,
      ARTICLES_PER_REQUEST
    );
    const articles_count = await FavouriteArticlesService.getArticleCount();
    if (articles_count <= articles.length + new_articles.length) {
      setHasMoreData(false);
    }
    setArticles(articles.concat(new_articles));
  }

  useEffect(() => {
    loadMoreArticles();
  }, [setArticles]);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        minHeight: "100vh",
        padding: "8px",
        pb: "50px",
      }}
    >
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
