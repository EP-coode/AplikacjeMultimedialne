import React, { useEffect, useState } from "react";

import { Box, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

import { IArticle } from "../api/interfaces/IArticle";
import { AritclesService } from "../api/ArticlesService";
import ArticleGrid from "../components/ArticleGrid";
import SearchInput from "../components/SearchInput";
import FavouriteArticlesService from "../storeServices/FavouriteArticlesService";

const ARTICLES_PER_FETCH = 10;

export default function HomeView() {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [articleTitleFilter, setArticleTitleFilter] = useState("");

  async function loadMoreArticles() {
    const new_articles = await AritclesService.getArticles(
      ARTICLES_PER_FETCH,
      articles.length,
      articleTitleFilter
    );
    setArticles(articles.concat(new_articles));
  }

  function handleSearchForArticlesClick(titleSearchText: string) {
    if (titleSearchText.length > 3) {
      setArticles([]);
      setArticleTitleFilter(titleSearchText);
    }
  }

  useEffect(() => {
    loadMoreArticles();
  }, [setArticles, articleTitleFilter]);

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
        hasMore={true}
        loader={
          <Box position={"relative"} margin={"20vh auto"} width={"fit-content"}>
            <CircularProgress />
          </Box>
        }
      >
        <ArticleGrid articles={articles}/>
      </InfiniteScroll>
    </Box>
  );
}
