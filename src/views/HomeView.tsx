import React, { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

import { IArticle } from "../api/interfaces/IArticle";
import { AritclesService } from "../api/ArticlesService";
import ArticleGrid from "../components/ArticleGrid";

const ARTICLES_PER_FETCH = 10;

export default function HomeView() {
  const [articles, setArticles] = useState<IArticle[]>([]);

  async function loadMoreArticles() {
    const new_articles = await AritclesService.getArticles(
      ARTICLES_PER_FETCH,
      articles.length
    );
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
        hasMore={true}
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
